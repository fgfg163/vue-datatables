<template>
  <div class="modal" v-bind:class="{'is-active':isShow}">
    <div class="modal-background" v-on:click="toggleModel"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header">
          <p class="modal-card-title">
            <slot name="title">{{title}}</slot>
          </p>
          <button class="delete" v-on:click="toggleModel"></button>
        </slot>
      </header>
      <section class="modal-card-body">
        <slot name="body">
          {{message}}
        </slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer">
          <a class="button is-primary" v-on:click="handleOkClick">确定</a>
          <a class="button" v-on:click="toggleModel">关闭</a>
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>

  export default{
    data(){
      return {};
    },
    props: {
      isShow: {
        default: false,
      },
      message: {
        default: "",
      },
      title: {
        default: "",
      }
    },
    computed: {},
    methods: {
      showModel(){
        this.isShow = true;
      },
      toggleModel(){
        this.isShow = this.isShow ? false : true;
      },
      handleOkClick(){
        this.$dispatch('model-ok');
        this.toggleModel();
      },
    },
    events: {},
    components: {},
    ready(){

    }
  }
</script>