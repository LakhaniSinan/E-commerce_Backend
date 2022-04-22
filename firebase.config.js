const admin = require("firebase-admin");

let serviceAccount = require("./amber-store-c97df-firebase-adminsdk-80qpy-1102a91812.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
