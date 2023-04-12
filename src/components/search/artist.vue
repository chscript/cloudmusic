<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
const artist = ref()
</script>

<template>
    <div class="artist-item" v-for="item in artist">
        <div>
            <img v-lazy="item.picUrl">
            <p>
                {{ item.name }} <span v-show="item.alias[0] !== undefined">({{ item.alias[0] }})</span>
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
</style>