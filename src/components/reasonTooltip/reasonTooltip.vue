<template>
  <a class="show-detail-tooltip" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" v-el:tooltip-btn
     v-bind:title="message">
    {{message.length>50?message.slice(0,50)+"......":message}}
  </a>
</template>
<style>
  a.show-detail-tooltip {
    color: #000;
  }
</style>
<script>
  export default{
    data(){
      return {};
    },
    props: {
      message: {
        default: ""
      }
    },
    computed: {},
    methods: {},
    events: {},
    components: {},
    ready(){
      $(this.$els.tooltipBtn).tooltip();
    }
  }
</script>