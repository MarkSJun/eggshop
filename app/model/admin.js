'use strict';
// Sequelize数据类型  http://bbs.itying.com/topic/60596c3b1bbeff13cc4cf0d6
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Admin = app.model.define('admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(255),
    password: STRING(32),
    mobile:STRING(32),
    email: STRING(255),
    status: INTEGER(1),
    roleId: INTEGER(11),
    addTime: INTEGER(11),
    isSuper:INTEGER(1),
    lastLogin:INTEGER(11),
  },{
    timestamps: false, //自动增加创建时间 
    tableName: 'admin' //设置表名称
  });

  return Admin;
  // 测试仓库提交
};