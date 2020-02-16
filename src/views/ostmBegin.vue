<template>
  <v-app>
    <v-app-bar app dark dense flat color="primary">
      <v-toolbar-title class="headline text-titlecase">
        <span>
          UOW Short Term Memory (STM) Study
        </span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content dark class="primary">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="1" sm="1" fill-height></v-col>
          <v-col cols="10" sm="10" justify="center" align="center">
            <v-card>
              <v-list dense>
                <v-subheader class="headline text-titlecase">To recieve your prolific code at the end of this study.</v-subheader>
                <v-list-item>you must not use the browser back or forward buttons</v-list-item>
                <v-list-item>you may only interact with the buttons on the page such as Accept, Reject, Start and Submit</v-list-item>
                <v-list-item>your browser must be a recent version, and have javascript enabled.</v-list-item>
              </v-list>

              <div v-if="error" style="color:red;">Error: {{ error }}</div>

              <v-card-title>Confirm\provide Prolific Participant Identification (PID)</v-card-title>
              <v-card-text>
                <v-form id="participantIDForm" pad>
                  <v-text-field v-model="study.studyName" label="Study Name" type="text" id="studyName" name="studyName" outlined disabled />
                  <v-text-field v-model="study.PROLIFIC_PID" label="Prolific PID" id="PROLIFIC_PID" name="PROLIFIC_PID" outlined disabled />
                  <div class="form-group">
                    <v-btn id="reject" @click="reject" class="ma-1" value="reject" rounded color="error" dark>Reject</v-btn>
                    <v-btn id="accept" @click="accept" class="ma-1" value="accept" rounded color="accent" dark autofocus>Accept</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1" sm="1"></v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer dark dense class="primary" app>
      <span> Solution by jeffreybarron.com for<br />University of Wollongong. CRICOS Provider No: 00102E </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'ostm',
  data: function() {
    return {
      error: ''
    };
  },

  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  async created() {
    if (this.$router.currentRoute.query.studyName != undefined) {
      this.$store.commit('logStudyDetails', {
        studyName: this.$router.currentRoute.query.studyName,
        PROLIFIC_PID: this.$router.currentRoute.query.PROLIFIC_PID,
        STUDY_ID: this.$router.currentRoute.query.STUDY_ID,
        SESSION_ID: this.$router.currentRoute.query.SESSION_ID
      });
      await this.$store.dispatch('loadStudy');
      this.$store.commit('shuffleStudy');
      await this.$store.dispatch('loadConsent');
      await this.$store.dispatch('loadInstructions');
      // await this.$nextTick(function() {
      //   console.log("tick"); // => 'updated'
      // });
    } else {
      this.error = 'this is an invalid query string';
    }
  },
  methods: {
    accept() {
      event.preventDefault();
      this.$store.commit('logAcceptance', {
        type: 'confirm'
      });
      this.$router.push('/ostm/consent');
    },
    reject() {
      event.preventDefault();
      window.location.href = this.study.rejectionURL;
    }
  }
};
</script>

<style scoped>
.ostm {
  background: darkblue;
  color: white;
}
</style>
