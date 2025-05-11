<template>
    <VPLink :class="[$style.root, { [$style.lightMode]: props.lightMode }]" :href="props.link">
        <div :class="$style.wrapper">
            <div :class="$style.container">
                <div v-if="props.icon" :class="$style.icon">
                    <i :class="`ti ti-${props.icon}`"></i>
                </div>
                <div :class="$style.title">{{ props.title }}</div>
            </div>
            <p v-if="props.description" :class="$style.description">{{ props.description }}</p>
            <div v-if="!props.lightMode" :class="$style.open">{{ props.title }}を開く <i :class="`ti ti-arrow-right`"></i>
            </div>
        </div>
        <i v-if="props.lightMode" :class="$style.chevron" class="ti ti-chevron-right"></i>
    </VPLink>
</template>

<script setup lang="ts">
import { VPLink } from 'vitepress/theme'

const props = defineProps<{
    link: string,
    title: string,
    icon?: string,
    description?: string,
    lightMode?: boolean
}>()
</script>

<style module lang="scss">
.root {
    --active-color: var(--vp-c-text-1);
    --active-color-bg: rgba(from var(--active-color) r g b / 0.1);

    display: flex;
    align-items: center;
    padding: 24px;
    border: 2px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s, color 0.25s !important;
    min-width: 400px;
    gap: 12px;

    .chevron {
        font-size: 1.5rem;
        color: var(--active-color);
    }

    &:hover {
        border-color: var(--vp-c-brand-3);
        --active-color: var(--vp-c-brand-3);
    }
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    flex-grow: 1;
}

.lightMode {
    &.root {
        min-width: 0;
        padding: 12px;
    }

    .wrapper {
        justify-content: center;
        gap: 6px;
    }

    .container {
        gap: 12px;
    }

    .icon {
        padding: 8px;
        font-size: 1.5rem;
    }

    .title {
        font-size: 1rem;
    }

    .description {
        margin: 0;
        line-height: unset;
        font-weight: 400;
        font-size: 0.9rem;
    }
}

.container {
    display: flex;
    align-items: center;
    gap: 24px;
}

.title {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--active-color);
    transition: color 0.1s;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    text-align: left;
}

.icon {
    padding: 12px;
    transition: all 0.1s;
    background-color: var(--active-color-bg);
    color: var(--active-color);
    font-size: 2rem;
    border-radius: 15%;
}

.description {
    color: var(--vp-c-text-2);
    flex-grow: 1;
    white-space: pre-wrap;
}

.open {
    color: var(--vp-c-brand-3);
    width: 100%;
    text-align: right;
}
</style>