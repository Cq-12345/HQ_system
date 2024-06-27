<template>
  <div>
    <!-- 搜索和筛选栏 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        <el-input v-model="searchQuery" placeholder="请输入学员姓名或课程名称" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="filterStatus" placeholder="选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待确认" value="pending"></el-option>
          <el-option label="已确认" value="confirmed"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchEnrollments">查询</el-button>
        <el-button @click="resetFilters">清空</el-button>
      </el-col>
      <el-col :span="10" style="text-align: right;">
        <el-button type="primary" @click="saveToExcel">保存到Excel</el-button>
      </el-col>
    </el-row>

    <!-- 报名信息列表 -->
    <el-table :data="enrollments" border>
      <el-table-column prop="studentName" label="姓名" width="80"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="150"></el-table-column>
      <el-table-column prop="company" label="公司名称" width="150"></el-table-column>
      <el-table-column prop="position" label="工作岗位" width="120"></el-table-column>
      <el-table-column prop="skillLevel" label="技术水平" width="90"></el-table-column>
      <el-table-column prop="contact" label="联系方式" width="135"></el-table-column>
      <el-table-column prop="fillTime" label="填写时间" width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.fillTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="90">
        <template v-slot="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">{{ getStatusLabel(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="confirmEnrollment(scope.row)">确认</el-button>
          <el-button type="text" size="small" @click="deleteEnrollment(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalEnrollments"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

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
  console.log('Save enrollments to Excel');
  // 保存报名信息到 Excel 的逻辑
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

const getStatusTagType = (status) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
    default:
      return 'warning';
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
</script>

<style scoped>
/* 样式定义 */
</style>
