const AWS = require("aws-sdk");

const updateTask = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { title, description } = JSON.parse(event.body);

    await dynamoDb
      .update({
        TableName: "TaskTable",
        Key: {
          id: event.pathParameters.id,
        },
        UpdateExpression: "set title = :title, description = :description",
        ExpressionAttributeValues: {
          ":title": title,
          ":description": description,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task updated successfully",
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
};

module.exports = {
  updateTask,
};
