<template>
  <div>
    <h4 id="pageTitle">The study is now complete.</h4>
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
  </div>
</template>

<script>
export default {
  name: "completion",
  data: function() {
    return {
      myTicker: ""
    };
  },
  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  created() {
    console.log("commit it");
    // Axios call to the API, API first checks if the study was completed and properly saved
    // if a saved file is found on the server, then the API answers with a valid code.
    this.$store.commit("loadCompletionCode");

    // in previous version there was an extra save here, but it was redundant, so now
    // we simply set the redirect timer, passing the code as a query string
    if (this.study.redirectTimer <= "600000") {
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
