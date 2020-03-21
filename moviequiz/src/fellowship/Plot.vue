<template v-slot="slotProps">
  <div class="accessories">
    <h1 v-if="step===1">Plot</h1>

    <open-ended
        description="These are open-ended; take a guess if you don't know"
        v-if="step===1"
        :options="destroy"
        :key="1"
        @answers="handleAnswers"
    />

    <open-ended
        title="Ring trivia"
        v-if="step===2"
        :options="ring"
        :key="2"
        @answers="handleAnswers"
    />

    <open-ended
        title="Where are they now?"
        v-if="step===3"
        :key="3"
        :options="whereAreThey"
        @answers="handleAnswers"
    />
  </div>
</template>

<script>
import OpenEnded from '@/components/OpenEnded';
import chars from '@/fellowship/characters';

const mtdoom = ["mordor", "doom", "mt doom", "mt. doom", "mount doom", "volcano", "lava"];

export default {
    name: 'plot',

    components: {
        OpenEnded,
    },

    props: {
        showBack: Boolean,
        step: Number,
    },

    computed: {
        destroy() {
            return [
                {
                    id: 'where_headed',
                    question: "Where is the group headed? (They can't simply walk there). Which direction is it?",
                    answer: "Mordor, to the fires of Mt Doom (the volcano). It's to the east.",
                    accepted: [...mtdoom, "east", "mountain", "volcano"],
                },
                {
                    id: 'who_created',
                    question: "Who created the One Ring (that rules them all)? Starts with an S",
                    answer: "Sauron",
                    accepted: ["sauron", "dark lord", "lord"],
                },
                {
                    id: 'where_created',
                    question: "Where was the One Ring created?",
                    answer: "In the fires of Mt Doom (the volcano)",
                    accepted: [...mtdoom],
                },
                {
                    id: 'why_destroyed',
                    question: "Why does the ring need to get destroyed?",
                    answer: `'cause if not it will "cover all the land in a second darkness" or something`,
                    accepted: ["darkness", "bad", "evil", "dark", "doom"],
                },
                {
                    id: 'only_way_destroy',
                    question: "What's the only way to destroy the ring?",
                    answer: 'yeet it into the fire of Mt Doom (the volcano)',
                    accepted: [...mtdoom, 'yeet', 'cast it into the fire'],
                },
            ]
        },

        ring() {
            return [
                {
                    id: 'frodo_ring_put_on',
                    question: "What happens when Frodo puts on the ring?",
                    answer: "he turns invisible / he goes into a ~*shadow realm*~ where only super dark, super scary things can see him",
                    accepted: ["invisible", "invisibility"],
                },
                {
                    id: 'why_puton_bad',
                    question: "Why is that bad?",
                    answer: "the Bad Guys (aka Sauron) can see him when he does",
                    accepted: [...chars.sauron.accepted, "see him", "bad guys", "bad guy", "eye"],
                },
                {
                    id: 'why_puton',
                    question: "Why does he keep putting the ring on anyway??",
                    answer: "invisibility is awesome if you're trying to get away from stuff. Also it keeps ~*whispering*~ at him to do it like Darth Kermit",
                    accepted: ["invisibility", "invisible", "whispering", "ring"],
                },
            ]
        },
        whereAreThey() {
            return [
                {
                    id: 'who_frodo',
                    question: "Who goes with Frodo at the end of the first movie?",
                    answer: "Sam",
                    accepted: [...chars.sam.accepted, "gollum"],
                },
                {
                    id: 'where_saruman',
                    question: "Where is Saruman during first movie?",
                    answer: "In Isengard, in his tower to the South (The Tower Isen)",
                    accepted: ["isengard", "tower", "south", "isen"],
                },
                {
                    id: 'where_merry',
                    question: "Where is Merry and Pippin at the end of the first movie?",
                    answer: `They got captured by Uruk-hai who mistook them for Frodo and Sam, and think they're carrying "something valuable". They're taking them back to Sauruman. Who is in Isengard. They're taking the hobbits..... To Isengard.`,
                    accepted: ["captured", "kidnapped", "captive", "taking the hobbits", "uruk-hai", "saruman", "isengard"],
                },
            ]
        },
    },

    methods: {
        handleAnswers(answers) {
            this.$emit('answers', { ...answers, step: this.step });
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
