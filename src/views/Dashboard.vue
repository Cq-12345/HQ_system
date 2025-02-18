<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card-wrap">
          <div class="card-context" v-for="item in items" :key="item.label">
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="box">
                  <div class="text item">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                  </div>
                  <div class="count" v-if="!isMobile">{{ item.count }}</div>
                </div>
                <div class="btn">
                  <button class="btn btn-primary" @click="item.action">{{ item.buttonLabel }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
import { ref, onMounted } from 'vue';
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
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 468;
};

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

const items = [
  {
    label: '培训申请管理',
    count: 24,
    buttonLabel: '新增培训申请',
    icon: 'bi bi-file-earmark-text',
    action: openApplicationForm
  },
  {
    label: '课程管理',
    count: 15,
    buttonLabel: '新增课程',
    icon: 'bi bi-book',
    action: openCourseForm
  },
  {
    label: '讲师管理',
    count: 8,
    buttonLabel: '新增讲师',
    icon: 'bi bi-person',
    action: openLectureForm
  },
  {
    label: '学员管理',
    count: 120,
    buttonLabel: '新增学员',
    icon: 'bi bi-people',
    action: openStudentForm
  },
  {
    label: '通知管理',
    count: 5,
    buttonLabel: '新增通知',
    icon: 'bi bi-bell',
    action: openNotificationForm
  },
  {
    label: '报名管理',
    count: 50,
    buttonLabel: '新增报名',
    icon: 'bi bi-pencil-square',
    action: openEnrollmentForm
  },
  {
    label: '培训评价和统计',
    count: 30,
    buttonLabel: '新增评价',
    icon: 'bi bi-star',
    action: openEvaluationForm
  },
  {
    label: '统计培训收入',
    count: 45,
    buttonLabel: '统计培训收入',
    icon: 'bi bi-bar-chart',
    action: openIncomeForm
  }
];

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<style scoped>
.card-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card-context {
  display: flex;
  flex-direction: column;
}

.card {
  width: 100%;
}

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

@media (max-width: 1200px) {
  .card-wrap {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 992px) {
  .card-wrap {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .count {
    display: none;
  }

  .box .item span {
    font-size: 18px;
  }

  .card-wrap {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
