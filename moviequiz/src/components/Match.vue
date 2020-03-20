<template>
  <div class="match">
      <h2>{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <h4 v-if="showOptions">Options:</h4>
      <ul v-if="showOptions" class="options">
        <li
            v-for="(option) in myOptions"
            :class="['option',{ 'crossed': option.crossed }]"
            :key="option.name"
            @click="crossOption(option)"
        >
            {{ option.name }}
        </li>
      </ul>


      <ul class="pictures">
        <li class="pic" v-for="(option) in myAnswers" :key="option.name">
            <div class="image-wrapper">
                <img :src="option.picture" />
            </div>

            <div>
                Your answer: <input
                    :class="['match-input', { 'show-answers': showAnswers, correct: isCorrect(option) }]"
                    type="text"
                    v-model="option.myAnswer"
                />
                <div class="answer" v-if="showAnswers">
                    Answer: {{ option.name }}
                </div>
            </div>
        </li>
      </ul>

      <div class="show-answers">
        <show-answers
            :show="showAnswers"
            @show="setShowAnswers"
            :total="options.length"
            :total-correct="correctAnswers"
        />
      </div>
  </div>
</template>

<script>
import ShowAnswers from '@/components/ShowAnswers';
import {shuffleArray} from '@/components/utils';

export default {
    name: 'match',
    components: {
        ShowAnswers,
    },

    props: {
        title: String,
        description: {
            type: String,
            default: '',
        },
        options: Array,
        showOptions: Boolean,
    },

    watch: {
        options() {
            this.myAnswers = shuffleArray(this.options);
            this.myOptions = shuffleArray(this.options);
            this.showAnswers = false;
            this.correctAnswers = 0;
        },
    },

    data() {
        return {
            myAnswers: shuffleArray(this.options),
            myOptions: shuffleArray(this.options),
            showAnswers: false,
            correctAnswers: 0,
        };
    },

    methods: {
        isCorrect({accepted, myAnswer}) {
            const answer = myAnswer && myAnswer.split(' ')[0] || '';
            return accepted.indexOf(answer.trim().toLowerCase()) >= 0;
        },

        crossOption(option) {
            this.$set(option, 'crossed', option.crossed ? false :true);
        },

        getCorrectAnswers() {
            this.correctAnswers = 0;
            this.myAnswers.forEach((answer) => {
                if (this.isCorrect(answer)) {
                    this.correctAnswers++;
                }
            });
        },

        setShowAnswers() {
            this.getCorrectAnswers();
            this.showAnswers = !this.showAnswers;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/main";

    .match {
        margin-top: 1.5rem;
    }

    .description {
        color: #888;
    }

    input.show-answers {
        border-color: $red;

        &.correct {
            border-color: $green;
            background-color: $lightgreen;
        }
    }

    .image-wrapper {
        max-width: 200px;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .pictures {
        margin-top: 1.5rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;

        @media($small) {
            grid-template-columns: 1fr 1fr;
        }
    }

    li.pic {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .show-answers {
        display: flex;
        justify-content: flex-end;
    }

    .option {
        font-size: 1.5rem;
        cursor: pointer;

        &.crossed {
            text-decoration: line-through;
        }
    }
</style>
