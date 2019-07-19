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
			return true
        },//必填项
		"regex":function () {
			return true
        },//正则表达式
		"email":function () {
			return true
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
            console.log($this.raise);
            $fields.on($this.raise,function(){
                var $field =  $(this);
                var result = true; //教研结果
                $.each(_RULES_,function (rule,valid) {
                	if($field.data("bv-"+rule)){
                		valid.call($field)
                        console.log('配置了',rule)
					}

                });
                console.log($field)
            });
		})
	}

},"MyValidator");