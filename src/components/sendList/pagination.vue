<template>
  <div>
    <nav>
      <ul class="pagination">
        <li v-if="correntPage > 1">
          <a href="javascript:void(0);" v-on:click="handlePrevPageOnClick($event)">&laquo;</a>
        </li>
        <li v-if="correntPage == 1" class="disabled">
          <a>&laquo;</a>
        </li>
        <template v-for=" data in paginationList" track-by="$index">
          <li class="active" v-if="data!='...' && data==correntPage" track-by="data">
            <a href="javascript:void(0);" v-on:click="handlePageOnClick($event,data)">{{data}}</a>
          </li>
          <li v-if="data!='...' && data!=correntPage" track-by="data">
            <a href="javascript:void(0);" v-on:click="handlePageOnClick($event,data)">{{data}}</a>
          </li>
          <li class="disabled" v-if="data=='...'" track-by="data">
            <span>...</span>
          </li>
        </template>
        <li v-if="correntPage < totalPage">
          <a href="javascript:void(0);" v-on:click="handleNextPageOnClick($event)">&raquo;</a>
        </li>
        <li v-if="correntPage == totalPage" class="disabled">
          <a>&raquo;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style>
</style>
<script>
  export default{
    data(){
      return {
        paginationList: [1],
        newPage: 0,
      };
    },
    props: {
      option: {
        type: Object
      },
      correntPage: {
        default: 1,
        coerce: val => Number.parseInt(val),// 将值转换为数字
      },
      totalPage: {
        default: 1,
        coerce: val => Number.parseInt(val),// 将值转换为数字
      },
      pageLength: {
        default: 10,
        coerce: val => Number.parseInt(val),// 将值转换为数字
      },
      textPrevPage: {
        default: "Prev page",
      },
      textNextPage: {
        default: "Next page",
      },
      needChangeCallback: {
        default: false,
      },
    },
    computed: {
      paginationList () {
        let tArry = [];
        let startPage = Math.min(this.correntPage - Math.ceil(this.pageLength / 2 - 1), this.totalPage - this.pageLength + 1);
        startPage = Math.max(1, startPage);
        let endPage = Math.min(this.totalPage, startPage + this.pageLength - 1);

        for (let key = startPage; key <= endPage; key++) {
          tArry.push(key);
        }

        if (startPage > 1) {
          if (startPage > 1 + 1) tArry.unshift("...");
          tArry.unshift(1);
        }
        if (endPage < this.totalPage) {
          if (endPage < this.totalPage - 1) tArry.push("...");
          tArry.push(this.totalPage);
        }
        return tArry;
      }
    },
    methods: {
      changePageCallback(correntPage){
        this.correntPage = correntPage || this.newPage;
      },

      handlePageOnClick(e, newPage){
        this.newPage = newPage;
        this.$dispatch('change-page', newPage, this.changePageCallback);
        if (this.needChangeCallback) {
        } else {
          this.correntPage = newPage;
        }
      },
      handlePrevPageOnClick(e){
        let newPage = Math.max(1, this.correntPage - 1);
        this.newPage = newPage;
        if (newPage != this.correntPage) {
          this.$dispatch('change-page', newPage, this.changePageCallback);
          if (this.needChangeCallback) {

          } else {
            this.correntPage = newPage;
          }
        }
      },
      handleNextPageOnClick(e){
        let newPage = Math.min(this.totalPage, this.correntPage + 1);
        this.newPage = newPage;
        if (newPage != this.correntPage) {
          this.$dispatch('change-page', newPage, this.changePageCallback);
          if (this.needChangeCallback) {

          } else {
            this.correntPage = newPage;
          }
        }
      },
    },
    ready(){
    },
  }
</script>
