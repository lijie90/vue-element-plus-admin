<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, onMounted } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { randomString } from '@/utils'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'
import { loginApi } from '@/api/login'

const { push, go } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const categoriesStore = useCategoriesStoreWithOut()
const formRef = ref<FormInstance>()
let dynamicValidateForm = ref<any>({})
const getStudentDataById = (id: string) => {
  console.log(categoriesStore.teachersData.find((item) => item.id === id))
  dynamicValidateForm.value = categoriesStore.teachersData.find((item) => item.id === id)
}
onMounted(async () => {
  getStudentDataById(query.id as string)
})

const save = async () => {
  const index = categoriesStore.teachersData.findIndex((item) => item.id === query.id)
  categoriesStore.editTeachersData(dynamicValidateForm.value, index)
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      //获取表单数据
      console.log(dynamicValidateForm.value)
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
  dynamicValidateForm.value.schoolId = value[0]
}
</script>
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
            prop="schoolId"
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
              v-model="dynamicValidateForm.schoolId"
              :options="schoolOptions"
              @change="schoolHandleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </ContentDetailWrap>
</template>
