<template>
  <view class="video-container">
    <view class="title-wrapper">
      <view class="tabs">
        <!-- tab选项开始 -->
        <uni-segmented-control
          :values="items.map((item) => item.title)"
          :current="current"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
        ></uni-segmented-control>
        <!-- tab选项结束 -->
      </view>
      <view class="iconfont iconsearch"></view>
    </view>

    <!-- 内容区域开始 -->
    <view class="content-wrapper">
      <view v-if="current<4"><video-main :videoObj="{url:items[current].url,params:items[current].params}"></video-main></view>
      <view v-if="current===4"><video-category></video-category></view>
    </view>
    <!-- 内容区域结束 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import videoMain from "./video-main";
import videoCategory from "./video-category";

export default {
  components: {
    uniSegmentedControl,
    videoMain,
    videoCategory,
  },
  data() {
    return {
      items: [
        { title: "推荐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:'hot'} },
        { title: "娱乐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:'hot'} },
        { title: "最新",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:'new'} },
        { title: "热门",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:'hot'} },
        { title: "分类",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",params:{} },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.video-container {
  .title-wrapper {
    position: relative;
    .tabs {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .content-wrapper {
  }
}
</style>
