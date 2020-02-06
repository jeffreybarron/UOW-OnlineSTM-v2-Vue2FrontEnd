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
// @ is an alias to /src
// import BeginConfirm from '@/components/begin-confirm.vue';

export default {
  name: 'ostm',
  // components: {
  //   'begin-confirm': BeginConfirm
  // },
  computed: {
    study() {
      return this.$store.state.study;
    },
    studyQuery() {
      return this.$store.state.studyQuery;
    }
  },
  created() {
    this.$store.dispatch('loadStudy');
    //?studyName=20200103-jeffbarron-01&PROLIFIC_PID=becc3422-9f5e-4840-bd8f-2fcdc73b9355&STUDY_ID=Classroom&SESSION_ID=study
    if (this.$router.currentRoute.query.studyName != undefined) {
      this.$store.commit('injectStudyQuery', {
        studyName: this.$router.currentRoute.query.studyName,
        PROLIFIC_PID: this.$router.currentRoute.query.PROLIFIC_PID,
        STUDY_ID: this.$router.currentRoute.query.STUDY_ID,
        SESSION_ID: this.$router.currentRoute.query.SESSION_ID
      });
    } else {
      console.log('this is an invalid query string');
    }
  },
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

<style scoped>
/* .ostm {
  background: darkblue;
  color: white;
} */
</style>
