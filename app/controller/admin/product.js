'use strict';

const Controller = require('egg').Controller;
const path = require("path");

const fs = require('mz/fs');
const pump = require('mz-modules/pump');
// 需要安装对应的模块 cnpm i mz mz-modules --save

class ProductController extends Controller {
    async index() {
        this.ctx.body = "菜品首页 请访问 product/add 实现图片上传1 "
    }
    async add() {
        await this.ctx.render("admin/product/add")
    }

    //单文件上传
    // async doAdd() {

    //     const { ctx } = this;
    //     const body = ctx.request.body;
    //     //文件信息
    //     const file = ctx.request.files[0];
    //     if(file){
    //         //获取文件名称
    //         const filename = file.filename;
    //         //定义保存文件的目录
    //         const targetPath = path.join('app/public/upload', filename);
    //         //读取文件
    //         const source = fs.createReadStream(file.filepath);
    //         //创建写入流
    //         const target = fs.createWriteStream(targetPath);
    //         try {
    //             await pump(source, target);
    //         } finally {
    //             // delete those request tmp files
    //             await ctx.cleanupRequestFiles();
    //         }
    //     }
    //     ctx.body = {
    //         body: body,
    //         file: file
    //     }
    // }
    //多文件上传
    async doAdd() {
        const { ctx } = this;
        const body = ctx.request.body;
        //文件信息
        const files = ctx.request.files;

        try {
            for (let file of files) {
                //获取文件名称
                const filename = file.filename;
                //定义保存文件的目录
                const targetPath = path.join('app/public/upload', filename);
                //读取文件
                const source = fs.createReadStream(file.filepath);
                //创建写入流
                const target = fs.createWriteStream(targetPath);
                await pump(source, target);
            }
        } finally {
            // delete those request tmp files
            await ctx.cleanupRequestFiles();
        }

        ctx.body = {
            body: body,
            files: files
        }
    }
}

module.exports = ProductController;
