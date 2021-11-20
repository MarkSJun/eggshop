'use strict';

const BaseController = require('./base.js');

class ManagerController extends BaseController {
  async index() {
    const {ctx} = this;
    const res = await ctx.model.Admin.findAll();
    
    await ctx.render("admin/manager/index", {list: res});
  }
  async edit() {
    try {
      const {ctx} = this;
      let id = ctx.request.query.id;
      let res = await ctx.model.Admin.findAll({
        where: {
          id: id
        }
      })
      let itemData = res[0];
      await ctx.render(`${this.config.adminPath}/manager/edit`, {list:itemData});
    } catch(error) {
      await this.error("非法请求",`${this.config.adminPath}/manager`);
    }
  }
  async doEdit() {
    const {ctx} = this;
    let id = ctx.request.body.id;
    console.log('id:::::',id);
    let manager = await ctx.model.Admin.findByPk(id);

    if(!manager) {
      await this.error("非法请求",`${this.config.adminPath}/manager/edit?id=${id}`);
      return;
    } 
    await manager.update(this.ctx.request.body);
    await this.success("修改数据成功",`${this.config.adminPath}/manager`);
  
  }
  async add() {
    const {ctx} = this;
    // 获取所有角色信息
    const rolesInfo = await ctx.model.Role.findAll();

    await ctx.render("admin/manager/add", {rolesInfo: rolesInfo});
  }
  async doAdd() {
    const {ctx} = this;
    const username = ctx.request.body.username;
    let psd = ctx.request.body.password;
    
    const email = ctx.request.body.email;
    const phone = ctx.request.body.mobile;
    if(username == '') {
      await this.error("管理员名称不能为空", `${this.config.adminPath}/manager/add`);
      return;
    }
    if(psd == '') {
      await this.error("管理员密码不能为空", `${this.config.adminPath}/manager/add`);
      return;
    } else {
      psd = ctx.service.tools.md5(psd);
    }
    if(email == '') {
      await this.error("管理员邮箱不能为空", `${this.config.adminPath}/manager/add`);
      return;
    }
    if(phone == '') {
      await this.error("管理员电话不能为空", `${this.config.adminPath}/manager/add`);
      return;
    }
    await ctx.model.Admin.create(Object.assign(ctx.request.body, {
      password: psd,
      status: 1,
      isSuper: 1,
      addTime: ctx.service.tools.getUnixTime(),
      lastLogin: ctx.service.tools.getUnixTime()
    }))

    await this.success("新增角色成功", `${this.config.adminPath}/manager`)
    
  }
  async delete() {
    try {
      const {ctx} = this;
      let id = ctx.request.query.id;
      let manager = await ctx.model.Admin.findByPk(id);
      if (!manager) {
        await this.error("非法请求",`${this.config.adminPath}/manager`);
        return;
      }
      await manager.destroy();
      await this.success("删除数据成功",`${this.config.adminPath}/manager`);
    } catch(err) {
      await this.error("非法请求",`${this.config.adminPath}/manager`);
    }
  }
}

module.exports = ManagerController;
