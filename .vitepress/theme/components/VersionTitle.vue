<template>
    <div :class="$style.root">
        <h2 :class="$style.header" :id="v.replaceAll('.', '-')">{{ v }}</h2>
        <div :class="$style.container">
            <div :class="$style.iconWithText">
                <i :class="`ti ti-calendar`"></i>
                {{ date }}
            </div>
            <div :class="$style.iconWithText">
                <i :class="`ti ti-tag`"></i>
                <a :href="`https://misskey-hub.net/ja/docs/releases/#_${base.replace(/\D+/g, '')}`" target="_blank"
                    rel="noopener noreferrer">{{ base }}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    v: string,
    date: string,
    base: string,
}>()
</script>

<style module lang="scss">
.root {
    margin-bottom: 16px;
}

.container {
    display: flex;
    gap: 16px;
}

.header {
    margin-bottom: 12px !important;
}

.iconWithText {
    display: flex;
    align-items: center;
    gap: 8px;

    i {
        font-size: 1.2rem;
    }
}
</style>