const User = require("../../model/userModel");
const bcrypt = require("bcrypt");

// const getallUsers = () => {
//   sequelize
//     .sync()
//     .then(() => {
//       User.findAll()
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((error) => {
//           console.error("Failed to retrieve data : ", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Unable to create table : ", error);
//     });
// };

// const deleteUser = () => {
//   sequelize.sync().then(() => {
//     User.destroy({
//       where: {
//         id: 2,
//       },
//     })
//       .then(() => {
//         console.log("Successfully deleted record.");
//       })
//       .catch((error) => {
//         console.error("Failed to delete record : ", error);
//       });
//   });
// };

const userSignIn = async (req, res, data) => {
  User.findOne({
    where: {
      email: data.email,
    },
  }).then(async (user) => {
    if (!user) {
      // create new user
      // PASSWORD HASHING
      const hashedPassword = await bcrypt.hash(data.password, 10);

      User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
      })
        .then((result) => {
          console.log(result);
          res.send("User created successfully");
        })
        .catch((error) => {
          console.error("Failed to create user ", error);
          res.json("Failed to create user").status(400);
        });
    } else {
      // user already present
      res.json("Email already in use").status(400);
    }
  });
};

const userLogIn = async (req, res, data) => {
  User.findOne({
    where: {
      email: data.email,
    },
  }).then(async (user) => {
    if (user) {
      // user found
      const passwordMatch = await bcrypt.compare(
        data.password,
        user.dataValues.password
      );
      if (!passwordMatch) {
        return res.status(400).json({
          errors: "Invalid Credentials",
        });
      } else {
        res.send("Logged in successfully");
      }
    } else {
      // user not found
      res.json("User not found").status(400);
    }
  });
};

const findOneUser = (req, res, id) => {
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      // console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
      res.json("User not found").status(400);
    });
};

const updateUser = (req, res, data) => {
  User.update(
    {
      phone: data.phone,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      country: data.country,
      pincode: data.pincode,
      state: data.state,
    },
    {
      where: { id: data.id },
    }
  )
    .then((user) => {
      console.log(user);
      res.send("updated successfully");
    })
    .catch((error) => {
      console.error("Failed to update record : ", error);
      res.json("Failed to update").status(400);
    });
};

module.exports = { userSignIn, userLogIn, findOneUser, updateUser };
