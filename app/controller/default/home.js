'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    
    await ctx.render('default/index', {
      msg: 'hi, egg111',
    });
  }
}

module.exports = HomeController;
