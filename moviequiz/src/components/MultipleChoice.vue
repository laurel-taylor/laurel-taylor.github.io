<template>
  <div>
      <div v-if="picture" class="image-wrapper">
          <img :src="picture" />
      </div>

      <h2>{{ title }}</h2>

      <p v-if="description" class="description">{{ description }}</p>

      <ul :class="['options']">
        <li
            v-for="(option) in myAnswers"
            :class="['option', { 'show-answers': showAnswers, correct: isCorrect(option) }]"
            :key="option.id"
            @click="setAnswer(option)"
        >
          <span :class="['checkbox', { 'checked': option.myAnswer }]" />
          {{ option.label }}
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
        title: String,
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
        isCorrect({correct, myAnswer}) {
            return (!correct && !myAnswer) || myAnswer === correct;
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
            this.$emit('answers', { correct: this.correctAnswers, total: this.options.length });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/main";
@import "~@/styles/questions";

$checkbox-size: 20px;

.option {
    font-size: 1.5rem;
    cursor: pointer;

    &.show-answers {
        color: $red;

        .checkbox.checked {
          background-color: $red;
        }

        &.correct {
          color: $green;

          .checkbox.checked {
            background-color: $green;
          }
        }
    }
}

.checkbox {
  display: inline-block;
  width: $checkbox-size;
  height: $checkbox-size;

  border: 1px solid $blue;

  &.checked {
    background-color: $blue;
  }
}

.image-wrapper {
    @media($small) {
        max-width: 100%;
    }
}
</style>
