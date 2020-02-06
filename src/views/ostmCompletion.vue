<template>
  <div>
    <h4 id="pageTitle">This study is now complete.</h4>
    <p>Your Prolific "Completion Code" is shown here in red, you can note it down or select and copy it.</p>
    <div id="prolificCode" class="lead text-center">
      <p>[CODE]</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ostm',
  components: {},
  computed: {
    study() {
      return this.$store.state.study;
    },
    studyQuery() {
      return this.$store.state.studyQuery;
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
