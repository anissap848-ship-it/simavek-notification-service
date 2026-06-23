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
  const payload = data.data ?? data;
  const message = `Stok obat ${payload.medicineName} menipis, sisa ${payload.currentStock} unit (minimum: ${payload.minStock})`;
  console.log(`[ALERT] ${message}`);
  saveNotification("stock_low", message, payload);
};

const handleTransaction = (data) => {
  const payload = data.data ?? data;
  const message = `Transaksi ${payload.trxNumber} (${payload.transactionType}) senilai Rp${payload.totalAmount} berhasil diproses`;
  console.log(`[INFO] ${message}`);
  saveNotification('transaction_completed', message, payload);
};

const handlePoReceived = (data) => {
  const payload = data.data ?? data;
  const message = `Purchase Order ${payload.poNumber} telah diterima`;
  console.log(`[INFO] ${message}`);
  saveNotification('po_received', message, payload);
};

module.exports = { handleLowStock, handleTransaction, handlePoReceived };
