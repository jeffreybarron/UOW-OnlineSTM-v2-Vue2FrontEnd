import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import utils from '../utils/index.js';
import modalManager from './modalManager';

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
          // Steve and Leonie wanted a 'practice' block, this practice block is item 0
          // the practice block must always be played first, therefore we splice to
          // carve off and shuffle blocks from 1+
          let shuffled = utils.shuffleArray(shuffleObject.blocks.splice(1, shuffleObject.blocks.length));

          //then we add the shuffled blocks back to the array, leaving 0 unmoved
          // shuffleObject.blocks = { ...shuffleObject.blocks, ...shuffled };
          for (let n = 0; n < shuffled.length; n++) {
            shuffleObject.blocks.push(shuffled[n]);
          }
        }
      }
      for (let i = 0; i < shuffleObject.blocks.length; i++) {
        switch (shuffleObject.blocks[i].shuffleMode) {
          case 'sets': // shuffle sets in a block
            shuffleObject.blocks[i].sets = utils.shuffleArray(shuffleObject.blocks[i].sets);
            break;
          case 'within': // shuffle cards within sets
            for (let j = 0; j < shuffleObject.blocks[i].sets.length; j++) {
              shuffleObject.blocks[i].sets[j].stimuli = utils.shuffleArray(shuffleObject.blocks[i].sets[j].stimuli);
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
            blockDeck = utils.shuffleArray(blockDeck);
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
      state.study = shuffleObject;
      state.study = { ...state.study, loadTime: Date.now() };
    },
    injectCompletionPayload(state, payload) {
      state.study = { ...state.study, redirectTimer: payload.redirectTimer };
      state.study = { ...state.study, completionCode: payload.completionCode };
      state.study = { ...state.study, completionURL: payload.completionURL };
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
    loadCompletionCode() {
      //this function aysn and should be redone, load file should be an action, and state update as mutation
      let sURL = 'http://localhost:3000/ostm/API/issuecode/';
      return axios({
        method: 'post',
        url: sURL,
        data: this.state.study,
        headers: { 'Content-Type': 'application/json' },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
      })
        .then((response) => {
          let payload = {
            redirectTimer: response.data.redirectTimer,
            completionCode: response.data.completionCode,
            completionURL: response.data.completionURL
          };
          this.commit('injectCompletionPayload', payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveStudy() {
      // Set config defaults when creating the instance
      // , 'Access-Control-Allow-Origin': '*'
      // .post('/ostm/results', data, { 'Content-Type': 'application/json; charset=UTF-8' })
      return axios
        .post(`${this.state.settings.baseURL}/ostm/results`, this.state.study, { 'Access-Control-Allow-Origin': '*' })
        .then(function(response) {
          if (response.status == 202) {
            console.log('save complete, proceed to issueing code');
          } else {
            console.log(response.status, response.statusText);
          }
        })
        .catch(function(error) {
          console.log(error);
          // this.error = error;
        });
    }
  },
  modules: {
    modalManager
  }
});
