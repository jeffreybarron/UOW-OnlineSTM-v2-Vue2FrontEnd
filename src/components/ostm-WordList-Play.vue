<template>
  <div id="play">
    <div class="ostmPos">
      <div class="start" v-if="show_start_button">
        <button @click="startQuestions" autofocus>start</button>
      </div>
      <div class="target" v-if="show_stimulus">{{ stimulus_value }}</div>
      <div v-if="show_answer_input">
        <input refs="answer" v-model="answer" id="answer" placeholder="type word..." type="text" @keyup.enter="updateAnswers" />
        <button @click="updateAnswers" @keyup.enter="updateAnswers">enter</button>
      </div>
    </div>
    <div style="background: #F4F6F6; border-style:solid;border:2px;">
      <json-view :data="study" />
    </div>
  </div>
</template>

<script>
export default {
  /* for storing stuff locally */

  data: function() {
    return {
      answer: '',
      target: '',
      myTicker: '',
      blockCounter: 0,
      setCounter: 0,
      answerCounter: 0,
      stimulusCounter: 0,
      stimulus_interval_ms: 0,
      stimulus_value: 'STIMULUS ERROR!',
      stimulus_color: '',
      stimiulus_background: '',
      show_start_button: true,
      show_stimulus: false,
      show_answer_input: false
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
    this.show_start_button = true;
    this.show_stimulus = false;
    this.show_answer_input = false;
    // figure out how to set focus
    // document.getElementById("start_btn").focus();
  },
  beforeDestroy() {
    clearInterval(this.myTicker);
  },
  methods: {
    startQuestions() {
      this.stimulus_interval_ms = '200'; /* figure how how to get this from the json file */
      this.stimulus_value = '+';
      this.show_start_button = false;
      this.show_stimulus = true;
      this.show_answer_input = false;
      // this.myTicker = setInterval(this.changeQuestion(), this.stimulus_interval_ms);
      this.myTicker = setInterval(() => {
        this.changeQuestion();
      }, this.stimulus_interval_ms);
    },
    changeQuestion() {
      const iStimuli = this.study.blocks[this.blockCounter].sets[this.setCounter].stimuli;
      this.stimulus_value = iStimuli.length;
      if (this.stimulusCounter < iStimuli.length) {
        this.show_start_button = false;
        this.show_stimulus = true;
        this.show_answer_input = false;
        this.stimulus_value = iStimuli[this.stimulusCounter].stimulus;
        this.stimulus_color = iStimuli[this.stimulusCounter].textcolor;
        this.stimulus_background = iStimuli[this.stimulusCounter].backgroundcolor;
        this.stimulusCounter++;
      } else {
        // stop the ticker and clear the text area
        clearInterval(this.myTicker);

        this.show_start_button = false;
        this.show_stimulus = false;

        this.stimulus_value = '+';
        this.stimulus_color = this.studyTextColor;
        this.stimulus_background = this.studybackgroundColor;

        this.show_answer_input = true;

        // // figure out how to set focus on the answer input with vue
        // https://michaelnthiessen.com/set-focus-on-input-vue
        this.$nextTick(() => {
          // alert('now');
          // this.$refs.answer.focus();
        });
      }
    },
    updateAnswers(event) {
      event.preventDefault();
      if (this.answerCounter < this.stimulusCounter) {
        // update store with vuex mutations, pass mutation name and payload as object
        this.$store.commit('updateAnswer', {
          blockCounter: this.blockCounter,
          setCounter: this.setCounter,
          answerCounter: this.answerCounter,
          timeStamp: Date.now(),
          answer: this.answer
        });

        this.answer = ''; //reset form for next answer
        this.answerCounter++; //this is why study.ejs input id=answer, requires name to be 0 and nothing else.
        // this.answer.focus();
        // this.$refs.answer.focus();
      }

      //if we have reached the last stimulus in the set then increment the set
      // $('#stimulusCounter').html(parseInt(answer.name) + 1);
      if (this.answerCounter == this.stimulusCounter) {
        //reset answers
        this.stimulusCounter = 0;
        this.answerCounter = 0;

        this.show_start_button = true;
        this.show_stimulus = false;
        this.show_answer_input = false;

        this.setCounter++;
        // $('#stimulusCounter').html(1);
        // document.getElementById('start_btn').focus();
      }

      //if we have reached the last set in the block?, then increment the block
      if (this.setCounter >= this.study.blocks[this.blockCounter].sets.length) {
        // alert("end of block:" + blockCounter);
        // if (this.study.studyConfig.blocks[this.blockCounter].blockPopUp.length > 1) {
        //   $('#modal-body').html(state.studyConfig.blocks[blockCounter].blockPopUp);
        //   toggleModal();
        //   start_DIV.style.display = 'block';
        //   show_DIV.style.display = 'none';
        //   answer_DIV.style.display = 'none';
        //   document.getElementById('start_btn').focus();
        // }

        this.blockCounter++;
        this.setCounter = 0; //new block new sets
      }
      //set focus on answer input box
      // document.getElementById("answer").focus();

      //if we have also reached the last stimulus bank then stop
      if (this.blockCounter >= this.study.blocks.length) {
        this.study.blockprocessed = this.blockCounter;
        // this.show_spinny_wheel = true;
        this.show_start_button = false;
        this.show_stimulus = false;
        this.show_answer_input = false;
        this.saveResults();
      }
    },
    saveResults() {
      this.show_start_button = false;
      this.show_stimulus = false;
      this.show_answer_input = false;

      this.stimulus_value = '+';
      this.stimulus_color = this.studyTextColor;
      this.stimulus_background = this.studybackgroundColor;

      //Study is complete return to provider

      //Update Page Form
      this.$store.commit('logSaveTime', {
        saveTime: Date.now()
      });

      this.$store.dispatch('saveStudy');
      // figure how to make the above thenable or Wait
      this.$router.push('/ostm/completion');
    }
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
