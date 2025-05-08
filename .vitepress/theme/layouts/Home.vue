<template>
    <div :class="$style.root">
        <div :class="$style.container">
            <Card
                v-for="(card, index) in homeCards"
                :key="index"
                :link="card.link"
                :title="card.title"
                :icon="card.icon"
                :description="card.description"
                :class="$style.card"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue'

type HomeCards = {
    title: string
    link: string
    icon?: string
    description?: string
}[]

const homeCards: HomeCards = [
    {
        link: '/docs',
        title: 'ドキュメント',
        icon: 'notebook',
        description: '利用規約をはじめとする、サービスとしての隠れ家に関するドキュメントです。',
    }, {
        link: '/references',
        title: 'リファレンス',
        icon: 'brackets-angle',
        description: 'Misskeyフォークとしての隠れ家 (隠れ家フォーク) に関するリファレンスです。',
    },
]
</script>

<style module lang="scss">
.root {
    margin-top: 48px;
    padding: 0 24px;

    @media (min-width: 640px) {
        padding: 0 48px;
    }

    @media (min-width: 960px) {
        padding: 0 64px;
    }
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 24px;
    margin: 0 auto;
    max-width: 1152px;
}

.card {
    flex: 1;
    flex-shrink: 0;
}
</style>