import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import utils from '../utils/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    consent: '',
    instructions: '',
    settings: { baseURL: 'http://localhost:3000' },
    study: '',
    studyQuery: {
      studyName: '',
      PROLIFIC_PID: '',
      STUDY_ID: '',
      SESSION_ID: ''
    }
  },
  mutations: {
    updateAnswer(state, payload) {
      //receive state and variables (payload) from Component and make the change
      state.study.blocks[payload.blockCounter].sets[payload.setCounter].stimuli[payload.answerCounter].timeStamp = payload.timeStamp; //load answer into json
      state.study.blocks[payload.blockCounter].sets[payload.setCounter].stimuli[payload.answerCounter].response = payload.answer; //load answer into json
    },
    logSaveTime(state, payload) {
      state.study.saveTime = payload.saveTime;
    },
    logStudyDetails(state, payload) {
      state.studyQuery.studyName = payload.studyName;
      state.studyQuery.PROLIFIC_PID = payload.PROLIFIC_PID;
      state.studyQuery.STUDY_ID = payload.STUDY_ID;
      state.studyQuery.SESSION_ID = payload.SESSION_ID;
    },
    logAcceptance(state, payload) {
      state.study.accepted.push(payload.type);
    },
    shuffleStudy(state) {
      const shuffleObject = state.study;
      // shuffle blocks in study
      if (shuffleObject.shuffleBlocks === true) {
        if (shuffleObject.blocks.length > 0) {
          //use splice function to seperate item zero from the rest, and shuffle it at the same time
          var shuffled = utils.shuffleArray(shuffleObject.blocks.splice(1, shuffleObject.blocks.length));
          /* now push each item in the shuffled list back on to the block (which at this point
           * has only item remaining from the last operation) */
          for (let n = 0; n < shuffled.length; n++) {
            shuffleObject.blocks.push(shuffled[n]);
          }
          //output to console if you want to check it..
          console.log(shuffled);
          console.log(shuffleObject.blocks);
        }
      }

      for (let i = 0; i < shuffleObject.blocks.length; i++) {
        switch (shuffleObject.shuffleMode) {
          case 'sets': // shuffle sets in a block
            shuffleObject.blocks[i].sets = utils.shuffleArray(shuffleObject.blocks[i].sets).splice(0);
            break;
          case 'within': // shuffle cards within sets
            for (let j = 0; j < shuffleObject.blocks[i].sets.length; j++) {
              shuffleObject.blocks[i].sets[j].stimuli = utils.shuffleArray(shuffleObject.blocks[i].sets[j].stimuli).splice(0);
            }
            break;
          case 'across': //shuffle cards across sets
            //load all cards, from all sets (in this block) into an array
            var blockDeck = [];
            for (let j = 0; j < shuffleObject.blocks[i].sets.length; j++) {
              for (let k = 0; k < shuffleObject.blocks[i].sets[j].stimuli.length; k++) {
                blockDeck.push(shuffleObject.blocks[i].sets[j].stimuli[k]);
                //end stimulus
              }
              //end set
            }
            //shuffle array
            blockDeck = utils.shuffleArray(blockDeck).splice(0);
            //put shuffled cards into sets again
            for (let j = 0; j < shuffleObject.blocks[i].sets.length; j++) {
              for (let k = 0; k < shuffleObject.blocks[i].sets[j].stimuli.length; k++) {
                shuffleObject.blocks[i].sets[j].stimuli[k] = blockDeck[0];
                blockDeck.shift();
                //end stimulus
              }
              //end set
            }
            break;
          default:
          //end switch case
        }
      }
      console.log(shuffleObject);
      state.study.loadTime = Date.now();
      this.state.study = { ...shuffleObject };
    }
  },
  actions: {
    loadStudy() {
      //Load Study
      return axios
        .get(`${this.state.settings.baseURL}/ostm/resources/studies/${this.state.studyQuery.studyName}.json`)
        .then((response) => {
          this.state.study = response.data;
          this.state.study = { ...this.state.study, accepted: [] };
          this.state.study = { ...this.state.study, PROLIFIC_PID: this.state.studyQuery.PROLIFIC_PID };
          this.state.study = { ...this.state.study, STUDY_ID: this.state.studyQuery.STUDY_ID };
          this.state.study = { ...this.state.study, SESSION_ID: this.state.studyQuery.SESSION_ID };
        })
        .catch((error) => {
          console.log('load study error !!!!');
          this.error = error;
        });
    },
    loadConsent() {
      return axios
        .get(`${this.state.settings.baseURL}/ostm/resources/studies/${this.state.studyQuery.studyName}_consent.html`)
        .then((response) => {
          this.state.consent = response.data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    loadInstructions() {
      return axios
        .get(`${this.state.settings.baseURL}/ostm/resources/studies/${this.state.studyQuery.studyName}_instructions.html`)
        .then((response) => {
          this.state.instructions = response.data;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    saveStudy() {
      // Set config defaults when creating the instance
      // , 'Access-Control-Allow-Origin': '*'
      // .post('/ostm/results', data, { 'Content-Type': 'application/json; charset=UTF-8' })
      return axios
        .post('/ostm/results', this.state.study, { 'Access-Control-Allow-Origin': '*' })
        .then(function(response) {
          if (response.status == 202) {
            console.log('save complete, proceed to issueing code');
          } else {
            console.log(response.status, response.statusText);
          }
        })
        .catch(function(error) {
          this.error = error;
        });
    }
  },
  modules: {}
});
