"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //외래키를 미리 만들어둬서 원래 user의 id와 형식이 다름 새로 고쳐서 맞춰야함
    await queryInterface.changeColumn("Posts", "userId", {
      type: Sequelize.INTEGER, // Users 테이블의 id 컬럼과 동일하게 설정
      allowNull: false,
    });
    await queryInterface.changeColumn("Comments", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Comments", "postId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("Posts", {
      fields: ["userId"], // 외래 키 제약을 추가할 컬럼
      type: "foreign key",
      name: "post_userId_fkey", // 외래 키 제약 이름 (나중에 삭제할때 씀)
      references: {
        table: "Users", // 참조할 테이블
        field: "id", // 참조할 컬럼
      },
      onDelete: "CASCADE", // Users의 id가 삭제될 때 해당하는 Posts 레코드도 삭제
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["userId"],
      type: "foreign key",
      name: "comment_userId_fkey",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("Comments", {
      fields: ["postId"],
      type: "foreign key",
      name: "comment_postId_fkey",
      references: {
        table: "Posts",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Posts", "post_userId_fkey");
    await queryInterface.removeConstraint("Comments", "comment_userId_fkey");
    await queryInterface.removeConstraint("Comments", "comment_postId_fkey");
  },
};
