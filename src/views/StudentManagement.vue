<template>
  <div>
    <!-- 页面特定内容 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input v-model="searchName" placeholder="请输入学员姓名" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetSearch">清空</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="danger" @click="deleteSelected">批量删除</el-button>
        <el-button type="primary" @click="addStudent">新增学员</el-button>
      </el-col>
    </el-row>

    <el-table :data="students" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="120"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
        <template v-slot="scope">
          <el-avatar :src="scope.row.avatar || '/logo.jpg'"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" sortable width="100"></el-table-column>
      <el-table-column prop="contact" label="联系方式" sortable width="150"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="editStudent(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteStudent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalStudents"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';

const activeMenu = ref('StudentManagement');
const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalStudents = ref(0);

const students = reactive([
  // 示例数据
  { id: '1', name: '张三', gender: '男', contact: '12345678901', avatar: '' },
  { id: '2', name: '李四', gender: '女', contact: '09876543210', avatar: '' },
]);

const fetchData = () => {
  console.log(`Fetching data with name: ${searchName.value}`);
  // 调用 API 获取数据，并更新 students
};

const resetSearch = () => {
  searchName.value = '';
  fetchData();
};

const addStudent = () => {
  console.log('Add new student');
  // 打开新增学员的对话框
};

const editStudent = (student) => {
  console.log('Edit student', student);
  // 打开编辑学员的对话框
};

const deleteStudent = (student) => {
  console.log('Delete student', student);
  // 删除学员的逻辑
};

const deleteSelected = () => {
  console.log('Delete selected students');
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
.el-header {
  background-color: #409EFF;
  color: white;
}

.el-menu-vertical-demo {
  background-color: #2d3a4b;
}

.el-menu-item {
  color: white;
}

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  text-align: right;
  margin-top: 10px;
}
</style>
