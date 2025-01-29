"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      //post는 한 user에게 속함
      //post는 여러개의 comment를 가짐
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Comment, { foreignKey: "postId", as: "comments" });
    }
  }
  Post.init(
    {
      userId: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
