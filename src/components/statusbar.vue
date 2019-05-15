<template>
  <div :class="'bg-' + mainColor" :style="{width: '100%', height: statusbarHeight + 'px'}"></div>
</template>

<script>
export default {
  name: 'statusbar',
  props: {
    color: String
  },
  computed: {
    statusbarHeight() {
      return plus.navigator.getStatusbarHeight()
    },
    mainColor() {
      return this.color || this.$store.state.theme;
    },
  }
}
</script>

