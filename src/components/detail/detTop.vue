<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {
    ChevronBackOutline,
    SearchOutline,
    HeartOutline,
    ChatbubbleEllipsesOutline,
    ShareOutline,
} from '@vicons/ionicons5'
import { onMounted, ref } from 'vue'
import { getSongDetail } from '../.././http/api/detail'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const routeId = useRoute().query.id
const songDetail = ref()
onMounted(async () => {
    const data = await getSongDetail(`${routeId}`)
    songDetail.value = data.playlist
})
const back = ()=>{
    router.back()
}
</script>

<template>
    <div class="detail-top" v-if="songDetail">
        <img class="detail-top-banner" :src="songDetail.coverImgUrl">
        <div class="detail-top-navbar">
            <n-icon size="28" @click="back">
                    <ChevronBackOutline />
            </n-icon>
            <span>歌单</span>
            <n-icon size="28">
                <SearchOutline />
            </n-icon>
        </div>
        <div class="detail-top-content">
            <img :src="songDetail.coverImgUrl">
            <span>{{ songDetail.name }}</span>
        </div>
        <div class="detail-top-bottom">
            <div>
                <n-icon size="28">
                    <HeartOutline />
                </n-icon>
                {{songDetail.subscribedCount}}
            </div>
            <div>
                <n-icon size="28">
                    <ChatbubbleEllipsesOutline />
                </n-icon>
                {{songDetail.shareCount}}
            </div>
            <div>
                <n-icon size="28">
                    <ShareOutline />
                </n-icon>
                {{songDetail.commentCount}}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.detail-top {
    height: 280px;
    position: relative;
    overflow: hidden;

    .detail-top-banner {
        display: flex;
        width: 100%;
        height: 100%;
        filter: blur(30px) brightness(50%);
        transform: scale(1.5);
    }

    .detail-top-navbar {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        color: #fff;

        span {

            font-size: 18px;
            font-weight: 450;
        }

        .n-icon {
            padding: 0 10px;
        }
    }

    .detail-top-content {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        margin: 0 16px;
        display: flex;
        align-items: center;

        img {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            vertical-align: top;
        }

        span {
            color: #fff;
            font-size: 18px;
            font-weight: 350;
            margin: 0 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    .detail-top-bottom {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        display: flex;
        background-color: #fff;
        border-radius: 36px;
        padding: 0 8px;
        margin: 0 0 16px;

        div {
            display: flex;
            align-items: center;
            margin: 10px;

            .n-icon {
                margin: 0 8px 0 0;
            }
        }
    }
}
</style>