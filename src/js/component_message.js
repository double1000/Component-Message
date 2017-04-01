define(['jquery','common'],function ($,com) {
    function Message() {
        // 默认配置项
        this.config = {
            /*基本样式项*/
            width:"640",
            height:"380",
            top:null,
            left:null,
            hasScorll:false,

            /*content是否显示Y轴滚动条*/
            hasScroll:false,

            /*取消按钮位置*/
            closeBtnPlace:"topRight",

            /*按钮位置*/
            buttonPlace:false,

            /*遮罩*/
            hasMask:true,
            maskBgColor:"#000",
            maskOpacity:"0.7",

            /*点击遮罩是否关闭*/
            maskHandler:true,

            /*动画皮肤项配置*/
            hasAnimation:true,
            animatName:"fade_mess_in",
            skinName:null,

            /*文案定制类*/
            title:"温馨提示",
            content:"你说人生忧郁，我不言语",
            trueBtnText:"确定",
            closeBtnText:"取消",

            /*关闭按钮位置*/
            //closeBtnPlace:"other",

            /*事件类操作*/
            closeHandler:null,
            trueHandler:null,
            promptHandler:null,

            /*扩展类操作*/
            hasDraggle:false,
            dragHandler:null
        };
        this.eleHeader = null;
        this.eleContent = null;
        this.eleFooter = null;
        this.elePrompt = null;
    };

    Message.prototype = $.extend({},new com.Common(),{
        constructor:Message,
        renderUI:function () {
            this.element = $(`<div class="message ${this.config.hasAnimation?this.config.animatName:""}" data-target="message"></div>`);
            this.eleHeader = $(`<div class="message_header">${this.config.title}</div>`);
            this.eleContent = $(`<div class="message_contant"> ${this.config.content}</div>`);
            this.eleContent.appendTo(this.element);
            this.eleFooter = $(`<div class="message_footer">
<button type="button" class="message_true">${this.config.trueBtnText}</button></div>`);
            /*渲染DOM 结束*/
            this.elePrompt = $(`<br><input type="text" placeholder="请输入你的名字"/>`);
            this.elePrompt.css({
                "width" : "80%",
                "height" : "34px",
                "line-height" : "34px",
                "border" : "1px solid #cfcfcf",
                "border-radius" : "3px",
                "outline" : "none",
                "text-indent" : "12px"
            });
            /*prompt输入框*/

            switch (this.config.global){
                case 'main':
                    this.eleHeader.appendTo(this.element);
                    this.eleContent.appendTo(this.element);
                    this.eleFooter.appendTo(this.element);
                    break;
            };

            switch (this.config.type){
                case 'alert':
                break;
                case 'confirm':
                    /*取消按钮位置插入*/
                    if(this.config.closeBtnPlace === 'topRight'){
                        this.closeBtn = $(`<button type="button" class="message_close">${this.config.closeBtnText}</button>`);
                        this.closeBtn.appendTo(this.eleFooter);
                    }else{
                        this.closeBtn = $(`<button type="button" class="message_close btn_closeSkin">+</button>`);
                        this.closeBtn.appendTo(this.eleHeader);
                    };
                    /*取消按钮位置插入结束*/
                break;
                case 'prompt':
                    this.elePrompt.appendTo(this.eleContent);
                    /*取消按钮位置插入*/
                    if(this.config.closeBtnPlace === 'topRight'){
                        this.closeBtn = $(`<button type="button" class="message_close">${this.config.closeBtnText}</button>`);
                        this.closeBtn.appendTo(this.eleFooter);
                    }else{
                        this.closeBtn = $(`<button type="button" class="message_close btn_closeSkin">+</button>`);
                        this.closeBtn.appendTo(this.eleHeader);
                    };
                /*取消按钮位置插入结束*/
                break;
                case 'common':
                    this.eleHeader.appendTo(this.element);
                    this.eleContent.appendTo(this.element);
                    this.closeBtn = $(`<button type="button" class="message_close btn_closeSkin">+</button>`);
                    this.closeBtn.appendTo(this.eleHeader);
                    break;
            }

            /*遮罩部分*/
            this.eleMask = null;
            if(this.config.hasMask){
                this.eleMask = $(`<div class="message_mask"></div>`);
                this.eleMask.appendTo('body');
            }
        },

        syncUI : function () {
            /*遮罩相关样式*/
            if(this.config.hasMask){
                this.eleMask.css({
                    "background" : this.config.maskBgColor,
                    "opacity" : this.config.maskOpacity
                })
            }

            /*皮肤选择*/
            if(this.config.skinName){
                this.element.addClass(this.config.skinName);
            }
            /*皮肤选择结束*/

            /*message_content是否显示滚动条*/
            if(this.config.hasScorll){
                this.eleContent.addClass('scroll');
            }
            /*message_content是否显示滚动条结束*/

            /*按钮位置开始*/
            if(this.config.buttonPlace){
                this.eleFooter.addClass('message_footer_btnRight');
            }
            /*按钮位置结束*/

            /*基本样式设置*/
            this.element.css({
                "width" : (this.config.width < 200 ? 200 : this.config.width) + 'px',
                "height" : (this.config.height < 200 ? 200 : this.config.height) + 'px',
                "top" : this.config.top ? this.config.top + 'px': (window.innerHeight - this.config.height)/2+ 'px',
                "left" : this.config.left ? this.config.left + 'px': (window.innerWidth - this.config.width)/2+ 'px',
                "position" : "absolute"
            })
            /*基本样式设置结束*/
        },

        bindUI:function () {
          var _this = this;
          /*自定义事件绑定事件*/
          if(this.config.closeHandler){
              this.addEvent('close',this.config.closeHandler);
          };
          if(this.config.trueHandler){
              this.addEvent('alert',this.config.trueHandler);
          };

          /*释放事件绑定*/
          this.element.delegate(".message_true","click",function () {
              _this.fireEvent("alert");
              _this.destory();
          }).delegate(".message_close","click",function () {
              _this.fireEvent("close");
              _this.destory();
          });

          /*遮罩点击事件*/
          if(this.config.maskHandler){
              this.eleMask.on("click",function () {
                  _this.destory();
              })
          }
        },

        destructor:function () {
            this.eleMask && this.eleMask.remove();
        },

        alert:function (opts) {
            $.extend(true,this.config,opts,{type:'alert',global:"main"});
            this.render();
            return this;
        },
        confirm:function (opts) {
            $.extend(true,this.config,opts,{type:'confirm',global:"main"});
            this.render();
            return this;
        },
        prompt:function (opts) {
            $.extend(true,this.config,opts,{type:'prompt',global:"main"});
            this.render();
            return this;
        },
        common:function (opts) {
            $.extend(true,this.config,opts,{type:'common'});
            this.render();
            return this;
        }
    })

    return{
        Message : Message
    }
});