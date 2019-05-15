<template>
  <q-breadcrumbs class="no-margin" @click.native="box">
    <!-- <q-icon name="arrow_forward" slot="separator" slot-scope="props" /> -->
    <span slot="separator" slot-scope="props">></span>
    <q-breadcrumbs-el v-for="item in breadList" :key="item.fcode">{{ item.fname }}</q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script>
export default {
  name: 'breadcrumbs',
  data () {
    return {}
  },
  computed: {
    breadList() {
      let paths = this.$store.getters.nodePath || [];
      paths = paths.slice(-3);/* 默认显示最后三个路径 */
      // 根据现在选中的节点，获取选中列表
      return paths;
    },
    currentNode() {
      return this.$store.getters.currentNode;
    }
  },
  methods: {
    box() {
      this.$store.dispatch('ToggleTreeBox', true);
    }
  }
}
</script>

<style lang="less" scoped>
.q-breadcrumbs{
  padding: 10px 5px;
  flex-wrap: inherit;
  font-size: .8rem;

  /deep/ div{
    padding: 0;
    white-space: nowrap;

    &.q-breadcrumbs-separator{
      padding: 0 6px;
    }
  }
}
</style>

