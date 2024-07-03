<template>
  <el-dialog v-model="visible" title="讲师表单" width="350" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="姓名" :rules="[{ required: true, message: '请输入讲师姓名', trigger: 'blur' }]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职称" :rules="[{ required: true, message: '请输入职称', trigger: 'blur' }]">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="擅长领域">
        <el-input v-model="form.expertise"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
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
const form = ref({ id: '', name: '', title: '', expertise: '', email: '', phone: '' });
const isEditing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const lecturers = ref([
  { id: '1', name: '王伟', title: '高级工程师', expertise: 'Java开发', email: 'wangwei@example.com', phone: '12345678901' },
  { id: '2', name: '李芳', title: '讲师', expertise: '前端开发', email: 'lifang@example.com', phone: '09876543210' },
]);

function submitForm() {
  if (isEditing.value) {
    // 编辑模式
    const index = lecturers.value.findIndex(lecturer => lecturer.id === form.value.id);
    if (index !== -1) {
      lecturers.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (lecturers.value.length + 1).toString();
    lecturers.value.push({ ...form.value });
  }
  
  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current lecturers:", lecturers.value); // 打印当前的模拟数据
}

function openForm(lecturer = null) {
  if (lecturer) {
    form.value = { ...lecturer };
    isEditing.value = true;
  } else {
    form.value = { id: '', name: '', title: '', expertise: '', email: '', phone: '' };
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
