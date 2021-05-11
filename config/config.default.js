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

  // add your middleware config here
  config.middleware = ['adminAuth'];
  config.adminAuth = {
    match: '/admin',
  }

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
    password: "123456",
    database: 'eggshop',
  };
  return {
    ...config,
    ...userConfig,
  };
};
