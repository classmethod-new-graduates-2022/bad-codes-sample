import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";

export default NextAuth({
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_ID!,
      clientSecret: process.env.SLACK_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
