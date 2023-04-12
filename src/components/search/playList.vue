<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
const playList = ref()
</script>

<template>
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
</template>

<style scoped lang="scss">
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