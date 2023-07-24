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
    if (!userId) {
      throw new Error("Empty userId.");
    }

    const data = JSON.parse(event.body as string);
    const params = {
      TableName: Table.Notes.tableName,
      Key: {
        userId: userId,
        noteId: event.pathParameters.id, // The id of the note from the path
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": data.attachment || null,
        ":content": data.content || null,
      },
      ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
  }
);
