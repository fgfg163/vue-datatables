<template>
  <tr>
    <td>
      <v-cell></v-cell>
    </td>
    <td>
    </td>
    <td>
      没有数据！
    </td>
    <td>
      没有数据！
    </td>
    <td>
      没有数据！
    </td>
    <td>
      没有数据！
    </td>
    <td>
      没有数据！
    </td>
    <td>
      没有数据！
    </td>
  </tr>
</template>
<style>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import vCell from './cell.vue';
  import Vue from 'vue';

  export default {
    data(){
      return {
        msg: 'hello vue'
      }
    },
    props: {
      vCell: {
        default: Object,
      },

      data: {
        default: Object,
      }
    },
    components: {
      vCell: vCell,
    },
    ready(){
      console.log(this);
    },

    _setComponent(components = {}){
      let comp = this;
      comp.components = comp.components || {};
      comp.components = {
        ...comp.components,
        ...components,
      };
      return comp;
    }
  }
</script>
