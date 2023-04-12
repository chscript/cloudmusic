<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {
    TodayOutline,
    MicOutline,
    AlbumsOutline,
    CellularOutline,
} from '@vicons/ionicons5'
</script>

<template>
    <div class="menubar">
        <div>
            <n-icon size="28">
                <TodayOutline />
            </n-icon>
            <span>每日推荐</span>
        </div>
        <div>
            <n-icon size="28">
                <MicOutline />
            </n-icon>
            <span>私人FM</span>
        </div>
        <div>
            <n-icon size="28">
                <AlbumsOutline />
            </n-icon>
            <span>歌单</span>
        </div>
        <div>
            <n-icon size="28">
                <CellularOutline />
            </n-icon>
            <span>排行榜</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menubar {
    display: flex;
    justify-content: space-between;
    margin: 20px 16px 10px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #d43c33;

        span {
            color: #909399;
        }
    }
}
</style>