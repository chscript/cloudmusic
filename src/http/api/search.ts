import serviceAxios from "../index"

// 获取搜索结果
export const getSearchResult = (keyword: string, type: number): Promise<any> => {
    return serviceAxios({
        url: `/cloudsearch?keywords=${keyword}&type=${type}&limit=10`,
        method: "GET",
    })
}