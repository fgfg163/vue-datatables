<template>
  <div class="columns">
    <div class="column is-2 is-offset-10">
      <div class="control is-horizontal page-length">
        <div class="control-label my-control-label">
          <label class="label">
            每页</label>
        </div>
        <div class="control page-length-select-control">
          <span class="select">
            <select v-model="pageLength" v-on:change="handlePageLengthChange">
							<option v-for="data in pageLengthList" value="{{data}}">{{data}}</option>
            </select>
          </span>
        </div>
      </div>
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
    <table class="vue-table table table-bordered text-center">
      <thead class="thead">
        <th>
          <v-sort-icon
                  sort-name="0"
                  v-bind:is-sort="sortName=='0'"
                  v-on:sort-state-change="handleSortStateChange">
            <template slot="title">ID</template>
          </v-sort-icon>
        </th>
        <th>报表名称</th>
        <th>
          <v-sort-icon
                  sort-name="2"
                  v-bind:is-sort="sortName=='2'"
                  v-on:sort-state-change="handleSortStateChange">
            <template slot="title">提交时间</template>
          </v-sort-icon>
        </th>
        <th>查询状态</th>
        <th>
          <v-sort-icon
                  sort-name="1"
                  v-bind:is-sort="sortName=='1'"
                  v-on:sort-state-change="handleSortStateChange">
            <template slot="title">查询次数</template>
          </v-sort-icon>
        </th>
        <th>可执行操作</th>
        <th>失败原因</th>
        <th>查询人</th>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <template v-if="(!showData || showData.length==0)">
          <tr>
            <td colspan="9">
              没有数据！
            </td>
          </tr>
        </template>
        <template v-for="(dataIndex, data) in showData">
          <tr>
            <td>
              {{data.id}}
            </td>
            <td style="min-width:150px">
              {{data.menuName}}
            </td>
            <td style="white-space:nowrap;">
              {{data.submitTime.createTimeStr}}
            </td>
            <td style="white-space:nowrap;">
              {{data.queryStatusStr}}
            </td>
            <td>
              {{data.queryTimes}}
            </td>
            <td style="white-space:nowrap;">
              <a v-if="data.queryResultElement.downloadHref"
                 v-bind:href="data.queryResultElement.downloadHref" target="_blank">下载</a>
              <a v-if="data.queryResultElement.cancelHref"
                 data-dhref="{{data.queryResultElement.cancelHref}}"
                 v-on:click="handleCancelOnClick($event,data.queryResultElement.cancelHref,
                 data.queryResultElement.cancelInfo)">取消</a>
              <a v-if="data.queryResultElement.deleteTaskHref"
                 data-dhref="{{data.queryResultElement.deleteTaskHref}}"
                 v-on:click="handleDeleteOnClick($event,data.queryResultElement.deleteTaskHref,
                 data.queryResultElement.deleteTaskInfo)">删除</a>
              <a v-if="data.queryResultElement.retryTaskHref"
                 data-dhref="{{data.queryResultElement.retryTaskHref}}"
                 v-on:click="handleRetryTaskClick($event,data.queryResultElement.retryTaskHref,
                 data.queryResultElement.retryTaskInfo)">
                重试</a>
            </td>
            <td class="fail-reason">
              {{data.failReason}}
            </td>
            <td>
              {{data.userName}}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <vpagination
            style="float:right;"
            v-bind:corrent-page="Math.ceil((start + 1) / pageLength)"
            v-bind:total-page="Math.ceil(total / pageLength)"
            v-bind:text-prev-page="'上一页'"
            v-bind:text-next-page="'下一页'"
            v-bind:need-change-callback="true"
            v-on:change-page="changePage">
    </vpagination>
    <div>
      <p>&nbsp;</p>
      <p>总共 {{total}} 行 ，本页从 第 {{start*1+1}} 行到第 {{start*1 + pageLength*1}} 行</p>
    </div>
  </div>
</template>
<style type="text/css">
  .table-box {
    position: relative;
  }

  .table-box .table-mask {
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;

    -webkit-transition: opacity 0.5s linear, visibility 0s linear 0.8s;
    transition: opacity 0.5s linear, visibility 0s linear 0.8s;
    opacity: 0;
    visibility: hidden;
  }

  .table-box .table-mask.show {
    -webkit-transition: opacity 0.5s linear;
    transition: opacity 0.5s linear;
    opacity: 1;
    visibility: visible;
  }

  .table-box .table-mask > span {
    display: table;
    width: 100%;
    height: 100%;
  }

  .table-box .table-mask > span > span {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .my-control-label {
    margin-right: auto;
  }

  .page-length .page-length-select-control {
    display: block !important;
    -webkit-box-flex: 0 !important;
    -webkit-flex: 0 !important;
    -ms-flex: 0 !important;
    flex: 0 !important;
  }

  .page-length label.label {
    text-align: right;
  }

  .fail-reason {
    text-align: left;
  }

  .table-box .thead {
    white-space: nowrap;
  }
</style>

<script>
  import vpagination from '../../common/vTable/pagination.vue';
  import renxingStore from '../../../stores/renxing/renxingStore.js'
  import vMessageModel from '../messageModel/messageModel.vue'
  import vSortIcon from '../sortIcon/sortIcon.vue'


  import URI from 'urijs';

  export default{
    data(){
      return {
        renxingStoreData: renxingStore.data(),

        checkedInput: [],

        isLoading: false,
        start: 0,

        pageLengthList: [10, 20, 30, 50, 100, 200],

        sortName: "",
        sortState: "",
      };
    },
    props: {
      option: {type: Object},
      pageLength: {
        default: 20,
        coerce: val => Number.parseInt(val),// 将值转换为字符串
      },
      data: {
        default: Array(),
      },
    },
    computed: {
      data(){
        let data = [];
        let queryList = this.renxingStoreData.state.queryList;
        if (queryList.rows > 0 && queryList.list.length > 0) {
          data = queryList.list;
        }
        return data;
      },

      showData(){
        let showData = [];
        if (this.getData) {
          showData = this.data;
        } else {
          showData = this.data.slice(this.start, this.start + this.pageLength - 1);
        }

        return showData;
      },

      total(){
        return 0;
      },
    },
    methods: {
      handlePageLengthChange(e){
        this.fetchQueryListData();
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
      vpagination,
      vMessageModel,
      vSortIcon,
    },
    ready(){
    },
  }
</script>