const { handlePoReceived } = require("../handlers/notificationHandler");

const consumePoReceived = (channel) => {
  channel.consume("notification.po_received", (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      console.log("[po_received] Received:", data);
      handlePoReceived(data);
      channel.ack(msg);
    }
  });
  console.log("Listening on queue: notification.po_received");
};

module.exports = { consumePoReceived };
