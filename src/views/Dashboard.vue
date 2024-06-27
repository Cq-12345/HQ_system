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
            <el-button type="primary" @click="goToPage('ApplicationManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('CourseManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('LecturerManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('StudentManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('NotificationManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('EnrollmentManagement')">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="box">
            <div class="text item">
              <i class="el-icon-s-data"></i>
              <span>签到和费用管理</span>
            </div>
            <div class="count">45</div>
          </div>
          <div class="btn">
            <el-button type="primary" @click="goToPage('AttendanceManagement')">查看详情</el-button>
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
            <el-button type="primary" @click="goToPage('EvaluationManagement')">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (page) => {
  router.push({ name: page });
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
