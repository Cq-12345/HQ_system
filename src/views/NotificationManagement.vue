<template>
  <div>
    <!-- 搜索和筛选栏 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        <el-input v-model="searchQuery" placeholder="请输入通知内容或课程名称" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="filterType" placeholder="选择通知类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="课程通知" value="course"></el-option>
          <el-option label="群发邮件" value="massEmail"></el-option>
          <el-option label="提醒邮件" value="reminder"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="filterStatus" placeholder="选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待发送" value="pending"></el-option>
          <el-option label="已发送" value="sent"></el-option>
        </el-select>
      </el-col>
      <el-col :span="10" style="text-align: right;">
        <el-button type="primary" @click="fetchNotifications">查询</el-button>
        <el-button @click="resetFilters">清空</el-button>
        <el-button type="primary" @click="openAddNotificationForm">新增通知</el-button>
      </el-col>
    </el-row>

    <!-- 通知列表 -->
    <el-table :data="notifications" border>
      <el-table-column prop="type" label="通知类型" width="120">
        <template v-slot="scope">
          <el-tag :type="getTypeTagType(scope.row.type)">{{ getTypeLabel(scope.row.type) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="150"></el-table-column>
      <el-table-column prop="content" label="通知内容" width="300"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">{{ getStatusLabel(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sendTime" label="发送时间" sortable width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.sendTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="openViewNotificationForm(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="openEditNotificationForm(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteNotification(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="sendEmail(scope.row)" v-if="scope.row.type === 'course'">发送邮件</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNotifications"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 通知详情对话框 -->
    <NotificationForm ref="notificationForm" @refresh="fetchNotifications" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import NotificationForm from '../views/form/NotificationForm.vue';

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

const getTypeTagType = (type) => {
  switch (type) {
    case 'course':
      return 'info';
    case 'massEmail':
      return 'success';
    case 'reminder':
      return 'warning';
    default:
      return 'default';
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

const getStatusTagType = (status) => {
  switch (status) {
    case 'sent':
      return 'success';
    case 'pending':
    default:
      return 'warning';
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
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box .text {
  display: flex;
  align-items: center;
}

.box .item i {
  font-size: 24px;
  margin-right: 10px;
}

.count {
  font-size: 24px;
  color: #409EFF;
}

.btn {
  text-align: right;
  margin-top: 10px;
}
</style>
