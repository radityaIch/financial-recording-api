import { Elysia } from "elysia";
import {
  addTransaction,
  deleteTransaction,
  getAllTransaction,
} from "./models/transaction";
import { TransactionCostPayload } from "./entities/TransactionCost";
import { getUser, signIn } from "./models/user";
import { UserPayload } from "./entities/User";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

const app = new Elysia();

app
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      exp: "7d",
    }),
  )
  .use(cookie())
  .group(
    "/user",
    (app) =>
      app
        .get("/:id", async ({ set, params }) => {
          const id = params.id;
          return getUser(id)
            .then((data) => {
              set.status = 200;
              return data;
            })
            .catch((error) => {
              set.status = 400;
              console.error(error);
            });
        })
        .post("/sign-in", async ({ body, set, jwt, cookie: { accessToken } }) => {
          const { email, password } = body as UserPayload;
          const userData = await signIn(email, password);
          if (!userData) {
            set.status = 401;
            return {
              error: "Invalid email or password",
            };
          }
          set.status = 200;
          jwt.sign({ _id: userData.id.toString(), name: userData.name });
          return;
        }),
    // .post('/sign-up')
    // .post('/profile')
  )
  .group("/transactions", (app) =>
    app
      .get("/", async ({ request, set }) => {
        const id = request.headers.get("user-id") ?? "";
        return getAllTransaction(id!)
          .then((data) => {
            set.status = 200;

            return { data };
          })
          .catch((error) => {
            set.status = 404;

            return { errorReason: error };
          });
      })
      .delete("/:id", async ({ set, params }) => {
        return deleteTransaction(params.id).then((result) => result);
      })
      .post("/income", async ({ body, set }) => {
        return addTransaction(
          body as unknown as TransactionCostPayload,
          "income",
        ).then((result) => result);
      })
      .post("/expense", async ({ body, set }) => {
        return addTransaction(
          body as unknown as TransactionCostPayload,
          "expense",
        ).then((result) => result);
      }),
  );

app.get("/", () => "f");

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
