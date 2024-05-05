import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/*
CS5356 TODO 1b. Authentication

Add sign in to your app by setting up NextAuth.

Define a CredentialsProvider with a username, and authorize the user
when they sign in by creating a user token that sets the user name
to be the provided username.

Note - For our prototype authentication system, we only need the username
and no password is required from the user.

See here for an example - https://next-auth.js.org/providers/credentials#example---username--password
*/

const options = {
  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" }
      },
      async authorize(credentials) {
        
        if (credentials.username) {
          
          return { name: credentials.username };
        }
        l
        return null;
      }
    })
  ],
  session: {
    
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
     
      if (token) {
        session.user.name = token.name;
      }
      return session;
    }
  }
};

export default (req, res) => NextAuth(req, res, options);
