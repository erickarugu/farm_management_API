const db = require("../config/database");
const { upload } = require("../middlewares/uploadAvatar");
const User = db.users;
const uploadFunction = upload.single("avatar");

module.exports = {
  // Post a User
  createUser: (req, res, next) => {
    //handle image upload then save to database
    uploadFunction(req, res, function (err) {
      if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }
      // Save to MySQL database
      const userData = req.body;
      if (userData.name === undefined || userData.email === undefined || userData.phone === undefined || req.file === undefined) return res.status(400).send({ success: false, message: "Please send all the required fields" });
      const avatar_name = `images/avatars/${req.file.filename}`;
      User.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: avatar_name,
        created_at: Date.now(),
      })
        .then((user) => {
          return res.status(200).send({ success: true, user });
        })
        .catch((err) => {
          return res.status(400).send({ success: false, message: "Could not create the user", error: err });
        });
    });
  },

  // FETCH all Users => useful for admins
  findAllUsers: (req, res) => {
    User.findAll().then((users) => {
      // Send all users to Client
      return res.status(200).send({ success: true, users });
    }).catch((error) => {
      return res.status(500).send({ success: false, messae: "Could not fetch users" });
    });
  },

  // Find a User by Id
  findUserByEmail: (req, res) => {
    const { email } = req.body;
    if (email !== '') {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (user) return res.status(200).send({ success: true, user });
          return res.status(500).send({ success: false, message: "Could not fetch the user" });
        })
        .catch((error) => {
          return res.status(500).send({ success: false, message: "Could not fetch the user" });
        });
    } else {
      return res.status(400).send({ success: false, message: "Please enter an email" });
    }
  },

  // Find a User by Id
  findUser: (req, res) => {
    let user_id = req.params.id;
    User.findOne({ where: { id: user_id } })
      .then((user) => {
        return res.status(200).send({ success: true, user });
      })
      .catch((error) => {
        return res.status(500).send({ success: false, messae: "Could not fetch the user" });
      });
  },

  // Update a User
  updateUser: (req, res, next) => {
    let user_id = req.params.id;
    //handle file upload then save to database
    uploadFunction(req, res, function (err) {
      if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }
      let updateData;
      if (req.file) {
        const file_name = `avatars/${req.file.filename}`;
        updateData = {
          ...req.body,
          avatar: file_name,
          updated_at: Date.now(),
        };
      } else {
        updateData = {
          ...req.body,
          updated_at: Date.now(),
        };
      }
      User.update(updateData, { where: { id: user_id } })
        .then(() => {
          res.status(200).send({ success: true, message: `User ${user_id} was updated successfully` });
        })
        .catch((err) => {
          res.status(500).send({ success: false, message: "Could not update the user details", error: err });
        });
    });
  },

  // Delete a User by Id
  deleteUser: (req, res) => {
    let user_id = req.params.id;
    User.destroy({ where: { id: user_id } })
      .then(() => {
        res.status(200).send({ success: true, message: "User deleted successfully a user with id = " + user_id });
      })
      .catch((err) => {
        res.status(500).send({ success: false, message: "Could not delete the user" });
      });
  },
};
