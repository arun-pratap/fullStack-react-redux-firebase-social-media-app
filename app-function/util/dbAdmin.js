// ====================== Initialize FirebaseAdmin ====================== //
const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
//theseCredentials are given by the firebase
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ".................",
    storageBucket: ".............."
})
const db = admin.firestore()
// ======================================================================= //
module.exports = { admin, db }