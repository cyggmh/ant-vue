<template>
  <div>
    <PageView logo="https://img.zcool.cn/community/012b895b49f980a8012036be4f13a6.jpg@1280w_1l_2o_100sh.jpg">
      <ez-view>
        <div slot="body">
          <a-card style="border: 0px;">
            <div class="table-page-search-wrapper">
              <a-form layout="inline">
                <!--layout="inline"-->
                <a-row :gutter="48">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="任务名称">
                      <a-input v-model="queryParam.taskName" placeholder="请输入任务名称" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="任务类型">
                      <a-select v-model="queryParam.taskType" placeholder="请选择任务类型">
                        <a-select-option
                          v-for="(item, index) in taskTypeList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="任务奖励">
                      <a-select v-model="queryParam.taskReward" placeholder="请选择任务奖励类型">
                        <a-select-option
                          v-for="(item, index) in taskRewardList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <div style="display: flex;margin-top: 0px;height: 32px;">
                  <div style="flex: 1"></div>
                  <div>
                    <a-form-item label="">
                      <a-button style="margin-left: 40px" icon="search" type="primary" @click="() => $refs.table.refresh()">搜索</a-button>
                      <a-button style="margin-left: 10px;" @click="queryParam = {}">重置</a-button>
                    </a-form-item>
                  </div>
                </div>
              </a-form>
            </div>
          </a-card>
          <a-card style="border: 0px;margin-top: 10px;">
            <ez-view slot="cover">
              <div slot="body" class="ez-a-table-th-nobg ez-a-card-spadding">
                <div style="margin-bottom: 10px;position: relative;height: 50px;">
                  <div style="float: left">
                    <a-icon type="bar-chart"></a-icon><span>任务列表</span>
                  </div>
                  <a-button type="primary" style="margin-bottom: 20px;position: absolute;right: 50px;"><router-link :to="{ path: '/task/lookTask', query: {id: 0}}">新增任务信息</router-link></a-button>
                </div>
                <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
                  <!--<span slot="registerTime" slot-scope="text, record">-->
                  <!--<span v-if="record.registerTime ">-->
                  <!--&lt;!&ndash;{{ record.registerTime.substring(0,10) }}&ndash;&gt;-->
                  <!--</span>-->
                  <!--</span>-->
                  <span slot="action" slot-scope="text, record">
                    <template>
                      <a><router-link :to="{ path: '/task/lookTask', query: {id: record.id,state:'look'}}">查看</router-link></a>
                      <a-divider type="vertical" />
                      <a><router-link :to="{ path: '/task/lookTask', query: {id: record.id}}">编辑</router-link></a>
                    </template>
                  </span>
                </s-table>
              </div>
            </ez-view>
          </a-card>
        </div>
        <ez-view>
        </ez-view>
      </ez-view>
    </PageView>
  </div>
</template>
<script>
import {
  PageView
} from '@/layouts'
import {
  STable, TagSelect
} from '@/components/antpro'
import * as BaseGlobal from '@/global/BaseGlobal'
// import HocApi from '../../../../common/api/mps/hospital/hosApi'
import ARow from 'ant-design-vue/lib/grid/Row'
// import PresApi from '../../../../common/api/mps/prescription/presApi'
import taskApi from '../../common/api/guild/taskApi'
export default {
  name: 'Task',
  components: {
    ARow,
    STable,
    PageView,
    TagSelect
  },
  data () {
    return {
		taskTypeList: ['全部', '熔炉悬赏', '先锋悬赏', '智谋悬赏', '日常悬赏'],
		taskRewardList: ['全部', '微光', '光尘', '经验值'],
      options: [],
      levels: {},
      natures: {},
      hosNames: [],
      validList: '',
      loadData: parameter => {
        return taskApi.taskList({
          data: Object.assign(parameter, this.queryParam)
        }).then(res => {
          return res.data
        })
      },
      parameter: {
        districtId: ''
      },
      queryParam: {
      },
      columns: [{
        'title': 'id',
        'dataIndex': 'id'
      },
      {
        'title': '任务名称',
        'dataIndex': 'taskName'
      },
      {
        'title': '任务类型',
        'dataIndex': 'taskType'
      },
      {
        'title': '任务奖励',
        'dataIndex': 'taskReward'
      },
      {
        'title': '奖励数值',
        'dataIndex': 'taskAsk'
      },
      {
        'title': '任务花费(微光)',
        'dataIndex': 'taskSpend'
      },
      {
        'title': '开始时间',
        'dataIndex': 'taskStartTime'
      },
      {
        'title': '结束时间',
        'dataIndex': 'taskEndTime'
      },
      {
        'title': '操作',
        'dataIndex': 'action',
        'width': '150px',
        'scopedSlots': {
          'customRender': 'action'
        }
      }
      ]
    }
  },
  mounted () {
    this.validList = BaseGlobal.validList
    // const self = this
    this.getSelregions()
  },
  methods: {
    getSelregions () {
      // PresApi.getSelregion({
      //   data: {
      //     level: 2,
      //     id: 31196
      //   }
      // }).then(res => {
      //   console.log(res)
      //   this.options = res.data
      // })
    },
    onChanges (value) {
      console.log(value)
      this.parameter.districtId = value[value.length - 1]
    }
  }
}
</script>
