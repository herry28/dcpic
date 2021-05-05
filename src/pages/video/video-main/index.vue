<template>
    <scroll-view
        scroll-y
        enable-flex
        class="video-main"
        @scrolltolower="handleScrollToLower"
    >
     <view 
        class="video-item" 
        v-for="item in videowps" 
        :key="item.id"
        @click="goVideoPlay(item)"
     >
         <image :src="item.img" mode="widthFix" />
     </view>   
    </scroll-view>
</template>

<script>
export default{
    data(){
        return {
            videowps:[],//视频列表
            hasMore:true,//是否  还有更多数据
        }
    },
    props:{
        videoObj:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch:{
        videoObj(){
            console.log(this.videoObj)
            this.videowps=[]//清空数据
            this.getVideoList()
        }
    },
    mounted(){
        console.log(this.videoObj)
        this.getVideoList()
    },
    methods:{
        async getVideoList(){
            const res=await this.request({
                url:this.videoObj.url,
                data:this.videoObj.params
            })
            console.log(res)
            if(res.res.videowp.length===0){
                this.hasMore=false
                uni.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                });
                return
            }
            this.videowps=[...this.videowps,...res.res.videowp]
        },
        handleScrollToLower(){
            if(this.hasMore){
                this.videoObj.params.skip += this.videoObj.params.limit
                this.getVideoList()
            }else{
                uni.showToast({
                    title: '没有更多数据了',
                    icon:'none'
                });
            }
        },
        // 跳转到视频播放组件
        goVideoPlay(item){
            // 将视频数据存储到全局共享中
             getApp().globalData.video=item
            //  跳转到视频播放页面
             uni.navigateTo({
                  url: '/pages/videoPlay/index'
             });
            
              
        }
    }
}
</script>

<style scoped lang='scss'>
.video-main{
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
}
.video-item{
    width:33.33%;
    border: 5rpx solid #fff;
}
</style>
