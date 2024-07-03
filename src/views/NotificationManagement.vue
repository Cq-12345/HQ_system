<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-6">
        <input v-model="searchQuery" class="form-control" placeholder="请输入通知内容或课程名称">
      </div>
      <div class="col-md-3">
        <select v-model="filterType" class="form-select" placeholder="选择通知类型">
          <option value="">全部</option>
          <option value="course">课程通知</option>
          <option value="massEmail">群发邮件</option>
          <option value="reminder">提醒邮件</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="filterStatus" class="form-select" placeholder="选择状态">
          <option value="">全部</option>
          <option value="pending">待发送</option>
          <option value="sent">已发送</option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col text-end">
        <button class="btn btn-primary me-2" @click="fetchNotifications">查询</button>
        <button class="btn btn-secondary me-2" @click="resetFilters">清空</button>
        <button class="btn btn-success me-2" @click="openAddNotificationForm">新增通知</button>
        <button class="btn btn-primary" @click="exportToExcel">导出为Excel</button>
      </div>
    </div>

    <!-- 通知列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th>通知类型</th>
          <th>课程名称</th>
          <th>通知内容</th>
          <th>状态</th>
          <th>发送时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notification in notifications" :key="notification.id">
          <td>
            <span :class="getTypeBadgeClass(notification.type)">{{ getTypeLabel(notification.type) }}</span>
          </td>
          <td>{{ notification.courseName }}</td>
          <td>{{ notification.content }}</td>
          <td>
            <span :class="getStatusBadgeClass(notification.status)">{{ getStatusLabel(notification.status) }}</span>
          </td>
          <td>{{ formatDate(notification.sendTime) }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm me-1" @click="openViewNotificationForm(notification)">查看</button>
            <button class="btn btn-outline-secondary btn-sm me-1" @click="openEditNotificationForm(notification)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteNotification(notification)">删除</button>
            <button class="btn btn-outline-warning btn-sm" @click="sendEmail(notification)" v-if="notification.type === 'course'">发送邮件</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页功能 -->
    <div class="d-flex justify-content-center mt-3">
      <ul class="pagination">
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" @click="handleCurrentChange(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

    <!-- 通知详情对话框 -->
    <NotificationForm ref="notificationForm" @refresh="fetchNotifications" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import NotificationForm from '../views/form/NotificationForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchQuery = ref('');
const filterType = ref('');
const filterStatus = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalNotifications = ref(0);

const notifications = reactive([
  // 示例数据
  { id: '1', type: 'course', courseName: 'Vue.js入门', content: '欢迎参加Vue.js入门课程', status: 'pending', sendTime: '2024-07-01T09:00:00' },
  { id: '2', type: 'massEmail', courseName: 'React.js进阶', content: '欢迎参加React.js进阶课程', status: 'sent', sendTime: '2024-07-02T09:00:00' },
  { id: '3', type: 'reminder', courseName: 'Angular基础', content: '别忘了参加Angular基础课程', status: 'sent', sendTime: '2024-07-02T08:00:00' },
]);

const notificationForm = ref(null);

const fetchNotifications = () => {
  console.log(`Fetching notifications with query: ${searchQuery.value}, type: ${filterType.value}, status: ${filterStatus.value}`);
  // 调用 API 获取数据，并更新 notifications 和 totalNotifications
};

const resetFilters = () => {
  searchQuery.value = '';
  filterType.value = '';
  filterStatus.value = '';
  fetchNotifications();
};

const openAddNotificationForm = () => {
  notificationForm.value.openForm();
};

const openViewNotificationForm = (notification) => {
  notificationForm.value.openForm(notification, true);
};

const openEditNotificationForm = (notification) => {
  notificationForm.value.openForm(notification);
};

const deleteNotification = (notification) => {
  console.log('Delete notification', notification);
  // 删除通知的逻辑
};

const sendEmail = (notification) => {
  console.log('Send email for notification', notification);
  // 发送邮件的逻辑
};

const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchNotifications();
};

const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchNotifications();
};

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const getTypeBadgeClass = (type) => {
  switch (type) {
    case 'course':
      return 'badge bg-info';
    case 'massEmail':
      return 'badge bg-success';
    case 'reminder':
      return 'badge bg-warning text-dark';
    default:
      return 'badge bg-secondary';
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'course':
      return '课程通知';
    case 'massEmail':
      return '群发邮件';
    case 'reminder':
      return '提醒邮件';
    default:
      return '未知类型';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'sent':
      return 'badge bg-success';
    case 'pending':
    default:
      return 'badge bg-warning text-dark';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'sent':
      return '已发送';
    case 'pending':
    default:
      return '待发送';
  }
};

const exportToExcel = () => {
  const data = notifications.map(notification => ({
    '通知类型': getTypeLabel(notification.type),
    '课程名称': notification.courseName,
    '通知内容': notification.content,
    '状态': getStatusLabel(notification.status),
    '发送时间': formatDate(notification.sendTime)
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '通知数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'notifications.xlsx');
};

const totalPages = computed(() => {
  return Math.ceil(totalNotifications.value / pageSize.value);
});

onMounted(() => {
  fetchNotifications();
});
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.pagination .page-item .page-link {
  color: #007bff;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.4em;
}

.btn-group .btn {
  margin-right: 5px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}
</style>
