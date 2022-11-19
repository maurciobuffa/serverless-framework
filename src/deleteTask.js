const AWS = require("aws-sdk");

const deleteTask = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    await dynamoDb
      .delete({
        TableName: "TaskTable",
        Key: {
          id: event.pathParameters.id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task deleted successfully",
      }),
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
}

module.exports = {
  deleteTask,
};