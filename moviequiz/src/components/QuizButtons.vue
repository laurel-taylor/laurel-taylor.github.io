<template>
    <div class="buttons">
        <button v-if="step===0 && showBack" @click="$emit('backSection')">Back</button>
        <button v-if="step>0" @click="$emit('back')">Back</button>
        <div v-else>&nbsp;</div>

        <button v-if="step<steps" @click="$emit('next')">Next</button>
        <button v-if="step===steps" @click="$emit('nextSection')">Next</button>
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

<style scoped>
    .buttons {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
    }
</style>
