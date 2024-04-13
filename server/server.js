const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const pool = require("./database.js");
const app = express();
const port = 2608;

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
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token isn't valid" });
      } else {
        req.userid = decoded.userid;
        req.username = decoded.username;
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
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username.length < 4) {
    return res.json({ Error: "Потребителското име трябва да бъде поне 4 символа!" });
  }
  if (password.length < 8) {
    return res.json({ Error: "Паролата трябва да бъде поне 8 символа!" });
  }

  // Check if username already exists
  const checkUsernameQuery = "SELECT * FROM users WHERE username = $1";
  const checkUsernameValues = [username];
  pool.query(checkUsernameQuery, checkUsernameValues, (err, result) => {
    if (err) {
      return res.json({ Error: "Database error" });
    }
    if (result.rows.length > 0) {
      return res.json({ Error: "Потребителят вече съществува!" });
    }

    // If username is valid and doesn't exist, proceed with registration
    bcrypt.hash(password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error hashing password" });

      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING userid";
      const insertUserValues = [username, hash];
      pool.query(insertUserQuery, insertUserValues, (err, result) => {
        if (err) return res.json({ Error: "Error creating user" });

        const userid = result.rows[0].userid;

        // Insert default list for the user
        const insertListQuery =
          "INSERT INTO lists (userid, listname) VALUES ($1, $2) RETURNING listid";
        const insertListValues = [userid, "Обучение"];
        pool.query(insertListQuery, insertListValues, (err, result) => {
          if (err) return res.json({ Error: "Error creating default list" });

          const listid = result.rows[0].listid;

          // Insert default tasks for the list
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
              description:
                "Като натиснеш бутона 'ДОБАВИ ЗАДАЧА'",
              status: "todo",
            },
            {
              name: "Добави описание на тази задача",
              description:
                "",
              status: "todo",
            },
            {
              name: "Завърши туториъла",
              description:
                "Като преместиш всички задачи в 'ЗАВЪРШЕНИ'",
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

app.post("/login", (req, res) => {
  const query = "SELECT * FROM users WHERE username = $1";
  pool.query(query, [req.body.username], (err, result) => {
    if (err) return res.json({ Error: "Login error" });

    if (result.rows.length === 0) {
      return res.json({ Error: "Потребителят не съществува!" });
    }

    // User exists, now compare passwords
    bcrypt.compare(
      req.body.password.toString(),
      result.rows[0].password,
      (err, response) => {
        if (err)
          return res.json({ Error: "Password comparison error" });

        if (response) {
          const { username, userid } = result.rows[0];
          const token = jwt.sign({ username, userid }, "secret", {
            expiresIn: "7d",
          });
          res.cookie("token", token);
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "Грешна парола!" });
        }
      }
    );
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
  try {
    const query = "SELECT * FROM tasks WHERE listid = $1";
    const { rows } = await pool.query(query, [listId]);

    // If there are no tasks found for the list, return an empty array
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
  const client = await pool.connect(); // Acquire a client from the pool

  try {
    await client.query("BEGIN"); // Start a transaction

    // Delete tasks associated with the list
    await client.query("DELETE FROM tasks WHERE listid = $1", [listId]);

    // Delete the list
    const result = await client.query("DELETE FROM lists WHERE listid = $1", [
      listId,
    ]);

    await client.query("COMMIT"); // Commit the transaction

    if (result.rowCount === 0) {
      res.status(404).json({ error: "List not found" });
    } else {
      res.json({ message: "List and associated tasks deleted successfully" });
    }
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction in case of error
    console.error("Error deleting list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release(); // Release the client back to the pool
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
