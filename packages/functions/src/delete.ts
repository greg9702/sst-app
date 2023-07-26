import { Table } from "sst/node/table";
import handler from "@sst-app/core/handler";
import dynamoDb from "@sst-app/core/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(
  async (event: APIGatewayProxyEvent): Promise<any> => {
    if (event.pathParameters === null) {
      throw new Error("Null event path params.");
    }

    let userId =
      event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

    const params = {
      TableName: Table.Notes.tableName,
      Key: {
        userId: userId,
        noteId: event.pathParameters.id, // The id of the note from the path
      },
    };

    await dynamoDb.delete(params);

    return { status: true };
  }
);
