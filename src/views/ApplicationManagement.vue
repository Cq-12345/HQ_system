<template>
  <div>
    <!-- 搜索和筛选栏 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        <el-input v-model="searchQuery" placeholder="请输入公司名称或联系人" />
      </el-col>
      <el-col :span="4">
        <el-select v-model="filterStatus" placeholder="选择申请状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审核" value="pending"></el-option>
          <el-option label="已通过" value="approved"></el-option>
          <el-option label="已拒绝" value="rejected"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchApplications">查询</el-button>
        <el-button @click="resetFilters">清空</el-button>
      </el-col>
      <el-col :span="10" style="text-align: right;">
        <el-button type="primary" @click="openAddApplicationForm">新增申请</el-button>
      </el-col>
    </el-row>

    <!-- 培训申请列表 -->
    <el-table :data="applications" border>
      <el-table-column prop="company" label="申请公司" width="150"></el-table-column>
      <el-table-column prop="contactPerson" label="联系人" width="120"></el-table-column>
      <el-table-column prop="status" label="申请状态" width="100">
        <template v-slot="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">{{ getStatusLabel(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="submittedDate" label="提交日期" sortable width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.submittedDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="openViewApplicationForm(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="openEditApplicationForm(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteApplication(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="reviewApplication(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalApplications"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 申请详情对话框 -->
    <application-form ref="applicationForm" @refresh="fetchApplications" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ApplicationForm from '../views/form/ApplicationForm.vue';

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

const getStatusTagType = (status) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'pending':
    default:
      return 'warning';
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
