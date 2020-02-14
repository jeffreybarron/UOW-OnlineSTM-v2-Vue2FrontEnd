<template>
  <div>
    <h4>Informed Consent</h4>
    <form id="informedConsent">
      <div class="form-group row">
        <label for="studyName" class="col-sm-3 col-form-label">Study Name: </label>
        <span>
          {{ studyQuery.studyName }}
        </span>
      </div>
      <div class="form-group row">
        <label for="PROLIFIC_PID" class="col-sm-3 col-form-label">Prolific PID: </label>
        <span>
          {{ studyQuery.PROLIFIC_PID }}
        </span>
      </div>
      <div class="researcherCopy" id="researcherCopy">
        <h5>Details</h5>
        <div class="consentText" v-html="consentText"></div>
      </div>

      <div class="form-group">
        <!--<button id="back" type="button" class="btn btn-warning" value="back" >back</button>-->
        <button id="reject" @click="reject">Reject</button>
        <button id="accept" @click="accept" autofocus>Accept</button>
      </div>
    </form>
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
