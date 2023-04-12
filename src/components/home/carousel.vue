<script setup lang="ts">
import { NCarousel, NSkeleton } from 'naive-ui'
import { onMounted, ref } from 'vue';
import { getBanner } from '../.././http/api/home'
const banners = ref();
const loading = ref(true)
onMounted(
    async () => {
        const data = await getBanner();
        data.banners.forEach((item: any) => {
            item.pic = item.pic.replace(/^http\:/, "")
        })
        banners.value = data.banners;
        loading.value = false
    }
)
</script>

<template>

    <div class="carousel">
        <n-skeleton v-if="loading" height="160px" width="100%" />
        <n-carousel v-else :space-between="20" dot-type="line" dot-placement="bottom" autoplay>
            <img class="carousel-img" v-for="banner in banners" :src="banner.pic">
        </n-carousel>
    </div>
</template>

<style scoped lang="scss">
.carousel {
    margin: 0px 16px 10px;

    .carousel-img {
        width: 100%;
        height: 160px;
        border-radius: 10px;
    }
}
</style>