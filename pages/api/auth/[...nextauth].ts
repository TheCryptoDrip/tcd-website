import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default NextAuth({
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    }
  },
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    })
    // Providers.Credentials({
    //   name: 'Nami Wallet',
    //   id: 'nami-wallet',
    //   async authorize(credentials, req) {

    //     // Find user by address.
    //     const { address } = JSON.parse(credentials.data);


    //     const user = {
    //       id: 1,
    //       name: 'Calvin Koepke',
    //       email: 'hello@calvinkoepke.com',
    //     };

    //     return user;
    //   }
    // })
  ],
  adapter: PrismaAdapter(prisma)
})
