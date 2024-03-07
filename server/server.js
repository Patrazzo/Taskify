const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

const app = express();
const port = 2608;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userQuery = "SELECT userid FROM Users WHERE username = $1 AND password = $2";
    const { rows } = await pool.query(userQuery, [username, password]);
    if (rows.length === 1) {
      res.status(200).json({ userid: rows[0].userid });
    } else {
      res.status(404).json({ error: "User not found or incorrect password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const insertUserQuery = "INSERT INTO Users (username, password, role) VALUES ($1, $2, 'user')";
    await pool.query(insertUserQuery, [username, password]);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// CRUD operations for tasks
app.post("/tasks", async (req, res) => {
  const { listId, taskName, taskDescription } = req.body;
  try {
    const insertSTMT = "INSERT INTO Tasks (Listid, TaskName, Description, Status) VALUES ($1, $2, $3, 'todo')";
    await pool.query(insertSTMT, [listId, taskName, taskDescription]);
    res.status(201).send("Task added successfully");
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/tasks/:taskId/status", async (req, res) => {
  const taskId = req.params.taskId;
  const { status } = req.body;
  try {
    const updateSTMT = "UPDATE Tasks SET Status = $1 WHERE Taskid = $2";
    await pool.query(updateSTMT, [status, taskId]);
    res.status(200).send("Task status updated successfully");
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tasks", async (req, res) => {
  const listId = req.query.listId;
  try {
    const STMT = "SELECT * FROM Tasks WHERE listid = $1";
    const result = await pool.query(STMT, [listId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description } = req.body;
  try {
    const updateSTMT = "UPDATE Tasks SET TaskName = $1, Description = $2 WHERE Taskid = $3";
    await pool.query(updateSTMT, [title, description, taskId]);
    res.status(200).send("Task updated successfully");
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const deleteSTMT = "DELETE FROM Tasks WHERE Taskid = $1";
    await pool.query(deleteSTMT, [taskId]);
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// CRUD operations for lists
app.get("/lists", async (req, res) => {
  try {
    const STMT = "SELECT * FROM Lists";
    const result = await pool.query(STMT);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving lists:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/lists", async (req, res) => {
  const { listName } = req.body;




  
  const userId = 35; // For now, setting userId to 1





  try {
    const insertSTMT = "INSERT INTO Lists (UserID, ListName) VALUES ($1, $2)";
    await pool.query(insertSTMT, [userId, listName]);
    res.status(201).send("List added successfully");
  } catch (err) {
    console.error("Error adding list:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/lists/:listId", async (req, res) => {
  const listId = req.params.listId;
  const { listName } = req.body;
  try {
    const updateSTMT = "UPDATE Lists SET ListName = $1 WHERE ListId = $2";
    await pool.query(updateSTMT, [listName, listId]);
    res.status(200).send("List name updated successfully");
  } catch (err) {
    console.error("Error updating list name:", err);
    res.status(500).send("Internal Server Error");
  }
});
