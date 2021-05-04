import request from './request'


//const baseUrl=""


//请求首页-推荐数据
export const getRecommendList=data=>{
    return request({
        url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
        data
    })
}