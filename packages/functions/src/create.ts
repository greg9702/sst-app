import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@sst-app/core/handler";
import dynamoDb from "@sst-app/core/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(
  async (event: APIGatewayProxyEvent): Promise<any> => {
    if (event.body === null) {
      throw new Error("Null body.");
    }

    let userId =
      event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

    const data = JSON.parse(event.body);
    const params = {
      TableName: Table.Notes.tableName,
      Item: {
        userId: userId,
        noteId: uuid.v1(),
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now(),
      },
    };

    await dynamoDb.put(params);

    return params.Item;
  }
);
