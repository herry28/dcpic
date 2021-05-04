<template>
  <scroll-view
    class="album-container"
    scroll-y
    @scrolltolower="handleScrollToLower"
  >
    <!-- 轮播开始 -->
    <view class="album-swiper">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in banners" :key="item.id">
          <image :src="item.thumb" mode="" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播结束 -->

    <!-- 专辑列表开始 -->
    <view class="album-list">
      <navigator
        class="album-item"
        v-for="item in albums"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album-img">
          <image :src="item.cover" mode="aspectFill" />
        </view>
        <view class="album-info">
          <view class="album-name">{{ item.name }}</view>
          <view class="album-desc">{{ item.desc }}</view>
          <view class="album-btn">
            <view class="album-attension"> + 关注</view>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 专辑列表结束 -->
  </scroll-view>
</template>

<script>
import { getAlbumListApi } from "../../../utils/api";

export default {
  
  data() {
    return {
      albumParams: {
        //请求专辑列表数据的参数对象
        limit: 30,
        order: "new",
        skip: 0,
      },
      banners: [], //轮播图
      albums: [], //专辑列表
      hasMore: true, //是否还有数据
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "首页-专辑",
    });
    this.getAlbumList();
  },
  methods: {
    // 获取专辑列表数据
    async getAlbumList() {
      const res = await getAlbumListApi(this.albumParams);
      console.log(res);
      if (res.res.album.length === 0) {
        //判断是否还有下页数据
        this.hasMore = false;
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
        return;
      }
      if (this.banners.length === 0) {
        //优化，如果没有数据，则赋值
        this.banners = res.res.banner;
      }

      this.albums = [...this.albums, ...res.res.album];
    },
    // 当滚动条触底时触发
    handleScrollToLower() {
      if (this.hasMore) {
        //如果还有下一页数据
        this.albumParams.skip += this.albumParams.limit;
        this.getAlbumList();
      } else {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.album-container {
  height: calc(100vh - 36px);
}
//轮播图
.album-swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
//专辑列表
.album-list {
  padding: 10rpx;
  .album-item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    .album-img {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .album-info {
      flex: 2;
      overflow: hidden;
      padding: 0 10rpx;
      .album-name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }
      .album-desc {
        padding: 10rpx 0;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .album-btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        .album-attension {
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
