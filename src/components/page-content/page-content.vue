<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h2 class="title">{{ contentConfig.header?.title || '数据列表' }}</h2>
        <el-button type="primary" @click="handleCreateNewUser" v-if="isCreate">
          {{ contentConfig.header?.btnTitle || '新建数据' }}
        </el-button>
      </div>
      <div class="content-list">
        <el-table border :data="pageList" style="width: 100%" v-bind="contentConfig.childrenTree">
          <template v-for="item in contentConfig.propList" :key="item.prop">
            <!-- 第一种抽离的方式 -->
            <template v-if="item.type === 'timer'">
              <el-table-column v-bind="item">
                <template #default="scope">
                  {{ formatUTC(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'normal'">
              <el-table-column v-bind="item" />
            </template>
            <template v-else-if="item.type === 'handler'">
              <el-table-column v-bind="item">
                <template #default="scope">
                  <el-button 
                    size="small" 
                    text 
                    type="primary" 
                    icon="Edit" 
                    @click="handleEditClick(scope.row)"
                    v-if="isUpdate"
                  >
                    编辑
                  </el-button>
                  <el-button 
                    size="small" 
                    text 
                    type="danger" 
                    icon="Delete" 
                    @click="handleDeleteClick(scope.row.id)"
                    v-if="isDelete"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'custom'">
              <el-table-column v-bind="item">
                <!-- 第一种做法：在tempalte中进行写死 -->
                <!-- <template #default="scope">
                  --{{ scope.row[item.prop] }}--
                </template> -->
                <!-- 第二种做法：作用域插槽做法 -->
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column v-bind="item" />
            </template>
          </template>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination 
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          :small="small"
          layout="sizes, prev, pager, next, jumper, total"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import formatUTC from '@/utils/formatUTCTime'
import useSystemStore from '@/store/main/system/system'
import type { IProps } from '@/components/page-content/type'
import usePermissions from '@/hooks/usePermissions'
import { ref } from 'vue'

const props = defineProps<IProps>()

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)
const emit = defineEmits(['createNewTable', 'editTableInfo'])

// 0.获取是否有增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.通过action发起数据请求
const systemUserStore = useSystemStore()
fetchPageList()

// 2.获取userList数据进行展示，第一次会获取空值，使用computed或storeToRefs(响应式)
const { pageList, pageTotalCount } = storeToRefs(systemUserStore)

// 处理页码发生改变的监听
function handleSizeChange() {
  fetchPageList()
}

// 处理当前页面改变的监听
function handleCurrentChange() {
  fetchPageList()
}

// pinia监听action的API，如果增删改了数据，回到第一页
systemUserStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'editPageInfoAction' ||
      name === 'postNewPageInfoAction' ||
      name === 'deletePageListByIdAction'
    ) {
      currentPage.value = 1
    }
  })
})

// 获取网络请求的函数
function fetchPageList(formData: any = {}) { // 需要给一个默认的值防止上面函数报错
  if (!isQuery) return
  // 1.获取offset和size
  const size = pageSize.value
  // 2.获取每次的偏移量*10 1：0 2：10
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  // 3.把offset size和search框中的数据一起传入网络请求函数
  systemUserStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 处理删除点击事件
function handleDeleteClick(id: number) {
  systemUserStore.deletePageListByIdAction(props.contentConfig.pageName, id)
}

// 新建数据
function handleCreateNewUser() {
  emit('createNewTable')
}

// 编辑数据
function handleEditClick(rowData: any) {
  emit("editTableInfo", rowData)
}

// 将网络请求的方法暴露出去 
defineExpose({ fetchPageList })
</script>

<style lang="less" scoped>
.content {
  padding: 20px 0 20px 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px 0;
  }

  .content-list {
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    padding: 20px 10px 20px 0;
  }
}
</style>
