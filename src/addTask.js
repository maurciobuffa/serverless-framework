const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
import jsonBodyParser from '@middy/http-json-body-parser'

const addTask = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { title, description } = event.body;
    const createdAt = new Date();
    const id = uuidv4();

    const newTask = {
      id,
      title,
      description,
      createdAt,
    };

    await dynamoDb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};

module.exports = {
  addTask: middy(addTask).use(jsonBodyParser()),
};
