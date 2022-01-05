'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
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
  md5(msg) {
    return md5(msg)
  };
  getUnixTime() {
    let dateObj = new Date();
    return dateObj.getTime() / 1000;
  }
  /*
   ** 时间戳转换成指定格式日期
   ** eg. 
   ** dateFormat(11111111111111, 'Y年m月d日 H时i分')
   ** → "2322年02月06日 03时45分"
   */
  dateFormat(timestamp, formats) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
      if (value < 10) {
        return '0' + value;
      }
      return value;
    };

    var myDate = timestamp ? new Date(timestamp) : new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
        Y: year,
        m: month,
        d: day,
        H: hour,
        i: minite,
        s: second
      })[matches];
    });
  };
  async getUploadFile(filename){

    //1、获取当前日期 20210920
    let day=sd.format(new Date(), 'YYYYMMDD');

    //2、创建文件保存的路径
    // app/public/upload/20210920
    let dir=path.join(this.config.uploadDir,day);    
    await mkdirp(dir);

    //3、生成文件名称  获取文件保存的目录   以前的文件 serverless_600x900.png    20210920.png
    let d=this.getUnixTime();

    //  app/public/upload/20210920/4124215212.png
    let saveDir=path.join(dir,d+path.extname(filename));

    console.log(saveDir);

    return saveDir;
  }
}

module.exports = ToolsService;