// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query getTodo($id: String!) {
    getTodo(id: $id) {
        id
        text
        checked
    }
}
`;

export const listTodos = `query allTodos {
    allTodos {
        id
        text
        checked
    }
}
`;