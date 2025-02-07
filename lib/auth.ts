import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectionToDatabase } from './db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { error } from 'console';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password ");
                }

                try {
                    await connectionToDatabase();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordCorrect) {
                        throw new Error("Password incorrect");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }

                } catch (err: any) {
                    throw new Error(`An error occurred while logging in: ${err.message}`);
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user)
            {
                token.id = user.id.toString();
            }
            return token;
        },
        async session({session, token}){
            if(session.user)
               { session.user.id = token.id as string;}
            return session;
        }
    },
    pages:{
        signIn: "/login",
        error: "/login",

    },
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}