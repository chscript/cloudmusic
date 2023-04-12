import serviceAxios from "../index"

// 获取歌词
export const getLyric = (id: string): Promise<any> => {
    return serviceAxios({
        url: `/Lyric?id=${id}`,
        method: "GET",
    })
}