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
              <v-card-title>The study is now complete.</v-card-title>
              <v-card-text>
                <p>
                  Your Prolific "Completion Code"
                  <span style="color: red">{{ study.completionCode }}</span> is shown here and below in red can be copied and provided to Prolific.
                </p>
                <div id="prolificCode" class="lead text-center">
                  <p>
                    <span style="color: red">{{ study.completionCode }}</span>
                  </p>
                </div>
                <p>
                  This page will be redicted to
                  <a v-bind:href="study.completionURL">Prolific</a>
                </p>
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
  name: 'completion',
  data: function() {
    return {
      myTicker: '',
      error: ''
    };
  },
  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  created() {
    console.log('commit it');
    // Axios call to the API, API first checks if the study was completed and properly saved
    // if a saved file is found on the server, then the API answers with a valid code.
    this.$store.commit('loadCompletionCode');

    // in previous version there was an extra save here, but it was redundant, so now
    // we simply set the redirect timer, passing the code as a query string
    if (this.study.redirectTimer <= '600000') {
      this.myTicker = setInterval(() => {
        window.location.href = this.study.completionURL;
      }, parseInt(this.study.redirectTimer));
    }
  },
  components: {}
};
</script>

<style scoped>
/* .ostm {
  background: darkblue;
  color: white;
} */
</style>
