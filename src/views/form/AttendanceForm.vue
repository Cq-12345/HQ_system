<template>
  <el-dialog v-model="visible" title="签到信息" width="30%" @update:visible="val => visible = val">
    <el-form :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.studentName" readonly></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.gender" readonly></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" readonly></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="form.company" readonly></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact" readonly></el-input>
      </el-form-item>
      <el-form-item label="签到时间">
        <el-date-picker v-model="form.attendanceTime" type="datetime" readonly></el-date-picker>
      </el-form-item>
      <el-form-item label="费用">
        <el-input v-model="form.fee" readonly></el-input>
      </el-form-item>
      <el-form-item label="费用状态">
        <el-select v-model="form.feeStatus" disabled>
          <el-option label="已支付" value="paid"></el-option>
          <el-option label="无需支付" value="no_payment_required"></el-option>
          <el-option label="未支付" value="not_paid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签到状态">
        <el-select v-model="form.signInStatus" disabled>
          <el-option label="已签到" value="signed_in"></el-option>
          <el-option label="未签到" value="not_signed_in"></el-option>
        </el-select>
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
import { ElMessage } from 'element-plus';

const visible = ref(false);
const form = ref({ id: '', studentName: '', gender: '', courseName: '', company: '', contact: '', fee: 0, attendanceTime: '', feeStatus: 'not_paid', signInStatus: 'not_signed_in' });
const isEditing = ref(false);
const emit = defineEmits(['refresh']);

// 模拟数据
const attendances = ref([
  { id: '1', studentName: '张三', gender: '男', courseName: 'Vue.js入门', company: '公司A', contact: '12345678901', fee: 500, attendanceTime: '', feeStatus: 'not_paid', signInStatus: 'not_signed_in' },
  { id: '2', studentName: '李四', gender: '女', courseName: 'React.js进阶', company: '公司B', contact: '09876543210', fee: 0, attendanceTime: '2024-06-01T09:00:00', feeStatus: 'no_payment_required', signInStatus: 'signed_in' },
]);

// function submitForm() {
//   const url = isEditing.value ? `http://localhost:9090/attendance/${form.value.id}` : 'http://localhost:9090/attendance';
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
    const index = attendances.value.findIndex(att => att.id === form.value.id);
    if (index !== -1) {
      attendances.value[index] = { ...form.value };
    }
  } else {
    // 新建模式
    form.value.id = (attendances.value.length + 1).toString();
    attendances.value.push({ ...form.value });
  }

  visible.value = false;
  emit('refresh');
  ElMessage.success('操作成功');
  console.log("Current attendances:", attendances.value); // 打印当前的模拟数据
}

function openForm(attendance = null) {
  if (attendance) {
    form.value = { ...attendance };
    isEditing.value = true;
  } else {
    form.value = { id: '', studentName: '', gender: '', courseName: '', company: '', contact: '', fee: 0, attendanceTime: '', feeStatus: 'not_paid', signInStatus: 'not_signed_in' };
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
