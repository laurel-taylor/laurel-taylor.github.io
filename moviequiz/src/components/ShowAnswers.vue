<template>
    <div class="buttons">
        <span :class="['show', color]" v-if="show"> Total correct: {{ totalCorrect }}/{{ total }}</span>

        <button
            type="submit"
        >
            <span v-if="!show">Check</span>
            <span v-else>Hide</span>
            answers
        </button>
    </div>
</template>

<script>
export default {
    name: 'show-answers',

    props: {
        show: Boolean,
        totalCorrect: Number,
        total: Number,
    },

    computed: {
        color() {
            const percent = this.totalCorrect / this.total * 100;

            if (percent > 80) return 'green';
            if (percent > 50) return 'yellow';
            return 'red';
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/main";
    .show {
        font-weight: bold;
        font-size: 1rem;

        margin-right: 1rem;
    }

    button {
        color: black;
        padding: 0.5rem 1rem;
        background-color: $lightgreen;
        margin-bottom: 1rem;
    }
</style>
