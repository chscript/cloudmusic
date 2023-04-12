<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {
    StatsChart,
    EllipsisVerticalSharp,

} from '@vicons/ionicons5'
import { useRoute } from 'vue-router'
import { usePlayListStore } from '../.././store/playList'
import { onMounted, watch, ref } from 'vue'
import { getSongList } from '../.././http/api/detail'

const routeId = useRoute().query.id
const pl = usePlayListStore()
const songId = ref()
const songList = ref()
const active = ref()

onMounted(async () => {
    const data = await getSongList(`${routeId}`)
    songList.value = data.songs;
})
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
</script>

<template>
    <div class="detail-list-item" v-for="(song, index) in songList" @click="getSongData(index)">
        <div class="detail-list-num">
            <div :class="active === index ? 'active':''">
                <span v-if="active !== index">
                    {{index + 1}}
                </span>
                <n-icon size="20" v-else="active === index">
                    <StatsChart />
                </n-icon>
            </div>
        </div>
        <div class="detail-list-msg">
            <p :class="active === index ? 'active':''">
                {{song.name}}
            </p>
            <p>
                <span>
                    {{song.ar[0].name}} - {{song.al.name}}
                </span>
            </p>
        </div>
        <div class="detail-list-icon">
            <n-icon size="20">
                <EllipsisVerticalSharp />
            </n-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.detail-list-item {
    display: flex;
    margin: 10px 0;

    .active {
        color: #d43c33;
    }

    .detail-list-num {
        font-size: 18px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #606266;
    }

    .detail-list-msg {
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

    .detail-list-icon {
        color: #606266;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>