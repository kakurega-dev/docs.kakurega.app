<template>
    <div v-if="!frontmatter['disable-header']" :class="$style.root">
        <div v-if="frontmatter.icon" :class="$style.icon" @click="increment">
            <div :class="{ [$style.rotate]: isRotating }">
                <i :class="`ti ti-${frontmatter.icon}`"></i>
            </div>
        </div>
        <h1 :class="$style.title">{{ frontmatter.title }}</h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const counter = ref(0)
const isRotating = ref(false)

const increment = () => {
    counter.value++
    if (counter.value >= 11 && !isRotating.value) {
        isRotating.value = true
        setTimeout(() => {
            isRotating.value = false
            counter.value = 0
        }, 1000)
    }
}
</script>

<style module lang="scss">
.root {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
}

.icon {
    color: var(--vp-c-text-1);
    background: rgba(from var(--vp-c-text-1) r g b / 0.1);
    padding: 12px;
    font-size: 2rem;
    border-radius: 15%;
}

.title {
    font-weight: 600;
    line-height: 40px;
    font-size: 28px;

    @media (min-width: 768px) {
        font-size: 32px;
    }
}

.rotate {
    animation: rotate 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>