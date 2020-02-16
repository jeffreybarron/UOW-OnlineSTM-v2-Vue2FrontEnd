<template>
  <div>
    <h4 id="pageTitle">The study is now complete.</h4>
    <p>Your Prolific "Completion Code" is shown here in red, you can note it down or select and copy it.</p>
    <div id="prolificCode" class="lead text-center">
      <p>
        <span style="color: red">{{ study.completionCode }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "completion",
  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  created() {
    console.log("commit it");
    this.$store.commit("loadCompletionCode");
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
