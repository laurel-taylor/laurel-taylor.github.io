<template>
  <div>
    <h1 v-if="step===1">Lord of the Rings: Fellowship of the Ring Quiz</h1>

    <match
        v-if="step===1"
        title="Match these Men with their picture"
        description="(we're gonna call Aragorn a man even tho he's Numenorean #closeenough)"
        :options="men"
        :show-options="true"
        key="match_1"
        @answers="handleAnswers"
    />

    <match
        v-else-if="step===2"
        title="Match these Elves with their picture"
        :options="elves"
        :show-options="true"
        key="match_2"
        @answers="handleAnswers"
    />

    <match
        v-else-if="step===3"
        title="Match these Hobbits with their picture"
        :options="hobbits"
        :show-options="true"
        key="match_3"
        @answers="handleAnswers"
    />

    <match
        v-else-if="step===4"
        key="match_4"
        title="Name these members of the fellowship:"
        description="No helpful options this time"
        :options="fellowship"
        :show-options="false"
        @answers="handleAnswers"
    />

    <match
        v-else-if="step===5"
        key="match_5"
        title="Forces of evil"
        description="Name those baddies"
        :options="badguys"
        :show-options="true"
        @answers="handleAnswers"
    />
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

    props: {
        step: Number,
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
        badguys() {
            return [
                char.sauron,
                char.saruman,
                char.orc,
                char.urukhai,
                char.ringwraith,
            ];
        },
    },

    methods: {
        handleAnswers(answers) {
            this.$emit('answers', { ...answers, step: this.step });
        },
    },
};
</script>
