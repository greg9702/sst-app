import Stripe from "stripe";
import handler from "@sst-app/core/handler";
import { calculateCost } from "@sst-app/core/cost";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = handler(
  async (event: APIGatewayProxyEvent): Promise<any> => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Empty API key.");
    }

    if (!event.body) {
      throw new Error("Empty body.");
    }

    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });

    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd",
    });

    return { status: true };
  }
);
