import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import { Svix } from "@clerk/backend";
import { SvixEvent } from "@clerk/backend";

export const ensureEnvironmentVariable = (name: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`missing environment variable ${name}`);
  }
  return value;
};

export default httpRouter({
  "/clerk-webhook": httpAction({
    method: "POST",
    async handler(ctx, request) {
      const WEBHOOK_SECRET = process.env.WEBHOOK_SIGNING_SECRET;
      if (!WEBHOOK_SECRET) {
        console.error("WEBHOOK_SIGNING_SECRET is not set");
        return new Response("Webhook secret not configured", { status: 500 });
      }

      const payload = await request.text();
      const headerPayload = request.headers;
      const svix_id = headerPayload.get("svix-id");
      const svix_timestamp = headerPayload.get("svix-timestamp");
      const svix_signature = headerPayload.get("svix-signature");

      if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Missing svix headers");
        return new Response("Missing svix headers", { status: 400 });
      }

      const svix = new Svix(WEBHOOK_SECRET);

      let evt: SvixEvent;

      try {
        evt = svix.verify(payload, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }) as SvixEvent;
      } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error verifying webhook", { status: 400 });
      }

      const eventType = evt.type;
      console.log("Received webhook event:", eventType);

      if (eventType === "user.created") {
        const { id, email_addresses, first_name, last_name } = evt.data;
        console.log("Creating new user:", { id, email: email_addresses[0]?.email_address, first_name, last_name });

        try {
          const result = await ctx.runMutation(internal.users.createUser, {
            userId: id,
            email: email_addresses[0]?.email_address || "",
            firstName: first_name || "",
            lastName: last_name || "",
          });
          console.log("User creation result:", result);
          return new Response("User created successfully", { status: 200 });
        } catch (error) {
          console.error("Error creating user:", error);
          return new Response("Error creating user", { status: 500 });
        }
      }

      if (eventType === "user.updated") {
        const { id, email_addresses, first_name, last_name } = evt.data;
        console.log("Updating user:", { id, email: email_addresses[0]?.email_address, first_name, last_name });

        try {
          const result = await ctx.runMutation(internal.users.createUser, {
            userId: id,
            email: email_addresses[0]?.email_address || "",
            firstName: first_name || "",
            lastName: last_name || "",
          });
          console.log("User update result:", result);
          return new Response("User updated successfully", { status: 200 });
        } catch (error) {
          console.error("Error updating user:", error);
          return new Response("Error updating user", { status: 500 });
        }
      }

      return new Response("Webhook received", { status: 200 });
    },
  }),
});

// http.route({
//   path: "/stripe",
//   method: "POST",
//   handler: httpAction(async (ctx, request) => {
//     // Getting the stripe-signature header
//     const signature: string = request.headers.get("stripe-signature") as string;
//     // Calling the action that will perform our fulfillment
//     const result = await ctx.runAction(internal.stripe.fulfill, {
//       signature,
//       payload: await request.text(),
//     });

//     if (result.success) {
//       // We make sure to confirm the successful processing
//       // so that Stripe can stop sending us the confirmation
//       // of this payment.
//       return new Response(null, {
//         status: 200,
//       });
//     } else {
//       // If something goes wrong Stripe will continue repeating
//       // the same webhook request until we confirm it.
//       return new Response("Webhook Error", {
//         status: 400,
//       });
//     }
//   }),
// });

http.route({
  path: "/razorpay",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature: string = request.headers.get(
      "X-Razorpay-Signature"
    ) as string;
    const body = await request.text();

    // Calling the action that will perform our fulfillment
    const result = await ctx.runAction(
      internal.razorpay.handleRazorPayWebhook,
      {
        signature,
        body: body,
      }
    );

    if (result.success) {
      // We make sure to confirm the successful processing
      // so that Razorpay can stop sending us the confirmation
      // of this payment.
      return new Response(null, {
        status: 200,
      });
    } else {
      // If something goes wrong Stripe will continue repeating
      // the same webhook request until we confirm it.
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});
