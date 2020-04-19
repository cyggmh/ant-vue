<template>
  <div class="ez-view">
    <slot name="body"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EzPage'
}
</script>

<style scoped>
  .ez-a-table-th-nobg >>> .ant-table-thead > tr > th{
    /*background-color: transparent;*/
    font-size: 13px;
  }
  .ez-view >>> .ant-table-thead > tr > th{
    /*background: transparent;*/
    line-height: 12px;
    border-bottom: 1px #f4f4f4 solid;
  }
  .ez-view >>> .ant-table-tbody > tr > td {
    border-bottom: 1px #f4f4f4 solid;
    line-height: 10px;
    font-size: 13px;
  }
</style>
<style scoped lang="less">
  .ez-a-card-spadding{
    box-sizing: border-box;padding: 20px;text-align: center
  }
</style>
