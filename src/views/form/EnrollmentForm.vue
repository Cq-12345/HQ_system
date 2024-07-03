<template>
  <el-dialog v-model="visible" :title="isViewing ? '报名详情' : '编辑报名'" width="350" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.studentName" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" :disabled="isViewing">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="form.company" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="工作岗位">
        <el-input v-model="form.position" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="技术水平">
        <el-input v-model="form.skillLevel" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="填写时间">
        <el-date-picker v-model="form.fillTime" type="datetime" :disabled="isViewing"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" :disabled="isViewing">
          <el-option label="待确认" value="pending"></el-option>
          <el-option label="已确认" value="confirmed"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" v-if="!isViewing">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

const visible = ref(false);
const form = ref({ id: '', studentName: '', gender: '男', courseName: '', company: '', position: '', skillLevel: '', contact: '', fillTime: '', status: 'pending' });
const isEditing = ref(false);
const isViewing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const enrollments = ref([
  { id: '1', studentName: '张三', gender: '男', courseName: 'Vue.js入门', company: '公司A', position: '开发工程师', skillLevel: '中级', contact: '12345678901', fillTime: '2024-06-01T10:00:00', status: 'pending' },
  { id: '2', studentName: '李四', gender: '女', courseName: 'React.js进阶', company: '公司B', position: '高级工程师', skillLevel: '高级', contact: '09876543210', fillTime: '2024-06-02T11:00:00', status: 'confirmed' },
]);

// function submitForm() {
//   const url = isEditing.value ? `http://localhost:9090/enrollment/${form.value.id}` : 'http://localhost:9090/enrollment';
//   const method = isEditing.value ? axios.put : axios.post;

//   method(url, form.value)
//     .then(() => {
//       visible.value = false;
//       emit('refresh');
//       ElMessage.success('操作成功');
//     })
//     .catch(() => {
//       ElMessage.error('操作失败');
//     });
// }
function submitForm() {
  if (isEditing.value) {
    // 编辑模式
    const index = enrollments.value.findIndex(enrollment => enrollment.id === form.value.id);
    if (index !== -1) {
      enrollments.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (enrollments.value.length + 1).toString();
    enrollments.value.push({ ...form.value });
  }

  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current enrollments:", enrollments.value); // 打印当前的模拟数据
}

function openForm(enrollment = null, viewOnly = false) {
  if (enrollment) {
    form.value = { ...enrollment };
    isEditing.value = !viewOnly;
    isViewing.value = viewOnly;
  } else {
    form.value = { id: '', studentName: '', gender: '男', courseName: '', company: '', position: '', skillLevel: '', contact: '', fillTime: '', status: 'pending' };
    isEditing.value = true;
    isViewing.value = false;
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
