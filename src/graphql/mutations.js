// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTodo = `mutation CreateTodo($input: TodoInput!) {
    addTodo(input: $input) {
      id
      text
      checked
    }
  }
  `;
  export const updateTodo = `mutation UpdateTodo($id : String!, $input: TodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      checked
    }
  }
  `;
  export const deleteTodo = `mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) 
  }
  `;