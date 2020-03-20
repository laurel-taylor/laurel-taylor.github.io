<template>
  <div>
    <matching
      v-if="step<=matchingSteps"
      :step="step"
    />

    <accessories
      v-else-if="step<=matchingSteps + accessoriesSteps"
      :step="step - matchingSteps"
    />

    <plot
      v-else-if="step<=matchingSteps + accessoriesSteps + plotSteps"
      :step="step - matchingSteps - accessoriesSteps"
    />

    <div v-else>
      Nothing here yet!
    </div>

    <quiz-buttons
        :step="step"
        :steps="matchingSteps + accessoriesSteps + plotSteps"
        @next="step++"
        @back="step--"
    />
  </div>
</template>

<script>
import Matching from '@/fellowship/Matching';
import Accessories from '@/fellowship/Accessories';
import QuizButtons from '@/components/QuizButtons';
import Plot from '@/fellowship/Plot';

export default {
  components: {
    Matching,
    Accessories,
    Plot,
    QuizButtons,
  },

  data() {
    return {
      step: 1,
      matchingSteps: 5,
      accessoriesSteps: 4,
      plotSteps: 3,
    };
  },

}
</script>
