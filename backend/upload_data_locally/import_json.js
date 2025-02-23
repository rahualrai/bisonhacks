// importData.js
const admin = require('firebase-admin');
const data = require('./new_scholarships.json');

admin.initializeApp(
);

const db = admin.firestore();

data.forEach(async (doc) => {
  try {
    // This will create a document with an auto-generated ID.
    const res = await db.collection('scholarships').add(doc);
    console.log('Added document with ID:', res.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
});
