import { Table } from "sst/node/table";
import handler from "@sst-app/core/handler";
import dynamoDb from "@sst-app/core/dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(
  async (event: APIGatewayProxyEvent): Promise<any> => {
    if (event.pathParameters === null) {
      throw new Error("Null event path params.");
    }

    const params = {
      TableName: Table.Notes.tableName,
      // 'Key' defines the partition key and sort key of the item to be removed
      Key: {
        userId: "123", // The id of the author
        noteId: event.pathParameters.id, // The id of the note from the path
      },
    };

    await dynamoDb.delete(params);

    return { status: true };
  }
);
