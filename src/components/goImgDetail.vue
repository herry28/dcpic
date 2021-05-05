<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
 props:{
  // 图片数据
  list:{
    type:Array,
    default(){
      return []
    }  
  },
  // 图片索引
    index:Number
},
mounted(){
  // console.log(this.list)
  // console.log(this.index)
},
methods:{
  handleClick(){
    /**
     * 1.缓存图片数组和图片索引
     * 2.跳转到图片详情页面
     */
     getApp().globalData.imgList=this.list
     getApp().globalData.imgIndex=this.index
     uni.navigateTo({
        url: '/pages/imgDetail/index'
     });
     
       
    
      
  }
}
}
</script>

<style scoped lang="scss">
</style>
