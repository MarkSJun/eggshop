'use strict';

const BaseController = require('./base.js');
class ProductCateController extends BaseController {
    async index() {
        let result = await this.ctx.model.ProductCate.findAll();       
        await this.ctx.render("admin/productCate/index", {
            list: result
        })
    }
    async add() {
        await this.ctx.render("admin/productCate/add")
    }
    async doAdd() {
        let title = this.ctx.request.body.title;
        if (title != "") {
            await this.ctx.model.ProductCate.create(Object.assign(this.ctx.request.body, {
                status: 1,
                addTime: this.ctx.service.tools.getUnixTime()
            }))
            await this.success("增加分类成功", `${this.config.adminPath}/productCate`);
        } else {
            await this.error("分类名称不能为空", `${this.config.adminPath}/productCate/add`)
        }
    }

    async edit() {
        try {
            let id = this.ctx.request.query.id;
            let result = await this.ctx.model.ProductCate.findAll({
                where: {
                    id: id
                }
            });          
            await this.ctx.render("admin/productCate/edit", {
                list: result[0]
            });

        } catch (error) {
            await this.error("非法请求", `${this.config.adminPath}/productCate`);
        }
    }
    async doEdit() {
        let id = this.ctx.request.body.id;
        let productCate = await this.ctx.model.ProductCate.findByPk(id);
        if (!productCate) {
            await this.error("非法请求", `${this.config.adminPath}/productCate/edit?id=${id}`);
            return;
        }
        await productCate.update(this.ctx.request.body);
        await this.success("修改数据成功", `${this.config.adminPath}/productCate`);

    }
    async delete() {
        try {
            let id = this.ctx.request.query.id;
            let role = await this.ctx.model.ProductCate.findByPk(id);
            if (!role) {
                await this.error("非法请求", `${this.config.adminPath}/productCate/`);
                return;
            }
            await role.destroy();
            await this.success("删除数据成功", `${this.config.adminPath}/productCate`);
        } catch (error) {
            await this.error("非法请求", `${this.config.adminPath}/productCate`);
        }

    }
}

module.exports = ProductCateController;
