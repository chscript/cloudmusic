<script setup lang="ts">
import { NIcon } from 'naive-ui'
import {
    ListCircleOutline,
    SearchCircleOutline,
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const router = useRouter()
const title = ref('')
watch(() => router.currentRoute.value.path, (newValue) => {
    switch (newValue) {
        case '/':
            title.value = '发现'
            break
        case '/follow':
            title.value = '关注'
            break
        case '/mine':
            title.value = '我的'
            break
        default:
            title.value = 'Cloud Music'
    }
}, { immediate: true })
</script>

<template>
    <div class="navbar">
        <div class="navbar-left">
            <n-icon size="32">
                <ListCircleOutline />
            </n-icon>
        </div>
        <div class="navbar-center">
            <p>{{ title }}</p>
        </div>
        <router-link to="/search">
            <div class="navbar-right">
                <n-icon size="32">
                    <SearchCircleOutline />
                </n-icon>
            </div>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.navbar {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: #fff;

    .navbar-left {
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #d43c33;
    }

    .navbar-center {
        flex: 1;
        text-align: center;
        font-size: 18px;
    }

    .navbar-right {
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: #F56C6C;
    }
}
</style>