'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    async success(msg, redirectUrl) {
        let {
            ctx
        } = this;
        await ctx.render("admin/public/success", {
            msg: msg,
            redirectUrl: redirectUrl
        })
    }

    async error(msg, redirectUrl) {
        let {
            ctx
        } = this;
        await ctx.render("admin/public/error", {
            msg: msg,
            redirectUrl: redirectUrl
        })
    }
}

module.exports = BaseController;