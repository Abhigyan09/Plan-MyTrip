/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.11.3.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as cleanup from "../cleanup.js";
import type * as email from "../email.js";
import type * as expenses from "../expenses.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as invite from "../invite.js";
import type * as InviteEmail from "../InviteEmail.js";
import type * as payments from "../payments.js";
import type * as plan from "../plan.js";
import type * as retrier from "../retrier.js";
import type * as stripe from "../stripe.js";
import type * as token from "../token.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  cleanup: typeof cleanup;
  email: typeof email;
  expenses: typeof expenses;
  http: typeof http;
  images: typeof images;
  invite: typeof invite;
  InviteEmail: typeof InviteEmail;
  payments: typeof payments;
  plan: typeof plan;
  retrier: typeof retrier;
  stripe: typeof stripe;
  token: typeof token;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
