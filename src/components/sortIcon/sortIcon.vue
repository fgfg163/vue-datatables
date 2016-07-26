<template>
  <span class="sort-icon" v-on:click="handleSortClick">
    <slot name="title"></slot>
    <i v-if="_sortState == 'none'" class="fa fa-sort" aria-hidden="true"></i>
    <i v-if="_sortState == 'asc'" class="fa fa-sort-asc" aria-hidden="true"></i>
    <i v-if="_sortState == 'desc'" class="fa fa-sort-desc" aria-hidden="true"></i>
  </span>
</template>
<style>
  .sort-icon {
    cursor: pointer;
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
      sortName: {
        default: "",
      },
      sortState: {
        default: "none",
      },
      isSort: {
        default: false,
      },
    },
    computed: {
      _sortState: {
        get(){
          let ss = this.sortState || "none";
          ss = this.isSort ? ss : "none";
          return ss;
        }
      },
    },
    methods: {
      handleSortClick(e){
        switch (this._sortState) {
          case "none":
            this.$dispatch('sort-state-change', this.sortName, "none", "desc");
            this.sortState = "desc";
            break;
          case "asc":
            this.$dispatch('sort-state-change', this.sortName, "asc", "desc");
            this.sortState = "desc";
            break;
          case "desc":
            this.$dispatch('sort-state-change', this.sortName, "desc", "asc");
            this.sortState = "asc";
            break;
          default:
            this.$dispatch('sort-state-change', this.sortName, "none", "desc");
            this.sortState = "desc";
            break;
        }
      },
    },
    components: {},
  }
</script>
