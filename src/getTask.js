const AWS = require("aws-sdk");

const getTask = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const task = await dynamoDb
      .get({
        TableName: "TaskTable",
        Key: {
          id: event.pathParameters.id,
        },
      })
      .promise();

    return {
      status: 200,
      body: {
        task: task.Item,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};

module.exports = {
  getTask,
};