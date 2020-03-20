<template>
  <div class="about">
    <match
        v-if="step===0"
        title="Match these Men with their picture"
        description="(we're gonna call Aragorn a man even tho he's Numenorean #closeenough)"
        :options="men"
        :show-options="true"
    />

    <match
        v-else-if="step===1"
        title="Match these Elves with their picture"
        :options="elves"
        :show-options="true"
    />

    <match
        v-else-if="step===2"
        title="Match these Hobbits with their picture"
        :options="hobbits"
        :show-options="true"
    />

    <match
        v-else-if="step===3"
        title="Name these members of the fellowship:"
        :options="fellowship"
        :show-options="false"
    />

    <div class="buttons">
        <button v-if="step>0" @click="step--">Back</button><div v-else>&nbsp;</div>
        <button v-if="step<steps" @click="step++">Next</button>
        <button v-if="step===steps" @click="$emit('next')">Next</button>
    </div>
  </div>
</template>

<script>
import Match from '@/components/Match';
import char from '@/fellowship/characters';

export default {
    name: 'matching',

    components: {
        Match,
    },

    data() {
        return {
            step: 0,
            steps: 3,
        };
    },

    computed: {
        men() {
            return [char.aragorn, char.boromir, char.isildur]
        },
        elves() {
            return [char.legolas, char.elrond, char.arwen, char.galadriel]
        },
        hobbits() {
            return [char.frodo, char.sam, char.bilbo, char.merry, char.pippin]
        },
        fellowship() {
            return [
                char.aragorn,
                char.gimli,
                char.frodo,
                char.merry,
                char.pippin,
                char.boromir,
                char.legolas,
                char.sam,
                char.gandalf,
            ];
        },
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
