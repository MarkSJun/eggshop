'use strict';

const Controller = require('egg').Controller;
const path = require("path");

const fs = require('mz/fs');
const pump = require('mz-modules/pump');
// 需要安装对应的模块 cnpm i mz mz-modules --save

class ProductController extends Controller {
    async index() {
        await this.ctx.render("admin/product/index");
    }
    async add() {
        await this.ctx.render("admin/product/add")
    }

    //单文件上传
    async doAdd() {
        const { ctx } = this;
        const body = ctx.request.body;
        //文件信息
        const file = ctx.request.files[0];
        if (file) {
            let source = fs.createReadStream(file.filepath);
            let filename = this.ctx.service.tools.getCosUploadFile(file.filename);
            console.log(filename);
            //异步 改成 同步
            await this.ctx.service.tools.uploadCos(filename, source);
        }
        ctx.body = {
            body: body,
            file: file
        }
    }
    
    async doUpload() {
        const { ctx } = this;
        const body = ctx.request.body;
        //文件信息
        const file = ctx.request.files[0];

        if (file) {
            var source = fs.createReadStream(file.filepath);
            var filename = this.ctx.service.tools.getCosUploadFile(file.filename);

            //异步 改成 同步
            await this.ctx.service.tools.uploadCos(filename, source);
        }
       
        ctx.body = {link: this.config.cosUrl+"/"+filename};
    }
    //多文件上传
    // async doAdd() {
    //     const { ctx } = this;
    //     const body = ctx.request.body;
    //     //文件信息
    //     const files = ctx.request.files;

    //     try {
    //         for (let file of files) {
    //             //获取文件名称
    //             const filename = file.filename;
    //             //定义保存文件的目录
    //             // const targetPath = path.join('app/public/upload', filename);
    //             const targetPath = await this.ctx.service.tools.getUploadFile(filename);
    //             //读取文件
    //             const source = fs.createReadStream(file.filepath);
    //             //创建写入流
    //             const target = fs.createWriteStream(targetPath);
    //             await pump(source, target);
    //         }
    //     } finally {
    //         // delete those request tmp files
    //         await ctx.cleanupRequestFiles();
    //     }

    //     ctx.body = {
    //         body: body,
    //         files: files
    //     }
    // }
}

module.exports = ProductController;
