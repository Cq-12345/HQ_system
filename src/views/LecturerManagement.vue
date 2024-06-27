<template>
  <div>
    <!-- 页面特定内容 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input v-model="searchName" placeholder="请输入讲师姓名" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetSearch">清空</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="danger" @click="deleteSelected">批量删除</el-button>
        <el-button type="primary" @click="openAddLecturerForm">新增讲师</el-button>
      </el-col>
    </el-row>

    <el-table :data="lecturers" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="120"></el-table-column>
      <el-table-column prop="title" label="职称" sortable width="150"></el-table-column>
      <el-table-column prop="expertise" label="擅长领域" sortable width="180"></el-table-column>
      <el-table-column prop="email" label="Email" sortable width="200"></el-table-column>
      <el-table-column prop="phone" label="电话" sortable width="150"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="openEditLecturerForm(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteLecturer(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalLecturers"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 引入LecturerForm组件 -->
    <LecturerForm ref="lecturerForm" @refresh="fetchData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import LecturerForm from '../views/form/LectureForm.vue';

const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalLecturers = ref(0);

const lecturers = reactive([
  // 示例数据
  { id: '1', name: '王伟', title: '高级工程师', expertise: 'Java开发', email: 'wangwei@example.com', phone: '12345678901' },
  { id: '2', name: '李芳', title: '讲师', expertise: '前端开发', email: 'lifang@example.com', phone: '09876543210' },
]);

const lecturerForm = ref(null);

const fetchData = () => {
  console.log(`Fetching data with name: ${searchName.value}`);
  // 调用 API 获取数据，并更新 lecturers 和 totalLecturers
};

const resetSearch = () => {
  searchName.value = '';
  fetchData();
};

const openAddLecturerForm = () => {
  lecturerForm.value.openForm();
};

const openEditLecturerForm = (lecturer) => {
  lecturerForm.value.openForm(lecturer);
};

const deleteLecturer = (lecturer) => {
  console.log('Delete lecturer', lecturer);
  // 删除讲师的逻辑
};

const deleteSelected = () => {
  console.log('Delete selected lecturers');
  // 批量删除逻辑
};

const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchData();
};

const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchData();
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
