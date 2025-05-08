<template>
    <div :class="$style.root">
        <HomeCard v-for="(card, index) in contents" :key="index" :link="card.link" :title="card.title" :icon="card.icon" :description="card.description" :class="$style.card" :lightMode="true" />
    </div>
</template>

<script setup lang="ts">
import HomeCard from './Card.vue'

defineProps<{
    contents: {
        title: string
        link: string
        icon?: string
        description?: string
    }[]
}>()
</script>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
}

.card {
    flex-grow: 1;
}
</style>