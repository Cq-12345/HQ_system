<template>
  <el-container style="height: 100vh;">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <el-button class="menu-button" icon="el-icon-menu" @click="toggleAside" />
      <div class="header-center">
        <span class="title">HQ 培训管理系统</span>
      </div>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="32" src="/logo.jpg"></el-avatar>
            <span class="username">admin</span>
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
      <el-aside class="aside" v-show="showAside">
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
      <el-main class="main">
        <router-view></router-view> <!-- 在这里插入子页面的内容 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeMenu = ref('Dashboard');
const showAside = ref(window.innerWidth > 768);

const handleMenuSelect = (key) => {
  activeMenu.value = key;
  router.push({ name: key });
};

const toggleAside = () => {
  showAside.value = !showAside.value;
};

onMounted(() => {
  window.addEventListener('resize', () => {
    showAside.value = window.innerWidth > 768;
  });
});
</script>

<style scoped>
.header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-center {
  flex-grow: 1;
  text-align: center;
}

.title {
  color: white;
  font-size: 15px;
  line-height: 64px;
}

.header-right {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 10px;
}

.menu-button {
  display: block;
}

.aside {
  background-color: #2d3a4b;
  width: 200px;
}

.main {
  padding: 20px;
  background-color: #f0f2f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: row;
  }

  .header-center {
    order: 1;
    flex-grow: 1;
  }

  .header-right {
    order: 2;
  }

  .menu-button {
    order: 0;
  }

  .aside {
    width: 100%;
    position: absolute;
    z-index: 1000;
    height: auto;
  }

  .main {
    padding: 10px;
  }

  .el-menu-vertical-demo {
    display: block;
  }
}
</style>
