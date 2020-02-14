<template>
  <div class="confim">
    <h4>Confirm/provide Prolific Participant Identification (PID)</h4>
    <div v-if="success">Success: {{ success }}</div>
    <div v-if="error" style="color:red;">Error: {{ error }}</div>
    <form id="participantIDForm">
      <div class="form-group row">
        <label for="studyName" class="col-sm-3 col-form-label">Study Name</label>
        <input
          v-model="study.studyName"
          class="form-control"
          type="text"
          id="studyName"
          name="studyName"
          readonly
        />
      </div>
      <div class="form-group row">
        <label for="PROLIFIC_PID" class="col-sm-3 col-form-label">Prolific PID</label>
        <input
          v-model="study.PROLIFIC_PID"
          class="form-control"
          type="text"
          id="PROLIFIC_PID"
          name="PROLIFIC_PID"
        />
      </div>
      <div class="form-group">
        <button id="reject" class="btn btn-danger" @click="reject" value="reject">Reject</button>
        <button id="accept" class="btn btn-success" @click="accept" value="accept" autofocus>Accept</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ostm",
  data: function() {
    return {
      error: "",
      success: ""
    };
  },

  computed: {
    study() {
      return this.$store.state.study;
    }
  },
  async created() {
    if (this.$router.currentRoute.query.studyName != undefined) {
      this.$store.commit("logStudyDetails", {
        studyName: this.$router.currentRoute.query.studyName,
        PROLIFIC_PID: this.$router.currentRoute.query.PROLIFIC_PID,
        STUDY_ID: this.$router.currentRoute.query.STUDY_ID,
        SESSION_ID: this.$router.currentRoute.query.SESSION_ID
      });
      await this.$store.dispatch("loadStudy");
      this.$store.commit("shuffleStudy");
      await this.$store.dispatch("loadConsent");
      await this.$store.dispatch("loadInstructions");
    } else {
      this.error = "this is an invalid query string";
    }
  },
  methods: {
    accept() {
      event.preventDefault();
      this.$store.commit("logAcceptance", {
        type: "confirm"
      });
      this.$router.push("/ostm/consent");
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
