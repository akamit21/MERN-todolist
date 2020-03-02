import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Menubar from "./components/Menubar";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import AddTodo from "./components/AddTodo";

class App extends Component {
  render() {
    return (
      <>
        <Menubar />
        <Switch>
          <Route path="/" exact={true} component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/add/" component={AddTodo} />
        </Switch>
      </>
    );
  }
}

export default App;
