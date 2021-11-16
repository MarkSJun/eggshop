'use strict';

const BaseController = require('./base.js');
class RoleController extends BaseController {
    async index() {
        const {ctx} = this;
        let res = await ctx.model.Role.findAll();
        console.log('list', res);
        await ctx.render("admin/role/index", {
          list: res
        });
      }
      async edit() {
        const {ctx} = this;
        await ctx.render("admin/role/index");
      }
      async add() {
        const {ctx} = this;
        await ctx.render("admin/role/add");
        
      }
      async doAdd() {
        const {ctx} = this;
        // console.log(ctx.request.body);
        let rolename = ctx.request.body.rolename;
        // let description = ctx.request.body.description;
        if(rolename != '') {
          // await ctx.model.Role.create({
          //   rolename: rolename,
          //   description: description,
          //   status: 1,
          //   addTime: ctx.service.tools.getUnixTime()
          // })

          await ctx.model.Role.create(Object.assign(ctx.request.body, {
            status: 1,
            addTime: ctx.service.tools.getUnixTime()
          }))
     
          await this.success("新增角色成功", `${this.config.adminPath}/role/add`)
        } else {
          await this.error("角色名称不能为空", `${this.config.adminPath}/role/add`)
        }
    
      }
      async delete() {
        const {ctx} = this;
        this.ctx.body = '删除角色';

        // await ctx.render("admin/role/index");
      }
}

module.exports = RoleController;
