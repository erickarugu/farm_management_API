const db = require("../config/database");
const { upload } = require("../middlewares/uploadActivityImage");
const Activity = db.activities;
const uploadFunction = upload.single("image_url");

module.exports = {
  // Post a User
  createActivity: (req, res, next) => {
    //handle image upload then save to database
    uploadFunction(req, res, function (err) {
      if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }
      // Save to MySQL database
      const activityData = req.body;
      if (activityData.name === undefined || activityData.user_assigned === undefined || activityData.manager_id === undefined || req.file === undefined) return res.status(400).send({ success: false, message: "Please send all the required fields" });
      const image_url = `images/activities/${req.file.filename}`;
      Activity.create({
        name: activityData.name,
        user_assigned: activityData.user_assigned,
        manager_id: activityData.manager_id,
        image_url,
        created_at: Date.now(),
      })
        .then((user) => {
          return res.status(200).send({ success: true, user });
        })
        .catch((err) => {
          return res.status(400).send({ success: false, message: "Could not create the user", error: err.errors[0].message });
        });
    });
  },
};
