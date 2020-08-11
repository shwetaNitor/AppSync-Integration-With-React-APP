import React from 'react';
import { updateTodo } from './graphql/mutations';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class EditTodo extends React.Component {

    state = {
        show: false,
        todoData: {
            text: this.props.text,
            checked: this.props.checked
        }
    }


    handleModal = () => {
        this.setState({ show: !this.state.show })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    handleSubmit = (e, updateTodo) => {
        e.preventDefault();
        updateTodo({
            variables: {
                input: {
                    text: this.state.todoData.text,
                    checked: this.state.todoData.checked,
                },
                id: this.props.id
            }

        }).then(res => this.handleModal())
    }

    handleText = (e) => {
        this.setState({ todoData: { ...this.state.todoData, text: e.target.value } })
    }

    handleChecked = (e) => {
        this.setState({ todoData: { ...this.state.todoData, checked: !this.state.todoData.checked } })
    }

    render() {
        return (
            <>
                {this.state.show &&
                    < div className="modal">
                        <button className="close" onClick={this.handleModal}>X</button>
                        <Mutation mutation={gql(updateTodo)}  >
                            {(updateTodo) => {
                                return (
                                    <form className="add-todo" onSubmit={(e) =>
                                        this.handleSubmit(e, updateTodo)}>
                                        <input type="text"
                                            required
                                            value={this.state.todoData.text}
                                            onChange={this.handleText}

                                        />
                                        <span className="checkbox"> 
                                            <input type="checkbox"
                                                defaultChecked={this.state.todoData.checked}
                                                onChange={this.handleChecked}
                                            />
                                            Is Checked? 
                                        </span>
                                        <button>Update Todo</button>
                                    </form>
                                )

                            }}

                        </Mutation>
                    </div>
                }
                <button onClick={this.handleModal}>Edit</button>
            </>
        )

    }
}




export default EditTodo;