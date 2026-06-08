require('dotenv').config();
const express = require('express');
const { connectRabbitMQ } = require('./utils/rabbitmq');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

app.listen(PORT, async () => {
  console.log(`Notification Service running on port ${PORT}`);
  await connectRabbitMQ();
});

module.exports = app;