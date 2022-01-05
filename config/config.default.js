/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    env: 'prod',
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  };

  exports.session = {
    key: 'EGG_SESS_xiaomadagege',
    maxAge: 30 * 60 * 1000, // 30分钟
    httpOnly: true,
    encrypt: true,
    renew: true  // 延长会话有效期
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576384476895_3620';
  // 配置后台地址
  config.adminPath = '/admin'
  
  //配置文件上传的模式
  config.multipart = {
  mode: 'file',
  };

  // add your middleware config here
  config.middleware = ['adminAuth'];
  config.adminAuth = {
    match: config.adminPath,
    adminPath: config.adminPath
  }
 //配置排除的地址
 config.ignoreUrl = [`${config.adminPath}`, `${config.adminPath}/welcome`, `${config.adminPath}/login/loginOut`];
  // add your user config here
  const userConfig = {
    view: {
      mapping: {
        '.html': 'ejs',
      },
    }
  };

  //配置数据库    
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: "root",
    password: "root",
    database: 'eggshop',
  };
  return {
    ...config,
    ...userConfig,
  };
};
