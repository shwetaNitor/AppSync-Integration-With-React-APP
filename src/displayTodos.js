import React from 'react'
import { Query } from 'react-apollo'
import { listTodos } from './graphql/queries';
import { onCreateTodo } from './graphql/subscriptions'
import gql from 'graphql-tag';
import Todo from './todo'

class DisplayTodos extends React.Component {

    subsCribeNewTodos = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateTodo),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newTodoData = subscriptionData.data.addedTodo;
                return Object.assign({}, prev, {
                    ...prev.allTodos,
                    allTodos: [...prev.allTodos, newTodoData]
                })
               
            }
        })
    }


    render() {
        return (
            <div className="todos">
                <h1><u>Todos List </u></h1> 
                <Query query={gql(listTodos)}  >
                    {({ loading, data, error, subscribeToMore }) => {
                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>
                        return <Todo data={data} subscribeToMore={() =>
                            this.subsCribeNewTodos(subscribeToMore)} />
                    }}
                </Query>



            </div>
        )
    }
}

export default DisplayTodos;