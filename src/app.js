require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { connectRabbitMQ } = require('./utils/rabbitmq');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

// REST API routes
app.use('/notifications', notificationRoutes);

const startServer = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));

  app.listen(PORT, async () => {
    console.log(`Notification Service running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`REST API: http://localhost:${PORT}/notifications`);
    await connectRabbitMQ();
  });
};

startServer();

module.exports = app;