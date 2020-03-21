<template>
  <div class="match">
      <h2>{{ title }}</h2>
      <p class="description">{{ description }}</p>

      <h4 v-if="showOptions">Options:</h4>
      <ul v-if="showOptions" :class="['options', {'picture-options': showPictureOptions }]">
        <li
            v-for="(option) in myOptions"
            :class="['option',{ 'crossed': option.crossed }]"
            :key="option.name"
            @click="crossOption(option)"
        >
            <div class="image-wrapper picture-option" v-if="showPictureOptions">
                <img :src="option.pictureOption" />
            </div>
            <div>{{ option.name }}</div>
        </li>
      </ul>


      <ul class="pictures">
        <li class="pic" v-for="(option) in myAnswers" :key="option.name">
            <div class="image-wrapper">
                <img :src="option.picture" />
            </div>

            <div>
                {{ option.answerPrompt || 'Your answer:' }} <input
                    :class="['match-input', { 'show-answers': showAnswers, correct: isCorrect(option) }]"
                    type="text"
                    v-model="option.myAnswer"
                />
                <div class="answer" v-if="showAnswers">
                    {{ option.name }}
                </div>
            </div>
        </li>
      </ul>

      <div class="answer-button">
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
        showPictureOptions: Boolean,
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
            this.$emit('answers', { correct: this.correctAnswers, total: this.options.length });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/main";
@import "~@/styles/questions";

    .pictures,
    .picture-options {
        margin-top: 1.5rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;

        @media($small) {
            grid-template-columns: 1fr 1fr;
        }

        .option {
            font-size: 1rem;
        }
    }

    .pictures {
        padding-top: 1rem;
        border-top: 1px solid $gray;
    }

    .picture-options {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        @media($small) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }

    li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .option {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;

        &.crossed {
            text-decoration: line-through;
        }
    }

    .options:not(.picture-options) {
        list-style-type: disc;
    }
</style>
