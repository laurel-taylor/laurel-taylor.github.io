<template>
    <div class="buttons">
        <button v-if="step>1" @click="$emit('back')">Back</button>
        <div v-else>&nbsp;</div>

        <button @click="$emit('next')">Next</button>
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
