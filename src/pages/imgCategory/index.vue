<template>
     <view class="category-container">
 
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
    <scroll-view enable-flex  scroll-y @scrolltolower="handleScrollToLower" class="content-wrapper">
        <view class="cate-item" v-for="item in verticals" :key="item.id">
            <image :src="item.thumb" mode="widthFix" />
        </view>
    </scroll-view>
    <!-- 内容区域结束 -->
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import {getImgCateoryListApi} from '@/utils/api'

export default {
 components: {
    uniSegmentedControl,
  },
   data() {
    return {
      items: [//tab中的数据
        { title: "最新" ,order:"new"},
        { title: "热门",order:"hot" }
      ],
      current: 0,//tab默认选中项
      id:0,//图片分类id
      params:{//请求参数对象
          limit:30,
          skip:0,
          order:'new'
      },
      verticals:[],//图片分类数组
      hasMore:true,//是否还有下一页数据
    };
  },
  onLoad(options){
      this.id=options.id
      this.getImgCateoryList()
  },
  methods: {
    onClickItem(e) {
        /**
         * 1.切换标题
         * 2.切换order
         * 3.重新发送请求
         */
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
      this.params.order=this.items[e.currentIndex].order//获取tab切换后的数组
      this.params.skip=0//从第一页开始请求
      this.verticals=[]//清空数组
      this.getImgCateoryList()
    },
    // 获取图片分类数据
    async getImgCateoryList(){
        const res=await getImgCateoryListApi(this.params,this.id)
        console.log(res)
        if(res.res.vertical.length===0){
            this.hasMore=false
            uni.showToast({
                title: '没有更多数据了',
                icon: 'none'
            });
            return 
        }
        this.verticals=[...this.verticals,...res.res.vertical]
    },
    // 当滚动条触底时触发
    handleScrollToLower(){
        if(this.hasMore){
            this.params.skip += this.params.limit
            this.getImgCateoryList()
        }else{
              uni.showToast({
                title: '没有更多数据了',
                icon: 'none'
            });
        }
    }
  },
}
</script>


<style scoped lang='scss'>
.category-container{
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
      display: flex;
      flex-wrap: wrap;
      height: calc(100vh - 36px);
      .cate-item{
          width: 33.33%;
          border: 5rpx solid #fff;
          iamge{

          }
      }
  }
}
</style>
