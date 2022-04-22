const { admin } = require("../firebase.config");

function sendNotification(data, status) {
  console.log("i am calledd");
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  const payload = {
    notification: {
      title: "Order Status",
      body: `Hello Mr ${data.username} Your Order is ${status}`,
    },
  };

  admin
    .messaging()
    .sendToDevice(data.fcm, payload, options)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
}

module.exports = { sendNotification };
