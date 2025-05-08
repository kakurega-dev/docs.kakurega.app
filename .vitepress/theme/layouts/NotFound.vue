<template>
    <div :class="$style.container">
        <img :class="$style.notfoundImage" src="/assets/not-found.png" alt="Not Found" />
        <h1>404</h1>
        <p>お探しのページが見つかりませんでした...</p>
        <div :class="$style.spacer"></div>
        <VPButton theme="alt" text="ホームに戻る" href="/" />
    </div>
</template>

<script setup lang="ts">
import { VPButton } from 'vitepress/theme'
</script>

<style lang="scss" module>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20vh 5vw;
    gap: 1rem;

    h1 {
        font-size: 3rem;
        line-height: 4rem;
        font-weight: bold;
    }
}

.spacer {
    margin: 1rem 0;
}

.notfoundImage {
    width: max(10vmax, 10rem);
    border-radius: 50%;
}
</style>