<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref, onMounted } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { randomString } from '@/utils'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'

const { push, go } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

// const loading = ref(false)

const categoriesStore = useCategoriesStoreWithOut()
const mainId = randomString(32)
const formRef = ref<FormInstance>()
let dynamicValidateForm = ref<any>({})
const getCategoriesDataById = (id: string) => {
  dynamicValidateForm.value = categoriesStore.categoriesData.find((item) => item!.id === id)
}

interface DomainItem {
  key: number
  value: string
}
onMounted(() => {
  getCategoriesDataById(query.id as string)
})

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.value.subcategories.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.value.subcategories.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.value.subcategories.push({
    id: randomString(32),
    mainId: mainId,
    name: ''
  })
}

const save = async () => {
  const index = dynamicValidateForm.value.findIndex((item) => item.id === query.id)
  categoriesStore.editCategoriesData(dynamicValidateForm.value, index)
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
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.add')" @back="push('/example/example-page')">
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px">
      <el-form-item
        prop="mainName"
        label="大类名称"
        :rules="[
          {
            required: true,
            message: '大类名称不能为空',
            trigger: 'blur'
          }
        ]"
      >
        <el-input v-model="dynamicValidateForm.mainName" />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="maxNum"
            label="参赛队员上限"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-input-number v-model="dynamicValidateForm.maxNum" :max="3" :min="1" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="maxTeacherNum"
            label="指导老师上限"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-input-number v-model="dynamicValidateForm.maxTeacherNum" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="maxTeamNum"
            label="国赛队伍上限"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-input-number v-model="dynamicValidateForm.maxTeamNum" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(domain, index) in dynamicValidateForm.subcategories" :key="index">
        <el-col :span="16">
          <el-form-item
            :label="'小类名称' + (index + 1)"
            :prop="'subcategories.' + index + '.name'"
            :rules="{
              required: true,
              message: '小类名称不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click.prevent="removeDomain(domain)">Delete</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="addDomain">新增小类</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
        <el-button @click="go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </ContentDetailWrap>
</template>
