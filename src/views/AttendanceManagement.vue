<template>
  <div>
    <!-- 搜索和筛选栏 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        <el-input v-model="searchQuery" placeholder="请输入学员姓名或课程名称" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="filterStatus" placeholder="选择签到状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未签到" value="not_signed_in"></el-option>
          <el-option label="已签到" value="signed_in"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchAttendances">查询</el-button>
        <el-button @click="resetFilters">清空</el-button>
      </el-col>
    </el-row>

    <!-- 报名信息列表 -->
    <el-table :data="attendances" border>
      <el-table-column prop="studentName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="70"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="150"></el-table-column>
      <el-table-column prop="company" label="公司名称" width="150"></el-table-column>
      <el-table-column prop="contact" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="attendanceTime" label="签到时间" width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.attendanceTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="费用" width="100">
        <template v-slot="scope">
          {{ scope.row.fee === 0 ? '无需支付' : scope.row.fee }}
        </template>
      </el-table-column>
      <el-table-column prop="feeStatus" label="费用状态" width="100">
        <template v-slot="scope">
          <el-tag :type="getFeeStatusTagType(scope.row.feeStatus)">{{ getFeeStatusLabel(scope.row.feeStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="signInStatus" label="签到状态" width="100">
        <template v-slot="scope">
          <el-tag :type="getSignInStatusTagType(scope.row.signInStatus)">{{ getSignInStatusLabel(scope.row.signInStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" :disabled="scope.row.signInStatus === 'signed_in'" @click="signIn(scope.row)">签到</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalAttendances"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 签到表单 -->
    <attendance-form ref="attendanceForm" @refresh="fetchAttendances" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import AttendanceForm from '../views/form/AttendanceForm.vue';

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

const getFeeStatusTagType = (status) => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'no_payment_required':
      return 'info';
    case 'not_paid':
    default:
      return 'danger';
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

const getSignInStatusTagType = (status) => {
  switch (status) {
    case 'signed_in':
      return 'success';
    case 'not_signed_in':
    default:
      return 'warning';
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
