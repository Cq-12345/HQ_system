<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-8">
        <input v-model="searchName" class="form-control" placeholder="请输入学员姓名">
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary me-2" @click="fetchData">查询</button>
        <button class="btn btn-secondary me-2" @click="resetSearch">清空</button>
        <button class="btn btn-danger me-2" @click="deleteSelected">批量删除</button>
        <button class="btn btn-success me-2" @click="openAddStudentForm">新增学员</button>
        <button class="btn btn-primary" @click="exportToExcel">导出为Excel</button>
      </div>
    </div>

    <!-- 学员信息列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">选择</th>
          <th scope="col">姓名</th>
          <th scope="col">性别</th>
          <th scope="col">联系方式</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td><input type="checkbox"></td>
          <td>{{ student.name }}</td>
          <td>{{ student.gender }}</td>
          <td>{{ student.contact }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm me-2" @click="openEditStudentForm(student)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteStudent(student)">删除</button>
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

    <!-- 引入StudentForm组件 -->
    <StudentForm ref="studentForm" @refresh="fetchData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import StudentForm from '../views/form/StudentForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalStudents = ref(0);

const students = reactive([
  // 示例数据
  { id: '1', name: '张三', gender: '男', contact: '12345678901' },
  { id: '2', name: '李四', gender: '女', contact: '09876543210' },
]);

const studentForm = ref(null);

const fetchData = () => {
  console.log(`Fetching data with name: ${searchName.value}`);
  // 调用 API 获取数据，并更新 students 和 totalStudents
};

const resetSearch = () => {
  searchName.value = '';
  fetchData();
};

const openAddStudentForm = () => {
  studentForm.value.openForm();
};

const openEditStudentForm = (student) => {
  studentForm.value.openForm(student);
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

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const exportToExcel = () => {
  const data = students.map(student => ({
    '姓名': student.name,
    '性别': student.gender,
    '联系方式': student.contact,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '学员数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'students.xlsx');
};

const totalPages = computed(() => {
  return Math.ceil(totalStudents.value / pageSize.value);
});

onMounted(() => {
  fetchData();
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

.btn-group .btn {
  margin-right: 5px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}
</style>
