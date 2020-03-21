<template>
    <div class="buttons" v-if="step!==steps+1">
        <div class="start">
            <button v-if="step>1" @click="$emit('back')">Back</button>
        </div>

        <slot class="middle"/>

        <button class="end" v-if="step<=steps" @click="$emit('next')">
            <span v-if="step===steps">Finish</span>
            <span v-else>Next</span>
        </button>
    </div>
    <div class="again" v-else>
        <button class="again" @click="$emit('again')">Start over</button>
    </div>
</template>

<script>
export default {
    name: 'quiz-buttons',

    props: {
        showBack: Boolean,
        steps: Number,
        step: Number
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/main";
    .start {
        grid-area: start;
    }
    .middle {
        grid-area: middle;
    }
    .end {
        grid-area: end;
    }

    .buttons {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: 'start middle middle middle end';
        align-items: center;
    }
    .again {
        text-align: center;
    }

    @media($small) {
        .again {
            width: 100%;
        }
        .buttons {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: 'start . end'
                                'middle middle middle';
        }

        .middle {
            margin-top: 2rem;
        }
    }
</style>
