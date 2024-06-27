<template>
  <el-dialog v-model="visible" :title="isViewing ? '评价详情' : '编辑评价'" width="30%" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="学员姓名">
        <el-input v-model="form.studentName" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="满意度">
        <el-rate v-model="form.rating" :disabled="isViewing"></el-rate>
      </el-form-item>
      <el-form-item label="意见和建议">
        <el-input v-model="form.comments" type="textarea" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="填写时间">
        <el-date-picker v-model="form.submitTime" type="datetime" :disabled="isViewing"></el-date-picker>
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
const form = ref({ id: '', studentName: '', courseName: '', rating: 0, comments: '', submitTime: '' });
const isEditing = ref(false);
const isViewing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const evaluations = ref([
  { id: '1', studentName: '张三', courseName: 'Vue.js入门', rating: 5, comments: '很好', submitTime: '2024-06-01T10:00:00' },
  { id: '2', studentName: '李四', courseName: 'React.js进阶', rating: 4, comments: '不错', submitTime: '2024-06-01T11:00:00' },
]);

// function submitForm() {
//   const url = isEditing.value ? `http://localhost:9090/evaluation/${form.value.id}` : 'http://localhost:9090/evaluation';
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
    const index = evaluations.value.findIndex(evaluation => evaluation.id === form.value.id);
    if (index !== -1) {
      evaluations.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (evaluations.value.length + 1).toString();
    evaluations.value.push({ ...form.value });
  }

  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current evaluations:", evaluations.value); // 打印当前的模拟数据
}

function openForm(evaluation = null, viewOnly = false) {
  if (evaluation) {
    form.value = { ...evaluation };
    isEditing.value = !viewOnly;
    isViewing.value = viewOnly;
  } else {
    form.value = { id: '', studentName: '', courseName: '', rating: 0, comments: '', submitTime: '' };
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
