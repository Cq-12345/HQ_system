<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-5">
        <input v-model="searchQuery" class="form-control" placeholder="请输入学员姓名或课程名称">
      </div>
      <div class="col-md-3">
        <select v-model="filterStatus" class="form-select">
          <option value="">选择签到状态</option>
          <option value="not_signed_in">未签到</option>
          <option value="signed_in">已签到</option>
        </select>
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary me-2" @click="fetchAttendances">查询</button>
        <button class="btn btn-secondary me-2" @click="resetFilters">清空</button>
        <button class="btn btn-success" @click="exportToExcel">导出为Excel</button>
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
          <th>联系方式</th>
          <th>签到时间</th>
          <th>费用</th>
          <th>费用状态</th>
          <th>签到状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances" :key="attendance.id">
          <td>{{ attendance.studentName }}</td>
          <td>{{ attendance.gender }}</td>
          <td>{{ attendance.courseName }}</td>
          <td>{{ attendance.company }}</td>
          <td>{{ attendance.contact }}</td>
          <td>{{ formatDate(attendance.attendanceTime) }}</td>
          <td>{{ attendance.fee === 0 ? '无需支付' : attendance.fee }}</td>
          <td>
            <span :class="getFeeStatusBadgeClass(attendance.feeStatus)">{{ getFeeStatusLabel(attendance.feeStatus) }}</span>
          </td>
          <td>
            <span :class="getSignInStatusBadgeClass(attendance.signInStatus)">{{ getSignInStatusLabel(attendance.signInStatus) }}</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" :disabled="attendance.signInStatus === 'signed_in'" @click="signIn(attendance)">签到</button>
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

    <!-- 签到表单 -->
    <attendance-form ref="attendanceForm" @refresh="fetchAttendances" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import AttendanceForm from '../views/form/AttendanceForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchQuery = ref('');
const filterStatus = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalAttendances = ref(0);

const attendances = reactive([
  // 示例数据
  { id: '1', studentName: '张三', gender: '男', courseName: 'Vue.js入门', company: '公司A', contact: '12345678901', fee: 500, attendanceTime: '', feeStatus: 'not_paid', signInStatus: 'not_signed_in' },
  { id: '2', studentName: '李四', gender: '女', courseName: 'React.js进阶', company: '公司B', contact: '09876543210', fee: 0, attendanceTime: '2024-06-01T09:00:00', feeStatus: 'no_payment_required', signInStatus: 'signed_in' },
]);

const attendanceForm = ref(null);

const fetchAttendances = () => {
  console.log(`Fetching attendances with query: ${searchQuery.value}, status: ${filterStatus.value}`);
  // 调用 API 获取数据，并更新 attendances 和 totalAttendances
};

const resetFilters = () => {
  searchQuery.value = '';
  filterStatus.value = '';
  fetchAttendances();
};

const signIn = (attendance) => {
  attendanceForm.value.openForm(attendance);
  // 更新签到信息的逻辑
};

const addAttendance = () => {
  console.log('Add new attendance');
  attendanceForm.value.openForm();
};

const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchAttendances();
};

const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchAttendances();
};

const formatDate = (dateStr) => {
  if (!dateStr) return '未签到';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const getFeeStatusBadgeClass = (status) => {
  switch (status) {
    case 'paid':
      return 'badge bg-success';
    case 'no_payment_required':
      return 'badge bg-info';
    case 'not_paid':
    default:
      return 'badge bg-danger';
  }
};

const getFeeStatusLabel = (status) => {
  switch (status) {
    case 'paid':
      return '已支付';
    case 'no_payment_required':
      return '无需支付';
    case 'not_paid':
    default:
      return '未支付';
  }
};

const getSignInStatusBadgeClass = (status) => {
  switch (status) {
    case 'signed_in':
      return 'badge bg-success';
    case 'not_signed_in':
    default:
      return 'badge bg-warning text-dark';
  }
};

const getSignInStatusLabel = (status) => {
  switch (status) {
    case 'signed_in':
      return '已签到';
    case 'not_signed_in':
    default:
      return '未签到';
  }
};

const totalPages = computed(() => {
  return Math.ceil(totalAttendances.value / pageSize.value);
});

const exportToExcel = () => {
  const data = attendances.map(attendance => ({
    '姓名': attendance.studentName,
    '性别': attendance.gender,
    '课程名称': attendance.courseName,
    '公司名称': attendance.company,
    '联系方式': attendance.contact,
    '签到时间': formatDate(attendance.attendanceTime),
    '费用': attendance.fee === 0 ? '无需支付' : attendance.fee,
    '费用状态': getFeeStatusLabel(attendance.feeStatus),
    '签到状态': getSignInStatusLabel(attendance.signInStatus)
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '签到数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'attendances.xlsx');
};

onMounted(() => {
  fetchAttendances();
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
