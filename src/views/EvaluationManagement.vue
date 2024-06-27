<template>
  <div>
    <el-row :gutter="20" justify="space-between" style="margin-bottom: 20px;">
      <!-- 搜索和筛选栏 -->
      <el-col :span="9">
        <el-select v-model="selectedCourse" placeholder="请输入或选择课程名称">
          <el-option
            v-for="course in courses"
            :key="course.id"
            :label="course.name"
            :value="course.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="fetchEvaluations">查询</el-button>
        <el-button @click="resetFilters">清空</el-button>
        <el-button type="primary" @click="addEvaluation">新增评价</el-button>
      </el-col>


      <!-- 统计信息 -->
      <el-col :span="9" justify="end">
        <el-card>
          <div class="rating-overview">
            <div class="average-rating">
              <span>{{ averageRating }}</span>
              <el-rate :model-value="Number(averageRating)" :disabled="true" show-score></el-rate>
              <div class="total-reviews">{{ evaluations.length }}人评价</div>
            </div>
            <div class="rating-breakdown">
              <div class="rating-row" v-for="(percentage, index) in ratingPercentages" :key="index">
                <span>{{ 5 - index }}星</span>
                <el-progress :percentage="Number(percentage)" text-inside :stroke-width="10" />
                <span>{{ percentage }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 评价信息列表 -->
    <el-table :data="evaluations" border>
      <el-table-column prop="courseName" label="课程名称" width="150"></el-table-column>
      <el-table-column prop="studentName" label="学员姓名" width="120"></el-table-column>
      <el-table-column prop="rating" label="满意度" width="150" sortable>
        <template v-slot="scope">
          <el-rate v-model="scope.row.rating" :disabled="true"></el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="submitTime" label="填写时间" width="180">
        <template v-slot="scope">
          {{ formatDate(scope.row.submitTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="comments" label="意见和建议"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="editEvaluation(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteEvaluation(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalEvaluations"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>

    <!-- 评价表单对话框 -->
    <EvaluationForm ref="evaluationForm" @refresh="fetchEvaluations" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import EvaluationForm from '../views/form/EvaluationForm.vue';

const searchQuery = ref('');
const selectedCourse = ref(null);
const pageSize = ref(5);
const currentPage = ref(1);
const totalEvaluations = ref(0);
const courses = reactive([
  { id: '1', name: 'Vue.js入门' },
  { id: '2', name: 'React.js进阶' },
  // 添加其他课程
]);

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

const evaluationForm = ref(null);

const fetchEvaluations = () => {
  console.log(`Fetching evaluations for course: ${selectedCourse.value || ''}`);
  if (selectedCourse.value) {
    evaluations.value = evaluationsData[selectedCourse.value] || [];
  } else {
    evaluations.value = [];
  }
};

const resetFilters = () => {
  selectedCourse.value = courses[0].name; // 确保设置第一个课程名称
  fetchEvaluations();
};

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

const averageRating = computed(() => {
  const totalRating = evaluations.value.reduce((sum, evaluation) => sum + evaluation.rating, 0);
  return (totalRating / evaluations.value.length).toFixed(1);
});

const ratingPercentages = computed(() => {
  const total = evaluations.value.length;
  if (total === 0) return [0, 0, 0, 0, 0];
  const counts = [0, 0, 0, 0, 0];
  evaluations.value.forEach(evaluation => {
    counts[5 - evaluation.rating]++;
  });
  return counts.map(count => ((count / total) * 100).toFixed(1));
});

const addEvaluation = () => {
  evaluationForm.value.openForm();
};


const editEvaluation = (evaluation) => {
  evaluationForm.value.openForm(evaluation);
};

const deleteEvaluation = (evaluation) => {
  console.log('Delete evaluation', evaluation);
  // 删除评价的逻辑
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

onMounted(() => {
  selectedCourse.value = courses[0].name;
  fetchEvaluations();
});
</script>

<style scoped>
.rating-overview {
  display: flex;
  justify-content: space-between;
}

.average-rating {
  text-align: center;
}

.average-rating span {
  font-size: 48px;
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
  justify-content: space-around;
  width: 60%;
}

.rating-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.rating-row span:first-child {
  width: 30px;
}

.rating-row span:last-child {
  width: 120px;
  text-align: right;
}

.el-rate__item {
  color: #ff9900;
}
</style>
