module.exports = option => {
    return async function adminAuth(ctx, next) {
        let pathname = ctx.request.url.split("?")[0]; 
        // console.log('中间件数据：', ctx.session.userinfo);
        // 配置csrf全局变量
        ctx.state.csrf=ctx.csrf;
        ctx.state.adminPath=option.adminPath  // 获取配置文件里的后台地址
        console.log('option: ', option);
        if (ctx.session.userinfo && ctx.session.userinfo.username) {
            var hasAuth=await ctx.service.admin.checkAuth();
            if(hasAuth){
                ctx.state.userinfo=ctx.session.userinfo;
                await next();
            }else{
                ctx.body="您没有权限访问这个地址";
            }
        
        } else {
            if (pathname == `${option.adminPath}/login` || pathname == `${option.adminPath}/doLogin` || pathname == `${option.adminPath}/login/captcha`) {
                await next();
            } else {
                ctx.redirect(`${option.adminPath}/login`);
            }
        }
    }
}