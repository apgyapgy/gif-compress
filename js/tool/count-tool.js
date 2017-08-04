$(document).ready(function(){
    // 这里是工具统计开始
    // gif压缩
    $('.toolCompress').on('click',function(){
        _hmt.push(['_trackEvent', '点击"GIF压缩', 'click', '切换GIF压缩']);
    });
    // gif裁剪
    $('.toolCut').on('click',function(){
        _hmt.push(['_trackEvent', '点击"GIF裁剪', 'click', '切换GIF裁剪']);
    });
    // gif编辑
    $('.toolBeauty').on('click',function(){
        _hmt.push(['_trackEvent', '点击"GIF编辑', 'click', '切换GIF编辑']);
    });
    // js这里结束
});