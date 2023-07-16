const sequelize = require("../../config/db");
const User = require("../../model/userModel");

const getallUsers = () => {
  sequelize
    .sync()
    .then(() => {
      User.findAll()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const setUser = () => {
  sequelize
    .sync()
    .then(() => {
      User.create({
        title: "Clean Code",
        author: "Robert Cecil Martin",
        release_date: "2021-12-14",
        subject: 3,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const getUsersByFilter = () => {
  sequelize.sync().then(() => {
    User.findOne({
      where: {
        id: "1",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  });
};

const updateUser = () => {
  sequelize
    .sync()
    .then(() => {
      User.update({
        title: "Clean Code",
        author: "Robert Cecil Martin",
        release_date: "2021-12-14",
        subject: 3,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error("Failed to update record : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const deleteUser = () => {
  sequelize.sync().then(() => {
    User.destroy({
      where: {
        id: 2,
      },
    })
      .then(() => {
        console.log("Successfully deleted record.");
      })
      .catch((error) => {
        console.error("Failed to delete record : ", error);
      });
  });
};
