require.config({
  paths:{
    jquery:"jquery-2.1.1",
    mess:"component_message",
    com:"common"
  }
})

require(['jquery','mess'],function($,mess){

   $('body').on('click','#messAlert',function () {
        var messA = new mess.Message();
        messA.alert({
            maskBgColor : "#640125",
            maskOpacity : "0.7"
        });
    });

   $('body').on('click','#messPrompt',function () {
       var messC = new mess.Message();
       messC.prompt({
           skinName : 'messageSkin_a',
           width : "400",
           height : "240"
       });
   });

    $('body').on('click','#messConfirm',function () {
        var messC = new mess.Message();
        messC.confirm({
            skinName : 'messageSkin_a',
            width:"460",
            height:"200",
            top:'0',
            left:'0',
            hasAnimation:false,
            title:"温馨提示",
            maskBgColor:"#df7163",
        });
    });

    $('body').on('click','#messCommon',function () {
        var messC = new mess.Message();
        messC.common({
            skinName : 'messageSkin_a',
            width:"400",
            height : "200",
            hasAnimation : false,
            title : "我是一个傲娇的弹出框"
        });
    });
})
