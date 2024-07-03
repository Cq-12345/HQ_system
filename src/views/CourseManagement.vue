<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-5">
        <input v-model="searchName" class="form-control" placeholder="请输入课程名称">
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary me-2" @click="fetchData">查询</button>
        <button class="btn btn-secondary" @click="resetSearch">清空</button>
      </div>
      <div class="col-md-4 text-end">
        <button class="btn btn-danger me-2" @click="deleteSelected">批量删除</button>
        <button class="btn btn-success me-2" @click="openAddCourseForm">新增课程</button>
        <button class="btn btn-info" @click="exportToExcel">导出为Excel</button>
      </div>
    </div>

    <!-- 课程列表 -->
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" @click="selectAll" />
          </th>
          <th scope="col">课程名称</th>
          <th scope="col">开始时间</th>
          <th scope="col">结束时间</th>
          <th scope="col">讲师</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>
            <input type="checkbox" v-model="selectedCourses" :value="course.id" />
          </td>
          <td>{{ course.courseName }}</td>
          <td>{{ formatDate(course.startTime) }}</td>
          <td>{{ formatDate(course.endTime) }}</td>
          <td>{{ course.lecturerName }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openEditCourseForm(course)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteCourse(course)">删除</button>
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

    <!-- 引入CourseForm组件 -->
    <CourseForm ref="courseForm" @refresh="fetchData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import CourseForm from '../views/form/CourseForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalCourses = ref(0);
const selectedCourses = ref([]);

const courses = reactive([
  // 示例数据
  { id: '1', courseName: 'Vue.js入门', startTime: '2024-07-01T09:00:00', endTime: '2024-07-01T17:00:00', lecturerName: '王伟' },
  { id: '2', courseName: 'React.js进阶', startTime: '2024-07-02T09:00:00', endTime: '2024-07-02T17:00:00', lecturerName: '李芳' },
]);

const fetchData = () => {
  console.log(`Fetching data with name: ${searchName.value}`);
  // 调用 API 获取数据，并更新 courses 和 totalCourses
};

const resetSearch = () => {
  searchName.value = '';
  fetchData();
};

const courseForm = ref(null);

const openAddCourseForm = () => {
  courseForm.value.openForm();
};

const openEditCourseForm = (course) => {
  courseForm.value.openForm(course);
};

const deleteCourse = (course) => {
  console.log('Delete course', course);
  // 删除课程的逻辑
};

const deleteSelected = () => {
  console.log('Delete selected courses', selectedCourses.value);
  // 批量删除逻辑
};

const selectAll = () => {
  if (selectedCourses.value.length === courses.length) {
    selectedCourses.value = [];
  } else {
    selectedCourses.value = courses.map(course => course.id);
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

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const totalPages = computed(() => {
  return Math.ceil(totalCourses.value / pageSize.value);
});

const exportToExcel = () => {
  const data = courses.map(course => ({
    '课程名称': course.courseName,
    '开始时间': formatDate(course.startTime),
    '结束时间': formatDate(course.endTime),
    '讲师': course.lecturerName,
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '课程数据');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'courses.xlsx');
};

onMounted(() => {
  fetchData();
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

.btn-outline-primary, .btn-outline-danger {
  margin-right: 5px;
}
</style>
