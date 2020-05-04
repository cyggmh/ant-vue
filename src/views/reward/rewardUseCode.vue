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
                    <a-form-item label="使用者名称">
                      <a-input v-model="queryParam.userName" placeholder="请输入奖励名称" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="公会奖励名称">
                      <a-input v-model="queryParam.guildRewardName" placeholder="请输入奖励名称" />
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
                    <a-icon type="bar-chart"></a-icon><span>公会奖励兑换码列表</span>
                  </div>
                  <!-- <a-button type="primary" style="margin-bottom: 20px;position: absolute;right: 50px;"><router-link :to="{ path: '/reward/lookReward', query: {id: 0}}">新增公会奖励</router-link></a-button> -->
                </div>
                <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
                  <!--<span slot="registerTime" slot-scope="text, record">-->
                  <!--<span v-if="record.registerTime ">-->
                  <!--&lt;!&ndash;{{ record.registerTime.substring(0,10) }}&ndash;&gt;-->
                  <!--</span>-->
                  <!--</span>-->
                  <!-- <span slot="action" slot-scope="text, record">
                    <template>
                      <a><router-link :to="{ path: '/reward/lookReward', query: {id: record.id,state:'look'}}">查看</router-link></a>
                      <a-divider type="vertical" />
                      <a><router-link :to="{ path: '/reward/lookReward', query: {id: record.id}}">编辑</router-link></a>
                      <a-divider type="vertical" />
                      <a @click="() => {visible = true , num = 0 ,parameter.id = record.id}">生成奖励兑换码</a>
                    </template>
                  </span> -->
                </s-table>
              </div>
            </ez-view>
          </a-card>
        </div>
        <ez-view>
        </ez-view>
      </ez-view>
    </PageView>
    <a-modal
      width="30%"
      :visible="visible"
      title="生成奖励兑换码数量"
      :destroyOnClose="true"
      :footer="null"
      @cancel="() => {visible = false}"
    >
      <div>生成奖励兑换码数量</div>
      <a-input-number v-model="num" :max="10" placeholder="请填写生成奖励兑换码数量" />
      <a-button type="primary" style="width: 100%;margin-top: 20px;" @click="ok()">提交</a-button>
    </a-modal>
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
import rewardApi from '../../common/api/guild/rewardApi'
export default {
  name: 'Reward',
  components: {
    ARow,
    STable,
    PageView,
    TagSelect
  },
  data () {
    return {
		num: 1,
		visible: false,
      options: [],
      levels: {},
      natures: {},
      hosNames: [],
      validList: '',
      loadData: parameter => {
        return rewardApi.rewardUseCodeList({
          data: Object.assign(parameter, this.queryParam)
        }).then(res => {
          return res.data
        })
      },
      parameter: {
        id: ''
      },
      queryParam: {
        guildRewardName: '',
		userName: ''
      },
      columns: [{
        'title': 'id',
        'dataIndex': 'id'
      },
      {
        'title': '使用者名称',
        'dataIndex': 'userName'
      },
      {
        'title': '公会奖励名称',
        'dataIndex': 'guildRewardName'
      },
      {
        'title': '使用时间',
        'dataIndex': 'useTime'
      }
      ]
    }
  },
  mounted () {
    this.validList = BaseGlobal.validList
    this.getSelregions()
  },
  methods: {
	ok () {
		if (this.num <= 0) {
			this.$message.error('生成数量不能小于等于0')
			return
		}
		console.log(this.parameter.id, this.num)
		this.parameter.num = this.num
      rewardApi.rewardCode({
        data: this.parameter
      }).then(res => {
	if (res.code === 200) {
	this.$message.success('生成成功')
	this.visible = false
	}
        console.log(res)
      })
},
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
