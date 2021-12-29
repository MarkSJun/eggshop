'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
    async checkAuth() {

        /*
             1、获取当前用户的角色和isSuper  如果isSuper==1或者当前访问地址在忽略的权限列表中的话允许访问
             2、根据角色获取当前角色的权限列表                       
             3、获取当前访问的url 对应的权限id
             4、判断当前访问的url对应的权限id 是否在权限列表中的id中
         */

        //  1、获取当前用户的角色和isSuper
        let roleId = this.ctx.session.userinfo.roleId;
        let isSuper = this.ctx.session.userinfo.isSuper;
        let adminPath = this.config.adminPath;
        let pathname = this.ctx.request.url;   //当前访问的地址
        pathname = pathname.split("?")[0];

        //忽略权限判断的地址    
        if (this.config.ignoreUrl.indexOf(pathname) != -1 || isSuper == 1) {
            return true;
        }


        // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
        let roleAccessArr = [];
        let roleAuthResult = await this.ctx.model.RoleAccess.findAll({
            where: {
                roleId: roleId
            }
        });
        for (let i = 0; i < roleAuthResult.length; i++) {
            roleAccessArr.push(roleAuthResult[i].accessId);
        }

        // 3、获取当前访问的url 对应的权限id
        let accessUrl = pathname.replace(`${adminPath}/`, "");
        let accessUrlResult = await this.ctx.model.Access.findAll({
            where: {
                url: accessUrl
            }
        })
        // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
        if (accessUrlResult.length > 0) {
            if (roleAccessArr.indexOf(accessUrlResult[0].id) != -1) {
                return true;
            }
            return false;
        }
        return false;

    }
}

module.exports = AdminService;
