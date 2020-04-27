const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const todoRoutes = express.Router();
let Todo = require("./models/todos.model");
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://root:Amit123@cluster1-kkuqk.mongodb.net/todosDB?authSource=admin&replicaSet=Cluster1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established ...");
});
// routes
todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
todoRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});
todoRoutes.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(201).json({ todo: "SUCCESS" });
    })
    .catch(err => {
      res.status(400).send("FAILED");
    });
});
todoRoutes.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(400).send(err);
    } else {
      todo.description = req.body.description;
      todo.priority = req.body.priority;
      todo.notes = req.body.notes;
      todo
        .save()
        .then(todo => {
          res.status(201).json({ todo: "SUCCESS" });
        })
        .catch(err => {
          res.status(400).send("FAILED");
        });
    }
  });
});
app.use("/todos", todoRoutes);
/**
 * Start the app on port 4000
 */
app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
