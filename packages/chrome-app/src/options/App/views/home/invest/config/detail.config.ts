import { type TTaskItemMap,type TTaskList,type TConfigures } from '../components/task/type';
import EditorItem from '../components/configureItem/editorIndex.vue';

export const configure:TConfigures = [
  {
    label:'番茄时间',
    tip:'番茄时间是用户使用番茄专注进行投资时间累计的时间， 其中包含完美番茄专注和普通番茄专注。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'番茄重量',
    tip:'番茄重量是用户在番茄专注过程中，番茄成长的重量。我们鼓励用户多使用番茄工作法科学专注高效的进行工作学习生活，我们将为用户专注高效的工作提供了各种奖励。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:(source)=>{ return `投资时间计划/${source?.planType || '-'}进度`},
    tip:'本日投资1 h，完成进度50%，本日投资 2 h 则投资计划达标。',
    filed:['schedule1','schedule2'],
    component:EditorItem,
    display:()=>true,
    props:{
      title:'投资时间计划',
      type:'plan',
      showEdit:()=>true,
      desc:`
        - 投资时间计划是用户根据自己的生活作息，给自己规定每天/每周，需要投资多少小时到投资时间项目中的一个计划，当这一天/这一周达到了投资目标，我们就认为这一天/这一周投资时间达标了。
        - 投资时间项目，不应该是短期的某项任务，所以我们可以定期投资时间进行播种，直到成熟收获投资时间项目。
        - 投资时间计划不该太难以完成，也不该太轻松完成，这对于我们长期投资时间并没有帮助，我们应该根据生活作息变化灵活动态调整投资计划~
      `
    }
  },
  {
    label:'预期投资时间',
    tip:'完成投资时间目标预期需要100 h，当前已投资时间 20h，进度20%。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'补记投资时间',
    tip:`
       - 用户没有使用番茄专注投资，事后补记投资时间到投资项目上，这段时间时间为补记投资时间。<br/>
       - 当前投资时间为100 h，包含20h番茄专注时间和80h补记投资时间，番茄专注占比20%,补记投资时间占比80%。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'投资目标截止日',
    tip:'',
    filed:'',
    component:EditorItem,
    formatter:()=>'--',
    props:{
      title:'投资时间计划',
      type:'expect',
      showEdit:()=>true,
    }
  },
  {
    label:'闪念',
    tip:'闪念用于记录在专注中会影响此刻高效专注工作的想法，可能是一闪而过的灵感，可能是其他优先级低的工作，可能是其他待处理的琐事。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'日志感想',
    tip:'日志感想用于记录在投资时间旅途中，留下的心情感想，记录一路酸甜苦辣的旅途，在收获的季节，这些都是闪闪发亮的军功章。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'完美番茄专注时间',
    tip:`
      - 完美专注番茄总数xxx，专注时间 xx h 占总番茄时间 xxh的 xx%。<br/>
      - 完美专注番茄是最专注的状态，在专注过程中没有暂停，没有中途保存专注，这种心流状态工作效率最高，期待未来生产更多完美专注番茄。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'普通番茄专注时间',
    tip:`
      - 普通专注番茄总数 xxx， 专注时间 xx h占总番茄时间 xxh的 xx%。<br/>
      - 普通专注是在专注过程中出现暂停或者中途保存专注的情况，相对而言还是完美专注更专注高效， 期待在番茄专注中能更加专注高效，生产更多完美番茄。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'循环番茄',
    tip:'每隔x个专注番茄，弹出记录日志感想的弹窗，记录一路酸甜苦辣，在收获的季节，这些都是闪闪发亮的军功章。',
    filed:'',
    component:EditorItem,
    props:{
      title:'循环番茄',
      type:'cycle',
      showEdit:()=>true,
    }
  },
]

export const configureBySub: TConfigures = [
  {
    label:'番茄时间',
    tip:'番茄时间是用户使用番茄专注进行投资时间累计的时间， 其中包含完美番茄专注和普通番茄专注。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'番茄重量',
    tip:'番茄重量是用户在番茄专注过程中，番茄成长的重量。我们鼓励用户多使用番茄工作法科学专注高效的进行工作学习生活，我们将为用户专注高效的工作提供了各种奖励。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:(source)=>{ return `投资时间计划/${source?.planType || '-'}进度`},
    tip:'本日投资1 h，完成进度50%，本日投资 2 h 则投资计划达标。',
    filed:['schedule1','schedule2'],
    component:EditorItem,
    display:()=>true,
    props:{
      title:'投资时间计划',
      type:'plan',
      showEdit:()=>true,
      desc:`
        - 投资时间计划是用户根据自己的生活作息，给自己规定每天/每周，需要投资多少小时到投资时间项目中的一个计划，当这一天/这一周达到了投资目标，我们就认为这一天/这一周投资时间达标了。
        - 投资时间项目，不应该是短期的某项任务，所以我们可以定期投资时间进行播种，直到成熟收获投资时间项目。
        - 投资时间计划不该太难以完成，也不该太轻松完成，这对于我们长期投资时间并没有帮助，我们应该根据生活作息变化灵活动态调整投资计划~
      `
    }
  },
  {
    label:'预期投资时间',
    tip:'完成投资时间目标预期需要100 h，当前已投资时间 20h，进度20%。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'补记投资时间',
    tip:`
       - 用户没有使用番茄专注投资，事后补记投资时间到投资项目上，这段时间时间为补记投资时间。<br/>
       - 当前投资时间为100 h，包含20h番茄专注时间和80h补记投资时间，番茄专注占比20%,补记投资时间占比80%。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'投资目标截止日',
    tip:'',
    filed:'',
    component:EditorItem,
    formatter:()=>'--',
    props:{
      title:'投资时间计划',
      type:'expect',
      showEdit:()=>true,
    }
  },
  {
    label:'闪念',
    tip:'闪念用于记录在专注中会影响此刻高效专注工作的想法，可能是一闪而过的灵感，可能是其他优先级低的工作，可能是其他待处理的琐事。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'日志感想',
    tip:'日志感想用于记录在投资时间旅途中，留下的心情感想，记录一路酸甜苦辣的旅途，在收获的季节，这些都是闪闪发亮的军功章。',
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'完美番茄专注时间',
    tip:`
      - 完美专注番茄总数xxx，专注时间 xx h 占总番茄时间 xxh的 xx%。<br/>
      - 完美专注番茄是最专注的状态，在专注过程中没有暂停，没有中途保存专注，这种心流状态工作效率最高，期待未来生产更多完美专注番茄。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'普通番茄专注时间',
    tip:`
      - 普通专注番茄总数 xxx， 专注时间 xx h占总番茄时间 xxh的 xx%。<br/>
      - 普通专注是在专注过程中出现暂停或者中途保存专注的情况，相对而言还是完美专注更专注高效， 期待在番茄专注中能更加专注高效，生产更多完美番茄。
    `,
    filed:'',
    formatter:()=>'--',
  },
  {
    label:'循环番茄',
    tip:'每隔x个专注番茄，弹出记录日志感想的弹窗，记录一路酸甜苦辣，在收获的季节，这些都是闪闪发亮的军功章。',
    filed:'',
    component:EditorItem,
    props:{
      title:'循环番茄',
      type:'cycle',
      showEdit:()=>true,
    }
  },
]