import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  League: a
    .model({
      name: a.string().required(),
      imagePath: a.string(),
      competition: a.string(),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Match: a
    .model({
      result_info: a.string(),
      name: a.string(),
      starting_at: a.datetime(),
      //
      league_id: a.integer(),
      venue_id: a.integer(),
      details: a.string(),
    })

    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Team: a
    .model({
      name: a.string().required(),
      type: a.string(),
      image_path: a.string(),
      venue_id: a.string(),
      last_played_at: a.datetime(),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Player: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      number: a.integer().required(),
      goals: a.integer(),
      position: a.customType({
        label: a.string().required(),
        value: a.string().required(),
      }),
      appearance: a.integer(),
      image: a.string()
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
