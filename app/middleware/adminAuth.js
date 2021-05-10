module.exports = option => {
    return async function adminAuth(ctx, next) {
        let pathname = ctx.request.url.split("?")[0]; 
        console.log(ctx.session.userinfo);
        // 配置csrf全局变量
        ctx.state.csrf=ctx.csrf;
        if (ctx.session.userinfo) {
            await next();
        } else {
            if (pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/login/captcha') {
                await next();
            } else {
                ctx.redirect('/admin/login');
            }
        }
    }
}