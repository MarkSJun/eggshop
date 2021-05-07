// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAccess = require('../../../app/controller/admin/access');
import ExportAdminLogin = require('../../../app/controller/admin/login');
import ExportAdminMain = require('../../../app/controller/admin/main');
import ExportAdminManager = require('../../../app/controller/admin/manager');
import ExportAdminRole = require('../../../app/controller/admin/role');
import ExportDefaultHome = require('../../../app/controller/default/home');

declare module 'egg' {
  interface IController {
    admin: {
      access: ExportAdminAccess;
      login: ExportAdminLogin;
      main: ExportAdminMain;
      manager: ExportAdminManager;
      role: ExportAdminRole;
    }
    default: {
      home: ExportDefaultHome;
    }
  }
}
