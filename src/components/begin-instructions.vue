<template>
  <div class="container">
    <form id="participantIDForm">
      <div class="form-group row">
        <label for="studyName" class="col-sm-3 col-form-label">Study Name</label>
        <div class="col-sm-9">
          <input v-model="study.studyName" class="form-control" type="text" id="studyName" name="studyName" readonly />
        </div>
      </div>
      <div class="form-group row">
        <label for="PROLIFIC_PID" class="col-sm-3 col-form-label">Prolific PID</label>
        <div class="col-sm-9">
          <input v-model="PROLIFIC_PID" class="form-control" type="text" id="PROLIFIC_PID" name="PROLIFIC_PID" />
        </div>
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
  methods: {
    accept() {
      event.preventDefault();
      // with query, resulting in /register?plan=private
      // this.$router.push({ path: 'register', query: { plan: 'private' } });
    },
    reject() {
      event.preventDefault();
      window.location.href = this.study.rejectionURL;
    }
  }
};
</script>

<style scoped></style>
