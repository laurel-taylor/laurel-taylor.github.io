<template>
  <div>
      <div v-if="picture" class="image-wrapper">
          <img :src="picture" />
      </div>

      <h2 v-if="title">{{ title }}</h2>

      <p v-if="description" class="description">{{ description }}</p>

      <ul class="options">
        <li class="option" v-for="(option) in myAnswers" :key="option.id">
            <div class="image-wrapper" v-if="option.picture">
                <img :src="option.picture" />
            </div>

            <div>{{ option.question }}</div>

            <input
                :class="[{ 'show-answers': showAnswers, correct: isCorrect(option) }]"
                type="text"
                v-model="option.myAnswer"
            />

            <div class="answer" v-if="showAnswers">
                {{ option.answer }}
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
    name: 'multiple-choice',
    components: {
        ShowAnswers,
    },

    props: {
        title:{
            type: String,
            default: '',
        },
        picture: {
            type: String,
            default: '',
        },
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
            this.myAnswers = this.options;
            this.showAnswers = false;
            this.correctAnswers = 0;
        },
    },

    data() {
        return {
            myAnswers: this.options,
            showAnswers: false,
            correctAnswers: 0,
        };
    },

    methods: {
        isCorrect({ accepted, myAnswer }) {
            const answer = myAnswer || '';

            return answer && accepted.some((accept) => {
                const regex = new RegExp(accept, 'gi');
                return answer.match(regex);
            });
        },

        setAnswer(option) {
          this.$set(option, 'myAnswer', option.myAnswer ? false : true);
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
@import "~@/styles/questions";

li {
    margin: 1.5rem 0;
}

.image-wrapper {
    margin-bottom: 1rem;

    @media($small) {
        max-width: 100%;
    }
}
</style>
