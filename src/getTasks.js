const AWS = require("aws-sdk");

const getTasks = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const tasks = await dynamoDb
      .scan({
        TableName: "TaskTable",
      })
      .promise();

    return {
      status: 200,
      body: {
        tasks: tasks.Items,
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
  getTasks,
};