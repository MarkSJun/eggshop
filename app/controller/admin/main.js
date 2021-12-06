'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {

    // 1、获取当前登录用户的角色
    let roleId = this.ctx.session.userinfo.roleId;
    let isSuper = this.ctx.session.userinfo.isSuper;
    
    // 2、获取全部的权限  
    let allAuthResult = await this.ctx.model.Access.findAll({
      where: {
        moduleId: 0
      },
      include: { model: this.ctx.model.Access }
    });

    // 3、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    let tempArr = [];
    let roleAuthResult = await this.ctx.model.RoleAccess.findAll({
      where: {
        roleId: roleId
      }
    });
    for (let i = 0; i < roleAuthResult.length; i++) {
      tempArr.push(roleAuthResult[i].accessId);
    }

    // 4、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中

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
    await this.ctx.render("admin/main/index",{
      authList: allAuthResult,
      isSuper:isSuper
    })
    // await ctx.render("admin/main/index");
  }
  async welcome() {
    const { ctx } = this;
    await ctx.render("admin/main/welcome");
  }
}

module.exports = MainController;
