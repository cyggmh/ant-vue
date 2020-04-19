<template>
  <div class="ez-view">
    <div v-if="type === 'success'">
      <div style="text-align: center;margin-top: 80px">
        <a-icon type="check-circle" style="font-size: 60px;color: #52c41a" />
      </div>
      <div style="text-align: center;margin-top: 20px" class="title">
        <h3>{{ title }}</h3>
      </div>
      <div style="margin-top: 80px;display: flex">
        <div style="flex: 1"></div>
        <a-button @click="() => {$emit('onClose')}" icon="left-square">关闭</a-button>
        <a-button style="margin-left: 20px" type="primary" v-if="info" icon="highlight" @click="() => {closeView (),$emit('showUserInfo', userId)}" >查看详情</a-button>
        <a-button style="margin-left: 20px" type="primary" v-if="next" @click="onNext" icon="highlight">继续添加</a-button>
        <div style="flex: 1"></div>
      </div>
    </div>
    <slot name="body">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Boolean],
      default: '数据保存成功！'
    },
    type: {
      type: [String, Boolean],
      default: 'success'
    },
    next: {
      type: [Boolean, Boolean],
      default: true
    },
    info: {
      type: [Boolean, Boolean],
      default: true
    },
    close: {
      type: [Boolean, Boolean],
      default: true
    }
  },
  name: 'EzPage',
  methods: {
    onNext () {
    },
    onClose () {
    }
  }
}
</script>

<style scoped>
  .ez-view >>> .ant-table-thead > tr > th{
    background: transparent;
    border-bottom: 1px #f4f4f4 solid;
  }
  .ez-view >>> .ant-table-tbody > tr > td {
    border-bottom: 1px #f4f4f4 solid;
  }
</style>
