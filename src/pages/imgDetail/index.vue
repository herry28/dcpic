<template>
  <view>
    <!-- 用户信息开始 -->
    <view class="user-info">
      <view class="user-icon">
        <image :src="imgDetail.user.avatar" mode="widthFix" />
      </view>
      <view class="user-desc">
        <view class="user-name">{{ imgDetail.user.name }}</view>
        <view class="user-time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <!-- 用户信息结束 -->

    <!-- 高清大图开始 -->
    <view class="high-img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image :src="imgDetail.thumb" mode="widthFix" />
      </swiper-action>
    </view>
    <!-- 高清大图结束 -->

    <!-- 点赞、收藏开始 -->
    <view class="user-rank-collect">
      <view class="rank">
        <text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
      </view>
      <view class="collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 点赞、收藏结束 -->

    <!-- 专辑开始 -->
    <view class="album-wrapper" v-if="albums.length">
      <view class="album-title">相关</view>
      <view class="album-list">
        <view class="album-item" v-for="item in albums" :key="item.id">
          <view class="album-cover">
            <image :src="item.cover" mode="aspectFill" />
          </view>
          <view class="album-info">
            <view class="album-info-text">专辑</view>
            <view class="album-info-name">{{ item.name }}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 专辑结束 -->

    <!-- 最热评论 comment hot 开始-->
    <view class="comment hot" v-if="hotComments.length">
      <view class="comment-title-wrapper">
        <text class="iconfont iconhot1"></text>
        <view class="title">最热评论</view>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in hotComments" :key="item.id">
          <!-- 用户信息容器 -->
          <view class="comment-user-wrapper">
            <!-- 用户头像 -->
            <view class="user-icon">
              <image :src="item.user.avatar" mode="widthFix" />
            </view>
            <!-- 用户信息 -->
            <view class="user-info">
              <view class="user-nickname">{{ item.user.name }}</view>
              <view class="user-time">{{ item.cnTime }}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user-badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
                mode=""
              />
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment-content-wrapper">
            <view class="comment-content">{{ item.content }}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 comment hot 结束-->

    <!-- 最新评论 comment new 开始-->
    <view class="comment new" v-if="newComments.length">
      <view class="comment-title-wrapper">
        <text class="iconfont iconpinglun"></text>
        <view class="title">最热评论</view>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in newComments" :key="item.id">
          <!-- 用户信息容器 -->
          <view class="comment-user-wrapper">
            <!-- 用户头像 -->
            <view class="user-icon">
              <image :src="item.user.avatar" mode="widthFix" />
            </view>
            <!-- 用户信息 -->
            <view class="user-info">
              <view class="user-nickname">{{ item.user.name }}</view>
              <view class="user-time">{{ item.cnTime }}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user-badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
                mode=""
              />
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment-content-wrapper">
            <view class="comment-content">{{ item.content }}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 comment new 结束-->

    <!-- 下载图片开始 -->
    <view class="download">
        <view class="download-btn" @click="handleDownload">下载图片</view>
    </view>
    <!-- 下载图片结束 -->
  </view>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn"); //设置语言为中文
import { getImgDetailCommentsApi } from "@/utils/api";
import swiperAction from "@/components/swiperAction";

export default {
  components: {
    swiperAction,
  },
  onLoad() {
    // console.log(getApp().globalData,">>>",this.imgDetail.user.avatar)
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getImgDetail()
  },
  methods: {
    //   获取图片详情评论数据
    async getImgDetailComments() {
      const res = await getImgDetailCommentsApi(this.imgDetail.id);
      this.albums = res.res.album;
      //处理时间为xx天前
      res.res.hot.forEach(
        (item) => (item.cnTime = moment(item.atime * 1000).fromNow())
      );
      res.res.comment.forEach(
        (item) => (item.cnTime = moment(item.atime * 1000).fromNow())
      );
      this.hotComments = res.res.hot;
      this.newComments = res.res.comment;
      console.log(res);
    },
    // 当滑动时触发此函数
    handleSwiperAction(e) {
      /**
       * 1.左滑：e.direction=='left' && this.imgIndex<imgList.length-1 ===> this.imgIndex++
       * 1.右滑：e.direction=='right' && this.imgIndex>0 ===> this.imgIndex--
       *
       */
        const { imgList } = getApp().globalData;
      if (e.direction == "left" && this.imgIndex < imgList.length - 1) {
        //左滑
        this.imgIndex++;
        this.getImgDetail()
      }else if(e.direction=='right' && this.imgIndex>0){
          this.imgIndex--
          this.getImgDetail()
      }else{
          uni.showToast({
              title: '没有更多数据了',
              icon:'none'
          });
      }
    },
    // 获取当前滑动的图片详情对象
    getImgDetail() {
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      // this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
      console.log(getApp().globalData, ">>>", this.imgDetail.user.avatar);
      // 调用-获取图片详情评论数据
      this.getImgDetailComments();
    },
    // 当点击下载时触发
    async handleDownload(){
        /**
         * 0.提示下载中
         * 1.uni.downloadFile：将远程图片下载到小程序的内存中，tempFilePath
         * 2.uni.saveImageToPhotosAlbum：将小程序内存中的文件下载到本地
         * 3.关闭下载中--->提示用户下载成功
         */
        await uni.showLoading({
            title: '下载中'
        });
        const res1=await uni.downloadFile({ url: this.imgDetail.img});
        console.log(res1)
        const {tempFilePath}=res1[1]
        console.log(tempFilePath)
        await uni.saveImageToPhotosAlbum({filePath: tempFilePath});
        await uni.hideLoading();
        await uni.showToast({
            title: '下载成功',
            duration: 2000
        });


    }
  },
  data() {
    return {
      imgDetail: {}, //图片详情
      imgIndex: 0, //图片索引
      albums: [], //专辑
      hotComments: [], //最热评论
      newComments: [], //最新评论
    };
  },
};
</script>

<style scoped lang="scss">
/**用户信息 */
.user-info {
  display: flex;
  padding: 20rpx;
  .user-icon {
    padding: 0 20rpx;
    iamge {
      width: 88rpx;
      border-radius: 50%;
    }
  }
  .user-desc {
    .user-name {
      color: #000;
      font-weight: 600;
    }
    .user-time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
/**点赞、收藏 */
.user-rank-collect {
  display: flex;
  height: 80rpx;
  .rank {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
  .collect {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
}
/**专辑 */
.album-wrapper {
  padding: 20rpx;
  .album-title {
    padding: 10rpx 0;
  }
  .album-list {
    .album-item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 5rpx solid #ccc;
      .album-cover {
        flex: 1;
        image: {
          width: 180rpx;
          height: 180rpx;
        }
      }
      .album-info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album-info-text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .album-info-name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          font-size: 40rpx;
        }
      }
    }
  }
}
/**评论 */
.comment {
  .comment-title-wrapper {
    padding: 15rpx;
    display: flex;
    .iconfont {
      color: red;
      font-size: 36rpx;
    }
    .title {
      font-size: 28rpx;
      font-weight: 600;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .comment-list {
    .comment-item {
      border-bottom: 15rpx solid #eee;
      .comment-user-wrapper {
        display: flex;
        .user-icon {
          width: 15%;
          image {
            width: 90%;
          }
        }
        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          .user-nickname {
            color: #777;
          }
          .user-time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }
        .user-badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }
      .comment-content-wrapper {
        display: flex;
        padding: 30rpx 0;
        .comment-content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }
        .comment-like {
          text-align: right;
        }
      }
    }
  }

  // .comment-list{
  //     .comment-item{
  //         border-bottom: 15rpx solid #eee;
  //         // 用户信息
  //         .comment-user-wrapper{
  //             display: flex;
  //             padding: 20rpx 0;
  //             .user-icon{
  //                 width: 15%;
  //                 display: flex;
  //                 justify-content: center;
  //                 align-items: center;
  //                 image{
  //                     width: 90%;
  //                 }

  //             }
  //             .user-info{
  //                 flex: 1;
  //                 .user-nickname{
  //                     color:#777;
  //                 }
  //                 .user-time{
  //                     color:#ccc;
  //                     font-size: 24rpx;
  //                     padding: 5rpx;
  //                 }
  //             }
  //             .user-badge{
  //                 image{
  //                     width:40rpx;
  //                     height:40rpx;
  //                 }
  //             }
  //         }
  //         评论数据
  //         .comment-content-wrapper{
  //             display: flex;
  //             padding: 30rpx 0;
  //             .comment-content{
  //                 flex: 1;
  //                 padding-left:15%;
  //                 color:#000;
  //             }
  //             .comment-like{
  //                 text-align: right;
  //                 .iconfont{}
  //             }
  //         }
  //     }
  // }
}
.new {
  .iconpinglun {
    color: aqua !important;
  }
}
/**下载图片 */
.download{
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .download-btn{
        width: 90%;
        height: 85%;
        color: #fff;
        background-color: $color;
        font-size: 50rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
