const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  // check password is true using compareSync
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

  // set the password
  setPassword(password) {
    this.password = bcrypt.hashSync(password, 10);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Use Sequelize hooks and bcrypt to hash passwords when creating or updating a user.
    hooks: {
      beforeCreate: async (user) => {
        user.setPassword(user.password);
      },
      beforeUpdate: async (user) => {
        user.setPassword(user.password);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
