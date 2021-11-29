"use strict";

const BaseController = require("./base.js");
class RoleController extends BaseController {
  async index() {
    const { ctx } = this;
    let res = await ctx.model.Role.findAll();
    // console.log('list', res);
    await ctx.render("admin/role/index", {
      list: res,
    });
  }
  async edit() {
    try {
      const { ctx } = this;
      let id = ctx.request.query.id;
      let res = await ctx.model.Role.findAll({
        where: {
          id: id,
        },
      });
      let itemData = res[0];
      await ctx.render(`${this.config.adminPath}/role/edit`, {
        list: itemData,
      });
    } catch (error) {
      await this.error("非法请求", `${this.config.adminPath}/role`);
    }
  }
  async doEdit() {
    let id = this.ctx.request.body.id;
    let role = await this.ctx.model.Role.findByPk(id);

    if (!role) {
      await this.error(
        "非法请求",
        `${this.config.adminPath}/role/edit?id=${id}`
      );
      return;
    }
    await role.update(this.ctx.request.body);
    await this.success("修改数据成功", `${this.config.adminPath}/role`);
  }
  async add() {
    const { ctx } = this;
    await ctx.render("admin/role/add");
  }
  async doAdd() {
    const { ctx } = this;
    // console.log(ctx.request.body);
    let rolename = ctx.request.body.rolename;
    // let description = ctx.request.body.description;
    if (rolename != "") {
      // await ctx.model.Role.create({
      //   rolename: rolename,
      //   description: description,
      //   status: 1,
      //   addTime: ctx.service.tools.getUnixTime()
      // })

      await ctx.model.Role.create(
        Object.assign(ctx.request.body, {
          status: 1,
          addTime: ctx.service.tools.getUnixTime(),
        })
      );

      await this.success("新增角色成功", `${this.config.adminPath}/role`);
    } else {
      await this.error("角色名称不能为空", `${this.config.adminPath}/role/add`);
    }
  }

  async auth() {
    /*
      1、获取全部的权限  

      2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中

      3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中
      
    */

    let roleId = this.ctx.request.query.id;
    // 1、获取全部的权限
    let allAuthResult = await this.ctx.model.Access.findAll({
      where: {
        moduleId: 0,
      },
      include: { model: this.ctx.model.Access },
    });
    
    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    let tempArr = [];
    let roleAuthResult = await this.ctx.model.RoleAccess.findAll({
      where: {
        roleId: roleId,
      },
    });
    for (let i = 0; i < roleAuthResult.length; i++) {
      tempArr.push(roleAuthResult[i].accessId);
    }

    // 3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中

    //注意：把不可改变的对象改为可改变的对象
    allAuthResult = JSON.parse(JSON.stringify(allAuthResult));
    for (let i = 0; i < allAuthResult.length; i++) {
      if (tempArr.indexOf(allAuthResult[i].id) != -1) {
        allAuthResult[i].checked = true;
      }
      for (let j = 0; j < allAuthResult[i].accesses.length; j++) {
        if (tempArr.indexOf(allAuthResult[i].accesses[j].id) != -1) {
          allAuthResult[i].accesses[j].checked = true;
        }
      }
    }
    // this.ctx.body=allAuthResult;
    await this.ctx.render("admin/role/auth", {
      authList: allAuthResult,
      roleId: roleId,
    });
  }

  async doAuth() {
    // this.ctx.body=this.ctx.request.body;
    let accessIds = this.ctx.request.body.accessIds;
    let roleId = this.ctx.request.body.roleId;

    //1、删除当前角色对应的权限数据

    await this.ctx.model.RoleAccess.destroy({
        where: {
            roleId: roleId
        }
    })
    //2、把当前角色对应的权限增加到 数据库表里面        
    for (var i = 0; i < accessIds.length; i++) {
        await this.ctx.model.RoleAccess.create({
            roleId: roleId,
            accessId: accessIds[i]
        })
    }
    await this.success("授权成功", `${this.config.adminPath}/role/auth/?id=${roleId}`);
  }

  async delete() {
    try {
      const { ctx } = this;
      let id = ctx.request.query.id;
      let role = await ctx.model.Role.findByPk(id);
      if (!role) {
        await this.error("非法请求", `${this.config.adminPath}/role`);
        return;
      }
      await role.destroy();
      await this.success("删除数据成功", `${this.config.adminPath}/role`);
    } catch (err) {
      await this.error("非法请求", `${this.config.adminPath}/role`);
    }
  }
}

module.exports = RoleController;
