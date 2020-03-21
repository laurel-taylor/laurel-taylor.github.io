<template>
    <div class="finish">
        <div :class="['score', color]">{{ score }}%</div>
        <div class="message">
            <p>You got {{ correct }} out of {{ total }} correct!</p>

            <div v-if="color==='perfect'">You're a {{ quizType }} genius!</div>
            <div v-if="color==='green'">You passed!</div>
            <div v-if="color==='yellow'">You did okay!</div>
            <div v-if="color==='red'">Did you even try?!</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'finish',

    props: {
        correct: Number,
        total: Number,
        quizType: String,
    },

    computed: {
        score() {
            const score = this.total ? this.correct/this.total*100 : 0;

            return Math.ceil(score);
        },

        color() {
            if (this.score >= 100) {
                return 'perfect';
            }
            if (this.score > 80) {
                return 'green';
            }

            if (this.score > 45) {
                return 'yellow';
            }

            return 'red';
        }
    },
};
</script>

<style lang="scss" scoped>
.finish {
    margin-top: 1rem;
    text-align: center;
}

.score {
    font-size: 3rem;
}

.message {
    font-size: 2rem;
    margin: 2rem 0;
}
</style>
