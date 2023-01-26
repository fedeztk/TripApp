import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import {ObjectId} from "mongodb";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID as string,
            clientSecret: process.env.TWITTER_SECRET as string,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_ID as string,
            clientSecret: process.env.AUTH0_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
        }),
    ],
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#f85f6a", // Hex color code
        logo: "/palm.svg", // Absolute URL to image
        buttonText: "#f85f6a" // Hex color code
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.MONGODB_DB as string}),
    callbacks: {
        async session({session, user}) {
            const getToken = await clientPromise.then(async (client) => {
                return client
                    .db(process.env.MONGODB_DB as string)
                    .collection("accounts")
                    .findOne({userId: new ObjectId(user.id)});
            });

            let accessToken: string | undefined = undefined;
            if (getToken) {
                accessToken = getToken.access_token!;
            }

            session.user.token = accessToken;
            session.user.id = user.id;
            return session;
        },
    }
}

export default NextAuth(authOptions)