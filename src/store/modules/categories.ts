import { defineStore } from 'pinia'
import { store } from '../index'
interface SubcategoriesType {
  name: string
  id: string
  mainId: string
}
interface CategoriesType {
  mainName: string
  id: string
  maxNum: number
  maxTeacherNum: number
  maxTeamNum: number
  subcategories: SubcategoriesType[]
}
type Work = {
  id: string
  category: string // 作品大类
  subcategory: string // 作品小类
  workNumber: string // 作品编号
  workName: string // 作品名称
  recommend: boolean //是否上推荐
  workSynopsis: string //作品简介
  useContent: string //使用开源情况说明
  installInstructions: string //安装说明
  author: string //作者
  school: string //学校
  teacherId: string //指导老师
  categoriesValue?: []
}
type Student = {
  name: string // 姓名
  studentId: string // id
  username: string // 用户名
  grade: string // 年级
  major: string // 专业
  education: string // 学历
  schoolId: string //学校
  studentNumber: string //学号
}
type School = {
  id: string
  name: string
}
type Teacher = {
  id: string
  name: string
  schoolId: string
  major: string // 专业
  education: string // 学历
}

interface CategoriesState {
  categoriesData: Array<CategoriesType | null> //作品类别数据
  //作品数据
  worksData: Array<Work>
  studentsData: Array<Student>
  schoolData: Array<School>
  teachersData: Array<Teacher>
}
export const categoriesStore = defineStore('categories', {
  state: (): CategoriesState => {
    return {
      categoriesData: [
        {
          mainName: '软件应用与开发',
          id: '1',
          maxNum: 3,
          maxTeacherNum: 2,
          maxTeamNum: 3,
          subcategories: [
            { name: 'Web 应用与开发', id: '1-1', mainId: '1' },
            { name: '管理信息系统', id: '1-2', mainId: '1' },
            { name: '移动应用开发（非游戏类）', id: '1-3', mainId: '1' },
            { name: '算法设计与应用', id: '1-4', mainId: '1' }
          ]
        },
        {
          mainName: '微课与教学辅助',
          id: '2',
          maxNum: 3,
          maxTeacherNum: 2,
          maxTeamNum: 3,
          subcategories: [
            { name: '计算机基础与应用类课程微课（或教学辅助课件）', id: '2-1', mainId: '2' },
            { name: '中、小学数学或自然科学课程微课（或教学辅助课件）', id: '2-2', mainId: '2' },
            { name: '汉语言文学（限于唐诗宋词）微课（或教学辅助课件）', id: '2-3', mainId: '2' },
            { name: '虚拟实验平台', id: '2-4', mainId: '2' }
          ]
        },
        {
          mainName: '物联网应用',
          id: '3',
          maxNum: 3,
          maxTeacherNum: 2,
          maxTeamNum: 3,
          subcategories: [
            { name: '城市管理', id: '3-1', mainId: '3' },
            { name: '医药卫生', id: '3-2', mainId: '3' },
            { name: '运动健身', id: '3-3', mainId: '3' },
            { name: '数字生活', id: '3-4', mainId: '3' }
          ]
        },
        {
          mainName: '信息可视化设计',
          id: '4',
          maxNum: 3,
          maxTeacherNum: 2,
          maxTeamNum: 3,
          subcategories: [
            { name: '信息图形设计', id: '4-1', mainId: '4' },
            { name: '动态信息影像（MG 动画）', id: '4-2', mainId: '4' },
            { name: '交互信息设计', id: '4-3', mainId: '4' },
            { name: '数据可视化', id: '4-4', mainId: '4' }
          ]
        }
      ],
      worksData: [
        {
          id: '1',
          category: '1',
          subcategory: '1-1',
          workName: '学生管理系统',
          workNumber: '1-1-1-1',
          recommend: false,
          workSynopsis: '<p>学生管理系统</p>',
          useContent: '学生管理系统',
          installInstructions: '学生管理系统',
          author: '1',
          school: '1',
          teacherId: '1'
        }
      ],
      studentsData: [
        {
          studentId: '1',
          name: '张三',
          username: 'zhangsan',
          major: '1',
          grade: '2017',
          education: '本科',
          schoolId: '1',
          studentNumber: '9527'
        }
      ],
      schoolData: [
        {
          id: '1',
          name: '西南石油大学'
        },
        {
          id: '2',
          name: '武汉理工大学'
        }
      ],
      teachersData: [
        {
          id: '1',
          name: '张三',
          schoolId: '1',
          major: '计算机', // 专业
          education: '博士' // 学历
        },
        {
          id: '2',
          name: '李四',
          schoolId: '1',
          major: '计算机', // 专业
          education: '博士' // 学历
        }
      ]
    }
  },
  actions: {
    addCategoriesData(value) {
      this.categoriesData.push(value)
    },
    editCategoriesData(value, index) {
      this.categoriesData.splice(index, 1, value)
    },
    delCategoriesData(row) {
      console.log(this.categoriesData.filter((item) => !row.some((item2) => item!.id === item2.id)))
      this.categoriesData = this.categoriesData.filter(
        (item) => !row.some((item2) => item!.id === item2.id)
      )
    },
    addWorksData(value) {
      this.worksData.push(value)
    },
    editWorksData(value, index) {
      this.worksData.splice(index, 1, value)
    },
    delWorksData(row) {
      this.worksData = this.worksData.filter((item) => !row.some((item2) => item!.id === item2.id))
    },
    addStudentsData(value) {
      this.studentsData.push(value)
    },
    editStudentsData(value, index) {
      this.studentsData.splice(index, 1, value)
    },
    delStudentsData(row) {
      this.studentsData = this.studentsData.filter(
        (item) => !row.some((item2) => item!.schoolId === item2.schoolId)
      )
    },
    addTeachersData(value) {
      this.teachersData.push(value)
    },
    editTeachersData(value, index) {
      this.teachersData.splice(index, 1, value)
    },
    delTeachersData(row) {
      this.teachersData = this.teachersData.filter(
        (item) => !row.some((item2) => item!.id === item2.id)
      )
    },
    setWorksData(data: any) {
      this.worksData = data
    },
    setCategoriesData(data: any) {
      this.categoriesData = data
    }
  },
  persist: true
})
export const useCategoriesStoreWithOut = () => {
  return categoriesStore(store)
}
