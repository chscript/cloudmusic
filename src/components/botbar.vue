<script setup lang="ts">
import { NIcon, NModal } from 'naive-ui'
import { Vue3Marquee } from 'vue3-marquee'
import { ref, onMounted, watch } from 'vue'
import {
    MusicalNotesOutline,
    CompassOutline,
    PeopleOutline,
    PlayCircleOutline,
    PauseCircleOutline, // 暂停键

    ChevronDownOutline,
    ShareOutline,

    PlaySkipBack,
    PlaySkipForward,

} from '@vicons/ionicons5'
import { getLyric } from '.././http/api/play'
import { usePlayListStore } from '.././store/playList'

const pl = usePlayListStore()
const audio = ref()

const lyricArray = ref() // 歌词数据
const lyricMove = ref() // 歌词滚动
const lyricIndex = ref() // 歌词索引
const switchLyric = ref(false) // 歌词切换


const isShowModal = ref(false) // 框
const showModal = (): void => { // 展示框
    isShowModal.value = false
}

const isPlaySong = ref(false) // 歌曲
const play = (): void => { // 播放歌曲
    if (audio.value.paused) {
        audio.value.play()
        isPlaySong.value = true
    }
    else {
        audio.value.pause()
        isPlaySong.value = false
    }
}

const nextSong = (inc: boolean): void => { // 歌曲切换
    if (inc === true && pl.index !== 29 && pl.index >= 0) {
        pl.index++;
    }
    if (inc === false && pl.index !== 0 && pl.index <= 29) {
        pl.index--;
    }
}

watch(pl, async () => {
    if (typeof (pl.index) === 'number') {
        isPlaySong.value = true
        const data: any = await getLyric(`${pl.playList[pl.index].id}`)
        // console.log(data.lrc.lyric)
        lyricArray.value = data.lrc.lyric.split(/\n/).map((element: string) => {
            let min = element.slice(element.indexOf("[") + 1, element.indexOf(":"))
            let sec = element.slice(element.indexOf(":") + 1, element.indexOf("."))
            let mil = element.slice(element.indexOf(".") + 1, element.indexOf("]"))
            // let time = parseInt(min) * 60 + parseInt(sec) + parseInt(mil) / 1000 // 转化为秒
            let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mil) // 转化为毫秒
            let lyric = element.slice(element.indexOf("]") + 1)
            return { time, lyric }
        }
        ).filter((object: { time: number, lyric: string }) => {
            if (object.lyric !== '') {
                return object
            }
        });
        // console.log(lyricArray.value)
    }
})

let timer: any;
let lock: boolean = false;

// 歌词拖拽
const touchMove = () => {
    lock = true
    clearTimeout(timer)
}
const touchEnd = () => {
    timer = setTimeout(() => { lock = false }, 3000)
}

// 歌曲进度
const timeUpdate = () => {
    try {
        for (let i = 0; i < lyricArray.value.length; i++) {
            // if (Number(audio.value.currentTime.toFixed(3)) > lyricArray.value[i].time  && lyricArray.value[i].time !== '') {
            //     lyricIndex.value = i;
            //     if (lyricMove.value && !(lock)) {
            //         lyricMove.value.scrollTop = i * 45;
            //     }
            // }
            if (audio.value.currentTime * 1000 >= lyricArray.value[i].time) {
                lyricIndex.value = i;
                if (lyricMove.value && !(lock)) {
                    lyricMove.value.scrollTop = i * 45;
                }
            }
        }
    } catch (e) {

    }
}
const ended = () => { // 歌曲结束 做循环播放、列表播放
    if (pl.index === 29) {
        pl.index = 0;
    } else {
        pl.index++
    }
}


onMounted(() => {
    window.addEventListener('click', () => {
        try {
            audio.value.autoplay = true
        } catch (e) {
            // 解决点击完不能自动播放问题
        }
    })
})

</script>
<template>
    <div :class="!(pl.index === 0 && pl.playList[0].id === '') ? 'hasPlay':'noPlay'"></div>
    <n-modal v-model:show="isShowModal" :mask-closable="false">
        <div class="play">
            <img class="play-bg" :src="pl.playList[pl.index].al.picUrl">
            <div class="play-top">
                <n-icon size="28" @click="showModal">
                    <ChevronDownOutline />
                </n-icon>
                <div>
                    <Vue3Marquee>
                        <p>{{pl.playList[pl.index].name}}</p>
                    </Vue3Marquee>
                    <span>{{pl.playList[pl.index].ar[0].name}}</span>
                </div>
                <n-icon size="28">
                    <ShareOutline />
                </n-icon>
            </div>
            <div class="play-center">
                <div class="play-center-img" v-show="!switchLyric" @click="switchLyric = true">
                    <img :src="pl.playList[pl.index].al.picUrl" :class="isPlaySong ? 'img-active':''">
                </div>
                <div class="play-center-lyric" ref="lyricMove" v-show="switchLyric" @click="switchLyric = false"
                    @touchmove="touchMove" @touchend="touchEnd">
                    <p v-for="(lyric,index) in lyricArray" :key="index" :class="lyricIndex === index?'lyric-active':''">
                        {{lyric.lyric}}
                    </p>
                </div>
            </div>
            <div class="play-bottom">
                <n-icon size="32" @click="nextSong(false)">
                    <PlaySkipBack />
                </n-icon>
                <n-icon size="64" v-if="isPlaySong" @click="play">
                    <PauseCircleOutline />
                </n-icon>
                <n-icon size="64" v-else="isPlaySong" @click="play">
                    <PlayCircleOutline />
                </n-icon>
                <n-icon size="32" @click="nextSong(true)">
                    <PlaySkipForward />
                </n-icon>
            </div>
        </div>
    </n-modal>
    <div class="botbar">
        <div class="botbar-play" v-if="!(pl.index === 0 && pl.playList[0].id === '')">
            <audio ref="audio" @timeupdate="timeUpdate" @ended="ended"
                :src="`https://music.163.com/song/media/outer/url?id=${pl.playList[pl.index].id}.mp3`">
            </audio>
            <img @click="isShowModal = true" :src="pl.playList[pl.index].al.picUrl"
                :class="isPlaySong ? 'img-active':''">
            <p @click="isShowModal = true">
                {{pl.playList[pl.index].name}}
                <span> - {{pl.playList[pl.index].ar[0].name}}</span>
            </p>
            <n-icon size="32" v-if="isPlaySong" @click="play">
                <PauseCircleOutline />
            </n-icon>
            <n-icon size="32" v-else="isPlaySong" @click="play">
                <PlayCircleOutline />
            </n-icon>
        </div>
        <!-- <div class="botbar-tab">
            <router-link to="/mine">
                <div>
                    <n-icon size="28">
                        <MusicalNotesOutline />
                    </n-icon>
                    <span>我的</span>
                </div>
            </router-link>
            <router-link to="/">
                <div>
                    <n-icon size="28">
                        <CompassOutline />
                    </n-icon>
                    <span>发现</span>
                </div>
            </router-link>
            <router-link to="/follow">
                <div>
                    <n-icon size="28">
                        <PeopleOutline />
                    </n-icon>
                    <span>关注</span>
                </div>
            </router-link>
        </div> -->
    </div>
</template>
<style scoped lang="scss">
@keyframes rotate_img {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.hasPlay {
    height: 60px;
    // height: 72px; // 不要底部，暂时填坑
}

.noPlay {
    height: 60px;
}

.img-active {
    animation: rotate_img 12s infinite linear;
}

.lyric-active {
    color: #FFF;
}

.play {
    overflow: hidden;
    color: #FFF;
    position: relative;

    .play-bg {
        width: 100%;
        height: 100vh;
        filter: blur(30px) brightness(50%);
        transform: scale(2.0);
    }

    .play-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 60px;

        div {
            margin: 12px 0 0 0;
            width: 180px;

            p {
                text-align: center;
                font-size: 16px;
                margin: 0 10px;
            }

            span {
                text-align: center;
                font-size: 14px;
                color: #909399;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }

        .n-icon {
            padding: 0 10px;
        }
    }

    .play-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);


        .play-center-img {
            width: 100vw;
            height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                height: 200px;
                width: 200px;
                border-radius: 50%;
            }
        }

        .play-center-lyric {
            overflow: scroll;
            font-size: 16px;
            text-align: center;
            width: 100vw;
            height: 320px;
            color: #909399;

            p {
                line-height: 45px;
            }

            p:first-child {
                margin: 160px 0 0;
            }

            p:last-child {
                margin: 0 0 160px;
            }
        }
    }

    .play-bottom {
        position: absolute;
        bottom: 5%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // margin: 0 0 20px 0;

        .n-icon {
            margin: 0 20px;
        }
    }
}

.botbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background-color: #fff;

    .botbar-play {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;

        img {
            width: 32px;
            height: 32px;
            margin: 0 16px 0;
            border-radius: 50%;
            border: 9px solid #000000;
        }

        p {
            width: 240px;
            text-align: left;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            span {
                color: #606266;
                font-size: 14px;
            }

        }

        .n-icon {
            margin: 0 16px 0;
        }

    }

    .botbar-tab {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 72px;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #909399;

            span {
                color: #909399;
            }
        }
    }
}
</style>
