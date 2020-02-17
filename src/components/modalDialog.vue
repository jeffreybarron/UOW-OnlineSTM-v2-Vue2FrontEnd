<template>
  <v-layout v-if="modalManager.active" row justify-center>
    <v-dialog :value="modalManager.active" persistent max-width="290">
      <v-card>
        <v-card-title>{{ modalManager.title }}</v-card-title>
        <v-card-text v-if="modalManager.body">
          <div v-html="modalManager.body"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click.native="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  computed: {
    modalManager() {
      return this.$store.state.modalManager;
    }
  },
  methods: {
    confirm() {
      console.log(this.modalManager);
      this.modalManager.resolve(true);
      this.$store.commit('modalManager/DEACTIVATE');
    }
  }
};
</script>

<style></style>
