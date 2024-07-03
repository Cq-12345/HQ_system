<template>
  <el-dialog v-model="visible" title="培训申请表单" width="350" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="申请公司" :rules="[{ required: true, message: '请输入申请公司', trigger: 'blur' }]">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="联系人" :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' }]">
        <el-input v-model="form.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="申请状态">
        <el-select v-model="form.status">
          <el-option label="待审核" value="pending"></el-option>
          <el-option label="已通过" value="approved"></el-option>
          <el-option label="已拒绝" value="rejected"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训内容">
        <el-input v-model="form.trainingContent" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="提交日期">
        <el-date-picker v-model="form.submittedDate" type="date" placeholder="选择日期"></el-date-picker>
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
import axios from 'axios';
import { ElMessage } from 'element-plus';

const visible = ref(false);
const form = ref({ id: '', company: '', contactPerson: '', status: 'pending', trainingContent: '', submittedDate: '' });
const isEditing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const applications = ref([
  { id: '1', company: 'ABC公司', contactPerson: '张三', status: 'pending', submittedDate: '2024-06-15', trainingContent: 'Vue.js入门培训' },
  { id: '2', company: 'XYZ公司', contactPerson: '李四', status: 'approved', submittedDate: '2024-06-16', trainingContent: 'React.js进阶培训' },
]);

// function submitForm() {
//   const url = isEditing.value ? `http://localhost:9090/application/${form.value.id}` : 'http://localhost:9090/application';
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
    const index = applications.value.findIndex(app => app.id === form.value.id);
    if (index !== -1) {
      applications.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (applications.value.length + 1).toString();
    applications.value.push({ ...form.value });
  }
  
  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current applications:", applications.value); // 打印当前的模拟数据
}

function openForm(application = null) {
  if (application) {
    form.value = { ...application };
    isEditing.value = true;
  } else {
    form.value = { id: '', company: '', contactPerson: '', status: 'pending', trainingContent: '', submittedDate: '' };
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
