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
    
    let username=this.ctx.request.body.username;
    let password=this.ctx.service.tools.md5(this.ctx.request.body.password);
    let verify=this.ctx.request.body.verify;
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
      console.log(userinfo);
      if(userinfo.length>0){
        this.ctx.session.userinfo=userinfo[0];
        this.ctx.redirect("/admin")
      }else{
        console.log("用户名或者密码错误");
        this.ctx.redirect("/admin/login");
      }

    }else{
      console.log("验证码错误");
      this.ctx.redirect("/admin/login");
    }

   

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
