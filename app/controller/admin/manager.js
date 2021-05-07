'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    const {ctx} = this;
    await ctx.render("admin/manager/index");
  }
  async edit() {
    const {ctx} = this;
    await ctx.render("admin/manager/edit");
  }
  async add() {
    const {ctx} = this;
    await ctx.render("admin/manager/edit");
  }
  async delete() {
    this.ctx.body = '删除管理员';
  }
}

module.exports = ManagerController;
