<template>
<div id="app">
  <!-- 左侧导航栏：固定 -->
    <leftNav></leftNav>
    <!-- 左侧操作区域 -->
    <div class="main">
        <router-view/>
    </div>

</div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
    name: 'App',
    components: {
        leftNav
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.main{
  /* 浮动 */
  float: left;
  /* 设置宽度，注意左边导航栏是5% */
  width: 95%;
  /* 设置背景色 */
  background-color:#eff2f7;
   /*设置高  */
   height: 100%;
   overflow: hidden;


}
</style>
