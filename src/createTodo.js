import React from "react";
import { Mutation } from "react-apollo";
import { createTodo } from "./graphql/mutations";
import gql from "graphql-tag";

class CreateTodo extends React.Component {
  state = { checked : false }
  
  handleSubmit = (e, createTodo) => {
    e.preventDefault();
    createTodo({
      variables: {
        input: {
          text: this.text.value,
          checked: this.state.checked,
        }
      }
    }).then(res => {
      this.text.value = "";
      this.setState({ checked :false });
    });
  };

  handleChecked = (e) => {
      this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <div>
        <h1>Create Todo</h1>

        <Mutation mutation={gql(createTodo)}>
          {(createTodo, { data, loading, error }) => {
            return (
              <div>
                <form
                  className="add-todo"
                  onSubmit={e => this.handleSubmit(e, createTodo)}
                >
                  <input
                    type="text" placeholder="Todo Text"
                    ref={node => (this.text = node)}
                    required
                  />
                  <span className="checkbox">
                    <input
                      type="checkbox" placeholder="is Checked?"
                      ref={node => (this.checked = node)}
                      defaultChecked={this.state.checked}
                      onChange={this.handleChecked}  
                    />
                    Is Checked?
                  </span>
                  <button>{loading ? "Yes Creating..." : "Create Todo"}
                  </button>
                </form>
                {error && <p>{error.message}</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateTodo;