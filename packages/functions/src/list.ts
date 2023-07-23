import { Table } from "sst/node/table";
import handler from "@sst-app/core/handler";
import dynamoDb from "@sst-app/core/dynamodb";

export const main = handler(async (): Promise<any> => {
  const params = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});