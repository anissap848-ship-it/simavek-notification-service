const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebase');

// GET /notifications - Ambil semua notifikasi
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('notifications')
      .orderBy('createdAt', 'desc')
      .get();
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /notifications/:id - Ambil notifikasi by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('notifications').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /notifications/:id/read - Tandai sudah dibaca
router.patch('/:id/read', async (req, res) => {
  try {
    await db.collection('notifications').doc(req.params.id).update({ read: true });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /notifications/:id - Hapus notifikasi
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('notifications').doc(req.params.id).delete();
    res.json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;