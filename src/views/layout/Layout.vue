<template>
  <div>
    <div v-if="!isMobile">
      <!-- PC端布局 -->
      <header class="d-flex justify-content-between align-items-center bg-primary text-white p-3 w-100">
        <button class="btn btn-light" @click="toggleAside">
          <i class="bi bi-list">更多操作</i>
        </button>
        <span class="title">HQ 培训管理系统</span>
        <div class="d-flex align-items-center">
          <img src="/logo.jpg" class="rounded-circle" width="32" height="32" />
          <span class="ms-2">admin</span>
        </div>
      </header>
      <div class="d-flex">
        <aside class="offcanvas offcanvas-start" :class="{ show: showAside }" tabindex="-1" style="visibility: visible;" v-if="showAside">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">菜单</h5>
            <button type="button" class="btn-close text-reset" @click="toggleAside"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="nav flex-column">
              <li class="nav-item" @click="handleMenuSelect('Dashboard')">首页</li>
              <li class="nav-item" @click="handleMenuSelect('ApplicationManagement')">培训申请管理</li>
              <li class="nav-item" @click="handleMenuSelect('CourseManagement')">课程管理</li>
              <li class="nav-item" @click="handleMenuSelect('LecturerManagement')">讲师管理</li>
              <li class="nav-item" @click="handleMenuSelect('StudentManagement')">学员管理</li>
              <li class="nav-item" @click="handleMenuSelect('NotificationManagement')">通知管理</li>
              <li class="nav-item" @click="handleMenuSelect('EnrollmentManagement')">报名管理</li>
              <li class="nav-item" @click="handleMenuSelect('AttendanceManagement')">签到和费用管理</li>
              <li class="nav-item" @click="handleMenuSelect('EvaluationManagement')">培训评价和统计</li>
              <li class="nav-item" @click="handleMenuSelect('Settings')">关于我们</li>
            </ul>
          </div>
        </aside>
        <main class="col bg-light p-3 flex-grow-1">
          <router-view></router-view>
        </main>
      </div>
    </div>

    <div v-else>
      <!-- 移动端布局 -->
      <header class="d-flex justify-content-between align-items-center bg-primary text-white p-3 w-100">
        <button class="btn btn-light" @click="toggleAside">
          <i class="bi bi-list">更多操作</i>
        </button>
        <span class="title">HQ 培训管理系统</span>
        <div class="d-flex align-items-center">
          <img src="/logo.jpg" class="rounded-circle" width="32" height="32" />
          <span class="ms-2">admin</span>
        </div>
      </header>
      <div class="offcanvas offcanvas-start" :class="{ show: showAside }" tabindex="-1" style="visibility: visible;" v-if="showAside">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">菜单</h5>
          <button type="button" class="btn-close text-reset" @click="toggleAside"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="nav flex-column">
            <li class="nav-item" @click="handleMobileMenuSelect('Dashboard')">首页</li>
            <li class="nav-item" @click="handleMobileMenuSelect('ApplicationManagement')">培训申请管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('CourseManagement')">课程管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('LecturerManagement')">讲师管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('StudentManagement')">学员管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('NotificationManagement')">通知管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('EnrollmentManagement')">报名管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('AttendanceManagement')">签到和费用管理</li>
            <li class="nav-item" @click="handleMobileMenuSelect('EvaluationManagement')">培训评价和统计</li>
            <li class="nav-item" @click="handleMobileMenuSelect('Settings')">系统设置</li>
          </ul>
        </div>
      </div>
      <main class="container-fluid p-3">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showAside = ref(window.innerWidth > 768);
const isMobile = ref(false);

const handleMenuSelect = (key) => {
  router.push({ name: key });
  if (window.innerWidth <= 768) {
    showAside.value = false; // 点击菜单项后自动收回侧边栏（PC端和移动端都支持）
  }
};

const handleMobileMenuSelect = (key) => {
  handleMenuSelect(key);
  showAside.value = false; // 选择菜单项后自动收回
};

const toggleAside = () => {
  showAside.value = !showAside.value;
};

onMounted(() => {
  isMobile.value = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) != null;
  window.addEventListener('resize', () => {
    showAside.value = window.innerWidth > 768;
  });
});
</script>

<style scoped>
.header {
  background-color: #409EFF;
  color: white;
  padding: 1rem;
  width: 100%;
}

.title {
  color: white;
  font-size: 1.25rem;
}

.nav-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #1c2531;
}

.offcanvas {
  width: 250px;
  background-color: #2d3a4b;
  color: #fff;
}

.offcanvas-header {
  background-color: #2d3a4b;
  color: #fff;
}

.offcanvas-body {
  background-color: #2d3a4b;
  color: #fff;
  padding: 0;
}

.offcanvas-body .nav-item {
  padding: 1rem;
  border-bottom: 1px solid #1c2531;
}

.rounded-circle {
  border: 2px solid #fff;
}

/* 响应式 */
@media (max-width: 768px) {
  .header {
    padding: 0.5rem;
  }

  .title {
    font-size: 1rem;
  }
}
</style>
