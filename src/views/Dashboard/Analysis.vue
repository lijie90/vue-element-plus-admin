<script setup lang="ts">
import PanelGroup from './components/PanelGroup.vue'
import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
import { Echart } from '@/components/Echart'
import { pieOptions, barOptions, lineOptions } from './echarts-data'
import { ref, reactive } from 'vue'
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const loading = ref(true)

const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption

// 用户来源
const getUserAccessSource = async () => {
  const res = [
    { value: 335, name: '软件应用与开发' },
    { value: 310, name: '微课与教学辅助' },
    { value: 234, name: '物联网应用' },
    { value: 135, name: '信息可视化设计' }
  ]
  if (res) {
    set(
      pieOptionsData,
      'legend.data',
      res.map((v) => t(v.name))
    )
    pieOptionsData!.series![0].data = res.map((v) => {
      return {
        name: v.name,
        value: v.value
      }
    })
  }
}

const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption

// 周活跃量
const getWeeklyUserActivity = async () => {
  const res = [
    {
      estimate: 100,
      actual: 120,
      name: '2010'
    },
    {
      estimate: 120,
      actual: 82,
      name: '2011'
    },
    {
      estimate: 161,
      actual: 91,
      name: '2012'
    },
    {
      estimate: 134,
      actual: 154,
      name: '2013'
    },
    {
      estimate: 105,
      actual: 162,
      name: '2014'
    },
    {
      estimate: 160,
      actual: 140,
      name: '2015'
    },
    {
      estimate: 165,
      actual: 145,
      name: '2016'
    },
    {
      estimate: 114,
      actual: 250,
      name: '2017'
    },
    {
      estimate: 163,
      actual: 134,
      name: '2018'
    },
    {
      estimate: 185,
      actual: 56,
      name: '2019'
    },
    {
      estimate: 118,
      actual: 99,
      name: '2020'
    },
    {
      estimate: 123,
      actual: 123,
      name: '2021'
    }
  ]
  if (res) {
    set(
      barOptionsData,
      'xAxis.data',
      res.map((v) => v.name)
    )
    set(barOptionsData, 'series', [
      {
        name: t('analysis.activeQuantity'),
        data: res.map((v) => v.actual),
        type: 'bar'
      }
    ])
  }
}

const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption

// 每月销售总额
const getMonthlySales = async () => {
  const res = [
    {
      estimate: 100,
      actual: 120,
      name: '2010'
    },
    {
      estimate: 120,
      actual: 82,
      name: '2011'
    },
    {
      estimate: 161,
      actual: 91,
      name: '2012'
    },
    {
      estimate: 134,
      actual: 154,
      name: '2013'
    },
    {
      estimate: 105,
      actual: 162,
      name: '2014'
    },
    {
      estimate: 160,
      actual: 140,
      name: '2015'
    },
    {
      estimate: 165,
      actual: 145,
      name: '2016'
    },
    {
      estimate: 114,
      actual: 250,
      name: '2017'
    },
    {
      estimate: 163,
      actual: 134,
      name: '2018'
    },
    {
      estimate: 185,
      actual: 56,
      name: '2019'
    },
    {
      estimate: 118,
      actual: 99,
      name: '2020'
    },
    {
      estimate: 123,
      actual: 123,
      name: '2021'
    }
  ]
  if (res) {
    set(
      lineOptionsData,
      'xAxis.data',
      res.map((v) => t(v.name))
    )
    set(lineOptionsData, 'series', [
      {
        name: '人数',
        smooth: true,
        type: 'line',
        itemStyle: {},
        data: res.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()])
  loading.value = false
}

getAllApi()
</script>

<template>
  <PanelGroup />
  <ElRow :gutter="20" justify="space-between">
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :options="pieOptionsData" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :options="lineOptionsData" :height="350" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
