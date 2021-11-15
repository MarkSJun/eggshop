'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base.js');
class LoginController extends BaseController {
  async index() {
    const { ctx } = this;
    await ctx.render(`${this.config.adminPath}/login.html`)
  }
  async doLogin() {
    const { ctx } = this;
    console.log('用户登录信息：', ctx.request.body);
    
    let username=this.ctx.request.body.username;
    let password=this.ctx.service.tools.md5(this.ctx.request.body.password);
    let verify=this.ctx.request.body.verify.toLowerCase();
    //1、获取表单穿过来的数据 判断验证码是否正确
    //2、判断用户名密码是否合法
    //3、执行登录
    if(verify==this.ctx.session.code){
      let userinfo=await this.ctx.model.Admin.findAll({
        where: {
          username: username,
          password:password
        }
      });
      console.log('登录成功用户的数据：', userinfo);
      if(userinfo.length>0){
        this.ctx.session.userinfo=userinfo[0];
        // this.ctx.redirect(`${this.config.adminPath}`)
        await this.success("登录成功", `${this.config.adminPath}`)
      }else{
        // console.log("用户名或者密码错误");
        // this.ctx.redirect("/admin/login");
        await this.error("用户名或者密码错误", `${this.config.adminPath}/login`);
      }

    }else{
      // console.log("验证码错误");
      // this.ctx.redirect("/admin/login");
      await this.error("验证码错误", `${this.config.adminPath}/login`);
    }
  }

  async loginOut() {
    const { ctx } = this;
    ctx.session.userinfo = null
    await this.success("退出成功", `${this.config.adminPath}/login`);
  }

  async captcha() {
    const { ctx } = this;
    let captcha = await this.service.tools.getCaptcha();
    console.log(captcha.text);
    ctx.session.code = captcha.text.toLowerCase();
    ctx.response.type = 'image/svg+xml'; /*指定返回的类型*/
    ctx.body = captcha.data; /*给页面返回一张图片*/
  }
}

module.exports = LoginController;
