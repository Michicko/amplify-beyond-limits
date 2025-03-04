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
      logo: a.string(),
      competition: a.string(),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Season: a
    .model({
      name: a.string().required(),
      leagues: a.string().array(),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Match: a
    .model({
      season: a.string(),
      home: a.customType({
        name: a.string(),
        logo: a.string(),
        id: a.string(),
        goals: a.string(),
        lineup: a.string().array(),
        substitutes: a.string().array(),
        stats: a.customType({
          passes: a.string(),
          corners: a.string(),
          shots: a.string(),
          yellows: a.string(),
          reds: a.string(),
          penalty: a.string(),
        }),
      }),

      away: a.customType({
        name: a.string(),
        logo: a.string(),
        id: a.string(),
        goals: a.string(),
        lineup: a.string().array(),
        substitutes: a.string().array(),
        stats: a.customType({
          passes: a.string(),
          corners: a.string(),
          shots: a.string(),
          yellows: a.string(),
          reds: a.string(),
          penalty: a.string(),
        }),
      }),

      date: a.string(),
      time: a.string(),
      league: a.customType({
        name: a.string(),
        logo: a.string(),
        id: a.string(),
      }),
      venue: a.string(),
      isPlayed: a.boolean(),
      preview: a.customType({
        context: a.string(),
        keyPlayer: a.string(),
        aboutKeyPlayer: a.string(),
      }),

      report: a.customType({
        context: a.string(),
        scorers: a.json().array(),
        manOfMatch: a.string(),
        aboutManOfMatch: a.string(),
      }),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Player: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      team_id: a.id(),
      team: a.belongsTo("Team", "team_id"),
      position: a.customType({
        label: a.string(),
        value: a.string(),
      }),
      playerNumber: a.integer(),
      dob: a.string(),
      dominantFoot: a.string(),
      height: a.string(),
      weight: a.string(),
      photo: a.string(),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

  Team: a
    .model({
      name: a.string().required(),
      logo: a.string(),
      players: a.hasMany("Player", "team_id"),
    })
    .authorization((allow) => [allow.owner(), allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
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
