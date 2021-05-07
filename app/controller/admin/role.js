'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
    async index() {
        const {ctx} = this;
        await ctx.render("admin/role/index");
      }
      async edit() {
        const {ctx} = this;
        await ctx.render("admin/role/add");
      }
      async add() {
        const {ctx} = this;
        await ctx.render("admin/role/add");
      }
      async delete() {
        this.ctx.body = '删除角色';
      }
}

module.exports = RoleController;
