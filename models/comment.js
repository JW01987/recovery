"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      //comment는 한 post에 속함
      //comment는 한 user에 속함
      this.belongsTo(Post, { foreignKey: "postId", as: "post" });
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  Comment.init(
    {
      userId: DataTypes.STRING,
      postId: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
