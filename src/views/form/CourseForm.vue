<template>
  <el-dialog v-model="visible" title="课程表单" width="350" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="课程名称" :rules="[{ required: true, message: '请输入课程名称', trigger: 'blur' }]">
        <el-input v-model="form.courseName"></el-input>
      </el-form-item>
      <el-form-item label="讲师" :rules="[{ required: true, message: '请输入讲师名称', trigger: 'blur' }]">
        <el-input v-model="form.lecturerName"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
// import axios from 'axios'; // 后端交互部分注释掉
import { ElMessage } from 'element-plus';

const visible = ref(false);
const form = ref({ id: '', courseName: '', startTime: '', endTime: '', lecturerName: '' });
const isEditing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const courses = ref([
  { id: '1', courseName: 'Vue.js入门', startTime: '2024-07-01T09:00:00', endTime: '2024-07-01T17:00:00', lecturerName: '王伟' },
  { id: '2', courseName: 'React.js进阶', startTime: '2024-07-02T09:00:00', endTime: '2024-07-02T17:00:00', lecturerName: '李芳' },
]);

function submitForm() {
  if (isEditing.value) {
    // 编辑模式
    const index = courses.value.findIndex(course => course.id === form.value.id);
    if (index !== -1) {
      courses.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (courses.value.length + 1).toString();
    courses.value.push({ ...form.value });
  }
  
  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current courses:", courses.value); // 打印当前的模拟数据
}

function openForm(course = null) {
  if (course) {
    form.value = { ...course };
    isEditing.value = true;
  } else {
    form.value = { id: '', courseName: '', startTime: '', endTime: '', lecturerName: '' };
    isEditing.value = false;
  }
  visible.value = true;
}

defineExpose({ openForm });
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
