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
                    <a-form-item label="图片分组">
                      <a-select v-model="queryParam.group" placeholder="请选择图片分组">
                        <a-select-option
                          label="全部"
                          value=""
                        >全部</a-select-option>
                        <a-select-option
                          label="头像"
                          :value="1"
                        >头像</a-select-option>
                        <a-select-option
                          label="商品"
                          :value="0"
                        >商品</a-select-option>
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
                    <a-icon type="bar-chart"></a-icon><span>图片库</span>
                  </div>
                  <!-- <a-button type="primary" style="margin-bottom: 20px;position: absolute;right: 50px;"><router-link :to="{ path: '/task/lookTask', query: {id: 0}}">新增任务信息</router-link></a-button> -->
                </div>
                <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
                  <!--<span slot="registerTime" slot-scope="text, record">-->
                  <!--<span v-if="record.registerTime ">-->
                  <!--&lt;!&ndash;{{ record.registerTime.substring(0,10) }}&ndash;&gt;-->
                  <!--</span>-->
                  <!--</span>-->
                  <span slot="url" slot-scope="text, record">
                    <template>
                      <img :src="record.url" style="width: 600px;height: 300px;"/>
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
import imagesApi from '../../common/api/guild/imagesApi'
export default {
  name: 'Images',
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
        return imagesApi.imagesList({
          data: Object.assign(parameter, this.queryParam)
        }).then(res => {
          return res.data
        })
      },
      parameter: {
        districtId: ''
      },
      queryParam: {
		group: ''
      },
      columns: [{
        'title': 'id',
        'dataIndex': 'id'
      },
      {
        'title': '图片',
        'dataIndex': 'url',
        'scopedSlots': {
          'customRender': 'url'
        }
      },
      {
        'title': '图片分组',
        'dataIndex': 'group',
        customRender: (group) => { if (group === '0') { return '商品' } else if (group === '1') { return '头像' } }
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
