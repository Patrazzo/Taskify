const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const pool = require("./config.js");
const app = express();
const port = 2608;
const secret = process.env.SECRET_KEY;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token isn't valid" });
      } else {
        req.userid = decoded.userid;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

app.get("/validate", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    userid: req.userid,
    role: req.role,
  });
});

app.post("/login", (req, res) => {
  const query =
    "SELECT userid, username, password, role FROM users WHERE username = $1";
  pool.query(query, [req.body.username], (err, result) => {
    if (err) return res.json({ Error: "Login error" });

    if (result.rows.length === 0) {
      return res.json({ Error: "Потребителят не съществува!" });
    }
    bcrypt.compare(
      req.body.password.toString(),
      result.rows[0].password,
      (err, response) => {
        if (err) return res.json({ Error: "Password comparison error" });
        if (response) {
          const { username, userid, role } = result.rows[0];
          const token = jwt.sign({ username, userid, role }, secret, {
            expiresIn: "7d",
          });
          res.cookie("token", token);
          console.log(role);
          return res.json({ Status: "Success", role });
        } else {
          return res.json({ Error: "Грешна парола!" });
        }
      }
    );
  });
});

app.put("/updateUserRole/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body; // Assuming role is sent in the request body

  try {
    await pool.query("UPDATE users SET role = $1 WHERE userid = $2", [
      role,
      userId,
    ]);
    res.sendStatus(204); // No content
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/userDelete/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    // Get the lists belonging to the user
    const userLists = await pool.query(
      "SELECT listid FROM lists WHERE userid = $1",
      [userId]
    );

    // Delete tasks associated with each list belonging to the user
    for (const list of userLists.rows) {
      await pool.query("DELETE FROM tasks WHERE listid = $1", [list.listid]);
    }

    // Delete lists belonging to the user
    await pool.query("DELETE FROM lists WHERE userid = $1", [userId]);

    // Delete the user
    const result = await pool.query("DELETE FROM users WHERE userid = $1", [
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    // Retrieve all users with their respective number of lists, tasks, and roles
    const usersQuery = `
      SELECT 
        u.userid,
        u.username,
        COUNT(DISTINCT l.listid) AS num_lists,
        COUNT(t.taskid) AS num_tasks,
        u.role
      FROM 
        users u
      LEFT JOIN 
        lists l ON u.userid = l.userid
      LEFT JOIN 
        tasks t ON l.listid = t.listid
      GROUP BY 
        u.userid, u.username, u.role
      ORDER BY 
        u.userid
    `;

    const usersResult = await pool.query(usersQuery);
    const usersData = usersResult.rows;

    res.json(usersData);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/updateCredentials", async (req, res) => {
  const { username, password, user } = req.body;
  if (username.length < 4) {
    return res
      .status(400)
      .json({ error: "Потребителското име трябва да бъде поне 4 символа" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Паролата трябва да бъде поне 8 символа" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateQuery = `
      UPDATE users
      SET username = $1, password = $2
      WHERE userid = $3`;
    await pool.query(updateQuery, [username, hashedPassword, user]);
    res.status(200).json({ message: "Credentials updated successfully" });
  } catch (error) {
    console.error("Error updating credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getAllUsers", (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No users found" });
    }
    return res.status(200).json(result.rows);
  });
});

app.get("/getAllLists", (req, res) => {
  const query = "SELECT * FROM lists";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving lists:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No lists found" });
    }
    return res.status(200).json(result.rows);
  });
});

app.get("/getAllUsers", (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No users found" });
    }
    return res.status(200).json(result.rows);
  });
});
app.get("/getAllTasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving Tasks:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No Tasks found" });
    }
    return res.status(200).json(result.rows);
  });
});

app.get("/getAllDone", (req, res) => {
  const query = "SELECT * FROM tasks WHERE status = 'done'";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving Tasks:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No Tasks found" });
    }
    return res.status(200).json(result.rows);
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username.length < 4) {
    return res.json({
      Error: "Потребителското име трябва да бъде поне 4 символа!",
    });
  }
  if (password.length < 8) {
    return res.json({ Error: "Паролата трябва да бъде поне 8 символа!" });
  }
  const checkUsernameQuery = "SELECT * FROM users WHERE username = $1";
  const checkUsernameValues = [username];
  pool.query(checkUsernameQuery, checkUsernameValues, (err, result) => {
    if (err) {
      return res.json({ Error: "Грешка с базата данни" });
    }
    if (result.rows.length > 0) {
      return res.json({ Error: "Потребителят вече съществува!" });
    }

    bcrypt.hash(password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error hashing password" });

      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING userid";
      const insertUserValues = [username, hash];
      pool.query(insertUserQuery, insertUserValues, (err, result) => {
        if (err) return res.json({ Error: "Error creating user" });

        const userid = result.rows[0].userid;

        const insertListQuery =
          "INSERT INTO lists (userid, listname) VALUES ($1, $2) RETURNING listid";
        const insertListValues = [userid, "Обучение"];
        pool.query(insertListQuery, insertListValues, (err, result) => {
          if (err) return res.json({ Error: "Error creating default list" });
          const listid = result.rows[0].listid;
          const insertTaskQuery =
            "INSERT INTO tasks (listid, taskname, description, status) VALUES ($1, $2, $3, $4)";
          const tutorialTasks = [
            {
              name: "Създай лист",
              description:
                "Като влезеш в sidebar-a, въведеш име и натиснеш бутона 'СЪЗДАЙ'",
              status: "todo",
            },
            {
              name: "Създай задача",
              description: "Като натиснеш бутона 'ДОБАВИ ЗАДАЧА'",
              status: "todo",
            },
            {
              name: "Добави описание на тази задача",
              description: "",
              status: "todo",
            },
            {
              name: "Завърши туториъла",
              description: "Като преместиш всички задачи в 'ЗАВЪРШЕНИ'",
              status: "todo",
            },
          ];

          tutorialTasks.forEach((task) => {
            const taskValues = [
              listid,
              task.name,
              task.description,
              task.status,
            ];
            pool.query(insertTaskQuery, taskValues, (err, result) => {
              if (err) console.error("Error inserting task:", err);
            });
          });

          return res.json({ Status: "Success" });
        });
      });
    });
  });
});

app.post("/createList", (req, res) => {
  const query = "INSERT INTO lists (userid, listname) VALUES ($1, $2)";
  const values = [req.body.user, req.body.newListName];
  pool.query(query, values, (err, result) => {
    if (err) return res.json({ Error: "Insert data error" });
    return res.json({ Status: "Success" });
  });
});
app.post("/addTask/", (req, res) => {
  const query =
    "INSERT INTO tasks (listid, taskname, description, status) VALUES ($1, $2, $3, 'todo')";
  const values = [req.body.listId, req.body.newName, req.body.newDescription];
  pool.query(query, values, (err, result) => {
    if (err) return res.json({ Error: "Insert Task Error" });
    return res.json({ Status: "Success" });
  });
});

app.get("/getList/:userid", (req, res) => {
  const userId = req.params.userid;
  const query = "SELECT * FROM lists WHERE userid = $1";
  const values = [userId];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error retrieving lists:", err);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ Error: "No lists found for the user" });
    }

    return res.status(200).json(result.rows);
  });
});

app.get("/getTask/:listid", async (req, res) => {
  const listId = req.params.listid;
  const userId = req.query.userId; // Retrieve userId from query parameters
  try {
    const query = `
    SELECT tasks.*
    FROM tasks
    INNER JOIN lists ON tasks.listid = lists.listid
    WHERE tasks.listid = $1 AND lists.userid = $2
  `;
    const { rows } = await pool.query(query, [listId, userId]);

    // If there are no tasks found for the list and user, return an empty array
    if (rows.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error retrieving Tasks:", err);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
});

app.put("/tasks/:taskId/status", async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET status = $1 WHERE taskId = $2",
      [status, taskId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET taskname = $1, description = $2 WHERE taskid = $3",
      [title, description, taskId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/lists/:listid", async (req, res) => {
  const listId = req.params.listid;
  const newName = req.body.listName;
  try {
    const result = await pool.query(
      "UPDATE lists SET listname = $1 WHERE listid = $2",
      [newName, listId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "List not found" });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error("Error updating list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE taskid = $1", [
      taskId,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/lists/:listid", async (req, res) => {
  const listId = req.params.listid;
  
  try {
    await pool.query("DELETE FROM tasks WHERE listid = $1", [listId]);
    const result = await pool.query("DELETE FROM lists WHERE listid = $1", [listId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "List not found" });
    }
    
    res.json({ message: "List and associated tasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
