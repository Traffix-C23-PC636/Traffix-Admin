import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                const allowedEmails = [
                    "a127dsx1695@bangkit.academy",
                    "m361dsx2922@bangkit.academy",
                    "m284dsx1749@bangkit.academy",
                    "c072dsx3093@bangkit.academy",
                    "m151dsx1328@bangkit.academy",
                    "c350dsx2960@bangkit.academy"
                ];

                return allowedEmails.includes(profile.email) && profile.email_verified;
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return "/admin"
            return baseUrl
        },
    },
    pages: {
        signIn: '/',
        error: '/'
    }
};
export default NextAuth(authOptions);