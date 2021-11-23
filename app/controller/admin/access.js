'use strict';

const BaseController = require('./base.js');

class AccessController extends BaseController {
    async index() {
        const { ctx } = this;
        let resList = await ctx.model.Access.findAll({
          where: {
            moduleId: 0
          },
          include: { model: ctx.model.Access }
        });
        // ctx.body = resList;
        await ctx.render('admin/access/index', {
            list: resList,
        });
      }
      async edit() {
        const {ctx} = this;
        let id = ctx.request.query.id;
        let res = await ctx.model.Access.findAll({
          where: {
            id: id
          }
        })
        let accessList=await ctx.model.Access.findAll({
          where:{
              moduleId:0
          }
        })
        // ctx.body = res;
        await ctx.render('admin/access/edit', {
          access: res[0],
          accessList: accessList
        })
      }
      async doEdit() {
        const { ctx } = this;
        ctx.body = '123'
      }
      async add() {
        const { ctx } = this;
        //获取moduleId=0的模块
        let accessList=await ctx.model.Access.findAll({
          where:{
              moduleId:0
          }
        })
        // ctx.body = accessList;
        await ctx.render('admin/access/add', {
          accessList: accessList
        });
      }
      async doAdd() {
        const {ctx} = this;
        let addResult=ctx.request.body;
        if(addResult.moduleName==""){
            await this.error("模块名称不能为空",`${this.config.adminPath}/access/add`);
            return;
        }
        await ctx.model.Access.create({
            ...addResult,
            status: 1,
            addTime: ctx.service.tools.getUnixTime()
        })

        await this.success("增加权限成功",`${this.config.adminPath}/access`);
      }
      async delete() {
        this.ctx.body = '删除权限';
      }
}

module.exports = AccessController;
