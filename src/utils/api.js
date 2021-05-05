import request from './request'


const baseUrl="http://157.122.54.189:9088/image"


//请求首页-推荐数据
export const getRecommendListApi=data=>{
    return request({
        url:baseUrl+"/v3/homepage/vertical",
        data
    })
}
//请求首页-分类数据
export const getImgCateoryApi=()=>{
    return request({
        url:baseUrl+"/v1/vertical/category",
   
    })
}
//请求首页-专辑数据
export const getAlbumListApi=data=>{
    return request({
        url:baseUrl+"/v1/wallpaper/album",
        data
    })
}
//请求专辑详情数据
export const getAlbumDetailApi=(data,id)=>{
    return request({
        url:baseUrl+`/v1/wallpaper/album/${id}/wallpaper`,
        data
    })
}
//请求图片详情-评论数据
export const getImgDetailCommentsApi=(data,id)=>{
    return request({
        url:baseUrl+`/v2/wallpaper/wallpaper/${id}/comment`,

    })
}
//请求图片分类数据
export const getImgCateoryListApi=(data,id)=>{
    return request({
        url:baseUrl+`/v1/vertical/category/${id}/vertical`,
        data
   
    })
}