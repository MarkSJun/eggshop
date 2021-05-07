'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {ctx} = this;
    await ctx.render("admin/login.html")
  }
}

module.exports = LoginController;
