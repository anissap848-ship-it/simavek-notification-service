const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Notification {
    id: ID!
    type: String!
    message: String!
    data: String!
    read: Boolean!
    created_at: String!
  }

  type Query {
    notifications: [Notification!]!
    notification(id: ID!): Notification
  }

  type Mutation {
    markAsRead(id: ID!): Notification
  }
`;

module.exports = typeDefs;