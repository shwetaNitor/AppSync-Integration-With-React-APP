import boto3
import os
import json
import logging
import uuid

dynamodb = boto3.resource('dynamodb')

# This is lambda handler function
def graphql(event, context):
  
  if event['field'] == 'addTodo':
    data = event['arguments']['input']
    return create(data)
  
  elif event['field'] == 'getTodo':
    todoId = event['arguments']['id']
    return get(todoId)
  
  elif event['field'] == 'allTodos':
    return listTodo()

  elif event['field'] == 'updateTodo':
    data = event['arguments']['input']
    todoId = event['arguments']['id']
    return update(todoId, data)

  elif event['field'] == 'deleteTodo':
    todoId = event['arguments']['id']
    return delete(todoId)
      
  return 'Unknown field, unable to resolve '+event['field'], null


# This is to get single Todo Object 
def get(todoId):
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # fetch todo from the database
    result = table.get_item(
        Key={
            'id': todoId
        }
    )
    logging.error(result)
    return result['Item']

# This function is use to get all todos
def listTodo():
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # fetch all todos from the database
    result = table.scan()

    return result['Items']

# This function is use to add new todo
def create(data):
    if 'text' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': str(uuid.uuid1()),
        'text': data['text'],
        'checked': data['checked']
    }
    # write the todo to the database
    table.put_item(Item=item)

    return item

#  This function is use to update todo
def update(todoId, data):
    if 'text' not in data or 'checked' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't update the todo item.")
        return

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # update the todo in the database
    result = table.update_item(
        Key={
            'id': todoId
        },
        ExpressionAttributeNames={
          '#todo_text': 'text',
        },
        ExpressionAttributeValues={
          ':text': data['text'],
          ':checked': data['checked']
        },
        UpdateExpression='SET #todo_text = :text, '
                         'checked = :checked',
        ReturnValues='ALL_NEW',
    )

    return result['Attributes']


# This function is use to delete todo
def delete(todoId):
  table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

  # delete the todo from the database
  table.delete_item(
      Key={
          'id': todoId
      }
  )

  return "Deleted"