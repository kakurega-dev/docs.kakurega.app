<template>
    <div :class="$style.root">
        <template v-for="(articles, i) in pages" :key="i">
            <div :class="$style.header">
                <div :class="$style.title">
                    <div v-if="articles.icon" :class="$style.icon">
                        <i :class="`ti ti-${articles.icon}`"></i>
                    </div>
                    {{ articles.title }}
                </div>
                <div v-if="articles.description" :class="$style.description">
                    {{ articles.description }}
                </div>
            </div>
            <div :class="$style.container">
                <HomeCard v-for="(card, j) in articles.contents" :key="j" :link="card.url" :title="card.title"
                    :icon="card.icon" :description="card.description" :class="$style.card" :lightMode="true" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import HomeCard from '@/Card.vue'
import { data } from '@@/loader/pages.data'

const props = defineProps<{
    parent: string
}>()

const pages = data[props.parent]
</script>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.title {
    display: flex;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 500;
    align-items: center;
}

.icon {
    font-size: 1.75rem;
}

.container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
}

.description {
    font-size: 0.9rem;
}

.card {
    flex-grow: 1;
}
</style>