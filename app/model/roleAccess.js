"use strict";
// Sequelize数据类型  http://bbs.itying.com/topic/60596c3b1bbeff13cc4cf0d6
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const RoleAccess = app.model.define(
    "RoleAccess",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      accessId: INTEGER(11),
      roleId: INTEGER(11),
    },
    {
      timestamps: false, //自动增加创建时间
      tableName: "role_access", //设置表名称
    }
  );

  return RoleAccess;
};
