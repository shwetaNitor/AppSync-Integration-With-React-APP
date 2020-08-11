import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { deleteTodo } from './graphql/mutations';
import gql from 'graphql-tag';
import { listTodos } from './graphql/queries';



class DeleteTodo extends Component {


    handleDelete = (deleteTodo) => {
        deleteTodo({
            variables: {
                id: this.props.id
            },
            optimisticResponse: () => ({
                deleteTodo: {
                    // This type must match the return type of the query below (listTodos)
                    __typename: 'ModelPostConnection',
                    id: this.props.id,
                    text: this.props.text,
                    checked: this.props.checked,
                }
            }),
            update: (cache, { data: { deleteTodo } }) => {
                const query = gql(listTodos);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated todosList to the cache copy
                data.allTodos = [
                    ...data.allTodos.filter(item => item.id !== this.props.id)
                ];

                //Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        return (
            <Mutation mutation={gql(deleteTodo)}>
                {(deleteTodo, { loading, error }) => {
                    return <button onClick={() => this.handleDelete(deleteTodo)}>
                        Delete Todo</button>
                }}
            </Mutation>
        )
    }
}


export default DeleteTodo;