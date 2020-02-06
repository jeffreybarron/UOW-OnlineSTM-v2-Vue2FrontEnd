import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import axios from 'axios';
export default new Vuex.Store({
  state: {
    study: '',
    studyQuery: {
      studyName: '',
      PROLIFIC_PID: '',
      STUDY_ID: '',
      SESSION_ID: ''
    },
    consent: '',
    instructions: ''
  },
  mutations: {
    injectStudyQuery(state, payload) {
      state.studyQuery.studyName = payload.studyName;
      state.studyQuery.PROLIFIC_PID = payload.PROLIFIC_PID;
      state.studyQuery.STUDY_ID = payload.STUDY_ID;
      state.studyQuery.SESSION_ID = payload.SESSION_ID;
    },
    updateAnswer(state, payload) {
      //receive state and variables (payload) from Component and make the change
      state.study.blocks[payload.blockCounter].sets[payload.setCounter].stimuli[payload.answerCounter].timeStamp = payload.timeStamp; //load answer into json
      state.study.blocks[payload.blockCounter].sets[payload.setCounter].stimuli[payload.answerCounter].response = payload.answer; //load answer into json
    },
    logParticipantDetails(state, payload) {
      state.study.saveTime = payload.saveTime;
      state.study.PROLIFIC_PID = payload.PROLIFIC_PID;
      state.study.STUDY_ID = payload.STUDY_ID;
      state.study.SESSION_ID = payload.SESSION_ID;
    },
    logAcceptance(state, payload) {
      state.study.accepted.push(payload.type);
    }
  },
  actions: {
    loadStudy() {
      //Load Study
      axios
        .get('http://localhost:3000/ostm/resources/studies/20200103-jeffbarron-01.json')
        .then((response) => {
          this.state.study = response.data;
          this.state.study = { ...this.state.study, accepted: [] };
        })
        .catch((error) => {
          console.log(error);
        });

      //Load Consent
      axios
        .get('http://localhost:3000/ostm/resources/studies/20200103-jeffbarron-01_consent.html')
        .then((response) => {
          this.state.consent = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      //Load Instructions
      axios
        .get('http://localhost:3000/ostm/resources/studies/20200103-jeffbarron-01_instructions.html')
        .then((response) => {
          this.state.instructions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveStudy() {
      // Set config defaults when creating the instance
      const axiosAPI = axios.create({
        baseURL: 'http://localhost:3000'
      });
      // , 'Access-Control-Allow-Origin': '*'
      // .post('/ostm/results', data, { 'Content-Type': 'application/json; charset=UTF-8' })
      axiosAPI
        .post('/ostm/results', this.state.study, { 'Access-Control-Allow-Origin': '*' })
        .then(function(response) {
          if (response.status == 202) {
            console.log('save complete, proceed to issueing code');
          } else {
            console.log(response.status, response.statusText);
          }
        })
        .catch(function(error) {
          alert('error:', error);
          console.log('error:', error);
        });
    }
  },
  modules: {}
});
