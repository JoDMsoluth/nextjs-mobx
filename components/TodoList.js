import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import Todo from "./Todo";

@inject("store")
@observer
class TodoList extends Component {
  state = {
    newTodoTitle: "",
  };

  handleInputChange = (e) => {
    this.setState({newTodoTitle: e.target.value});
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.store.addTodo(this.state.newTodoTitle);
    this.setState({newTodoTitle: ""});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input type='text' value={this.state.newTodoTitle} onChange={this.handleInputChange} />
          <button type='submit'>Add</button>
        </form>
        <hr />
        <ul>
          {this.props.store.todos.map((todo) => (
            <Todo todo={todo} key={todo.id} deleteTodo={this.props.store.deleteTodo} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;
