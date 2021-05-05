<template>
  <view class="video-play-wrapper">

    <!-- 背景图片 -->
    <image :src="video.img" mode="" class="bg" />

    <!-- 工具栏开始 -->
    <view class="video-tool">
        <view :class="['iconfont',muted?'iconjingyin':'iconshengyin']" @click="handleMuted"></view>
        <view class="iconfont iconzhuanfa">
            <button open-type="share"></button>
        </view>
    </view>
    <!-- 工具栏结束 -->

    <!-- 视频开始 -->
    <div class="video-wrapper">
        <video :src="video.video" :muted="muted" objectFit="fill"></video>
    </div>
    <!-- 视频结束 -->

    <!-- 下载开始 -->
    <view class="download">
        <view class="download-btn" @click="handleDownLoad">下载高清</view>
    </view>
    <!-- 下载结束 -->
    </view> 
</template>

<script>
export default {
    data(){
        return {
            video:{},//视频对象
            muted:false,//是否静音
        }
    },
  onLoad(){
   this.video=getApp().globalData.video
},
methods:{
    handleMuted(){
        this.muted=!this.muted
    },
    async handleDownLoad(){
        await uni.showLoading({
            title: '下载中'
        });
        const res=await uni.downloadFile({url: this.video.video});
        const {tempFilePath}=res[1]
        await uni.saveVideoToPhotosAlbum({filePath: tempFilePath });
        uni.hideLoading();
        await uni.showToast({
            title: '下载成功',
            duration: 2000
        });
    }
}
}
</script>

<style scoped lang="scss">
.video-play-wrapper{
    position: relative;
    .bg{
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        filter:blur(20px)
    }
    .video-tool{
        height: 80rpx;
        display: flex;
        justify-content: flex-end;
        .iconfont{
            width: 80rpx;
            color: #fff;
            font-size:50rpx;
            border-radius:50%;
            background-color: rgba(0,0,0,.2);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right:20rpx ;

        }
        .iconzhuanfa{
            position: relative;
            button{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
    .video-wrapper{
        display: flex;
        justify-content: center;
        video{
            width: 360rpx;
            height: 600rpx;
        }
    }
    .download{
        display: flex;
        justify-content: center;
        margin-top: 30rpx;
        .download-btn{
            width: 360rpx;
            height: 80rpx;
            border-radius:40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border:1rpx solid #fff;
            background-color: rgba(0,0,0,.6);
        }
    }
}
</style>
