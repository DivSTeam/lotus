import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Do something with the user object
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
