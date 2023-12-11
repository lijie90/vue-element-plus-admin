<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { randomString } from '@/utils'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'

const { push, go } = useRouter()

const { t } = useI18n()

const categoriesStore = useCategoriesStoreWithOut()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<any>({
  id: randomString(32)
})

const save = async () => {
  categoriesStore.addTeachersData(dynamicValidateForm)
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      //获取表单数据
      console.log(dynamicValidateForm)
      save()
      go(-1)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const schoolOptions = categoriesStore.schoolData.reduce((acc: any[], item) => {
  acc.push({
    label: item.name,
    value: item.id
  })
  return acc
}, [])
const schoolHandleChange = (value: any[]) => {
  dynamicValidateForm.schoolId = value[0]
}
</script>
<!-- // name: string // 姓名
//   studentId: string // 学号
//   username: string // 用户名
//   grade: string // 年级
//   major: string // 专业
//   education: string // 学历
//   schoolId: string //学校 -->
<template>
  <ContentDetailWrap :title="t('exampleDemo.add')" @back="push('/example/example-page')">
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="name"
            label="姓名"
            :rules="[
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="dynamicValidateForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="major"
            label="专业"
            :rules="[
              {
                required: true,
                message: '请输入专业',
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="dynamicValidateForm.major" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="education"
            label="学历"
            :rules="[
              {
                required: true,
                message: '请输入学历',
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="dynamicValidateForm.education" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="school"
            label="学校"
            :rules="[
              {
                required: true,
                message: '学校不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <el-cascader
              v-model="dynamicValidateForm.school"
              :options="schoolOptions"
              @change="schoolHandleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
        <el-button @click="go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </ContentDetailWrap>
</template>
