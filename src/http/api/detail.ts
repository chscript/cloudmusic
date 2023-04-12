import serviceAxios from "../index"

// 获取歌单详情
export const getSongDetail = (id: string): Promise<any> => {
    return serviceAxios({
        url: `/playlist/detail?id=${id}`,
        method: "GET",
    })
}

export const getSongList = (id: string): Promise<any> => {
    return serviceAxios({
        url: `/playlist/track/all?id=${id}&limit=30&offset=1`,
        method: "GET",
    })
}