<template>
  <el-container style="height: 100vh;">
    <!-- 顶部导航栏 -->
    <el-header style="background-color: #409EFF; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
      <div>
        <img src="/logo.jpg" alt="Company Logo" style="height: 30px; margin-right: 10px;" />
        <el-link :underline="false" href="/" style="color: white; font-size: 24px;">HQ 培训管理系统</el-link>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="32" src="/logo.jpg"></el-avatar>
            <span style="margin-left: 10px;">用户名</span>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: #2d3a4b;">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenuSelect" mode="vertical" background-color="#2d3a4b" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="Dashboard">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="ApplicationManagement">
            <i class="el-icon-document"></i>
            <span>培训申请管理</span>
          </el-menu-item>
          <el-menu-item index="CourseManagement">
            <i class="el-icon-notebook-2"></i>
            <span>课程管理</span>
          </el-menu-item>
          <el-menu-item index="LecturerManagement">
            <i class="el-icon-user"></i>
            <span>讲师管理</span>
          </el-menu-item>
          <el-menu-item index="StudentManagement">
            <i class="el-icon-user-solid"></i>
            <span>学员管理</span>
          </el-menu-item>
          <el-menu-item index="NotificationManagement">
            <i class="el-icon-bell"></i>
            <span>通知管理</span>
          </el-menu-item>
          <el-menu-item index="EnrollmentManagement">
            <i class="el-icon-edit-outline"></i>
            <span>报名管理</span>
          </el-menu-item>
          <el-menu-item index="AttendanceManagement">
            <i class="el-icon-s-data"></i>
            <span>签到和费用管理</span>
          </el-menu-item>
          <el-menu-item index="EvaluationManagement">
            <i class="el-icon-star-on"></i>
            <span>培训评价和统计</span>
          </el-menu-item>
          <el-menu-item index="Settings">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区 -->
      <el-main style="padding: 20px; background-color: #f0f2f5;">
        <router-view></router-view> <!-- 在这里插入子页面的内容 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeMenu = ref('Dashboard');

const handleMenuSelect = (key) => {
  activeMenu.value = key;
  router.push({ name: key });
};
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: white;
}

.el-menu-vertical-demo {
  background-color: #2d3a4b;
}

.el-menu-item {
  color: white;
}

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
