'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render("admin/login.html")
  }
  async doLogin() {
    const { ctx } = this;
    console.log(ctx.request.body);

    ctx.session.userinfo = {
      username: 'xiaomage',
      age: 18
    };
    ctx.redirect('/admin');

  }
  async captcha() {
    const { ctx } = this;
    let captcha = await this.service.tools.getCaptcha();
    console.log(captcha.text);
    ctx.session.code = captcha.text;
    ctx.response.type = 'image/svg+xml'; /*指定返回的类型*/
    ctx.body = captcha.data; /*给页面返回一张图片*/
  }
}

module.exports = LoginController;
