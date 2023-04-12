import serviceAxios from "../index"

// 获取轮播图数据 
export const getBanner = (): Promise<any> => {
    return serviceAxios({
        url: "/banner?type=2",
        method: "GET",
    })
}

// 获取推荐歌单数据 
export const getSongSheetList = (): Promise<any> => {
    return serviceAxios({
        url: "/personalized?limit=99",
        method: "GET",
    })
}