import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.js";
import jwt from 'jsonwebtoken';

//types
import { typeDefs } from "./schema.js";

const SECRET_KEY = 'your_secret_key';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    async login(_, args) {
        console.log(args.password)
        if (!db || !db.authors) {
            throw new Error('Database not initialized');
          }
      // Find user by email
      const user = db.authors.find((author) => author.email === args.email);
          console.log(user)
      if (!user) {
        throw new Error("User not found");
      }

      // Compare passwords
      const isValidPassword = args.password === user.password;
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      // Create a token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" } // token expires in 1 hour
      );

      // Return token and user info
      return {
        token,
        user,
      };
    },
    encodeData(_, { input }) {
      // Example encoding: Base64
      const encoded = Buffer.from(input).toString("base64");
      return { encoded };
    },
    decodeData(_, { input }) {
      // Example decoding: Base64
      const decoded = Buffer.from(input, "base64").toString("utf8");
      return { decoded };
    },

    processEncryptedData(_, { input }) {
      try {
        // Step 1: Decrypt the input (Base64 decode)
        const decrypted = Buffer.from(input, "base64").toString("utf8");
        console.log(decrypted)
      
        // Extract data and timestamp
        // const { data } = parsedData;

        // (Optional) Validate timestamp (e.g., check if it's recent)


        // Step 3: Process the data
        // For demonstration, let's assume we just echo back the data with a new timestamp
        const responseData = {
          receivedData: decrypted,
          processedAt: new Date().toString(),
        };
        console.log(responseData)
        // Step 4: Create response object with timestamp
        const responseObject = {
          data: responseData,
          timestamp: Date.now(),
        };
        console.log(responseObject)

        // Step 5: Convert response object to JSON string
        const responseJson = JSON.stringify(responseObject);

        // Step 6: Encrypt the response (Base64 encode)
        const encryptedResponse = Buffer.from(responseJson).toString("base64");

        // Step 7: Return the encrypted response
        return { encoded: encryptedResponse };
      } catch (error) {
        console.error("Error processing encrypted data:", error);
        throw new Error("Invalid encrypted input.");
      }
    },
  },
};

// Server Setup
const server = new ApolloServer({
  // typeDefs -- definitions of types of data
  typeDefs,
  // resolvers
  resolvers,
  // Context
  context: ({ req }) => {
    // Get token from the headers
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, SECRET_KEY);
      } catch (e) {
        console.error('Token validation error', e);
      }
    }

    // Add the user to the context
    return { user, db };
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});

console.log("Server ready at port", 4000);
