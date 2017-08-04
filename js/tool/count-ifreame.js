$(document).ready(function(){
    // 这里是工具统计开始

    // ifreame点击开始

    // 点击小于2M
    $('#tabWechat').on('click',function(){
        _hmt.push(['_trackEvent', '点击小于2M', 'click', '切换小于2M']);
    });
    // 点击小于1M
    $('#tabMotion').on('click',function(){
        _hmt.push(['_trackEvent', '点击小于1M', 'click', '切换小于1M']);
    });
    // 点击切换其他
    $('#tabCustom').on('click',function(){
        _hmt.push(['_trackEvent', '其他数值按钮并确定', 'click', '切换其他']);
    });
    // 点击200K
    $('#Custom200KBtn').on('click',function(){
        _hmt.push(['_trackEvent', '点击200K', 'click', '200K']);
    });
    // 点击500K
    $('#Custom500KBtn').on('click',function(){
        _hmt.push(['_trackEvent', '点击500K', 'click', '500K']);
    });
    // 点击3M
    $('#Custom3MBtn').on('click',function(){
        _hmt.push(['_trackEvent', '点击3M', 'click', '3M']);
    });
    // 点击5M
    $('#Custom5MBtn').on('click',function(){
        _hmt.push(['_trackEvent', '点击5M', 'click', '5M']);
    });
    // 点击确定
    $('.PopCustomConfirmBtn').on('click',function(){
        _hmt.push(['_trackEvent', '点击确定', 'click', '确定']);
    });
    // 点击上传图片个数
    $('.CenterContainer').on('click',function(){
        _hmt.push(['_trackEvent', '拖拽或点击上传图片个数', 'click', '上传图片次数']);
    });
     // 上传图片成功次数
    $('.CenterContainer').on('click',function(){
        _hmt.push(['_trackEvent', '拖拽或点击上传图片个数', 'click', '上传图片次数']);
    });
    // 图片预览
    $('.seeButton').on('hover',function(){
        _hmt.push(['_trackEvent', '用户移动到图片预览的次数', 'hover', '图片预览次数']);
    });
    // 收藏我门 
    $('.ShareSaveButton').on('click',function(){
        _hmt.push(['_trackEvent', '用户点击收藏我们按钮次数', 'hover', '收藏我们次数']);
    });
    // 微信分享
    $('#shareToWechatBtn').on('click',function(){
        _hmt.push(['_trackEvent', '用户点击微信次数', 'hover', '微信分享']);
    });
    // 微博分享
    $('#shareToWeboBtn').on('click',function(){
        _hmt.push(['_trackEvent', '用户点击微博次数', 'hover', '微博分享']);
    });
    // qq分享
    $('#shareToQQBtn').on('click',function(){
        _hmt.push(['_trackEvent', '用户点击qq次数', 'hover', 'qq分享']);
    });
    // 空间分享
    $('#shareToQZoneBtn').on('click',function(){
        _hmt.push(['_trackEvent', '用户点击空间次数', 'hover', '空间分享']);
    });
    // ifreame点击结束

    // js这里结束
});