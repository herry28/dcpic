<template>
  <view class="home-container">
 
    <view class="title-wrapper">
      <view class="tabs">
           <!-- tab选项开始 -->
        <uni-segmented-control
          :values="items.map(item => item.title)"
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
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
    <!-- 内容区域结束 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import homeCategory from "./home-category";
import homeAlbum from "./home-album";
import homeNew from "./home-new";
import homeRecommend from "./home-recommend";
export default {
  components: {
    uniSegmentedControl,
    homeCategory,
    homeAlbum,
    homeNew,
    homeRecommend,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
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
  onLoad(){
  
  }
};
</script>

<style lang="scss" scoped>
.home-container{
  .title-wrapper{
    position: relative;
    .tabs{
      width: 60%;
      margin:0 auto ;
    }
    .iconsearch{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .content-wrapper{

  }
}
</style>
