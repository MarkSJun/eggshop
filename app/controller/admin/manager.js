'use strict';

const BaseController = require('./base.js');

class ManagerController extends BaseController {
  async index() {
    const {
      ctx
    } = this;
    let result = await ctx.model.Admin.findAll({
      include: {
        model: ctx.model.Role
      }
    });

    let newres = result.map(item => {
      item.addTime = ctx.service.tools.dateFormat(item.addTime*1000, 'Y年m月d日 H时i分');
      item.lastLogin = ctx.service.tools.dateFormat(item.lastLogin*1000, 'Y年m月d日 H时i分');
      return item;
    })

    await ctx.render("admin/manager/index", {
      list: newres
    });
  }
  async edit() {
    try {
      const {
        ctx
      } = this;
      let id = ctx.request.query.id;
      // 获取当前编辑的用户信息
      let res = await ctx.model.Admin.findAll({
        where: {
          id: id
        }
      })
      let itemData = res[0];
      // 获取所有角色信息
      let roleList = await ctx.model.Role.findAll();

      await ctx.render(`${this.config.adminPath}/manager/edit`, {
        manager: itemData,
        roleList: roleList
      });
    } catch (error) {
      console.log(error);
      await this.error("非法请求", `${this.config.adminPath}/manager`);
    }
  }
  async doEdit() {
    const {
      ctx
    } = this;
    let editRes = ctx.request.body;
    let manager = await ctx.model.Admin.findByPk(editRes.id);

    if (!manager) {
      await this.error("非法请求", `${this.config.adminPath}/manager/edit?id=${editRes.id}`);
      return;
    }
    // 判断密码是否为空
    if (editRes.password != '') {
      if (editRes.password.length < 6) {
        await this.error("密码长度不能小于6位", `${this.config.adminPath}/manager/edit?id=${editRes.id}`);
        return;
      }
      editRes.password = ctx.service.tools.md5(editRes.password);
    } else {
      delete editRes.password;
    }
    await manager.update(this.ctx.request.body);
    await this.success("修改数据成功", `${this.config.adminPath}/manager`);

  }
  async add() {
    const {
      ctx
    } = this;
    // 获取所有角色信息
    const roleList = await ctx.model.Role.findAll();

    await ctx.render("admin/manager/add", {
      roleList: roleList
    });
  }
  async doAdd() {
    const {
      ctx
    } = this;
    const username = ctx.request.body.username;
    let psd = ctx.request.body.password;

    const email = ctx.request.body.email;
    const phone = ctx.request.body.mobile;
    // 判断用户名是否为空
    if (username == '') {
      await this.error("管理员名称不能为空", `${this.config.adminPath}/manager/add`);
      return;
    }

    if (psd.length < 6) {
      await this.error("管理员密码不能低于6位字符", `${this.config.adminPath}/manager/add`);
      return;
    } else {
      psd = ctx.service.tools.md5(psd);
    }

    // 判断用户名是否已经存在
    let adminRes = await ctx.model.Admin.findAll({
      where: {
        username: username
      }
    })
    if (adminRes.length > 0) {
      await this.error("此管理员名称已经存在，请更换用户名", `${this.config.adminPath}/manager/add`);
      return;
    } else {
      if (email == '') {
        await this.error("管理员邮箱不能为空", `${this.config.adminPath}/manager/add`);
        return;
      }
      if (phone == '') {
        await this.error("管理员电话不能为空", `${this.config.adminPath}/manager/add`);
        return;
      } else {
        if (phone.length > 11) {
          await this.error("管理员电话不能超过11位", `${this.config.adminPath}/manager/add`);
          return;
        }
      }
    }


    await ctx.model.Admin.create(Object.assign(ctx.request.body, {
      password: psd,
      status: 1,
      isSuper: 0,
      addTime: ctx.service.tools.getUnixTime(),
      lastLogin: ctx.service.tools.getUnixTime()
    }))

    await this.success("新增管理员成功", `${this.config.adminPath}/manager`)

  }
  async delete() {
    try {
      const {
        ctx
      } = this;
      let id = ctx.request.query.id;
      let manager = await ctx.model.Admin.findByPk(id);
      if (!manager) {
        await this.error("非法请求", `${this.config.adminPath}/manager`);
        return;
      }
      await manager.destroy();
      await this.success("删除数据成功", `${this.config.adminPath}/manager`);
    } catch (err) {
      await this.error("非法请求", `${this.config.adminPath}/manager`);
    }
  }
}

module.exports = ManagerController;