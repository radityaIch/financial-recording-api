import { db } from "~/lib/drizzle-orm";
import { comparePassword } from "~/lib/hash-password";

export async function signIn(email: string, password: string) {
  return await db.query.users
    .findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
    .then((user) => {
      if (user) {
        if (comparePassword(password, user.password) == true) {
          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
}

export async function getUser(id: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
}
