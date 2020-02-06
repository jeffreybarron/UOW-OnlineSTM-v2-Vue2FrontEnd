<template>
  <div class="confim">
    <h4>Confirm/provide Prolific Participant Identification (PID)</h4>
    <form id="participantIDForm">
      <div class="form-group row">
        <label for="studyName" class="col-sm-3 col-form-label">Study Name</label>
        <input v-model="studyQuery.studyName" class="form-control" type="text" id="studyName" name="studyName" readonly />
      </div>
      <div class="form-group row">
        <label for="PROLIFIC_PID" class="col-sm-3 col-form-label">Prolific PID</label>
        <input v-model="studyQuery.PROLIFIC_PID" class="form-control" type="text" id="PROLIFIC_PID" name="PROLIFIC_PID" />
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
  props: ['study', 'studyQuery'],

  methods: {
    accept() {
      event.preventDefault();
      // with query, resulting in /register?plan=private
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

<style scoped></style>
