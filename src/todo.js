import React from 'react';
import EditTodo from './editTodo'
import DeleteTodo from './deleteTodo'

class Todo extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }


    render() {
        const items = this.props.data.allTodos;

        return items.map((todo) => {
            return (
                <div key={todo.id}>
                    <h1>{todo.text}</h1>
                    
                    <p>Is Checked? <input type="checkbox" checked={todo.checked}  readOnly/></p>
                    <br/>
                    <EditTodo {...todo} />
                    <DeleteTodo {...todo} />
                </div>

            )
        })


    }

}


export default Todo;