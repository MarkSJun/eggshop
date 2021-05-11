'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');
class ToolsService extends Service {
  async getCaptcha() {
    //生成图形验证码
    var captcha = svgCaptcha.create({ 
        size: 4, 
        fontSize: 50, 
        width: 120, 
        height: 32, 
        background: "#cc9966" 
      });

      return captcha;
  };
  md5(msg){
    return md5(msg)
  };
}

module.exports = ToolsService;
