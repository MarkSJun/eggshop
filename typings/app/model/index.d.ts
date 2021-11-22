// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess = require('../../../app/model/access');
import ExportAdmin = require('../../../app/model/admin');
import ExportRole = require('../../../app/model/role');

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    Admin: ReturnType<typeof ExportAdmin>;
    Role: ReturnType<typeof ExportRole>;
  }
}
