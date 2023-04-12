import { defineStore } from "pinia";

export const usePlayListStore = defineStore('playList', {
    state: () => {
        return {
            index: 0, // 歌曲序号
            playList: [{
                id: '', // 歌曲id
                name: '', // 歌曲名称
                ar: [{
                    name: '' // 歌手名称
                }],
                al: {
                    name: '', // 专辑名称
                    picUrl: '' // 专辑图片
                }
            }]
        }
    }
})