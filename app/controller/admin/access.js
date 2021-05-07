'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('admin/access/index', {
            msg: '权限列表',
        });
      }
      async edit() {
        this.ctx.body = '编辑权限列表';
      }
      async add() {
        const { ctx } = this;
        await ctx.render('admin/access/add', {
            msg: '增加权限',
        });
      }
      async delete() {
        this.ctx.body = '删除权限';
      }
}

module.exports = AccessController;
