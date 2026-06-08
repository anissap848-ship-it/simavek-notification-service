require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { connectRabbitMQ } = require('./utils/rabbitmq');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

const startServer = async () => {
  // Setup Apollo Server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  // Mount GraphQL endpoint
  app.use('/graphql', expressMiddleware(apolloServer));

  app.listen(PORT, async () => {
    console.log(`Notification Service running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    await connectRabbitMQ();
  });
};

startServer();

module.exports = app;