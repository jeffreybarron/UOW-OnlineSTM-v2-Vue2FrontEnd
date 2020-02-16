<template>
  <v-app>
    <ostm-wordlist-play></ostm-wordlist-play>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import OSTMWordListDetails from '@/components/ostm-WordList-Details.vue';
import OSTMWordListPlay from '@/components/ostm-WordList-Play.vue';

export default {
  name: 'ostm',
  components: {
    // 'ostm-wordlist-details': OSTMWordListDetails,
    'ostm-wordlist-play': OSTMWordListPlay
  }
};
</script>

<style scoped>
/* .ostm {
  background: darkblue;
  color: white;
} */
</style>
