<template>
  <view class="home-category">
    <navigator
	 class="cate-item" 
	 v-for="item in categorys" 
	 :key="item.id"
	 :url="`/pages/imgCategory/index?id=${item.id}`"
	>
      <image :src="item.cover" mode="aspectFill" />
      <view class="cate-name">{{ item.name }}</view>
    </navigator>
  </view>
</template>

<script>
import { getImgCateoryApi } from "@/utils/api";

export default {
  mounted() {
    uni.setNavigationBarTitle({
      title: "首页-分类",
    });
    this.getImgCategory();
  },
  data() {
    return {
      categorys: [], //图片分类数据
    };
  },
  methods: {
    async getImgCategory() {
      const res = await getImgCateoryApi();
      this.categorys = res.res.category;
      console.log(res, this.categorys);
    },
  },
};
</script>

<style scoped lang="scss">
.home-category {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    width: 33.33%;
    position: relative;
    border-bottom: 5rpx solid #fff;
    image {
      height: 240rpx;
    }
    .cate-name {
      position: absolute;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0,.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 40rpx;
    }
  }
}
</style>
