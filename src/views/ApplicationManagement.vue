<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-5">
        <input v-model="searchQuery" class="form-control" placeholder="请输入公司名称或联系人">
      </div>
      <div class="col-md-3">
        <select v-model="filterStatus" class="form-select">
          <option value="">全部</option>
          <option value="pending">待审核</option>
          <option value="approved">已通过</option>
          <option value="rejected">已拒绝</option>
        </select>
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary me-2" @click="fetchApplications">查询</button>
        <button class="btn btn-secondary me-2" @click="resetFilters">清空</button>
        <button class="btn btn-success me-2" @click="openAddApplicationForm">新增申请</button>
        <button class="btn btn-info" @click="exportToExcel">导出为Excel</button>
      </div>
    </div>

    <!-- 培训申请列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th>申请公司</th>
          <th>联系人</th>
          <th>申请状态</th>
          <th>提交日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applications" :key="application.id">
          <td>{{ application.company }}</td>
          <td>{{ application.contactPerson }}</td>
          <td>
            <span :class="getStatusBadgeClass(application.status)">{{ getStatusLabel(application.status) }}</span>
          </td>
          <td>{{ formatDate(application.submittedDate) }}</td>
          <td>
            <div class="btn-group" role="group">
              <button class="btn btn-outline-primary btn-sm" @click="openViewApplicationForm(application)">查看</button>
              <button class="btn btn-outline-secondary btn-sm" @click="openEditApplicationForm(application)">编辑</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteApplication(application)">删除</button>
              <button class="btn btn-outline-warning btn-sm" @click="reviewApplication(application)">审核</button>
            </div>
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

    <!-- 申请详情对话框 -->
    <application-form ref="applicationForm" @refresh="fetchApplications" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import ApplicationForm from '../views/form/ApplicationForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchQuery = ref('');
const filterStatus = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalApplications = ref(0);

const applications = reactive([
  // 示例数据
  { id: '1', company: 'ABC公司', contactPerson: '张三', status: 'pending', submittedDate: '2024-06-15', trainingContent: 'Vue.js入门培训' },
  { id: '2', company: 'XYZ公司', contactPerson: '李四', status: 'approved', submittedDate: '2024-06-16', trainingContent: 'React.js进阶培训' },
]);

const applicationForm = ref(null);

const fetchApplications = () => {
  console.log(`Fetching applications with query: ${searchQuery.value} and status: ${filterStatus.value}`);
  // 调用 API 获取数据，并更新 applications 和 totalApplications
};

const resetFilters = () => {
  searchQuery.value = '';
  filterStatus.value = '';
  fetchApplications();
};

const openAddApplicationForm = () => {
  applicationForm.value.openForm();
};

const openViewApplicationForm = (application) => {
  applicationForm.value.openForm(application);
};

const openEditApplicationForm = (application) => {
  applicationForm.value.openForm(application);
};

const deleteApplication = (application) => {
  console.log('Delete application', application);
  // 删除申请的逻辑
};

const reviewApplication = (application) => {
  console.log('Review application', application);
  // 审核申请的逻辑
};

const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchApplications();
};

const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchApplications();
};

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved':
      return 'badge bg-success';
    case 'rejected':
      return 'badge bg-danger';
    case 'pending':
    default:
      return 'badge bg-warning text-dark';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'approved':
      return '已通过';
    case 'rejected':
      return '已拒绝';
    case 'pending':
    default:
      return '待审核';
  }
};

const totalPages = computed(() => {
  return Math.ceil(totalApplications.value / pageSize.value);
});

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(applications);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '培训申请数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'applications.xlsx');
};

onMounted(() => {
  fetchApplications();
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
</style>
