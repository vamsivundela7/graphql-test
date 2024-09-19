export const typeDefs = `#graphql
    # Queries
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    # Mutations
    type Mutation {
        # Existing Mutations
        login(email: String!, password: String!): AuthPayload
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        updateGame(id: ID!, edits: EditGameInput!): Game

        # New Mutations for Encoding/Decoding
        encodeData(input: String!): EncodedData
        decodeData(input: String!): DecodedData

        # New Mutation for Processing Encrypted Data
        processEncryptedData(input: String!): EncodedResponse
    }

    # Auth Payload
    type AuthPayload {
        token: String!
        user: Author
    }

    # Game Type
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    # Review Type
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    # Author Type
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!] 
    }

    # Input Types
    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input EditGameInput {
        title: String
        platform: [String!]
    }

    # New Types for Encoding/Decoding
    type EncodedData {
        encoded: String!
    }

    type DecodedData {
        decoded: String!
    }

    # New Type for Encrypted Response
    type EncodedResponse {
        encoded: String!
    }
`;