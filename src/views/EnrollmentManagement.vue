<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-5">
        <input v-model="searchQuery" class="form-control" placeholder="请输入学员姓名或课程名称">
      </div>
      <div class="col-md-3">
        <select v-model="filterStatus" class="form-select">
          <option value="">全部</option>
          <option value="pending">待确认</option>
          <option value="confirmed">已确认</option>
        </select>
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary me-2" @click="fetchEnrollments">查询</button>
        <button class="btn btn-secondary me-2" @click="resetFilters">清空</button>
        <button class="btn btn-success me-2" @click="saveToExcel">保存到Excel</button>
        <button class="btn btn-primary" @click="openAddEnrollmentForm">新增报名</button>
      </div>
    </div>

    <!-- 报名信息列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>课程名称</th>
          <th>公司名称</th>
          <th>工作岗位</th>
          <th>技术水平</th>
          <th>联系方式</th>
          <th>填写时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="enrollment in enrollments" :key="enrollment.id">
          <td>{{ enrollment.studentName }}</td>
          <td>{{ enrollment.gender }}</td>
          <td>{{ enrollment.courseName }}</td>
          <td>{{ enrollment.company }}</td>
          <td>{{ enrollment.position }}</td>
          <td>{{ enrollment.skillLevel }}</td>
          <td>{{ enrollment.contact }}</td>
          <td>{{ formatDate(enrollment.fillTime) }}</td>
          <td>
            <span :class="getStatusBadgeClass(enrollment.status)">{{ getStatusLabel(enrollment.status) }}</span>
          </td>
          <td>
            <button class="btn btn-outline-success btn-sm me-1" @click="confirmEnrollment(enrollment)">确认</button>
            <button class="btn btn-outline-primary btn-sm me-1" @click="openEditEnrollmentForm(enrollment)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteEnrollment(enrollment)">删除</button>
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

    <!-- 报名表单对话框 -->
    <enrollment-form ref="enrollmentForm" @refresh="fetchEnrollments" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import EnrollmentForm from '../views/form/EnrollmentForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchQuery = ref('');
const filterStatus = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalEnrollments = ref(0);

const enrollments = reactive([
  // 示例数据
  { id: '1', studentName: '张三', gender: '男', courseName: 'Vue.js入门', company: '公司A', position: '开发工程师', skillLevel: '中级', contact: '12345678901', fillTime: '2024-06-01T10:00:00', status: 'pending' },
  { id: '2', studentName: '李四', gender: '女', courseName: 'React.js进阶', company: '公司B', position: '高级工程师', skillLevel: '高级', contact: '09876543210', fillTime: '2024-06-02T11:00:00', status: 'confirmed' },
]);

const enrollmentForm = ref(null);

const fetchEnrollments = () => {
  console.log(`Fetching enrollments with query: ${searchQuery.value}, status: ${filterStatus.value}`);
  // 调用 API 获取数据，并更新 enrollments 和 totalEnrollments
};

const resetFilters = () => {
  searchQuery.value = '';
  filterStatus.value = '';
  fetchEnrollments();
};

const confirmEnrollment = (enrollment) => {
  console.log('Confirm enrollment', enrollment);
  enrollment.status = 'confirmed';
  // 发送确认邮件逻辑
};

const deleteEnrollment = (enrollment) => {
  console.log('Delete enrollment', enrollment);
  // 删除报名信息的逻辑
};

const saveToExcel = () => {
  const data = enrollments.map(enrollment => ({
    '姓名': enrollment.studentName,
    '性别': enrollment.gender,
    '课程名称': enrollment.courseName,
    '公司名称': enrollment.company,
    '工作岗位': enrollment.position,
    '技术水平': enrollment.skillLevel,
    '联系方式': enrollment.contact,
    '填写时间': formatDate(enrollment.fillTime),
    '状态': getStatusLabel(enrollment.status)
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '报名信息');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'enrollments.xlsx');
};

const openAddEnrollmentForm = () => {
  enrollmentForm.value.openForm();
};

const openEditEnrollmentForm = (enrollment) => {
  enrollmentForm.value.openForm(enrollment);
};

const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchEnrollments();
};

const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchEnrollments();
};

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'confirmed':
      return 'badge bg-success';
    case 'pending':
    default:
      return 'badge bg-warning text-dark';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'confirmed':
      return '已确认';
    case 'pending':
    default:
      return '待确认';
  }
};

const totalPages = computed(() => {
  return Math.ceil(totalEnrollments.value / pageSize.value);
});

onMounted(() => {
  fetchEnrollments();
});
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}

.btn-group .btn {
  margin-right: 5px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.4em;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.pagination .page-item .page-link {
  color: #007bff;
}
</style>
