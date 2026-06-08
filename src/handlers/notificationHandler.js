const { db } = require('../utils/firebase');

const saveNotification = async (type, data) => {
  try {
    await db.collection('notifications').add({
      type,
      data,
      createdAt: new Date().toISOString(),
      read: false,
    });
    console.log(`[${type}] Notification saved to Firestore`);
  } catch (err) {
    console.error('Failed to save notification:', err.message);
  }
};

const handleLowStock = (data) => {
  // data: { medicineId, medicineName, currentStock, threshold }
  console.log(`[ALERT] Low stock: ${data.medicineName} - only ${data.currentStock} left`);
  saveNotification('low_stock', data);
};

const handleTransaction = (data) => {
  // data: { transactionId, type, medicineName, quantity, timestamp }
  console.log(`[INFO] Transaction: ${data.type} - ${data.medicineName} x${data.quantity}`);
  saveNotification('transaction', data);
};

const handleExpiryAlert = (data) => {
  // data: { medicineId, medicineName, expiryDate, daysRemaining }
  console.log(`[ALERT] Expiry: ${data.medicineName} expires in ${data.daysRemaining} days`);
  saveNotification('expiry_alert', data);
};

module.exports = { handleLowStock, handleTransaction, handleExpiryAlert };