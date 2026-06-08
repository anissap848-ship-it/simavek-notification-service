const { handleLowStock } = require('../handlers/notificationHandler');

const consumeLowStock = (channel) => {
  channel.consume('notification.low_stock', (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('[low_stock] Received:', data);
      handleLowStock(data);
      channel.ack(msg);
    }
  });
  console.log('Listening on queue: notification.low_stock');
};

module.exports = { consumeLowStock };