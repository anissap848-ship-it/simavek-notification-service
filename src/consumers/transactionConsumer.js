const { handleTransaction } = require('../handlers/notificationHandler');

const consumeTransaction = (channel) => {
  channel.consume('notification.transaction', (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('[transaction] Received:', data);
      handleTransaction(data);
      channel.ack(msg);
    }
  });
  console.log('Listening on queue: notification.transaction');
};

module.exports = { consumeTransaction };