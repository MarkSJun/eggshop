'use strict';

const BaseController = require('./base.js');
class RoleController extends BaseController {
    async index() {
        const {ctx} = this;
        let res = await ctx.model.Role.findAll();
        // console.log('list', res);
        await ctx.render("admin/role/index", {
          list: res
        });
      }
      async edit() {
        
        try {
          const {ctx} = this;
          let id = ctx.request.query.id;
          let res = await ctx.model.Role.findAll({
            where: {
              id: id
            }
          })
          let itemData = res[0];
          await ctx.render(`${this.config.adminPath}/role/edit`, {list:itemData});
        } catch(error) {
          await this.error("非法请求",`${this.config.adminPath}/role`);
        }
        
      }
      async doEdit() {
        let id = this.ctx.request.body.id;
        let role = await this.ctx.model.Role.findByPk(id);
 
        if(!role) {
          await this.error("非法请求",`${this.config.adminPath}/role/edit?id=${id}`);
          return;
        } 
        await role.update(this.ctx.request.body);
        await this.success("修改数据成功",`${this.config.adminPath}/role`);
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
     
          await this.success("新增角色成功", `${this.config.adminPath}/role`)
        } else {
          await this.error("角色名称不能为空", `${this.config.adminPath}/role/add`)
        }
    
      }
      async delete() {
        try {
          const {ctx} = this;
          let id = ctx.request.query.id;
          let role = await ctx.model.Role.findByPk(id);
          if (!role) {
            await this.error("非法请求",`${this.config.adminPath}/role`);
            return;
          }
          await role.destroy();
          await this.success("删除数据成功",`${this.config.adminPath}/role`);
        } catch(err) {
          await this.error("非法请求",`${this.config.adminPath}/role`);
        }

      }
}

module.exports = RoleController;
