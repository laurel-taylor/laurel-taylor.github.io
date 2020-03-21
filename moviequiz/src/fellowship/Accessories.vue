<template v-slot="slotProps">
  <div class="accessories">
    <h1>Accessories</h1>

    <match
        v-if="step===1"
        title="Who got the gift?"
        description="Galadriel gave out some stuff. Who got what?"
        :options="gifts"
        :show-options="true"
        :show-picture-options="true"
        key="acc_1"
        @answers="handleAnswers"
    />

    <multiple-choice
        v-if="step===2"
        title="Name all the things that Boromir carries:"
        :picture="boromirPic"
        decription="Choose multiple"
        :options="boromirAccessories"
        key="acc_1"
        @answers="handleAnswers"
    />

    <open-ended
        description="These are open-ended; take a guess if you don't know"
        v-if="step===3"
        :options="accessories"
        key="acc_3"
        @answers="handleAnswers"
    />

    <multiple-choice
        v-if="step===4"
        title="Name all the people who have been a Ringbearer (keeper of the One Ring):"
        :picture="onering"
        :options="carriers"
        key="acc_4"
        @answers="handleAnswers"
    />
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep';
import Match from '@/components/Match';
import MultipleChoice from '@/components/MultipleChoice';
import OpenEnded from '@/components/OpenEnded';
import { gifts } from '@/fellowship/constants';
import boromirPic from '@/assets/pics/boromir.png';
import stingPic from '@/assets/pics/sting.png';
import narsilPic from '@/assets/pics/narsil.png';
import onering from '@/assets/pics/onering.png';

export default {
    name: 'accessories',

    components: {
        Match,
        MultipleChoice,
        OpenEnded,
    },

    props: {
        showBack: Boolean,
        step: Number,
    },

    data() {
        return {
            boromirPic,
            onering,
        };
    },

    computed: {
        gifts() {
            return [
                gifts.hairs,
                gifts.bow,
                gifts.rope,
                gifts.daggers,
                gifts.light,
            ];
        },

        boromirAccessories() {
            return [
                {
                    id: "shield",
                    label: "A shield",
                    correct: true,
                },
                {
                    id: "sword",
                    label: "A sword",
                    correct: true,
                },
                {
                    id: "ring",
                    label: "A ring of power",
                    correct: false,
                },
                {
                    id: "horn",
                    label: "A horn",
                    correct: true,
                },
                {
                    id: "arrows",
                    label: "A whole bunch of arrows right in his guts",
                    correct: true,
                },
            ]
        },

        accessories() {
            return [
                {
                    id: 'sting',
                    question: "What is Frodo's sword's name?",
                    picture: stingPic,
                    answer: "Sting",
                    accepted: ["sting"],
                },
                {
                    id: 'sting_special',
                    question: "Why is his sword special?",
                    answer: "It was made by elves and glows blue when orcs are close.",
                    accepted: ["blue", "glows", "orcs"],
                },
                {
                    id: 'isildur_sword',
                    question: "What is Isildur's sword's name? Why is it special?",
                    picture: narsilPic,
                    answer: "Narsil, it's the one that struck down Sauron the first time. It's probably made by elves or some shit, but it's a fancy sword fit for a king and everyone knows it.",
                    accepted: ["narsil", "king", "aragorn", "Sauron"],
                },
            ]
        },

        carriers() {
            return [
                {
                    id: "Sauron",
                    label: "Sauron",
                    correct: true,
                },
                {
                    id: "Isildur",
                    label: "Isildur",
                    correct: true,
                },
                {
                    id: "Gandalf",
                    label: "Gandalf",
                    correct: false,
                },
                {
                    id: "Elrond",
                    label: "Elrond",
                    correct: false,
                },
                {
                    id: "Gollum",
                    label: "Gollum",
                    correct: true,
                },
                {
                    id: "Saruman",
                    label: "Saruman",
                    correct: false,
                },
                {
                    id: "Bilbo Baggins",
                    label: "Bilbo Baggins",
                    correct: true,
                },
                {
                    id: "Frodo Baggins",
                    label: "Frodo Baggins",
                    correct: true,
                },
                {
                    id: "Maridoc Brandybuck",
                    label: "Maridoc Brandybuck",
                    correct: false,
                },
            ]
        }
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
