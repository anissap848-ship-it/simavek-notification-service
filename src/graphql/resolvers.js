const { db } = require('../utils/firebase');

const resolvers = {
  Query: {
    notifications: async () => {
      const snapshot = await db.collection('notifications').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        data: JSON.stringify(doc.data().data),
      }));
    },
    notification: async (_, { id }) => {
      const doc = await db.collection('notifications').doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data(), data: JSON.stringify(doc.data().data) };
    },
  },
  Mutation: {
    markAsRead: async (_, { id }) => {
      await db.collection('notifications').doc(id).update({ read: true });
      const doc = await db.collection('notifications').doc(id).get();
      return { id: doc.id, ...doc.data(), data: JSON.stringify(doc.data().data) };
    },
  },
};

module.exports = resolvers;