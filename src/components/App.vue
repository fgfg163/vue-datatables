<template>
  <data-tables
    start=0
    page-length=2
    total=8
    v-bind:data="[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8}]"
  ></data-tables>
</template>
<style>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import dataTables from "./sendList/dataTables.vue";
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      dataTables
    },
  }
</script>
