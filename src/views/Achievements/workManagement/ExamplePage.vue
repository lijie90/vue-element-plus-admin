<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElMessageBox } from 'element-plus'
import { Table } from '@/components/Table'
import { TableData } from '@/api/table/types'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useCategoriesStoreWithOut } from '@/store/modules/categories'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'WorkManagement'
})

const { push } = useRouter()

const CategoriesStore = useCategoriesStoreWithOut()

const searchKeyword = ref('')
const setSearchParams = (params: any) => {
  if (Object.keys(params).length === 0) {
    searchKeyword.value = ''
    return
  }
  searchKeyword.value = params?.workName
}
const filterData = computed(() => {
  console.log(searchKeyword.value)
  const keyword = searchKeyword.value.toLowerCase()
  // 如果搜索关键字为空，直接返回全部数据
  if (keyword === '') {
    return CategoriesStore.worksData
  }
  console.log(keyword)
  return CategoriesStore.worksData.filter((row) => row?.workName.toLowerCase().includes(keyword))
})

const pageInfo = {
  loading: false,
  currentPage: 1,
  pageSize: 100
}

const { t } = useI18n()
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
    field: 'category',
    label: '作品大类',
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
          const categoriesName = CategoriesStore.categoriesData.find(
            (item) => item?.id == data.row.category
          )
          return <div>{categoriesName?.mainName}</div>
        }
      }
    }
  },
  {
    field: 'subcategory',
    label: '作品小类',
    search: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          const categoriesName = CategoriesStore.categoriesData
            .find(
              (item) => item?.subcategories.find((subItem) => subItem.id === data.row.subcategory)
            )
            ?.subcategories.find((subItem) => subItem.id === data.row.subcategory)
          return <div>{categoriesName?.name}</div>
        }
      }
    }
  },
  {
    field: 'workNumber',
    label: '作品编号',
    search: {
      hidden: true
    }
  },
  {
    field: 'workName',
    label: '作品名称',
    search: {
      component: 'Input'
    }
  },
  {
    field: 'recommend',
    label: '是否上推荐',
    search: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <ElTag type={data.row.recommend ? 'success' : 'warning'}>
              {data.row.recommend ? '是' : '否'}
            </ElTag>
          )
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
  push('/achievements/workManagement-add')
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
    CategoriesStore.delWorksData(selectData.value)
  })
}

const delData = (row) => {
  ElMessageBox.confirm('确定删除此项', '通知', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    CategoriesStore.delWorksData([row])
  })
  //删除
}

const action = (row: TableData, type: string) => {
  push(`/achievements/workManagement-${type}?id=${row.id}`)
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
