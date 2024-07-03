<template>
  <el-dialog v-model="visible" title="学员表单" width="350" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="姓名" :rules="[{ required: true, message: '请输入学员姓名', trigger: 'blur' }]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="'男'">男</el-radio>
          <el-radio :label="'女'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系方式" :rules="[{ required: true, message: '请输入联系方式', trigger: 'blur' }]">
        <el-input v-model="form.contact"></el-input>
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
const form = ref({ id: '', name: '', gender: '男', contact: '' });
const isEditing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const students = ref([
  { id: '1', name: '张三', gender: '男', contact: '12345678901' },
  { id: '2', name: '李四', gender: '女', contact: '09876543210' },
]);

function submitForm() {
  if (isEditing.value) {
    // 编辑模式
    const index = students.value.findIndex(student => student.id === form.value.id);
    if (index !== -1) {
      students.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (students.value.length + 1).toString();
    students.value.push({ ...form.value });
  }
  
  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current students:", students.value); // 打印当前的模拟数据
}

function openForm(student = null) {
  if (student) {
    form.value = { ...student };
    isEditing.value = true;
  } else {
    form.value = { id: '', name: '', gender: '男', contact: '' };
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
