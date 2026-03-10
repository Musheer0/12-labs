/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as generations_query from "../generations/query.js";
import type * as lib_s3 from "../lib/s3.js";
import type * as voices_actions from "../voices/actions.js";
import type * as voices_internal_mutations from "../voices/internal_mutations.js";
import type * as voices_mutations from "../voices/mutations.js";
import type * as voices_queries from "../voices/queries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "generations/query": typeof generations_query;
  "lib/s3": typeof lib_s3;
  "voices/actions": typeof voices_actions;
  "voices/internal_mutations": typeof voices_internal_mutations;
  "voices/mutations": typeof voices_mutations;
  "voices/queries": typeof voices_queries;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
