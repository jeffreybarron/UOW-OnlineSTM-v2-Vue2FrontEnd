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
              <div v-if="error" style="color:red;">Error: {{ error }}</div>
              <v-card-title>Informed Consent</v-card-title>
              <v-card-text>
                <v-text-field v-model="study.studyName" label="Study Name" type="text" id="studyName" name="studyName" outlined disabled />
                <!-- <v-text-field v-model="study.PROLIFIC_PID" label="Prolific PID" id="PROLIFIC_PID" name="PROLIFIC_PID" outlined disabled /> -->
                <v-card-title>Details</v-card-title>
                <div v-html="consentText"></div>
              </v-card-text>
              <v-card-text>
                <v-form id="participantIDForm" pad>
                  <v-btn id="reject" @click="reject" class="ma-1" value="reject" rounded color="error" dark>Reject</v-btn>
                  <v-btn id="accept" @click="accept" class="ma-1" value="accept" rounded color="accent" dark autofocus>Accept</v-btn>
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
// @ is an alias to /src

export default {
  name: 'ostm',
  components: {},
  data() {
    return {
      error: ''
    };
  },
  computed: {
    study() {
      return this.$store.state.study;
    },
    studyQuery() {
      return this.$store.state.studyQuery;
    },
    consentText() {
      return this.$store.state.consent;
    }
  },
  methods: {
    accept() {
      event.preventDefault();
      // with query, resulting in /register?plan=private
      this.$store.commit('logAcceptance', {
        type: 'consent'
      });
      this.$router.push('/ostm/instructions');
    },
    reject() {
      event.preventDefault();
      window.location.href = this.study.rejectionURL;
    }
  }
};
</script>

<style scoped>
/* .ostm {
  background: darkblue;
  color: white;
} */
</style>
