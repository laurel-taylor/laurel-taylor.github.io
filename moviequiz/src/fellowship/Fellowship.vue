<template>
  <div class="fellowship">
    <matching
      v-if="step<=matchingSteps"
      :step="step"
      @answers="matchingAnswers"
    />

    <accessories
      v-else-if="step<=matchingSteps + accessoriesSteps"
      :step="step - matchingSteps"
      @answers="accessoriesAnswers"
    />

    <plot
      v-else-if="step<=matchingSteps + accessoriesSteps + plotSteps"
      :step="step - matchingSteps - accessoriesSteps"
      @answers="plotAnswers"
    />

    <div v-else>
      <finish
      :correct="totalCorrect"
      :total="totalAnswered"
      quiz-type="LotR"
      />
    </div>

    <quiz-buttons
      :step="step"
      :steps="matchingSteps + accessoriesSteps + plotSteps"
      @next="handleNext"
      @back="handleBack"
      @again="step=1"
    >

    <ul class="section-jump middle" v-if="step<matchingSteps + accessoriesSteps + plotSteps + 1">
      <li
        :class="[{ active: step<=matchingSteps }]"
      >
        <!-- @click="step=1" -->
        Matching
      </li>

      <li
        :class="[{ active: step<=matchingSteps + accessoriesSteps && step>matchingSteps }]"
      >
        <!-- @click="step=matchingSteps + 1" -->
        Accessories
      </li>

      <li
        :class="[{ active: step>matchingSteps + accessoriesSteps }]"
      >
        <!-- @click="step=matchingSteps + accessoriesSteps + 1" -->
        Plot
      </li>
    </ul>

    </quiz-buttons>
  </div>
</template>

<script>
import Matching from '@/fellowship/Matching';
import Accessories from '@/fellowship/Accessories';
import QuizButtons from '@/components/QuizButtons';
import Plot from '@/fellowship/Plot';
import Finish from '@/components/Finish';

export default {
  components: {
    Matching,
    Accessories,
    Plot,
    QuizButtons,
    Finish
  },

  data() {
    return {
      step: 1,
      matchingSteps: 5,
      accessoriesSteps: 4,
      plotSteps: 3,
      answers: [[], [], []],
    };
  },

  computed: {
    totalCorrect() {
      let total = 0;
      this.answers.forEach((section) => {
        section && section.forEach((step) => {
          if (step) {
            total += step.correct;
          }
        });
      });

      return total;
    },

    totalAnswered() {
      let total = 0;
      this.answers.forEach((section) => {
        section && section.forEach((step) => {
          if (step) {
            total += step.total;
          }
        });
      });

      return total;
    },
  },

  methods: {
    matchingAnswers({ step, correct, total}) {
      this.$set(this.answers[0], step-1, { total, correct })
    },
    accessoriesAnswers({ step, correct, total}) {
      this.$set(this.answers[1], step-1, { total, correct })
    },
    plotAnswers({ step, correct, total}) {
      this.$set(this.answers[2], step-1, { total, correct })
    },

    handleNext() {
      this.step++;
      this.scrollTop();
    },
    handleBack() {
      this.step--;
      this.scrollTop();
    },
    scrollTop() {
      window.scrollTo(0,0);
    }
  },

}
</script>

<style lang="scss" scoped>
@import "~@/styles/main";
  .section-jump {
    display: flex;
    justify-content: space-between;
    color: $gray;
    // cursor: pointer;

    li {
      width: 100%;
      text-align: center;
      border-right: 1px solid $gray;

      &:last-child {
        border-right: none;
      }
    }

    .active {
      color: black;
    }
  }

  @media($small) {
    .fellowship {
      padding: 8px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
