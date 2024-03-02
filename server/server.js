// Import necessary modules
const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

// Create Express app
const app = express();
const port = 2608;

// Museriddleware
app.use(express.json());
app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username and password match a user in the database
    const userQuery = `
      SELECT userid FROM Users 
      WHERE username = $1 AND password = $2
    `;
    const { rows } = await pool.query(userQuery, [username, password]);

    // If user exists and password matches, send the user userid in response
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
    // Insert user into the database
    const insertUserQuery = `
      INSERT INTO Users (username, password, role)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertUserQuery, [username, password, "user"]);

    // Send success response
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new task
// Add new task
app.post("/tasks", async (req, res) => {
  const { listId, taskName, taskDescription } = req.body;
  
  const insertSTMT = `INSERT INTO Tasks (Listid, TaskName, Description, Status)
                      VALUES ($1, $2, $3, 'todo');`;
  try {
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
    const updateSTMT = `UPDATE Tasks SET Status = '${status}' WHERE Taskid = ${taskId}`;
    await pool.query(updateSTMT);
    res.status(200).send("Task status updated successfully");
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Retrieve lists
app.get("/lists", async (req, res) => {
  try {
    const STMT = `SELECT * FROM Lists`;
    const result = await pool.query(STMT);
    const listsArray = result.rows;
    res.status(200).json(listsArray);
  } catch (err) {
    console.error("Error retrieving lists:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/lists", async (req, res) => {
  const { listName } = req.body;
  const userId = 35; // For now, setting userId to 1

  try {
    const insertSTMT = `
      INSERT INTO Lists (UserID, ListName)
      VALUES ($1, $2)
    `;
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
    const updateSTMT =
      "UPDATE Lists SET ListName = $1 WHERE ListId = $2";
    await pool.query(updateSTMT, [listName, listId]);
    res.status(200).send("List name updated successfully");
  } catch (err) {
    console.error("Error updating list name:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Retrieve tasks
app.get("/tasks", async (req, res) => {
  try {
    const listId = req.query.listId; // Extract listId from query parameters
    const STMT = `SELECT * FROM Tasks WHERE listid = $1`; // Use parameterized query to avoid SQL injection
    const result = await pool.query(STMT, [listId]);
    const tasksArray = result.rows;
    res.status(200).json(tasksArray);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description } = req.body;

  try {
    const updateSTMT =
      "UPDATE Tasks SET TaskName = $1, Description = $2 WHERE Taskid = $3";
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
    // Delete the task from the database
    const deleteSTMT = "DELETE FROM Tasks WHERE Taskid = $1";
    await pool.query(deleteSTMT, [taskId]);

    res.status(200).send("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});
