// utils/index.js

export default {
  methods: {
    shuffleArray(array) {
      // modern version of the Fisher–Yates shuffle algorithm:
      var j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    }
  }
};
