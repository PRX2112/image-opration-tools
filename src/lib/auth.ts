import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { authConfig } from './auth.config';
import { db } from '@/db/db';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    ...authConfig,
    secret: process.env.AUTH_SECRET,
});
