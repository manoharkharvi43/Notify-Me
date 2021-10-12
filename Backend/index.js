const express = require("express");

var admin = require("firebase-admin");

const router = express.Router();

var serviceAccount = require("./notify-me-c543e-firebase-adminsdk-lfamv-9f59b8fa49.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();
const port = 4000;

app.use(express.json());

app.use("/", router);

router.post("/notifications", async (req, res) => {
  try {
    const { title, body, imageUrl, token, route } = req.body;
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
        imageUrl,
      },
      data: {
        type: "Notification",
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});
app.listen(4000, () => {
  "app started";
});
