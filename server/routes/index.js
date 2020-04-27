/home/akamit21/github-projects/MERN-todolist/server/app.js

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
