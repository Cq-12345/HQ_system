<template>
  <div class="container-fluid">
    <!-- 搜索和筛选栏 -->
    <div class="row mb-3 align-items-center">
      <div class="col-md-8 col-sm-12">
        <select v-model="selectedCourse" class="form-select mb-2 mb-md-0">
          <option v-for="course in courses" :key="course.id" :value="course.name">{{ course.name }}</option>
        </select>
      </div>
      <div class="col-md-4 col-sm-12 text-end">
        <button class="btn btn-primary me-2" @click="fetchEvaluations">查询</button>
        <button class="btn btn-success me-2" @click="addEvaluation">新增评价</button>
        <button class="btn btn-secondary" @click="saveToExcel">保存到Excel</button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div class="text-center mb-3 mb-md-0">
              <h1>{{ averageRating }}</h1>
              <div class="star-rating">
                <i class="bi bi-star-fill" v-for="n in Math.round(Number(averageRating))" :key="n"></i>
                <i class="bi bi-star" v-for="n in (5 - Math.round(Number(averageRating)))" :key="n + 5"></i>
              </div>
              <p class="text-muted">{{ evaluations.length }}人评价</p>
            </div>
            <div class="w-100 ms-md-3">
              <div v-for="(percentage, index) in ratingPercentages" :key="index" class="d-flex align-items-center mb-2">
                <span class="me-2">{{ 5 - index }}星</span>
                <div class="progress flex-grow-1 me-2">
                  <div class="progress-bar" role="progressbar" :style="{ width: percentage + '%' }"></div>
                </div>
                <span>{{ percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评价信息列表 -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead>
          <tr>
            <th>课程名称</th>
            <th>学员姓名</th>
            <th>满意度</th>
            <th>填写时间</th>
            <th>意见和建议</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evaluation in paginatedEvaluations" :key="evaluation.id">
            <td>{{ evaluation.courseName }}</td>
            <td>{{ evaluation.studentName }}</td>
            <td>
              <div class="star-rating">
                {{ getStarRating(evaluation.rating) }}
              </div>
            </td>
            <td>{{ formatDate(evaluation.submitTime) }}</td>
            <td>{{ evaluation.comments }}</td>
            <td>
              <button class="btn btn-outline-primary btn-sm me-2" @click="editEvaluation(evaluation)">编辑</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteEvaluation(evaluation)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页功能 -->
    <div class="d-flex justify-content-center mt-3">
      <ul class="pagination">
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" @click="handleCurrentChange(page)">{{ page }}</a>
        </li>
      </ul>
    </div>

    <!-- 评价表单对话框 -->
    <EvaluationForm ref="evaluationForm" @refresh="fetchEvaluations" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import EvaluationForm from '../views/form/EvaluationForm.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// 搜索和筛选栏
const selectedCourse = ref(null);
const courses = reactive([
  { id: '1', name: 'Vue.js入门' },
  { id: '2', name: 'React.js进阶' },
  // 添加其他课程
]);

// 评价信息
const evaluations = ref([]);
const evaluationsData = reactive({
  'Vue.js入门': [
    { id: '1', studentName: '张三', courseName: 'Vue.js入门', rating: 5, comments: '很好', submitTime: '2024-06-01T10:00:00' },
    { id: '2', studentName: '李四', courseName: 'Vue.js入门', rating: 4, comments: '不错', submitTime: '2024-06-01T11:00:00' },
    { id: '3', studentName: '王五', courseName: 'Vue.js入门', rating: 3, comments: '一般', submitTime: '2024-06-01T12:00:00' },
    { id: '4', studentName: '赵六', courseName: 'Vue.js入门', rating: 5, comments: '非常好', submitTime: '2024-06-01T13:00:00' },
    { id: '5', studentName: '孙七', courseName: 'Vue.js入门', rating: 4, comments: '满意', submitTime: '2024-06-01T14:00:00' },
    { id: '6', studentName: '周八', courseName: 'Vue.js入门', rating: 5, comments: '极好', submitTime: '2024-06-01T15:00:00' },
    { id: '7', studentName: '吴九', courseName: 'Vue.js入门', rating: 4, comments: '不错', submitTime: '2024-06-01T16:00:00' },
    { id: '8', studentName: '郑十', courseName: 'Vue.js入门', rating: 5, comments: '推荐', submitTime: '2024-06-01T17:00:00' },
    { id: '9', studentName: '钱十一', courseName: 'Vue.js入门', rating: 2, comments: '一般', submitTime: '2024-06-01T18:00:00' },
    { id: '10', studentName: '冯十二', courseName: 'Vue.js入门', rating: 1, comments: '不满意', submitTime: '2024-06-01T19:00:00' },
  ],
  'React.js进阶': [
    { id: '1', studentName: '赵一', courseName: 'React.js进阶', rating: 5, comments: '很好', submitTime: '2024-06-01T10:00:00' },
    { id: '2', studentName: '钱二', courseName: 'React.js进阶', rating: 4, comments: '不错', submitTime: '2024-06-01T11:00:00' },
    { id: '3', studentName: '孙三', courseName: 'React.js进阶', rating: 3, comments: '一般', submitTime: '2024-06-01T12:00:00' },
    { id: '4', studentName: '李四', courseName: 'React.js进阶', rating: 5, comments: '非常好', submitTime: '2024-06-01T13:00:00' },
    { id: '5', studentName: '周五', courseName: 'React.js进阶', rating: 4, comments: '满意', submitTime: '2024-06-01T14:00:00' },
  ]
});

// 获取评价数据
const fetchEvaluations = () => {
  console.log(`Fetching evaluations for course: ${selectedCourse.value || ''}`);
  if (selectedCourse.value) {
    evaluations.value = evaluationsData[selectedCourse.value] || [];
  } else {
    evaluations.value = [];
  }
};

// 重置筛选条件
const resetFilters = () => {
  selectedCourse.value = courses[0].name;
  fetchEvaluations();
};

// 分页功能
const pageSize = ref(5);
const currentPage = ref(1);
const handleSizeChange = (size) => {
  console.log(`Change page size to: ${size}`);
  pageSize.value = size;
  fetchEvaluations();
};
const handleCurrentChange = (page) => {
  console.log(`Change current page to: ${page}`);
  currentPage.value = page;
  fetchEvaluations();
};
const totalPages = computed(() => {
  return Math.ceil(evaluations.value.length / pageSize.value);
});
const paginatedEvaluations = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return evaluations.value.slice(start, start + pageSize.value);
});

// 计算平均评分
const averageRating = computed(() => {
  const totalRating = evaluations.value.reduce((sum, evaluation) => sum + evaluation.rating, 0);
  return evaluations.value.length ? (totalRating / evaluations.value.length).toFixed(1) : '0.0';
});

// 计算评分分布百分比
const ratingPercentages = computed(() => {
  const total = evaluations.value.length;
  if (total === 0) return [0, 0, 0, 0, 0];
  const counts = [0, 0, 0, 0, 0];
  evaluations.value.forEach(evaluation => {
    counts[5 - evaluation.rating]++;
  });
  return counts.map(count => Math.round((count / total) * 100));
});

// 获取星级评分显示 ， 土方法
const getStarRating = (rating) => {
  const stars = '★★★★★☆☆☆☆☆';
  return stars.substring(0, rating) + stars.substring(5, 5 + (5 - rating));
};

// 评价表单引用
const evaluationForm = ref(null);

// 新增评价
const addEvaluation = () => {
  evaluationForm.value.openForm();
};

// 编辑评价
const editEvaluation = (evaluation) => {
  evaluationForm.value.openForm(evaluation);
};

// 删除评价
const deleteEvaluation = (evaluation) => {
  console.log('Delete evaluation', evaluation);
  // 删除评价的逻辑
};

// 导出为Excel
const saveToExcel = () => {
  const data = evaluations.value.map(evaluation => ({
    '课程名称': evaluation.courseName,
    '学员姓名': evaluation.studentName,
    '满意度': evaluation.rating,
    '意见和建议': evaluation.comments,
    '填写时间': formatDate(evaluation.submitTime)
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '评价信息');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'evaluations.xlsx');
};

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 组件挂载时获取数据
onMounted(() => {
  selectedCourse.value = courses[0].name;
  fetchEvaluations();
});
</script>

<style scoped>
.rating-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.average-rating {
  text-align: center;
}

.average-rating h1 {
  font-size: 48px;
  color: #ff9900;
}

.star-rating i {
  color: #ff9900;
}

.total-reviews {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}

.rating-breakdown {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.rating-row {
  display: flex;
  align-items: center;
}

.rating-row span:first-child {
  width: 30px;
}

.rating-row .progress {
  width: 100%;
  margin-right: 10px;
}

.rating-row span:last-child {
  width: 40px;
  text-align: right;
}

@media (min-width: 768px) {
  .rating-overview {
    flex-direction: row;
    justify-content: space-between;
  }

  .average-rating {
    text-align: left;
  }

  .rating-breakdown {
    width: 60%;
  }
}
</style>
