import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/layout/Layout.vue'; // 引入Layout组件
import Dashboard from '../views/Dashboard.vue';
import ApplicationManagement from '../views/ApplicationManagement.vue';
import CourseManagement from '../views/CourseManagement.vue';
import LecturerManagement from '../views/LecturerManagement.vue';
import StudentManagement from '../views/StudentManagement.vue';
import NotificationManagement from '../views/NotificationManagement.vue';
import EnrollmentManagement from '../views/EnrollmentManagement.vue';
import AttendanceManagement from '../views/AttendanceManagement.vue';
import EvaluationManagement from '../views/EvaluationManagement.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: '/',
    component: Layout, // 使用Layout作为父组件
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '首页 - 培训管理系统' },
      },
      {
        path: 'applications',
        name: 'ApplicationManagement',
        component: ApplicationManagement,
        meta: { title: '培训申请管理 - 培训管理系统' },
      },
      {
        path: 'courses',
        name: 'CourseManagement',
        component: CourseManagement,
        meta: { title: '课程管理 - 培训管理系统' },
      },
      {
        path: 'lecturers',
        name: 'LecturerManagement',
        component: LecturerManagement,
        meta: { title: '讲师管理 - 培训管理系统' },
      },
      {
        path: 'students',
        name: 'StudentManagement',
        component: StudentManagement,
        meta: { title: '学员管理 - 培训管理系统' },
      },
      {
        path: 'notifications',
        name: 'NotificationManagement',
        component: NotificationManagement,
        meta: { title: '通知管理 - 培训管理系统' },
      },
      {
        path: 'enrollments',
        name: 'EnrollmentManagement',
        component: EnrollmentManagement,
        meta: { title: '报名管理 - 培训管理系统' },
      },
      {
        path: 'attendance',
        name: 'AttendanceManagement',
        component: AttendanceManagement,
        meta: { title: '签到和费用管理 - 培训管理系统' },
      },
      {
        path: 'evaluations',
        name: 'EvaluationManagement',
        component: EvaluationManagement,
        meta: { title: '培训评价和统计 - 培训管理系统' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: { title: '系统设置 - 培训管理系统' },
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '培训管理系统';
  next();
});

export default router;


  // ├── views/                # 页面组件
  // │   ├── Dashboard.vue     # 首页
  // │   ├── ApplicationManagement.vue  # 培训申请管理
  // │   ├── CourseManagement.vue       # 培训课程管理
  // │   ├── LecturerManagement.vue     # 讲师管理
  // │   ├── StudentManagement.vue      # 学员管理
  // │   ├── NotificationManagement.vue # 通知管理
  // │   ├── EnrollmentManagement.vue   # 报名管理
  // │   ├── AttendanceManagement.vue   # 签到和费用管理
  // │   ├── EvaluationManagement.vue   # 培训评价和统计
  // │   └── Settings.vue               # 系统设置
  