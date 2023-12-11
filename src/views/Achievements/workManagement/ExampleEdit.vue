<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, onMounted, nextTick } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'
import { Editor } from '@/components/Editor'

const { push, go } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

// const loading = ref(false)

const categoriesStore = useCategoriesStoreWithOut()
const formRef = ref<FormInstance>()
let dynamicValidateForm = ref<any>({
  recommend: false
  // workSynopsis: 'eeee'
})
const getWorkDataById = (id: string) => {
  dynamicValidateForm.value = categoriesStore.worksData.find((item) => item.id === id)
  dynamicValidateForm.value.categoriesValue = [
    dynamicValidateForm.value.category,
    dynamicValidateForm.value.subcategory
  ]
  console.log(categoriesStore.worksData.find((item) => item.id === id))
}
onMounted(async () => {
  await nextTick()
  getWorkDataById(query.id as string)
})

const save = async () => {
  let index = categoriesStore.worksData.findIndex((item) => item.id === query.id)
  categoriesStore.editWorksData(dynamicValidateForm.value, index)
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
const options = categoriesStore.categoriesData.reduce((acc: any[], item) => {
  acc.push({
    label: item?.mainName,
    value: item?.id,
    children: item?.subcategories?.map((item: any) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  })
  return acc
}, [])
const schoolOptions = categoriesStore.schoolData.reduce((acc: any[], item) => {
  acc.push({
    label: item.name,
    value: item.id
  })
  return acc
}, [])
const studentOptions = categoriesStore.studentsData.reduce((acc: any[], item) => {
  acc.push({
    label: item.name,
    value: item.studentId
  })
  return acc
}, [])
const teacherOptions = categoriesStore.teachersData.reduce((acc: any[], item) => {
  acc.push({
    label: item.name,
    value: item.id
  })
  return acc
}, [])
const handleChange = (value: any[]) => {
  dynamicValidateForm.value.category = value[0]
  dynamicValidateForm.value.subcategory = value[1]
  dynamicValidateForm.value.categoriesValue = value
}
const schoolHandleChange = (value: any[]) => {
  dynamicValidateForm.value.school = value[0]
}
const studentHandleChange = (value: any[]) => {
  dynamicValidateForm.value.author = value[0]
}
// const teacherHandleChange = (value: any[]) => {
//   dynamicValidateForm.value.teacherId = value[0]
// }
</script>
<template>
  <ContentDetailWrap :title="t('exampleDemo.add')" @back="push('/example/example-page')">
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="categoriesValue"
            label="作品类别"
            :rules="[
              {
                required: true,
                message: '作品类别不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <el-cascader
              v-model="dynamicValidateForm.categoriesValue"
              :options="options"
              @change="handleChange"
            />
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
        <el-col :span="8">
          <el-form-item
            prop="workNumber"
            label="作品编号"
            :rules="[
              {
                required: true,
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="dynamicValidateForm.workNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="author"
            label="作者"
            :rules="[
              {
                required: true,
                trigger: 'blur'
              }
            ]"
          >
            <el-cascader
              v-model="dynamicValidateForm.author"
              :options="studentOptions"
              @change="studentHandleChange"
              :props="{ multiple: true }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="teacherId"
            label="指导老师"
            :rules="[
              {
                required: true,
                trigger: 'blur'
              }
            ]"
          >
            <el-cascader
              v-model="dynamicValidateForm.teacherId"
              :options="teacherOptions"
              :props="{ multiple: true }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            prop="workName"
            label="作品名称"
            :rules="[
              {
                required: true,
                trigger: 'blur'
              }
            ]"
          >
            <el-input v-model="dynamicValidateForm.workName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="recommend"
            label="是否上推荐"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-switch v-model="dynamicValidateForm.recommend" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="workSynopsis"
            label="作品简介"
            :rules="[
              {
                required: true,
                trigger: 'blur'
              }
            ]"
          >
            <Editor v-model="dynamicValidateForm.workSynopsis" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="useContent"
            label="使用开源情况说明"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <Editor v-model="dynamicValidateForm.useContent" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="installInstructions"
            label="安装说明"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <Editor v-model="dynamicValidateForm.installInstructions" />
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
