<template>
  <tr>
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
  export default{
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
    components: {}
  }
</script>
