<template>
  <v-app>
    <v-content dark class="black white--text">
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="12" justify="center" align="center">
            <v-container fluid>
              <v-row>
                <!-- Left Column -->
                <v-col col="12"></v-col>
                <!-- Center Column -->
                <v-col col="12">
                  <div v-if="show_start_button" class="headline"><span>+</span></div>
                  <div v-if="show_stimulus" class="headline">{{ stimulus_value }}</div>
                  <div v-if="show_answer_input">
                    <!-- Using a random string for ID, ensures that chrome autofill is at least unique to this study -->
                    <v-text-field
                      v-model="answer"
                      :id="
                        Math.random()
                          .toString(36)
                          .substring(2, 15) +
                          Math.random()
                            .toString(36)
                            .substring(2, 15)
                      "
                      @keyup.enter="updateAnswers"
                      background-color="indigo lighten-5"
                      placeholder="type word..."
                      class="v-label theme--light"
                      :label="'Stimulus #' + displayCounter"
                      :hint="'Stimulus #' + displayCounter"
                      filled
                      justify="center"
                      align="center"
                      autofocus
                    />
                  </div>
                  <modal-dialog />
                </v-col>
                <!-- Right Column -->
                <v-col col="12">
                  <div v-if="show_start_button" class="start">
                    <v-btn @click="startQuestions" rounded color="success" dark autofocus>start</v-btn>
                  </div>
                  <div v-if="show_answer_input">
                    <v-btn @click="updateAnswers" @keyup.enter="updateAnswers" rounded color="accent" dark>enter</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import ostmWordListPlayModal from './ostm-WordList-Play-Modal.vue';
import ModalDialog from './modalDialog.vue';
export default {
  /* for storing stuff locally */

  components: { 'modal-dialog': ModalDialog },
  data: function() {
    return {
      answer: '',
      target: '',
      myTicker: '',
      blockCounter: 0,
      setCounter: 0,
      answerCounter: 0,
      stimulusCounter: 0,
      displayCounter: 1,
      stimulus_interval_ms: 0,
      stimulus_value: 'STIMULUS ERROR!',
      stimulus_color: '',
      stimiulus_background: '',
      show_start_button: true,
      show_stimulus: false,
      show_answer_input: false,
      modalMessage: 'parent message',
      show_modal: false
    };
  },
  /* computed PROPERTY, behaves like a property */
  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  created() {
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
        this.displayCounter = this.answerCounter + 1;
      }

      //if we have reached the last stimulus in the set then increment the set
      // $('#stimulusCounter').html(parseInt(answer.name) + 1);
      if (this.answerCounter == this.stimulusCounter) {
        //reset answers
        this.stimulusCounter = 0;
        this.answerCounter = 0;
        this.displayCounter = 1;

        this.show_start_button = true;
        this.show_stimulus = false;
        this.show_answer_input = false;

        this.setCounter++;
        // $('#stimulusCounter').html(1);
        // document.getElementById('start_btn').focus();
      }

      //if we have reached the last set in the block?, then increment the block
      if (this.setCounter >= this.study.blocks[this.blockCounter].sets.length) {
        if (this.study.blocks[this.blockCounter].blockPopUp.length > 1) {
          this.$store.dispatch('modalManager/ask', {
            title: 'Info',
            body: this.study.blocks[this.blockCounter].blockPopUp
          });
        }

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
    async saveResults() {
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
      await this.$store.dispatch('saveStudy');
      // figure how to make the above thenable or Wait
      this.$router.push('/ostm/completion');
    }
  }
};
</script>

<style scoped>
/* .ostmPos {
  display: grid;
  grid-template: repeat(3, 1fr);
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
} */
</style>
