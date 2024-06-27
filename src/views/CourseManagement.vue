<template>
  <div>
    <!-- 页面特定内容 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input v-model="searchName" placeholder="请输入课程名称" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetSearch">清空</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="danger" @click="deleteSelected">批量删除</el-button>
        <el-button type="primary" @click="openAddCourseForm">新增课程</el-button>
      </el-col>
    </el-row>

    <el-table :data="courses" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" sortable width="150"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" sortable width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" sortable width="150">
        <template v-slot="scope">
          {{ formatDate(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="lecturerName" label="讲师" sortable width="120"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="openEditCourseForm(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteCourse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCourses"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 引入CourseForm组件 -->
    <CourseForm ref="courseForm" @refresh="fetchData" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import CourseForm from '../views/form/CourseForm.vue';

const searchName = ref('');
const pageSize = ref(5);
const currentPage = ref(1);
const totalCourses = ref(0);

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
  console.log('Delete selected courses');
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
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
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
