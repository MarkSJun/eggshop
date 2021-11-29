"use strict";

const BaseController = require("./base.js");

class AccessController extends BaseController {
  async index() {
    const { ctx } = this;
    let resList = await ctx.model.Access.findAll({
      where: {
        moduleId: 0,
      },
      include: { model: ctx.model.Access },
    });
    // ctx.body = resList;
    await ctx.render("admin/access/index", {
      list: resList,
    });
  }
  async edit() {
    const { ctx } = this;
    let id = ctx.request.query.id;
    let res = await ctx.model.Access.findAll({
      where: {
        id: id,
      },
    });
    let accessList = await ctx.model.Access.findAll({
      where: {
        moduleId: 0,
      },
    });
    // ctx.body = res;
    await ctx.render("admin/access/edit", {
      access: res[0],
      accessList: accessList,
    });
  }
  async doEdit() {
    const { ctx } = this;
    let editRes = ctx.request.body;
    let access = await ctx.model.Access.findByPk(editRes.id);
    console.log(access);
    if (!access) {
      await this.error(
        "非法请求",
        `${this.config.adminPath}/access/edit?id=${editRes.id}`
      );
      return;
    }

    await access.update(this.ctx.request.body);
    await this.success("修改数据成功", `${this.config.adminPath}/access`);
  }
  async add() {
    const { ctx } = this;
    //获取moduleId=0的模块
    let accessList = await ctx.model.Access.findAll({
      where: {
        moduleId: 0,
      },
    });
    // ctx.body = accessList;
    await ctx.render("admin/access/add", {
      accessList: accessList,
    });
  }
  async doAdd() {
    const { ctx } = this;
    let addResult = ctx.request.body;
    if (addResult.moduleName == "") {
      await this.error(
        "模块名称不能为空",
        `${this.config.adminPath}/access/add`
      );
      return;
    }
    await ctx.model.Access.create({
      ...addResult,
      status: 1,
      addTime: ctx.service.tools.getUnixTime(),
    });

    await this.success("增加权限成功", `${this.config.adminPath}/access`);
  }
  async delete() {
    try {
      const { ctx } = this;
      let id = ctx.request.query.id;
      let accessRes = await ctx.model.Access.findAll({
        where: {
          id: id,
        },
      });
      if (accessRes[0].moduleId != 0) {
        let access = await ctx.model.Access.findByPk(id);
        if (!access) {
          await this.error("非法请求", `${this.config.adminPath}/access`);
          return;
        }
        await access.destroy();
        await this.success("删除数据成功", `${this.config.adminPath}/access`);
      } else {
        //判断当前模块下面有没有菜单或者操作
        let subAccessResult = await this.ctx.model.Access.findAll({
          where: {
            moduleId: id,
          },
        });
        if (subAccessResult.length > 0) {
          //没法删除
          await this.error(
            "当前模块下面还有菜单或者操作，没法删除，请删除菜单或者操作后重新删除",
            `/${this.config.adminPath}/access/`
          );
        } else {
          let access = await this.ctx.model.Access.findByPk(id);
          if (!access) {
            await this.error("非法请求", `/${this.config.adminPath}/access/`);
            return;
          }
          await access.destroy();
          await this.success(
            "删除数据成功",
            `/${this.config.adminPath}/access`
          );
        }
      }
    } catch (err) {
      await this.error("非法请求", `${this.config.adminPath}/access`);
    }
  }
}

module.exports = AccessController;
