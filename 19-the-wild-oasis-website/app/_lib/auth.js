// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // Auth configuration
// const authConfig = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.AUTH_GOOGLE_ID,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET
//         })
//     ],
//     callbacks: {
//         authorized({ auth, request }) {
//             return !!auth?.user;
//         }
//     }
// };

// // Export the auth object and handlers
// export const {
//     auth,
//     handlers: { GET, POST }
// } = NextAuth(authConfig);

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Auth configuration
const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
};

// Export `auth` and `handlers` for API routes
export const {
    auth,
    handlers: { GET, POST }
} = NextAuth(authConfig);
