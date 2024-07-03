<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-8">
        <input v-model="searchName" class="form-control" placeholder="请输入讲师姓名">
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-primary me-2" @click="fetchData">查询</button>
        <button class="btn btn-secondary me-2" @click="resetSearch">清空</button>
        <button class="btn btn-danger me-2" @click="deleteSelected">批量删除</button>
        <button class="btn btn-success me-2" @click="exportToExcel">导出为Excel</button>
        <button class="btn btn-primary" @click="openAddLecturerForm">新增讲师</button>
      </div>
    </div>

    <!-- 讲师信息列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleAllSelection" />
          </th>
          <th>姓名</th>
          <th>职称</th>
          <th>擅长领域</th>
          <th>Email</th>
          <th>电话</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lecturer in lecturers" :key="lecturer.id">
          <td>
            <input type="checkbox" v-model="selectedLecturers" :value="lecturer.id" />
          </td>
          <td>{{ lecturer.name }}</td>
          <td>{{ lecturer.title }}</td>
          <td>{{ lecturer.expertise }}</td>
          <td>{{ lecturer.email }}</td>
          <td>{{ lecturer.phone }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm me-1" @click="openEditLecturerForm(lecturer)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteLecturer(lecturer)">删除</button>
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

    <!-- 引入LecturerForm组件 -->
    <LecturerForm ref="lecturerForm" @refresh="fetchData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import LecturerForm from '../views/form/LectureForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalLecturers = ref(0);
const selectedLecturers = ref([]);

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
  console.log('Delete selected lecturers', selectedLecturers.value);
  // 批量删除逻辑
};

const toggleAllSelection = (event) => {
  if (event.target.checked) {
    selectedLecturers.value = lecturers.map(lecturer => lecturer.id);
  } else {
    selectedLecturers.value = [];
  }
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

const exportToExcel = () => {
  const data = lecturers.map(lecturer => ({
    '姓名': lecturer.name,
    '职称': lecturer.title,
    '擅长领域': lecturer.expertise,
    'Email': lecturer.email,
    '电话': lecturer.phone
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '讲师数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'lecturers.xlsx');
};

const totalPages = computed(() => {
  return Math.ceil(totalLecturers.value / pageSize.value);
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

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.4em;
}

.btn-group .btn {
  margin-right: 5px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}
</style>
