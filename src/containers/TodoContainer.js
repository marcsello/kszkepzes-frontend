import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import Todo from '../components/Todo';
import { addTodo } from '../actions';

class TodoContainer extends Component {
  render() {
    const { todos, onTodoClick } = this.props;

    return (
      <div>
        {
          todos.map(todo => (
            <Todo onClick={onTodoClick} key={Math.random()}>
              {todo.data}
            </Todo>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { todos } = state.todos;

  return {
    todos,
  };
};

const mapDispatchToProps = dispatch => ({
  onTodoClick: (data) => {
    dispatch(addTodo(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
