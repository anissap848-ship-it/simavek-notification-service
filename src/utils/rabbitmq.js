const amqp = require('amqplib');

let channel = null;
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    await channel.assertQueue('notification.low_stock', { durable: true });
    await channel.assertQueue('notification.transaction', { durable: true });
    await channel.assertQueue('notification.po_received', { durable: true });

    console.log('Queues asserted. Waiting for messages...');

    const { consumeLowStock } = require('../consumers/lowStockConsumer');
    const { consumeTransaction } = require('../consumers/transactionConsumer');
    const { consumePoReceived } = require('../consumers/poReceivedConsumer');

    consumeLowStock(channel);
    consumeTransaction(channel);
    consumePoReceived(channel);

  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectRabbitMQ, 5000);
  }
};

module.exports = { connectRabbitMQ };