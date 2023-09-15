// used https://hackernoon.com/6-easy-steps-to-use-next-auth-in-nextjs-13-using-route-handler

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const options: any = {
  providers: [
    GoogleProvider({

      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export { handler as GET, handler as POST };