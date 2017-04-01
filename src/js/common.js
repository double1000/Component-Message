define(function () {
   function Common() {
      this.element = null;
   }

   Common.prototype={
       constructor:Common,
       addEvent: function(type, handler){
           if(typeof this.handlers[type] == "undefined"){
               this.handlers[type] = [];
           }
           this.handlers[type].push(handler);
           return this;
       },
       fireEvent: function(type, data){
           if(this.handlers[type] instanceof Array){
               var handlers = this.handlers[type];
               for(var i=0,len=handlers.length;i<len;i++){
                   handlers[i](data);
               }
           }
       },

       // 渲染DOM事件
       renderUI:function (){},
       // DOM相关样式设置
       syncUI:function(){},
       // 回收
       destructor:function () {},
       // 销毁事件
       destory:function () {
           this.destructor();
           /*在当前这个函数种移除一个或者多个事件处理函数*/
           this.element.off();
           this.element.remove();
       },
       // 绑定事件
        bindUI:function () {},
       // 初始化事件
        render:function (container) {
            this.handlers = {};
            this.renderUI();
            this.bindUI();
            this.syncUI();
            $(container||document.body).append(this.element);
        }
   }

   return{
       Common : Common
   }
});