'use strict';
// Sequelize数据类型  http://bbs.itying.com/topic/60596c3b1bbeff13cc4cf0d6
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Access = app.model.define('access', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    moduleName: STRING(255),       //模块名称
    type: INTEGER(1),              //节点类型 :  1、表示模块   2、表示菜单   3、操作
    actionName:  STRING(255),      //操作名称    
    url:STRING(255),               //跳转地址
    moduleId:INTEGER(1),           //module_id和id关联    moduleId= 0 表示模块    
    sort:INTEGER(11),              //排序
    description:STRING(255),       //描述
    status:INTEGER(1),             //状态
    addTime:INTEGER(11)            //增加时间
  },{
    timestamps: false, //自动增加创建时间 
    tableName: 'access' //设置表名称
  });
  Access.associate = function (){ // 1对多
 
    app.model.Access.hasMany(app.model.Access, {foreignKey: 'moduleId'});
  }
  
  return Access;
};