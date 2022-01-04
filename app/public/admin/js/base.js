$(function(){
	app.init();
})

var app={
	init:function(){
		this.toggleAside();
		this.deleteConfirm();
		this.resizeIframe();
	},
	toggleAside:function(){	
		$('.aside h4').click(function(){
			$(this).siblings('ul').slideToggle();
		})
	},
	deleteConfirm:function(){
		$('.delete').click(function(){
			var flag=confirm("您确定要删除吗?");
			return flag;
		});
	},
	resizeIframe:function(){
		// alert(document.documentElement.clientHeight);
		var height=document.documentElement.clientHeight-100;
		var rightMainDom=document.getElementById("iframeDom");
		console.log(rightMainDom);
		console.log(height);
		rightMainDom.height=height;
		rightMainDom.style.height = height + 'px';

	}
}

$(window).resize(function(){
	app.resizeIframe();
})