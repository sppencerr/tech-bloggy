const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "comment",
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Comment;
