'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;
  router.get('/', controller.default.home.index);

  router.get(`${config.adminPath}/manager`, controller.admin.manager.index);
  router.get(`${config.adminPath}/manager/add`, controller.admin.manager.add);
  router.get(`${config.adminPath}/manager/edit`, controller.admin.manager.edit);
  router.get(`${config.adminPath}/manager/delete`, controller.admin.manager.delete);

  router.get(`${config.adminPath}/role`, controller.admin.role.index);
  router.get(`${config.adminPath}/role/add`, controller.admin.role.add);
  router.get(`${config.adminPath}/role/edit`, controller.admin.role.edit);
  router.get(`${config.adminPath}/role/delete`, controller.admin.role.delete);

  router.get(`${config.adminPath}/access`, controller.admin.access.index);
  router.get(`${config.adminPath}/access/add`, controller.admin.access.add);
  router.get(`${config.adminPath}/access/edit`, controller.admin.access.edit);
  router.get(`${config.adminPath}/access/delete`, controller.admin.access.delete);

  router.get(`${config.adminPath}/login`, controller.admin.login.index);
  router.get(`${config.adminPath}/login/loginOut`, controller.admin.login.loginOut);
  router.get(`${config.adminPath}/login/captcha`, controller.admin.login.captcha);
  router.post(`${config.adminPath}/doLogin`, controller.admin.login.doLogin);
  router.get(`${config.adminPath}`, controller.admin.main.index);
  router.get(`${config.adminPath}/welcome`, controller.admin.main.welcome);
};
