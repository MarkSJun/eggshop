'use strict';
// Sequelize数据类型  http://bbs.itying.com/topic/60596c3b1bbeff13cc4cf0d6
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Role = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    rolename: STRING(255),
    description: STRING(255),
    status: INTEGER(1),
    addTime: INTEGER(11),
  },{
    timestamps: false, //自动增加创建时间 
    tableName: 'role' //设置表名称
  });

  return Role;
};