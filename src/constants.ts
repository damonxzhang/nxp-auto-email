import { UserProfile, Task } from './types';

export const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'liming', name: '李明', fullName: 'BD经理 - 李明', role: '晶圆代工量产与大客户投片拓展BD经理', avatarBg: 'bg-emerald-600 text-white', avatarText: 'LM', managerId: '' },
  { id: 'zhangjing', name: '张静', fullName: '后线工程师 - 张静', role: '廠務工藝保障與化學特氣用料結算工程師', avatarBg: 'bg-indigo-600 text-white', avatarText: 'ZJ', managerId: 'liming' },
  { id: 'zhaolei', name: '赵磊', fullName: '后线工程师 - 赵磊', role: '高精密機台控制與EAP自動化連線研發工程師', avatarBg: 'bg-amber-500 text-slate-900', avatarText: 'ZL', managerId: 'liming' },
  { id: 'wangfang', name: '王芳', fullName: '后线工程师 - 王芳', role: '芯片潔淨室安全防火與EHS環保合規檢測工程師', avatarBg: 'bg-rose-500 text-white', avatarText: 'WF', managerId: 'liming' }
];

export const CORPORATE_SYSTEMS = [
  { id: '异常处理系统-Others', name: '异常处理系统-Others', icon: 'HelpCircle', theme: 'amber', description: '厂务二次配管、气室动力、水电气运行环境辅助非标站点异常应急与自愈校验' },
  { id: '查询录像审批流程', name: '查询录像审批流程', icon: 'Video', theme: 'sky', description: '洁净操作车间、高精ASML曝光区物理监控视频授权调阅与安全凭证流程审批' },
  { id: '借还机申请', name: '借还机申请', icon: 'RefreshCw', theme: 'indigo', description: '高精密量测探仪、装配机件及厂务备品零配件短期调借、流转借还结算' },
  { id: 'buyoff流程', name: 'buyoff流程', icon: 'ShieldCheck', theme: 'emerald', description: '机台复产/大修后产品质量批复流程、失控规则在控校验良率释放判定' },
  { id: '2代分析系统', name: '2代分析系统', icon: 'Cpu', theme: 'purple', description: '失效分析(FA)、KLA电镜高维切片精密检测监控良率高维矩阵诊断' },
  { id: '物料报废', name: '物料报废', icon: 'Trash2', theme: 'teal', description: '高危化学物资、失效特种敏感耗料EHS环保等保合规离线销账安全报废申报' },
  { id: '自由弹夹领用', name: '自由弹夹领用', icon: 'Box', theme: 'indigo', description: 'FOUP晶圆密封隔离传送盒、极净容器自由周转领用去向登记追踪' }
];

export const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-wf-2',
    title: '洁净操作车间视频调阅与轨迹溯源审批',
    description: '异常物料丢失调查：需调阅6月9日工艺3组在此区域的物理操作视频。王芳作为安全官需审核该权限申请并签发临时数字凭证。',
    category: '安全合规',
    status: 'pending',
    priority: 'low',
    sourceSystem: '查询录像审批流程',
    dueDate: '2026-06-12',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 王芳',
    urgencyExplanation: '常规审计流程。',
    actionSteps: [
       { id: 'wf2-1', text: '核对申请人工作证件及权限等级', completed: true },
       { id: 'wf2-2', text: '下发带有时效限制的视频调阅内网链路', completed: false }
    ],
    workflow: {
      systemName: '查询录像审批流程',
      currentStepIndex: 2,
      steps: [
        { index: 1, name: '老板审批', handler: '老板' },
        { index: 2, name: '录像截取并保存', handler: '刘振琴 / 张静涛' }
      ]
    }
  },
  {
    id: 'task-zj-5',
    title: '机台刻蚀速率均匀性漂移异常 - 辅助参数修正案',
    description: '监控发现 08 号机台在处理磷化层刻蚀时速率分布不均。需由工程师给出参数补偿建议。',
    category: '技术优化',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '异常处理系统-Others',
    dueDate: '2026-06-13',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '影响晶圆收率，需尽快修正参数。',
    actionSteps: [
      { id: 'zj5-1', text: '对比历史良率曲线寻找波谷节点', completed: true },
      { id: 'zj5-2', text: '在系统中提交参数偏移补偿申请', completed: false }
    ],
    workflow: {
      systemName: '异常处理系统-Others',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '工程师处理', handler: '张静 (后线工程师)' },
        { index: 2, name: '产线按需进行处理', handler: '指定带班' },
        { index: 3, name: '奖励审批', handler: '康红月' },
        { index: 4, name: '奖励申诉', handler: '指定带班' },
        { index: 5, name: '再次审批奖励', handler: '康红月' }
      ]
    }
  },
  {
    id: 'task-zj-6',
    title: 'ASML NXT:2050i 机台大修后 Buyoff 良率验证流程',
    description: '机台 #NXT-2050i 完成镜桶除尘及激光器模组更换，需执行复产 buyoff 流程。',
    category: '复产验证',
    status: 'pending',
    priority: 'high',
    sourceSystem: 'buyoff流程',
    dueDate: '2026-06-12',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '机台停机每小时损失巨大，需尽快完成良率释放。',
    actionSteps: [
      { id: 'zj6-1', text: '核对复产首批测试片(Monitor Wafer)良率参数', completed: true },
      { id: 'zj6-2', text: '对比大修前后的套刻精度(Overlay)趋势图', completed: false }
    ],
    workflow: {
      systemName: 'buyoff流程',
      currentStepIndex: 3,
      steps: [
        { index: 1, name: '工程师判断buyoff内容合理性', handler: '张静 (后线工程师)' },
        { index: 2, name: '带班执行buyoff', handler: '指定带班' },
        { index: 3, name: '工程师判断buyoff结果', handler: '张静 (后线工程师)' },
        { index: 4, name: '带班按需处理物料', handler: '指定带班' },
        { index: 5, name: '工程师追溯物料数据', handler: '指定产品工程师' }
      ]
    }
  },
  {
    id: 'task-zl-3',
    title: 'Photo-E11 显影后关键尺寸(CD)稳定性 2 代深度分析工作流',
    description: '通过 2 代分析系统对近期显影后 CD 波动进行建模分析。需确认分析结果是否满足量产工艺宽容度。',
    category: '技术优化',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '2代分析系统',
    dueDate: '2026-06-14',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 赵磊',
    urgencyExplanation: '为后续工艺规格收窄提供数据支撑。',
    actionSteps: [
      { id: 'zl3-1', text: '拉取近 7 天显影后 CD 原始数据', completed: true },
      { id: 'zl3-2', text: '在 2 代分析系统中上传数据并生成反馈分析报告', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '赵磊 (后线工程师)' },
        { index: 2, name: '发起人判断结果是否达到预期', handler: '研发发起人' }
      ]
    }
  },
  {
    id: 'task-lm-4',
    title: '区域 A-05 污染判定批次物料报废三级审批',
    description: '由于供酸系统密封圈老化导致的金属离子超标批次，经判定已无回收价值。需启动物料报废流程。',
    category: '报废审批',
    status: 'pending',
    priority: 'high',
    sourceSystem: '物料报废',
    dueDate: '2026-06-12',
    createdDate: '2026-06-12',
    assignee: 'BD经理 - 李明',
    urgencyExplanation: '库存库位积压预警，需尽快释放物理空间。',
    actionSteps: [
      { id: 'lm4-1', text: '核实当班主管提交的污染物含量监测报告', completed: true },
      { id: 'lm4-2', text: '线上签署物料报废最终指令', completed: false }
    ],
    workflow: {
      systemName: '物料报废',
      currentStepIndex: 2,
      steps: [
        { index: 1, name: '当班主管确认', handler: '指定带班 / 发起人' },
        { index: 2, name: '区域主管确认', handler: '李明 (BD经理)' }
      ]
    }
  },
  {
    id: 'task-zj-foup',
    title: 'FOUP #A-9283 自由弹夹使用完毕归还流程',
    description: '工艺 3 组在完成特种光刻胶涂布实验后，需将领用的 5 个 FOUP 晶圆传送盒清理干净并归还至中央库房。',
    category: '资产归还',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '自由弹夹领用',
    dueDate: '2026-06-12',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '确保库房周转率，避免容器短缺影响后续批次。',
    actionSteps: [
      { id: 'foup1-1', text: '确认传送盒内无残余硅片', completed: true },
      { id: 'foup1-2', text: '扫码办理归还登记', completed: false }
    ],
    workflow: {
      systemName: '自由弹夹领用',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '归还', handler: '发起人 (张静)' }
      ]
    }
  },
  {
    id: 'task-zj-7',
    title: 'ASML机台套刻精度漂移 2 代 FA 深度诊断分析',
    description: '通过 2 代分析系统对 Wafer #3928 的套刻偏差进行高维矩阵诊断，排查是否为镜台机械疲劳。',
    category: '技术优化',
    status: 'pending',
    priority: 'high',
    sourceSystem: '2代分析系统',
    dueDate: '2026-06-13',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '定位精度决定了良率，属于工艺红线。',
    actionSteps: [
      { id: 'zj7-1', text: '上传 KLA 电镜扫描切片数据', completed: true },
      { id: 'zj7-2', text: '对比历史模型进行失效预测', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '张静 (后线工程师)' },
        { index: 2, name: '发起人判断结果是否达到预期', handler: '后线工程师' }
      ]
    }
  },
  {
    id: 'task-zj-8',
    title: '光刻胶超期失效 - 区域 B4 报废最终审答',
    description: '一批 JSR 原厂光刻胶由于冷链闪断导致化学特质改变，判定为失效。',
    category: '报废审批',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '物料报废',
    dueDate: '2026-06-14',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '防止失效物料误入生产线造成重大事故。',
    actionSteps: [
      { id: 'zj8-1', text: '核对冷链监控日志。', completed: true },
      { id: 'zj8-2', text: '在系统中点击同意报废审批。', completed: false }
    ],
    workflow: {
      systemName: '物料报废',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '当班主管确认', handler: '张静 (后线工程师)' },
        { index: 2, name: '区域主管确认', handler: '李明' }
      ]
    }
  },
  {
    id: 'task-wf-3',
    title: '高倍电子显微镜(SEM) 跨区域临时调借审批',
    description: '研发一部因 Bumping 工艺验证需求，申请从量产区调借 SEM 设备使用 24 小时。',
    category: '资产调拨',
    status: 'pending',
    priority: 'low',
    sourceSystem: '借还机申请',
    dueDate: '2026-06-13',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 王芳',
    urgencyExplanation: '支持研发进度。',
    actionSteps: [
      { id: 'wf3-1', text: '确认量产线当前机台稼动率。', completed: true },
      { id: 'wf3-2', text: '签署临时调拨许可。', completed: false }
    ],
    workflow: {
      systemName: '借还机申请',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '生产工程师审批', handler: '王芳 (后线工程师)' },
        { index: 2, name: '申请人重新申请', handler: '发起人' },
        { index: 3, name: '操作员确认账料已清空', handler: '操作员' },
        { index: 4, name: '归还设备', handler: '发起人' },
        { index: 5, name: '填写buyoff结果', handler: '发起人' },
        { index: 6, name: '带班确认', handler: '指定带班' }
      ]
    }
  },
  {
    id: 'task-wf-4',
    title: '洁净室环境动力波动 2 代反馈分析',
    description: '监测到 B 区洁净室气压异常波动，需通过 2 代系统汇总过去 48 小时的环境数据并给出反馈结果。',
    category: '环境监控',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '2代分析系统',
    dueDate: '2026-06-12',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 王芳',
    urgencyExplanation: '预防气流乱序导致的颗粒度(Particle)污染。',
    actionSteps: [
      { id: 'wf4-1', text: '提取厂务监控传感器历史数据', completed: true },
      { id: 'wf4-2', text: '在 2 代系统中填写分析响应结果', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '王芳 (后线工程师)' },
        { index: 2, name: '发起人判断结果是否达到预期', handler: '厂务发起人' }
      ]
    }
  },
  {
    id: 'task-zl-4',
    title: 'Nikon S620D 步进式曝光机 - 覆盖率偏移（Overlay Offset）异常诊断',
    description: '异常处理系统-Others 触发警报：B3 区曝光机台在执行 7nm 逻辑芯片对准时，捕捉到非线性热形变偏移。',
    category: '故障警报',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常处理系统-Others',
    dueDate: '2026-06-12',
    createdDate: '2026-06-12',
    assignee: '后线工程师 - 赵磊',
    urgencyExplanation: '形变超标将导致整批晶圆报废，需即刻现场标定。',
    actionSteps: [
      { id: 'zl4-1', text: '检查机台二配管气压实时曲线', completed: true },
      { id: 'zl4-2', text: '校准激光干涉仪零位', completed: false }
    ],
    workflow: {
      systemName: '异常处理系统-Others',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '赵磊 (后线工程师)' },
        { index: 2, name: '发起人判断结果', handler: '工艺发起人' }
      ]
    }
  },
  {
    id: 'task-lm-3',
    title: '2026 Q3 扩产计划 - KLA-Tencor 量测设备借用会签',
    description: 'BD 部门李明需协调 1 台 KLA 测量设备从研发实验室调拨至量产线，支持新加坡车载芯片项目的良率监控。',
    category: '资产调拨',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '借还机申请',
    dueDate: '2026-06-15',
    createdDate: '2026-06-12',
    assignee: 'BD经理 - 李明',
    urgencyExplanation: '扩产计划节点要求，需提前完成设备到位。',
    actionSteps: [
      { id: 'lm3-1', text: '在借还机系统中提交调拨申请单', completed: true },
      { id: 'lm3-2', text: '联系李洁确认机台物流排程', completed: false }
    ],
    workflow: {
      systemName: '借还机申请',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '生产工程师审批', handler: '李明 (BD经理)' },
        { index: 2, name: '申请人重新申请', handler: '发起人' },
        { index: 3, name: '操作员确认账料已清空', handler: '操作员' },
        { index: 4, name: '归还设备', handler: '发起人' },
        { index: 5, name: '填写buyoff结果', handler: '发起人' },
        { index: 6, name: '带班确认', handler: '指定带班' }
      ]
    }
  }
];

export const MESSAGE_TEMPLATES = {
  others_alert: {
    text: `【异常处理系统-Others】厂务二次配管气压报警：检测到B区洁净室动力气压低于标准阈值，需紧急处理并校准站点状态。`,
    sender: `Facility-Others-Robot@fab3.corp.com`,
    system: `异常处理系统-Others`,
    category: `故障警报`,
    priority: `high`
  }
};
