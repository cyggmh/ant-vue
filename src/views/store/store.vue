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
                    <a-form-item label="商品名称">
                      <a-input v-model="queryParam.goodsName" placeholder="请输入任务名称" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="支付类型">
                      <a-select v-model="queryParam.goodsPayType" placeholder="请选择支付类型">
                        <a-select-option
                          v-for="(item, index) in goodsPayTypeList"
                          :key="index"
                          :label="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="商品状态">
                      <a-select v-model="queryParam.goodsState" placeholder="请选择商品状态">
                        <a-select-option
                          v-for="(item, index) in goodsStateList"
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
                    <a-icon type="bar-chart"></a-icon><span>商品列表</span>
                  </div>
                  <a-button type="primary" style="margin-bottom: 20px;position: absolute;right: 50px;"><router-link :to="{ path: '/store/lookStore', query: {id: 0}}">新增商品</router-link></a-button>
                </div>
                <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
                  <!--<span slot="registerTime" slot-scope="text, record">-->
                  <!--<span v-if="record.registerTime ">-->
                  <!--&lt;!&ndash;{{ record.registerTime.substring(0,10) }}&ndash;&gt;-->
                  <!--</span>-->
                  <!--</span>-->
                  <span slot="action" slot-scope="text, record">
                    <template>
                      <a><router-link :to="{ path: '/store/lookStore', query: {id: record.id,state:'look'}}">查看</router-link></a>
                      <a-divider type="vertical" />
                      <a><router-link :to="{ path: '/store/lookStore', query: {id: record.id}}">编辑</router-link></a>
                      <a-divider type="vertical" />
                      <a @click="() => {visible = true , num = parseInt(record.goodsStock) ,parameter.id = record.id}">修改库存</a>
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
    <a-modal
      width="30%"
      :visible="visible"
      title="修改库存"
      :destroyOnClose="true"
      :footer="null"
      @cancel="() => {visible = false}"
    >
      <div>修改库存数量</div>
      <a-input-number v-model="num" placeholder="请填写修改库存数量" />
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
import goodsApi from '../../common/api/guild/goodsApi'
export default {
  name: 'Store',
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
		goodsPayTypeList: ['全部', '光尘', '微光', '银币'],
		goodsStateList: ['全部', '启用', '未启用'],
      options: [],
      levels: {},
      natures: {},
      hosNames: [],
      validList: '',
      loadData: parameter => {
        return goodsApi.goodsList({
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
        'title': '商品名称',
        'dataIndex': 'goodsName'
      },
      {
        'title': '支付类型',
        'dataIndex': 'goodsPayType'
      },
      {
        'title': '商品库存',
        'dataIndex': 'goodsStock'
      },
      {
        'title': '商品价格',
        'dataIndex': 'goodsPrice'
      },
      {
        'title': '状态',
        'dataIndex': 'goodsState',
        customRender: (goodsState) => { if (goodsState === '0') { return '未启用' } else if (goodsState === '1') { return '启用' } }
      },
      {
        'title': '销售数量',
        'dataIndex': 'saleNumber'
      },
      {
        'title': '操作',
        'dataIndex': 'action',
        'width': '250px',
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
	ok () {
		if (this.num <= 0) {
			this.$message.error('库存数量不能小于等于0')
			return
		}
		console.log(this.parameter.id, this.num)
		this.parameter.num = this.num
      goodsApi.goodsNum({
        data: this.parameter
      }).then(res => {
	if (res.code === 200) {
	this.$message.success('修改成功')
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
