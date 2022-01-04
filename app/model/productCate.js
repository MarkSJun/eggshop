'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const ProductCate = app.model.define('ProductCate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },      
    title: STRING(255),
    status: INTEGER(1),
    description: STRING(255),
    sort: INTEGER(11),
    addTime: INTEGER(11),
  },{
    timestamps: false, //自动增加创建时间 
    tableName: 'product_cate' //设置表名称
  });  
  return ProductCate;
};