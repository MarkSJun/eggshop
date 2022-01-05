// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAccess = require('../../../app/controller/admin/access');
import ExportAdminBase = require('../../../app/controller/admin/base');
import ExportAdminLogin = require('../../../app/controller/admin/login');
import ExportAdminMain = require('../../../app/controller/admin/main');
import ExportAdminManager = require('../../../app/controller/admin/manager');
import ExportAdminProduct = require('../../../app/controller/admin/product');
import ExportAdminProductCate = require('../../../app/controller/admin/productCate');
import ExportAdminRole = require('../../../app/controller/admin/role');
import ExportDefaultHome = require('../../../app/controller/default/home');

declare module 'egg' {
  interface IController {
    admin: {
      access: ExportAdminAccess;
      base: ExportAdminBase;
      login: ExportAdminLogin;
      main: ExportAdminMain;
      manager: ExportAdminManager;
      product: ExportAdminProduct;
      productCate: ExportAdminProductCate;
      role: ExportAdminRole;
    }
    default: {
      home: ExportDefaultHome;
    }
  }
}
