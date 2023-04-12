<script setup lang="ts">
import { NIcon, NInput, NTabs, NTabPane } from 'naive-ui'
import {
    ChevronBackOutline,

    StatsChart,
    EllipsisVerticalSharp,

} from '@vicons/ionicons5'
import { onMounted, watch, ref } from 'vue'

import { getSearchResult } from '.././http/api/search'
import { usePlayListStore } from '.././store/playList'
import { useRouter } from 'vue-router'
const router = useRouter()

const keyWord = ref() // 搜索词
const keyWordList = ref() // 历史搜索

const songList = ref()
const playList = ref()
const artist = ref()
const album = ref()

const inputKeyWord = async () => {
    active.value = -1 // 搜索后重置

    const a = await getSearchResult(`${keyWord.value}`, 1) // 歌曲
    songList.value = a.result.songs;

    const b = await getSearchResult(`${keyWord.value}`, 1000) // 歌单
    playList.value = b.result.playlists;

    const c = await getSearchResult(`${keyWord.value}`, 100) // 歌手
    artist.value = c.result.artists;

    const d = await getSearchResult(`${keyWord.value}`, 10) // 专辑
    album.value = d.result.albums;
}

// 歌曲
const pl = usePlayListStore()
const songId = ref()
const active = ref()
const getSongData = (index: number): void => {
    pl.playList = songList.value
    if (songId.value !== pl.playList[index].id) {
        pl.index = index
    }
    songId.value = pl.playList[index].id
}
watch(pl, () => {
    active.value = pl.index
})
watch(() => router.currentRoute.value.path, (newValue) => {
    if (newValue === '/') {
        active.value = -1 // 返回后重置
    }
}, { immediate: true })
</script>

<template>
    <div class="search-navbar">
        <n-icon size="28">
            <router-link to="/">
                <ChevronBackOutline />
            </router-link>
        </n-icon>
        <n-input round type="text" placeholder="请输入歌曲内容" v-model:value="keyWord" @keydown.enter="inputKeyWord" />
    </div>
    <!-- <div class="search-dytag">

    </div> -->
    <div class="search-result">
        <n-tabs type="line" class="custom-tabs" justify-content="space-evenly">
            <n-tab-pane name="音乐" display-directive="show:lazy" tab="音乐">

                <div class="detail-item" v-for="(song, index) in songList" @click="getSongData(index)">
                    <div class="detail-num">
                        <div :class="active === index ? 'active' : ''">
                            <span v-if="active !== index">
                                {{ index + 1 }}
                            </span>
                            <n-icon size="20" v-else="active === index">
                                <StatsChart />
                            </n-icon>
                        </div>
                    </div>
                    <div class="detail-msg">
                        <p :class="active === index ? 'active' : ''">
                            {{ song.name }}
                        </p>
                        <p>
                            <span>
                                {{ song.ar[0].name }} - {{ song.al.name }}
                            </span>
                        </p>
                    </div>
                    <div class="detail-icon">
                        <n-icon size="20">
                            <EllipsisVerticalSharp />
                        </n-icon>
                    </div>
                </div>

            </n-tab-pane>
            <n-tab-pane name="歌单" display-directive="show:lazy" tab="歌单">

                <div class="playlist-item" v-for="item in playList">
                    <router-link :to="{ path: '/detail', query: { id: item.id } }">
                        <div>
                            <img v-lazy="item.coverImgUrl">
                            <p>
                                {{ item.name }}
                            <p>{{ item.trackCount }}首音乐 by {{ item.creator.nickname }}，播放{{ item.playCount }}次</p>
                            </p>
                        </div>
                    </router-link>
                </div>

            </n-tab-pane>
            <n-tab-pane name="歌手" display-directive="show:lazy" tab="歌手">
                <div class="artist-item" v-for="item in artist">
                    <div>
                        <img v-lazy="item.picUrl">
                        <p>
                            {{ item.name }} <span v-show="item.alias[0] !== undefined">({{ item.alias[0] }})</span>
                        </p>
                    </div>
                </div>
            </n-tab-pane>
            <n-tab-pane name="专辑" display-directive="show:lazy" tab="专辑">
                <div class="playlist-item" v-for="item in album">
                    <div>
                        <img v-lazy="item.picUrl">
                        <p>
                            {{ item.name }}
                        <p>{{ item.artist.name }}</p>
                        </p>
                    </div>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<style scoped lang="scss">
.search-navbar {
    height: 60px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;

    .n-icon {
        padding: 0 10px;
    }

    .n-input {
        flex: 1;
        margin: 0 20px 0 0;
        // background-color: #F2F6FC;
    }

    span {
        padding: 0 10px;
        font-size: 16px;
    }
}

.search-dytag {
    height: 80px;
    margin: 10px 20px;
}

.search-result {}

.detail-item {
    display: flex;
    margin: 10px 0;

    .active {
        color: #d43c33;
    }

    .detail-num {
        font-size: 18px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #606266;
    }

    .detail-msg {
        flex: 1;
        cursor: pointer;

        p {
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;

            span {
                color: #606266;
                font-size: 12px;
            }
        }
    }

    .detail-icon {
        color: #606266;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.artist-item {
    margin: 14px;

    div {
        display: flex;
        align-items: center;

        img {
            margin: 0 12px 0 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }

        p {
            width: 80%;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            span {
                color: #606266;
            }
        }
    }

}

.playlist-item {
    margin: 14px;

    div {
        display: flex;
        align-items: center;

        img {
            margin: 0 12px 0 0;
            width: 48px;
            height: 48px;
            border-radius: 8px;
        }

        p {
            width: 80%;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            p {
                color: #606266;
                font-size: 12px;
            }
        }
    }

}
</style>