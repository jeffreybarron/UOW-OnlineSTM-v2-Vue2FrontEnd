<template>
  <div id="play">
    <div class="ostmPos">
      <div>
        <div class="details">
          <ul>
            <li>Study Name:{{ study.studyName }}</li>
            <li>completionCode:{{ study.completionCode }}</li>
            <li>completionURL:{{ study.completionURL }}</li>
            <li>redirectTimer:{{ study.redirectTimer }}</li>
            <li>studybackgroundColor:{{ study.studybackgroundColor }}</li>
            <li>studyTextColor:{{ study.studyTextColor }}</li>
            <li>consentCopy:{{ study.consentCopy }}</li>
            <li>shuffleBlocks:{{ study.shuffleBlocks }}</li>
          </ul>
        </div>

        <div class="blocks">
          <ul>
            <li v-for="block in study.blocks" v-bind:key="block.block">
              <h4>Stimulus File: {{ block.stimulusFile }}</h4>
              <div class="sets">
                <ul>
                  <li v-for="set in block.sets" v-bind:key="set.set">
                    <h5>Set #{{ set.set }} ({{ set.stimuli.length }})</h5>
                    <div class="stimulus">
                      <ul>
                        <li v-for="(stimulus, index) in set.stimuli" v-bind:key="index">
                          <div>Stimulus: {{ stimulus.stimulus }}</div>
                          <div></div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /* for storing stuff locally */

  data: function() {
    return {
      test: 0,
      myTicker: ''
    };
  },
  /* computed PROPERTY, behaves like a property */
  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  created() {
    this.$store.dispatch('loadStudy');
    this.myTicker = setInterval(this.test++, '1000');
  }
};
</script>

<style scoped>
.ostmPos {
  display: grid;
  grid-template: repeat(3, 1fr);
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
}
.left {
  background: chartreuse;
}
.right {
  background: coral;
}
.details {
  align-items: end;
}
</style>
