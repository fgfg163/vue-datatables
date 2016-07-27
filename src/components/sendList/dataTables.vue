<template>
  <div class="row">
    <div class="col-md-2">
      <form class="form-inline">
        <div class="form-group">
          <label for="per_page">每页</label>
          <select id="per_page" v-model="pageLength" v-on:change="handlePageLengthChange">
            <option v-for="data in pageLengthList" value="{{data}}">{{data}}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
  <div class="table-box">
    <div class="table-mask" v-bind:class="{'show':isLoading}">
      <span>
        <span>
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
        </span>
      </span>
    </div>
    <table class="table table-striped table-condensed table-hover">
      <thead class="thead">
        <th>
          1
        </th>
        <th>报表名称</th>
        <th>
          2
        </th>
        <th>查询状态</th>
        <th>
          3
        </th>
        <th>可执行操作</th>
        <th>失败原因</th>
        <th>查询人</th>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <template v-if="(!c_data || c_data.length==0)">
          <tr>
            <td colspan="9">
              没有数据！
            </td>
          </tr>
          <tr>
            <td colspan="9">
              没有数据！
            </td>
          </tr>
          <tr>
            <td colspan="9">
              没有数据！
            </td>
          </tr>
          <tr>
            <td colspan="9">
              没有数据！
            </td>
          </tr>
        </template>
        <template v-for="(dataIndex, lineData) in c_data">
          <v-datatables-line
            v-bind:columns="columns"
            v-bind:data="lineData">
          </v-datatables-line>
        </template>
      </tbody>
    </table>
    <v-pagination
      style="float:right;"
      v-bind:corrent-page="Math.ceil((c_start + 1) / c_pageLength)"
      v-bind:total-page="Math.ceil(c_total / c_pageLength)"
      v-bind:text-prev-page="'上一页'"
      v-bind:text-next-page="'下一页'"
      v-bind:need-change-callback="true"
      v-on:change-page="changePage">
    </v-pagination>
    <div>
      <p>&nbsp;</p>
      <p>总共 {{total}} 行 ，本页从 第 {{c_start*1+1}} 行到第 {{c_start*1 + pageLength*1}} 行</p>
    </div>
  </div>
</template>
<style type="text/css">

</style>

<script type="text/ecmascript-6">
  import vPagination from './pagination.vue';
  import vMessageModel from '../messageModel/messageModel.vue'
  import vSortIcon from '../sortIcon/sortIcon.vue'
  import vCell from './cellss.vue';
  import vCell3 from './cellsss.vue';


  const vDatatablesLine = require('./dataTablesLine.vue')._setComponent({vCell2: vCell, vCell3: vCell3});

  import URI from 'urijs';


  export default{
    data(){
      return {
        isLoading: false,
        pageLengthList: [10, 20, 30, 50, 100, 200],

        sortName: "",
        sortState: "",

      };
    },
    props: {
      option: {type: Object},
      start: {
        default: 0,
      },
      pageLength: {
        default: 20,
        coerce: val => Number.parseInt(val),// 将值转换为字符串
      },
      data: {
        default: Array,
        coerce: val => {
          console.log(val);
          return val;
        },
      },
      isServerSide: {
        default: false,
      },
      columns: {
        default: Array,
      },
      total: {
        default: 0,
      }
    },

    computed: {
      c_start: {
        get(){
          return this.start;
        },
        set(val){
          this.start = val;
        }
      },
      c_pageLength: {
        get(){
          return this.pageLength;
        },
        set(val){
          this.pageLength = val;
        }
      },
      c_data: {
        get(){
          console.log(this.data);
          let data = this.data;
          return data;
        },
        set(val){
          this.data = val;
        }
      },
      c_showData: {
        get(){
          let data = [];
          if (this.isServerSide) {
            data = this.data;
          } else {
            data = this.data || [];
            data = data.slice(this._start, this.c_pageLength);
          }
          return data;
        },
      },

      c_total(){
        return this.total;
      },
    },

    methods: {
      handlePageLengthChange(e){
      },

      changePage (correntPage, callback) {
        this.start = (correntPage - 1) * this.pageLength;
        if (this.getData) {
          this.fetchQueryListData(callback);
        }
      },

      handleSortStateChange(sortName, oldState, newState){
        this.sortName = sortName;
        this.sortState = newState == "desc" ? 0 : 1;
        this.fetchQueryListData();
      },
    },
    events: {},
    components: {
      vPagination,
      vMessageModel,
      vSortIcon,
      vDatatablesLine,
    },
    ready(){
      console.log(this);
    },
  }
</script>
