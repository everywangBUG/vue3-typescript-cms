<template>
  <div class="header-info">
    <div class="operation">
      <span class="icon-operation">
        <el-icon><Bell /></el-icon>
        <el-icon><ChatDotRound /></el-icon>
        <el-icon><CreditCard /></el-icon>
      </span>
      <el-dropdown>
        <span class="avatar-item">
          <el-avatar :size="30" />
          <span class="name">coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              <el-icon><Warning /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><User /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Edit /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/constants/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleLogout() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('./login')
}
</script>

<style lang="less" scoped>
.header-info {
  .operation {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-operation {
      .el-icon {
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
    .el-dropdown {
      .avatar-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        .el-avatar {
          display: flex;
          align-items: center;
          margin: 0 3px 0 10px;
          cursor: pointer;
        }
      }
    }
    .name {
      margin-left: 5px;
    }
  }
}
.header-info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
