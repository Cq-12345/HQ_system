<template>
  <el-dialog v-model="visible" :title="isViewing ? '通知详情' : '编辑通知'" width="30%" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input v-model="form.content" type="textarea" :disabled="isViewing"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" :disabled="isViewing">
          <el-option label="待发送" value="pending"></el-option>
          <el-option label="已发送" value="sent"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间">
        <el-date-picker v-model="form.sendTime" type="datetime" :disabled="isViewing"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" v-if="!isViewing">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button></div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

const visible = ref(false);
const form = ref({ id: '', type: 'course', courseName: '', content: '', status: 'pending', sendTime: '' });
const isEditing = ref(false);
const isViewing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const notifications = ref([
  { id: '1', type: 'course', courseName: 'Vue.js入门', content: '欢迎参加Vue.js入门课程', status: 'pending', sendTime: '2024-07-01T09:00:00' },
  { id: '2', type: 'massEmail', courseName: 'React.js进阶', content: '欢迎参加React.js进阶课程', status: 'sent', sendTime: '2024-07-02T09:00:00' },
  { id: '3', type: 'reminder', courseName: 'Angular基础', content: '别忘了参加Angular基础课程', status: 'sent', sendTime: '2024-07-02T08:00:00' },
]);

// function submitForm() {
//   const url = isEditing.value ? `http://localhost:9090/notification/${form.value.id}` : 'http://localhost:9090/notification';
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
    const index = notifications.value.findIndex(notif => notif.id === form.value.id);
    if (index !== -1) {
      notifications.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (notifications.value.length + 1).toString();
    notifications.value.push({ ...form.value });
  }

  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current notifications:", notifications.value); // 打印当前的模拟数据
}

function openForm(notification = null, viewOnly = false) {
  if (notification) {
    form.value = { ...notification };
    isEditing.value = !viewOnly;
    isViewing.value = viewOnly;
  } else {
    form.value = { id: '', type: 'course', courseName: '', content: '', status: 'pending', sendTime: '' };
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

