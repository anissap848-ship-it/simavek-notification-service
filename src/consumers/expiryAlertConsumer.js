const { handleExpiryAlert } = require('../handlers/notificationHandler');

const consumeExpiryAlert = (channel) => {
  channel.consume('notification.expiry_alert', (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log('[expiry_alert] Received:', data);
      handleExpiryAlert(data);
      channel.ack(msg);
    }
  });
  console.log('Listening on queue: notification.expiry_alert');
};

module.exports = { consumeExpiryAlert };