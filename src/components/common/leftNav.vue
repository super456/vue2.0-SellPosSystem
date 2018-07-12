<template>
    <div class="left-nav">
        <ul>
            <li>
                <i class="icon iconfont icon-goumai"></i>
                <div>收银</div>
            </li>
             <li>
                <i class="icon iconfont icon-jinrudianpu"></i>
                <div>店铺</div>
            </li> <li>
                <i class="icon iconfont icon-hanbao"></i>
                <div>商品</div>
            </li>
             <li>
                <i class="icon iconfont icon-huiyuanqia"></i>
                <div>会员</div>
            </li>
             <li>
                <i class="icon iconfont icon-zuanshi"></i>
                <div>统计</div>
            </li>
             <li>
                <i class="icon iconfont icon-gongnengjianyi"></i>
                <div>设置</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
/*不用添加scoped，需要都在公共组件页面显示*/
    .left-nav{
        /* 字体颜色 */
        color: #fff;
        /* 图标大小 */
        font-size: 10px;
        /* 基本的高 */
        height: 100%;
        /* 背景色跟饿了么一样 */
        background-color:#409EFF;
        /* 浮动 */
        float: left;
        /* 基本宽度 */
        width: 5%;
        
    }
    .iconfont{
        /* 设置图标大小 */
        font-size: 24px;
    }
    .left-nav ul{
        /* 去除初始化设置的值 */
        margin: 0;
        padding: 0;
    }
    .left-nav li{
        /* 设置列表不带点类型 */
        list-style-type: none;
        /* 设置内容居中 */
        text-align: center;
        /* 设置底边 */
        border-bottom: 1px solid #20a0ff;
        /* 设置图标边距 */
        padding:10px;
    }
</style>

