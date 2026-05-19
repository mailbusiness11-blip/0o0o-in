import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},

        password: {},
      },

      async authorize(credentials) {
        if (
          credentials?.email ===
            "admin@0o0o.in" &&
          credentials?.password ===
            "admin123"
        ) {
          return {
            id: "1",

            name: "Admin",

            email:
              "admin@0o0o.in",
          };
        }

        return null;
      },
    }),
  ],

  secret: "MY_SECRET_KEY",
});

export { handler as GET, handler as POST };