<template>
  <a class="show-detail" href="javascript:void(0);" v-on:click="toggleModel">{{sqlStr.length>100?sqlStr.slice(0,100)+"......":sqlStr}}</a>
  <div class="modal" v-bind:class="{'is-active':isShow}">
    <div class="modal-background" v-on:click="toggleModel"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">sql</p>
        <button class="delete" v-on:click="toggleModel"></button>
      </header>
      <section class="modal-card-body">
        {{sqlStr}}
      </section>
      <footer class="modal-card-foot">
        <a class="button" v-on:click="toggleModel">关闭</a>
      </footer>
    </div>
  </div>
</template>
<style>
  a.show-detail {
    color: #CD3333;
  }
</style>
<script>

  export default{
    data(){
      return {
        isShow: false,
      };
    },
    props: {
      sqlStr: {
        default: "",
      },
    },
    computed: {},
    methods: {
      showModel(){
        this.isShow = true;
      },
      toggleModel(){
        this.isShow = this.isShow ? false : true;
      }
    },
    events: {},
    components: {},
    ready(){

    }
  }
</script>