(function(global,factory,plug){
	// 调用工厂创建闭包
	return factory.call(global,global.jQuery, plug)
})(this,function($,plug){
	//默认值
	 var _DEFS_ = {
	 	raise:'change'
	 };
	 var _RULES_ = {
	 	"require": function () {
			return !!this.val()
        },//必填项
		"regex":function () {
			return true
        },//正则表达式
		"email":function () {
			return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.val())
        },//邮箱地址
		"mobile":function () {
			return true
        },//手机号
		"phone":function () {
			return true
        },//座机号
		"ipaddress":function () {
			return true
        },//ip地址
		"number":function () {
			return true
        },//数字
		"amount":function () {
			return true
        },//金额
		"maxlength":function () {
			return true
        },//最大长度
		"minlength":function () {
			return true
        },//最小长度
	 };
	// 创建插件
    $.fn[plug] = function(ops){
		this.each(function(){
			var $this = $(this);
			$.extend($this,ops);
			//优先用户设置，然后系统配置，最后默认配置
			$this.raise = $this.data('bv-raise') || $this.raise || _DEFS_.raise;
			var $fields = $this.find("[data-bv=true]");
            // console.log($this);
            // console.log($this.raise);
            $fields.on($this.raise,function(){
                var $field =  $(this);
                var $group = $field.parents(".form-group").removeClass("has-success has-error");
                $group.find(".help-block").remove();
                var result = true,error = null; //教研结果
                $.each(_RULES_,function (rule,valid) {
                	if($field.data("bv-"+rule)){
                        result = valid.call($field);
                        // !result
						if(!result){
							error = $field.data("bv-"+rule+"-error")
							$field.after("<span class='help-block'>"+error+"</span>")
						}
                        return result;
					}
                });
                $group.addClass(result ? "has-success" : "has-error")
                console.log('配置了',$group);
                console.log(result);
                console.log($field)
            });
		})
	}

},"MyValidator");