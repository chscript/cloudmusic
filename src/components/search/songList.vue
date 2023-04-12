<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { usePlayListStore } from '../../store/playList'
import { useRouter } from 'vue-router'

const router = useRouter()
const pl = usePlayListStore()

const songList = ref()

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
</template>

<style scoped lang="scss">
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
</style>