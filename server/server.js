const express = require("express");
const cors = require("cors");
const pool = require("./database.js");
const port = 2608;
const app = express();

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Сървърът е пуснат на порт: ${port}`);
});

// Add new list
app.post("/lists", async (req, res) => {
  const { listName } = req.body;
  const insertSTMT = `INSERT INTO Lists (UserID, ListName)
                      VALUES (1, '${listName}');`;

  try {
    await pool.query(insertSTMT);
    res.status(201).send("List added successfully");
  } catch (err) {
    console.error("Error adding list:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Add new task
app.post("/tasks", async (req, res) => {
  const { taskName, taskDescription } = req.body;
  const insertSTMT = `INSERT INTO Tasks (ListID, TaskName, Description, Status)
                      VALUES (1, '${taskName}', '${taskDescription}', 'todo');`;
  try {
    await pool.query(insertSTMT);
    res.status(201).send("Task added successfully");
  } catch (err) {
    console.error("Error adding task:", err);
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

// Retrieve tasks
app.get("/tasks", async (req, res) => {
  try {
    const STMT = `SELECT * FROM Tasks`;
    const result = await pool.query(STMT);
    const tasksArray = result.rows;
    res.status(200).json(tasksArray);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});