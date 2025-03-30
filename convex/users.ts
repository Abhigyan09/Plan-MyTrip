import {
  internalMutation,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";

import { ConvexError, v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/** Get user by Clerk use id (AKA "subject" on auth)  */
export const getUser = internalQuery({
  args: { subject: v.string() },
  async handler(ctx, args) {
    return await userQuery(ctx, args.subject);
  },
});

/** Create a new Clerk user or update existing Clerk user data. */
export const createUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  async handler(ctx, { userId, email, firstName, lastName }) {
    console.log("Creating user with data:", { userId, email, firstName, lastName });
    
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (userRecord === null) {
      console.log("No existing user found, creating new user");
      const newUser = await ctx.db.insert("users", {
        userId,
        credits: 0,
        email,
        freeCredits: 2,
        firstName,
        lastName,
      });
      console.log("Created new user with credits:", { 
        userId, 
        freeCredits: 2,
        _id: newUser 
      });
      return newUser;
    } else {
      console.log("User already exists:", userRecord);
      return userRecord._id;
    }
  },
});

export const reduceUserCreditsByOne = mutation({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not Authorized to perform this action");
    }

    const userRecord = await userQuery(ctx, identity.subject);
    if (userRecord != null) {
      if (userRecord.freeCredits > 0) {
        await ctx.db.patch(userRecord._id, {
          freeCredits: userRecord.freeCredits - 1,
        });
      } else if (userRecord.credits > 0) {
        await ctx.db.patch(userRecord._id, { 
          credits: userRecord.credits - 1 
        });
      } else {
        throw new ConvexError("No credits available to create a plan");
      }
    } else {
      throw new ConvexError("User not found while reducing credit");
    }
  },
});

export const updateDisplayNameFromClerk = mutation({
  args: { firstName: v.string(), lastName: v.string(), userId: v.string() },
  async handler(ctx, { firstName, lastName, userId }) {
    if (!userId || !firstName)
      console.log(
        `Not able to update display name from clerk as either firstname of userid is empty`
      );
    const userRecord = await userQuery(ctx, userId);

    if (!userRecord)
      throw new ConvexError("No User found to update display name");
    console.log({ firstName, lastName });
    await ctx.db.patch(userRecord?._id, { firstName, lastName });
  },
});

export const updateDisplayName = mutation({
  args: { firstName: v.string(), lastName: v.string() },
  async handler(ctx, { firstName, lastName }) {
    if (!firstName) throw new ConvexError("First Name is mandatory!");

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not Authrized to update display name");
    }

    const userRecord = await userQuery(ctx, identity.subject);

    if (!userRecord)
      throw new ConvexError("No User found to update display name");
    console.log({ firstName, lastName });
    await ctx.db.patch(userRecord?._id, { firstName, lastName });
  },
});

export const updateUserCredits = async (
  ctx: MutationCtx,
  email: string,
  amount: number
) => {
  const creditsToUpdate = (amount / 100 / 80) * 5;
  const user_object = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .unique();

  if (user_object != null)
    await ctx.db.patch(user_object._id, {
      credits: (user_object?.credits ?? 0) + creditsToUpdate,
    });
};

// Helpers

export async function userQuery(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("userId", clerkUserId))
    .unique();
}

/** The current user, containing user preferences and Clerk user info. */
export const currentUser = query(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  return await userQuery(ctx, identity.subject);
});

async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  const user = await userQuery(ctx, identity.subject);
  if (user) {
    console.log("Current user data:", { 
      userId: user.userId, 
      credits: user.credits, 
      freeCredits: user.freeCredits 
    });
  }
  return user;
}
