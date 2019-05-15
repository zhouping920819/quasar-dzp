
export default {
  computed: {
    currentNode() {
      return this.$store.getters.currentNode;
    }
  },
  watch: {
    currentNode: {
      deep: true,
      immediate: true,
      handler: function(val, oldV) {
        if(this.init) {
          this.init();
        }
      }
    }
  }
}
