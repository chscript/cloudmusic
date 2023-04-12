<script setup lang="ts">
import { NButton, } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { getSongSheetList } from '../.././http/api/home'
const songSheetList = ref()
const loading = ref(true)
onMounted(async () => {
    const data = await getSongSheetList()
    loading.value = false
    songSheetList.value = data.result
})
</script>

<template>
    <div class="recommend">
        <div class="recommend-top">
            <span>推荐歌单</span>
            <n-button size="tiny" round>
                更多 >
            </n-button>
        </div>
        <div class="recommend-box">
            <div class="recommend-box-card" v-for="songSheet in songSheetList">
                <router-link :to="{ path: '/detail', query: { id: songSheet.id } }">
                    <img v-lazy="songSheet.picUrl">
                    <p>{{songSheet.name}}</p>
                </router-link>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.recommend {
    .recommend-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 450;
        padding: 10px 16px 0px;
    }

    // .recommend-box {
    //     display: flex;
    //     overflow-x: auto;
    //     overflow-y: hidden;
    //     padding: 10px 0 14px;

    //     .recommend-box-card {
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         padding: 0 10px 0 0;

    //         img {
    //             width: 109px;
    //             height: 109px;
    //             border-radius: 8px;
    //             display: block;
    //         }

    //         p {
    //             margin: 8px 0 0 0;
    //             font-size: 13px;
    //             overflow: hidden;
    //             text-overflow: ellipsis;
    //             display: -webkit-box;
    //             -webkit-line-clamp: 2;
    //             -webkit-box-orient: vertical;
    //         }
    //     }
    // }
    .recommend-box {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0 0 10px;

        .recommend-box-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
            width: 99px;

            img {
                width: 109px;
                height: 109px;
                border-radius: 8px;
                display: block;
            }

            p {
                margin: 8px 0 0 0;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>