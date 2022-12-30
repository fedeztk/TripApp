import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

let GITHUB_ID= "1da26631efce3a5a0d78"
let GITHUB_SECRET="b3d7d060c7b8e05d31c516f9ec1de97f67f7c6c0"


export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        /* EmailProvider({
             server: process.env.EMAIL_SERVER,
             from: process.env.EMAIL_FROM,
           }),
        // Temporarily removing the Apple provider from the demo site as the
        // callback URL for it needs updating due to Vercel changing domains
        Providers.Apple({
          clientId: process.env.APPLE_ID,
          clientSecret: {
            appleId: process.env.APPLE_ID,
            teamId: process.env.APPLE_TEAM_ID,
            privateKey: process.env.APPLE_PRIVATE_KEY,
            keyId: process.env.APPLE_KEY_ID,
          },
        }),
        */
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
    // callbacks: {
    //     async jwt({ token }) {
    //         token.userRole = "admin"
    //         return token
    //     },
    // },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#f85f6a", // Hex color code
        logo: "/palm.svg", // Absolute URL to image
        buttonText: "#f85f6a" // Hex color code
    }
}

export default NextAuth(authOptions)