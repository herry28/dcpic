<template>
  <view>
    <!-- 专辑背景开始 -->
    <view class="album-bg">
      <image :src="album.cover" mode="widthFix" />
      <view class="album-info">
        <view class="album-name">{{ album.name }}</view>
        <view class="album-btn"> + 关注专辑</view>
      </view>
    </view>
    <!-- 专辑背景结束 -->

    <!--专辑信息：作者、头像、描述开始  -->
    <view class="album-info">
      <view class="album-author-info">
        <image :src="album.user.avatar" mode="widthFix" />
        <view class="author-name">{{ album.user.name }}</view>
      </view>
      <view class="album-desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <!--专辑信息：作者、头像、描述结束  -->

    <view class="album-list">
      <view class="album-item" v-for="(item,index) in wallpapers" :key="item.id">
        <go-img-detail :list="wallpapers" :index="index">
          <image
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          />
        </go-img-detail>
      </view>
    </view>
  </view>
</template>

<script>
import { getAlbumDetailApi } from "../../utils/api";
import goImgDetail from "@/components/goImgDetail";

export default {
  components: {
    goImgDetail,
  },
  data() {
    return {
      id: "", //专辑详情id
      albumDetailParams: {
        //请求专辑详情的参数对象
        limit: 30,
        order: "new",
        skip: 0,
        first: 1, //1-第一次请求数据，返回值中有album对象；0-返回值中没有album对象
      },
      album: {}, //专辑背景及作者数据
      wallpapers: [], //相册列表数据
      hasMore: false, //是否还有更多数据
    };
  },
  onLoad(options) {
    // this.id = options.id;
    this.id="5d5f8e45e7bce75ae7fb8278"//小熊猫专辑测试id
    this.getAlbumDetail();
  },
  // 当页面触底时触发
  onReachBottom() {
    if (this.hasMore) {
      this.albumDetailParams.skip += this.albumDetailParams.limit;
      this.getAlbumDetail();
    } else {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
      });
    }
  },
  methods: {
    // 获取专辑详情数据
    async getAlbumDetail() {
      const res = await getAlbumDetailApi(this.albumDetailParams, this.id);
      console.log(res);
      if (Object.keys(this.album).length === 0) {
        //判断是否已有数据，没有数据时才赋值
        this.album = res.res.album;
      }
      if (res.res.wallpaper.length === 0) {
        this.hasMore = false;
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
        return;
      }

      this.wallpapers = [...this.wallpapers, ...res.res.wallpaper];
    },
  },
};
</script>

<style lang="scss" scoped>
/**专辑背景 */
.album-bg {
  position: relative;
  image {
  }
  .album-info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    color: #fff;
    padding: 0 10rpx;
    .album-name {
      font-size: 40rpx;
    }
    .album-btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
/**专辑信息 */
.album-info {
  padding: 10rpx;
  .album-author-info {
    display: flex;
    padding: 10rpx 0;
    image {
      width: 50rpx;
    }
    .author-name {
      color: #000;
      margin-left: 15rpx;
    }
  }
  .album-desc {
  }
}
/**相册列表 */
.album-list {
  display: flex;
  flex-wrap: wrap;
  .album-item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>
