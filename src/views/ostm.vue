<template>
  <v-app>
    <v-app-bar app dark dense flat color="primary">
      <v-toolbar-title class="headline text-titlecase">
        <h4>University of Wollongong - School of Psychology</h4>
      </v-toolbar-title>
    </v-app-bar>
    <v-content dark class="primary">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="1" sm="1" fill-height></v-col>
          <v-col cols="10" sm="10" justify="center" align="center">
            <v-card>
              <v-card-title>CogLab - Online Short Term Memory (OSTM)</v-card-title>
              <v-card-text>
                <p>This Website can only be accessed via <a href="http://prolific.ac">http://prolific.ac</a></p>
                <p>
                  This page will be redicted to in 10 seconds
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
  name: 'ostm',
  data: function() {
    return {
      myTicker: ''
    };
  },
  created() {
    this.myTicker = setInterval(() => {
      window.location.href = 'http://prolific.ac';
    }, parseInt(10000));
  }
};
</script>
