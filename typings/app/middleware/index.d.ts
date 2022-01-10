// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAuth = require('../../../app/middleware/adminAuth');

declare module 'egg' {
  interface IMiddleware {
    adminAuth: typeof ExportAdminAuth;
  }
}
