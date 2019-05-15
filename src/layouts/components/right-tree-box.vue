<template>
  <div class="box">
    <statusbar color="secondary"></statusbar>
    <q-toolbar color="secondary">
      <q-toolbar-title>{{ $t('选择节点') }}</q-toolbar-title>
      <q-btn flat dense icon="done" color="" :label="$t('确认选择')" @click="nodeSelect" />
    </q-toolbar>
    <div class="filter-box">
      <q-input v-model="filterText" :float-label="$t('输入关键字查找')" clearable />
    </div>
    <el-tree :data="treeData" :props="treeProps" node-key="fcode" :indent="10"
      :default-expanded-keys="[currentNode.fcode]"
      :default-checked-keys="[currentNode.fcode]"
      :filter-node-method="filterNode" :highlight-current="true" ref="tree"></el-tree>
  </div>
</template>

<script>
  import { Tree } from 'element-ui';
  import 'element-ui/lib/theme-chalk/base.css';
  import 'element-ui/lib/theme-chalk/tree.css';
  export default {
    name: 'right-tree-box',
    components: {
      'el-tree': Tree
    },
    data () {
      return {
        filterText: '',
        treeProps: {
          label: 'fname',
          children: 'next'
        }
      }
    },
    computed: {
      treeData() {
        return this.$store.getters.treeList || [];
      },
      currentNode() {
        return this.$store.getters.currentNode || {};
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.fname.indexOf(value) !== -1;
      },
      nodeSelect() {
        let selectedNode = this.$refs.tree.getCurrentNode();
        if(selectedNode){
          this.$store.dispatch('SelectNode', selectedNode);
          this.$store.dispatch('ToggleTreeBox', false);
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
    },
  }
</script>

<style lang="less" scoped>
.box{
  .filter-box{
    width: 100%;
    padding: 0 10px;
  }
  .el-tree{
    margin-top: 10px;
    // 节点，点击样式颜色
    /deep/ .el-tree-node.is-current > .el-tree-node__content{
      background-color: #ddedff;
    }
  }
}
</style>

