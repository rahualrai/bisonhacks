// importData.js
const admin = require('firebase-admin');
const serviceAccount = require('../../bisonhack-9f9a6-firebase-adminsdk-fbsvc-f36ca725d1.json'); // Path to your service account key
const data = require('./new_scholarships.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
