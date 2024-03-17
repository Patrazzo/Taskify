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
    methods: ["POST", "GET"],
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

app.get("/logout", (req, res) => {
  // Clear the cookie by setting an expired date in the past
  res.clearCookie("token", { path: '/' });
  return res.json({ Status: "Success" });
});

app.get("/validate", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    userid: req.userid,
  });
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });

    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const values = [req.body.username, hash];
    pool.query(query, values, (err, result) => {
      if (err) return res.json({ Error: "Insert data error" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const query = "SELECT * FROM users WHERE username = $1";
  pool.query(query, [req.body.username], (err, result) => {
    if (err) return res.status(500).json({ Error: "Login error" });
    if (result.rows.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result.rows[0].password,
        (err, response) => {
          if (err) return res.status(500).json({ Error: "Password comparison error" });
          if (response) {
            const { username, userid } = result.rows[0];
            const token = jwt.sign({ username, userid }, "secret", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Success" });
          } else {
            return res.status(401).json({ Error: "Password doesn't match" });
          }
        }
      );
    } else {
      return res.status(404).json({ Error: "No such user" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
