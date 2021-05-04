<template>
  <scroll-view
    v-if="recommends.length > 0"
    class="home-recommend-container"
    scroll-y
    @scrolltolower="handleScrollToLower"
  >
    <!-- 推荐开始 -->
    <view class="recommend-wrapper">
      <navigator
        class="recommend-item"
        v-for="item in recommends"
        :key="item.id"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <image :src="item.thumb" mode="widthFix" />
      </navigator>
    </view>
    <!-- 推荐结束 -->

    <!-- 月份开始 -->
    <view class="month-wrapper">
      <view class="month-title-wrapper">
        <view class="month-title-info">
          <view class="month-info">
            <text>{{ month.DD }}/</text>
            {{ month.MM }}月
          </view>
          <view class="month-title">{{ month.title }}</view>
        </view>
        <view class="more">更多></view>
      </view>
      <view class="month-content-wrapper">
        <view
          class="month-item"
          v-for="(item, index) in month.items"
          :key="item.id"
        >
          <go-img-detail :list="month.items" :index="index">
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            />
          </go-img-detail>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->

    <!-- 热门开始 -->
    <view class="hots-wrapper">
      <view class="hots-title">
        <text>热门</text>
      </view>
      <view class="hots-content">
        <view class="hots-item" v-for="(item, index) in hots" :key="item.id">
          <go-img-detail :list="hots" :index="index">
            <image :src="item.thumb" mode="" />
          </go-img-detail>
        </view>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>

<script>
import { getRecommendListApi } from "../../../utils/api";
import moment from "moment";
import goImgDetail from "@/components/goImgDetail";


export default {
  components: {
    goImgDetail,
  },
  data() {
    return {
      recommends: [], //推荐列表
      month: {}, //月份
      hots: [], //热门列表
      recommendParams: {
        //请求推荐数据的参数
        limit: 30,
        order: "hot",
        skip: 0, //跳过几条
      },
      hasMore: true, //是否还有下一页数据
    };
  },
  mounted() {
    this.getRecommendList();
    uni.setNavigationBarTitle({
      title: "首页-推荐",
    });
  },
  methods: {
    // 获取推荐数据
    async getRecommendList() {
      const res = await getRecommendListApi(this.recommendParams);
      console.log(res);

      //   判断是否还有下一页数据
      if (res.res.vertical.length === 0) {
        this.hasMore = false;
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
        return;
      }

      if (this.recommends.length === 0) {
        //第一次请求
        //推荐数据
        this.recommends = res.res.homepage[1].items;
        //月份数据
        this.month = res.res.homepage[2];
        // 处理时间戳：改为18号/1月，moment.js
        this.month.MM = moment(this.month.stime).format("MM");
        this.month.DD = moment(this.month.stime).format("DD");
        // console.log(this.month)
      }

      //热门数据
      this.hots = [...this.hots, ...res.res.vertical];
    },
    // 当滚动条触底时触发
    handleScrollToLower() {
      /**1.修改请求参数 skip+=limit
		 2.重新发请求
		 3.请求成功，hots数据叠加	 
		 **/
      if (this.hasMore) {
        //如果还有下一页数据
        this.recommendParams.skip += this.recommendParams.limit;
        this.getRecommendList();
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
.home-recommend-container {
  height: calc(100vh - 36px);
}
// 推荐
.recommend-wrapper {
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}

//月份
.month-wrapper {
  .month-title-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .month-title-info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .month-info {
        text {
          font-size: 36rpx;
        }
      }
      .month-title {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }
    .more {
      font-size: 24rpx;
      color: $color;
    }
  }
  .month-content-wrapper {
    display: flex;
    flex-wrap: wrap;
    .month-item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
// 热门
.hots-wrapper {
  .hots-title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }
  .hots-content {
    display: flex;
    flex-wrap: wrap;
    .hots-item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
