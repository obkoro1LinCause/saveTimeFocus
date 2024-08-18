import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { TaskStatusEnum, TaskStatusMap} from '@/options/App/views/home/invest/components/task/type';

export const useInvestModuleStore = defineStore('invest', () => {
  const investTasks = ref();
  const planTasks = ref();
  const closedTasks = ref();
  // 当前投资状态
  const currentTaskStatus = ref<TaskStatusEnum>(TaskStatusEnum.INVEST);

  // 获取投资中的任务个数
  const investTaskNum = computed(()=>{
    return investTasks.value?.length;
  });

  // 设置投资时间
  const setTaskList = (tab:TaskStatusEnum)=>{
    console.log(tab,'===tab===');
  };
  
  return { 
    currentTaskStatus,
    setTaskList,
    investTasks,
    planTasks,
    closedTasks
  }
})
