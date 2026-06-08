const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Notification {
    id: ID!
    type: String!
    data: String!
    read: Boolean!
    createdAt: String!
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