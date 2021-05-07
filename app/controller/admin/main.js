'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render("admin/main/index");
  }
  async welcome() {
    const { ctx } = this;
    await ctx.render("admin/main/welcome");
  }
}

module.exports = MainController;
