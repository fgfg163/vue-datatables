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

  export default function (vCell) {

    let template = `<tr>
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
  </tr>`;

    return {
      template: template,
      data(){
        return {
          msg: 'hello vue'
        }
      },
      props: {
        vCell: {
          default: Object,
          coerce: val => {
            console.log(val);
            return val;
          },
        },

        data: {
          default: Object,
          coerce: val => {
            console.log(val);
            return val;
          },
        }
      },
      components: {
        sss: Vue.component('v-cell', vCell),
      },
      ready(){

      }
    }
  }
</script>
