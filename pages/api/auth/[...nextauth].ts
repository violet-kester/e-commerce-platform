import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from 'stripe';
import { userInfo } from "os";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    // create a stripe customer when a user signs up
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15'
      });
      // create a stripe customer
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        // add stripe customer id to prisma user
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id }
        });
      }
    }
  }
});