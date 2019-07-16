(function(global,factory,plug){
	// 调用工厂创建闭包
	return factory.call(global,global.jQuery, plug)
})(this,function($,plug){
	// 创建插件
    $.fn[plug] = function(ops){
		this.each(function(){
			var $this = $(this);
			$.extend($this,ops);
			$this.raise = $this.raise || $this.data('bv-raise');
			var $fields = $this.find("[data-bv=true]");
            console.log($this)
			console.log($this.raise)
            $fields.on($this.raise,function(){

                console.log(this.value)
            });
		})
	}
},"MyValidator");