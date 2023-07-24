import { Table } from "sst/node/table";
import handler from "@sst-app/core/handler";
import dynamoDb from "@sst-app/core/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(
  async (event: APIGatewayProxyEvent): Promise<any> => {
    let userId =
      event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
    if (!userId) {
      throw new Error("Empty userId.");
    }
    const params = {
      TableName: Table.Notes.tableName,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const result = await dynamoDb.query(params);

    return result.Items;
  }
);
