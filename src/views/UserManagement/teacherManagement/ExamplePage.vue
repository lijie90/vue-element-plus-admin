<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElMessageBox } from 'element-plus'
import { Table } from '@/components/Table'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'TeacherManagement'
})

const { push } = useRouter()

const CategoriesStore = useCategoriesStoreWithOut()

const searchKeyword = ref('')
const setSearchParams = (params: any) => {
  if (Object.keys(params).length === 0) {
    searchKeyword.value = ''
    return
  }
  searchKeyword.value = params?.name
}
const filterData = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  // 如果搜索关键字为空，直接返回全部数据
  if (keyword === '') {
    return CategoriesStore.teachersData
  }
  return CategoriesStore.teachersData.filter((row) => row?.name.toLowerCase().includes(keyword))
})

const pageInfo = {
  loading: false,
  currentPage: 1,
  pageSize: 100
}

const { t } = useI18n()
// id: string
//   name: string
//   schoolId: string
const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'name',
    label: '姓名',
    search: {
      component: 'Input'
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'major',
    label: '专业',
    search: {
      hidden: true
    }
  },
  {
    field: 'education',
    label: '学历',
    search: {
      hidden: true
    }
  },
  {
    field: 'schoolId',
    label: '学校',
    search: {
      hidden: true
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    table: {
      slots: {
        default: (data: any) => {
          const categoriesName = CategoriesStore.schoolData.find(
            (item) => item?.id == data.row.schoolId
          )
          return <div>{categoriesName?.name}</div>
        }
      }
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <>
              <ElButton type="primary" onClick={() => action(data.row, 'edit')}>
                {t('exampleDemo.edit')}
              </ElButton>
              <ElButton type="success" onClick={() => action(data.row, 'detail')}>
                {t('exampleDemo.detail')}
              </ElButton>
              <ElButton type="danger" onClick={() => delData(data.row)}>
                {t('exampleDemo.del')}
              </ElButton>
            </>
          )
        }
      }
    }
  }
])
const selectData = ref<any[]>([])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)
const handleSelectionChange = (data: any[]) => {
  selectData.value = data
}
const AddAction = () => {
  push('/userManagement/teacherManagement-add')
}

const delLoading = ref(false)
const delMultiData = async () => {
  if (selectData.value.length === 0) {
    ElMessage({
      message: '请勾选删除项',
      type: 'warning'
    })
    return
  }
  ElMessageBox.confirm('确定删除此项', '通知', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    CategoriesStore.delTeachersData(selectData.value)
  })
}

const delData = (row) => {
  ElMessageBox.confirm('确定删除此项', '通知', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    CategoriesStore.delTeachersData([row])
  })
  //删除
}

const action = (row: any, type: string) => {
  push(`/userManagement/teacherManagement-${type}?id=${row.id}`)
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delMultiData()">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="pageInfo.pageSize"
      v-model:currentPage="pageInfo.currentPage"
      :columns="allSchemas.tableColumns"
      :data="(filterData as Recordable<any, string>[])"
      :loading="pageInfo.loading"
      :pagination="{
        total: filterData.length
      }"
      @selection-change="handleSelectionChange"
    />
  </ContentWrap>
</template>
