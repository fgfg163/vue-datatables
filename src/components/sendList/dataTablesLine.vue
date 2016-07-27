<template>
  <tr>
    <td v-for="column in columns">
      <component :is="column.componentName">
      </component>
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
      data: {
        default: Object,
      },
      columns: {
        default: Array,
        coerce: val => val || [],
      }
    },
    components: {
      vCell,
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
