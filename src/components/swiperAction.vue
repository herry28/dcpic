
<template>
    <view
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
    >
        <slot></slot>
    </view>
</template>

<script>
export default{
    /**
     * 1.绑定触屏事件touchstart、touchend
     * 2.按下屏幕时：
     * 记录按下的时间Date.now()
     * 记录按下屏幕的坐标x，y
     * 3.用户离开屏幕：
     * 记录用户离开屏幕的时间
     * 记录用户离开屏幕的坐标x，y
     * 根据2个时间，判断用户按下屏幕时长是否合法
     * 根据2对坐标，判断距离是否合法；若距离合法，判断滑动的方向
     * 
     */
    data(){
        return {
            startTime:0,//按下的时间
            startX:0,//按下的x坐标
            statrY:0,//按下的y坐标
        }
    },
    methods:{
        // 用户按下时触发
        handleTouchStart(e){
            this.startTime=Date.now()
            this.startX=e.changedTouches[0].clientX
            this.statrY=e.changedTouches[0].clientY

        },
        // 用户离开时触发
        handleTouchEnd(e){
            const endTime=Date.now()
            const endX=e.changedTouches[0].clientX
            const endY=e.changedTouches[0].clientY
            let direction=""//滑动的方向
            // 判断按下的时长
            if(endTime-this.startTime>2000){
                return
            }
            // 先判断用户滑动的距离
            if(Math.abs(endX-this.startX)>10){//合法，再判断滑动的方向
                direction=endX-this.startX>0?'right':'left'
            }else{
                return
            }
            this.$emit('swiperAction',{direction})
        }
    }

}
</script>

<style scoped lang="scss">

</style>
