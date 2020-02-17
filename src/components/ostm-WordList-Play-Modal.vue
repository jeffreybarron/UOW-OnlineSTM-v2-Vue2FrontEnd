<template>
  <v-dialog :value="this.active" persistent max-width="290">
    <v-card>
      <v-card-title>Info</v-card-title>
      <v-card-text v-if="modalBody">{{ modalBody }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" @click.native="acknowledge">ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      active: true
    };
  },
  props: ['modalTitle', 'modalBody'],
  methods: {
    acknowledge() {
      this.active = false;
    }
  }
};
</script>
