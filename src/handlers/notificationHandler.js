const { db } = require('../utils/firebase');

const saveNotification = async (type, message, data) => {
  try {
    await db.collection('notifications').add({
      type,
      message,
      data,
      read: false,
      created_at: new Date().toISOString(),
    });
    console.log(`[${type}] Notification saved to Firestore`);
  } catch (err) {
    console.error('Failed to save notification:', err.message);
  }
};

const handleLowStock = (data) => {
  // data: { medicineId, medicineName, currentStock, threshold }
  const message = `Stok obat ${data.medicineName} menipis, sisa ${data.currentStock} unit`;
  console.log(`[ALERT] ${message}`);
  saveNotification('stock_low', message, data);
};

const handleTransaction = (data) => {
  // data: { transactionId, type, medicineName, quantity, timestamp }
  const message = `Transaksi ${data.type} berhasil: ${data.medicineName} x${data.quantity}`;
  console.log(`[INFO] ${message}`);
  saveNotification('transaction_completed', message, data);
};

const handleExpiryAlert = (data) => {
  // data: { medicineId, medicineName, expiryDate, daysRemaining }
  const message = `Obat ${data.medicineName} akan expired dalam ${data.daysRemaining} hari`;
  console.log(`[ALERT] ${message}`);
  saveNotification('po_received', message, data);
};

module.exports = { handleLowStock, handleTransaction, handleExpiryAlert };