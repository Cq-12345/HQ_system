<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-document"></i>
              <span>培训申请管理</span>
            </div>
            <div class="count">24</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openApplicationForm">新增培训申请</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-notebook-2"></i>
              <span>课程管理</span>
            </div>
            <div class="count">15</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openCourseForm">新增课程</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-user"></i>
              <span>讲师管理</span>
            </div>
            <div class="count">8</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openLectureForm">新增讲师</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-user-solid"></i>
              <span>学员管理</span>
            </div>
            <div class="count">120</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openStudentForm">新增学员</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-bell"></i>
              <span>通知管理</span>
            </div>
            <div class="count">5</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openNotificationForm">新增通知</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-edit-outline"></i>
              <span>报名管理</span>
            </div>
            <div class="count">50</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openEnrollmentForm">新增报名</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-star-on"></i>
              <span>培训评价和统计</span>
            </div>
            <div class="count">30</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openEvaluationForm">新增评价</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-s-data"></i>
              <span>统计培训收入</span>
            </div>
            <div class="count">45</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="openIncomeForm">统计培训收入</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 引用表单组件 -->
    <application-form ref="applicationForm" @refresh="fetchApplications" />
    <course-form ref="courseForm" @refresh="fetchCourses" />
    <lecture-form ref="lectureForm" @refresh="fetchLectures" />
    <student-form ref="studentForm" @refresh="fetchStudents" />
    <notification-form ref="notificationForm" @refresh="fetchNotifications" />
    <enrollment-form ref="enrollmentForm" @refresh="fetchEnrollments" />
    <evaluation-form ref="evaluationForm" @refresh="fetchEvaluations" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import ApplicationForm from '../views/form/ApplicationForm.vue';
import CourseForm from '../views/form/CourseForm.vue';
import LectureForm from '../views/form/LectureForm.vue';
import StudentForm from '../views/form/StudentForm.vue';
import NotificationForm from '../views/form/NotificationForm.vue';
import EnrollmentForm from '../views/form/EnrollmentForm.vue';
import EvaluationForm from '../views/form/EvaluationForm.vue';

const applicationForm = ref(null);
const courseForm = ref(null);
const lectureForm = ref(null);
const studentForm = ref(null);
const notificationForm = ref(null);
const enrollmentForm = ref(null);
const evaluationForm = ref(null);

const openApplicationForm = () => {
  applicationForm.value.openForm();
};
const openCourseForm = () => {
  courseForm.value.openForm();
};
const openLectureForm = () => {
  lectureForm.value.openForm();
};
const openStudentForm = () => {
  studentForm.value.openForm();
};
const openNotificationForm = () => {
  notificationForm.value.openForm();
};
const openEnrollmentForm = () => {
  enrollmentForm.value.openForm();
};
const openEvaluationForm = () => {
  evaluationForm.value.openForm();
};
const openIncomeForm = () => {
  // 打开统计培训收入表单的逻辑
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
