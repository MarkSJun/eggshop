'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;
  router.get('/', controller.default.home.index);

  router.get(`${config.adminPath}`, controller.admin.main.index);

  router.get(`${config.adminPath}/welcome`, controller.admin.main.welcome);

  router.get(`${config.adminPath}/login`, controller.admin.login.index);
  router.get(`${config.adminPath}/login/loginOut`, controller.admin.login.loginOut);
  router.get(`${config.adminPath}/login/captcha`, controller.admin.login.captcha);
  router.post(`${config.adminPath}/doLogin`, controller.admin.login.doLogin);

  router.get(`${config.adminPath}/manager`, controller.admin.manager.index);
  router.get(`${config.adminPath}/manager/add`, controller.admin.manager.add);
  router.post(`${config.adminPath}/manager/doAdd`, controller.admin.manager.doAdd);
  router.get(`${config.adminPath}/manager/edit`, controller.admin.manager.edit);
  router.post(`${config.adminPath}/manager/doEdit`, controller.admin.manager.doEdit);
  router.get(`${config.adminPath}/manager/delete`, controller.admin.manager.delete);

  router.get(`${config.adminPath}/role`, controller.admin.role.index);
  router.get(`${config.adminPath}/role/add`, controller.admin.role.add);
  router.get(`${config.adminPath}/role/edit`, controller.admin.role.edit);
  router.post(`${config.adminPath}/role/doEdit`, controller.admin.role.doEdit);
  router.get(`${config.adminPath}/role/delete`, controller.admin.role.delete);
  router.post(`${config.adminPath}/role/doAdd`, controller.admin.role.doAdd);
  router.get(`${config.adminPath}/role/auth`, controller.admin.role.auth);
  router.post(`${config.adminPath}/role/doAuth`, controller.admin.role.doAuth);

  router.get(`${config.adminPath}/access`, controller.admin.access.index);
  router.get(`${config.adminPath}/access/add`, controller.admin.access.add);
  router.post(`${config.adminPath}/access/doAdd`, controller.admin.access.doAdd);
  router.get(`${config.adminPath}/access/edit`, controller.admin.access.edit);
  router.post(`${config.adminPath}/access/doEdit`, controller.admin.access.doEdit);
  router.get(`${config.adminPath}/access/delete`, controller.admin.access.delete);

  router.get(`${config.adminPath}/productCate`, controller.admin.productCate.index);
  router.get(`${config.adminPath}/productCate/add`, controller.admin.productCate.add);
  router.get(`${config.adminPath}/productCate/edit`, controller.admin.productCate.edit);
  router.get(`${config.adminPath}/productCate/delete`, controller.admin.productCate.delete);
  router.post(`${config.adminPath}/productCate/doAdd`, controller.admin.productCate.doAdd);
  router.post(`${config.adminPath}/productCate/doEdit`, controller.admin.productCate.doEdit);
  
 
};
