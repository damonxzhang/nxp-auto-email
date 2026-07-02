import { UserProfile, Task } from './types';

export const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'kanghongyue', name: '沈勃', fullName: '部门经理 - 沈勃', role: '晶圆代工量产主管、多级奖励与异常物料会签审批负责人', avatarBg: 'bg-emerald-600 text-white', avatarText: 'KH', managerId: '' },
  { id: 'yanpeng', name: '闫鹏', fullName: '后线工程师 - 闫鹏', role: '廠務工藝保障與化學特氣用料結算工程師', avatarBg: 'bg-indigo-600 text-white', avatarText: 'YP', managerId: 'kanghongyue' },
  { id: 'malei', name: '马磊', fullName: '后线工程师 - 马磊', role: '高精密機台控制與EAP自動化連線研發工程師', avatarBg: 'bg-amber-500 text-slate-900', avatarText: 'ML', managerId: 'kanghongyue' },
  { id: 'sunzhibin', name: '孙志斌', fullName: '后线工程师 - 孙志斌', role: '芯片潔淨室安全防火與EHS環保合規檢測工程師', avatarBg: 'bg-rose-500 text-white', avatarText: 'SZ', managerId: 'kanghongyue' }
];

export const CORPORATE_SYSTEMS = [
  { id: '异常物料处理系统', name: '异常物料处理系统', icon: 'AlertTriangle', theme: 'rose', description: '本系统涵盖异常在制品、原料缺陷拦截、工程师处理、带班按需处置及多级奖励与审批流程' },
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
    description: '异常物料丢失调查：需调阅6月9日工艺3组在此区域的物理操作视频。孙志斌作为安全官需审核该权限申请并签发临时数字凭证。',
    category: '安全合规',
    status: 'pending',
    priority: 'low',
    sourceSystem: '查询录像审批流程',
    dueDate: '2026-06-12',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 孙志斌',
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
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '影响晶圆收率，需尽快修正参数。',
    actionSteps: [
      { id: 'zj5-1', text: '对比历史良率曲线寻找波谷节点', completed: true },
      { id: 'zj5-2', text: '在系统中提交参数偏移补偿申请', completed: false }
    ],
    workflow: {
      systemName: '异常处理系统-Others',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '工程师处理', handler: '闫鹏 (后线工程师)' },
        { index: 2, name: '产线按需进行处理', handler: '指定带班' },
        { index: 3, name: '奖励审批', handler: '沈勃' },
        { index: 4, name: '奖励申诉', handler: '指定带班' },
        { index: 5, name: '再次审批奖励', handler: '沈勃' }
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
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '机台停机每小时损失巨大，需尽快完成良率释放。',
    actionSteps: [
      { id: 'zj6-1', text: '核对复产首批测试片(Monitor Wafer)良率参数', completed: true },
      { id: 'zj6-2', text: '对比大修前后的套刻精度(Overlay)趋势图', completed: false }
    ],
    workflow: {
      systemName: 'buyoff流程',
      currentStepIndex: 3,
      steps: [
        { index: 1, name: '工程师判断buyoff内容合理性', handler: '闫鹏 (后线工程师)' },
        { index: 2, name: '带班执行buyoff', handler: '指定带班' },
        { index: 3, name: '工程师判断buyoff结果', handler: '闫鹏 (后线工程师)' },
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
    assignee: '后线工程师 - 马磊',
    urgencyExplanation: '为后续工艺规格收窄提供数据支撑。',
    actionSteps: [
      { id: 'zl3-1', text: '拉取近 7 天显影后 CD 原始数据', completed: true },
      { id: 'zl3-2', text: '在 2 代分析系统中上传数据并生成反馈分析报告', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '马磊 (后线工程师)' },
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
    assignee: '部门经理 - 沈勃',
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
        { index: 2, name: '区域主管确认', handler: '沈勃 (部门经理)' }
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
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '确保库房周转率，避免容器短缺影响后续批次。',
    actionSteps: [
      { id: 'foup1-1', text: '确认传送盒内无残余硅片', completed: true },
      { id: 'foup1-2', text: '扫码办理归还登记', completed: false }
    ],
    workflow: {
      systemName: '自由弹夹领用',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '归还', handler: '发起人 (闫鹏)' }
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
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '定位精度决定了良率，属于工艺红线。',
    actionSteps: [
      { id: 'zj7-1', text: '上传 KLA 电镜扫描切片数据', completed: true },
      { id: 'zj7-2', text: '对比历史模型进行失效预测', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '闫鹏 (后线工程师)' },
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
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '防止失效物料误入生产线造成重大事故。',
    actionSteps: [
      { id: 'zj8-1', text: '核对冷链监控日志。', completed: true },
      { id: 'zj8-2', text: '在系统中点击同意报废审批。', completed: false }
    ],
    workflow: {
      systemName: '物料报废',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '当班主管确认', handler: '闫鹏 (后线工程师)' },
        { index: 2, name: '区域主管确认', handler: '沈勃' }
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
    assignee: '后线工程师 - 孙志斌',
    urgencyExplanation: '支持研发进度。',
    actionSteps: [
      { id: 'wf3-1', text: '确认量产线当前机台稼动率。', completed: true },
      { id: 'wf3-2', text: '签署临时调拨许可。', completed: false }
    ],
    workflow: {
      systemName: '借还机申请',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '生产工程师审批', handler: '孙志斌 (后线工程师)' },
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
    assignee: '后线工程师 - 孙志斌',
    urgencyExplanation: '预防气流乱序导致的颗粒度(Particle)污染。',
    actionSteps: [
      { id: 'wf4-1', text: '提取厂务监控传感器历史数据', completed: true },
      { id: 'wf4-2', text: '在 2 代系统中填写分析响应结果', completed: false }
    ],
    workflow: {
      systemName: '2代分析系统',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '孙志斌 (后线工程师)' },
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
    assignee: '后线工程师 - 马磊',
    urgencyExplanation: '形变超标将导致整批晶圆报废，需即刻现场标定。',
    actionSteps: [
      { id: 'zl4-1', text: '检查机台二配管气压实时曲线', completed: true },
      { id: 'zl4-2', text: '校准激光干涉仪零位', completed: false }
    ],
    workflow: {
      systemName: '异常处理系统-Others',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '反馈分析、处理结果', handler: '马磊 (后线工程师)' },
        { index: 2, name: '发起人判断结果', handler: '工艺发起人' }
      ]
    }
  },
  {
    id: 'task-lm-3',
    title: '2026 Q3 扩产计划 - KLA-Tencor 量测设备借用会签',
    description: '经理部门沈勃需协调 1 台 KLA 测量设备从研发实验室调拨至量产线，支持新加坡车载芯片项目的良率监控。',
    category: '资产调拨',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '借还机申请',
    dueDate: '2026-06-15',
    createdDate: '2026-06-12',
    assignee: '部门经理 - 沈勃',
    urgencyExplanation: '扩产计划节点要求，需提前完成设备到位。',
    actionSteps: [
      { id: 'lm3-1', text: '在借还机系统中提交调拨申请单', completed: true },
      { id: 'lm3-2', text: '联系李洁确认机台物流排程', completed: false }
    ],
    workflow: {
      systemName: '借还机申请',
      currentStepIndex: 1,
      steps: [
        { index: 1, name: '生产工程师审批', handler: '沈勃 (部门经理)' },
        { index: 2, name: '申请人重新申请', handler: '发起人' },
        { index: 3, name: '操作员确认账料已清空', handler: '操作员' },
        { index: 4, name: '归还设备', handler: '发起人' },
        { index: 5, name: '填写buyoff结果', handler: '发起人' },
        { index: 6, name: '带班确认', handler: '指定带班' }
      ]
    }
  },
  {
    id: 'task-zj-abnormal-1',
    title: '异常物料 - [样例1] Mold 异常物料外来物拦截下的判定与整套流程流转',
    description: '批号: TJPF10BC1060 | 工序: Mold异常物料 | 机台: BMD-17 | pkgType: BGA | pkgCode: 00A9\n发现人刘佳于2026-03-08 13:04:09因人员抽检发现一粒外来物。初步处理人陈鹏飞整批扣留，并在13:07:24移交带班马磊发起并完成100% X-RAY检查（1次品已画已拒，已HOLD）。目前已流调至 3. 工程师给出处理意见 环节。',
    category: '异常物料',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-15',
    createdDate: '2026-03-08',
    receivedDate: '2026-03-08 13:07',
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '产品工艺红线风险，急需产品工程师确定处理意见并提交。',
    actionSteps: [
      { id: 'ab1-1', text: '查验物料物理擦伤和表面污点显微镜图像', completed: true },
      { id: 'ab1-2', text: '在系统中提交处理意见：判定为不放行', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 3,
      steps: [
        { index: 1, name: '发起流程', handler: '马磊' },
        { index: 2, name: '按照需求检查物料', handler: '马磊' },
        { index: 3, name: '工程师给出处理意见', handler: '闫鹏' },
        { index: 4, name: '带班按需处理物料', handler: '马磊' },
        { index: 5, name: '工程师发放奖励', handler: '闫鹏' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10BC1060',
      processName: 'Mold异常物料',
      machineNo: 'BMD-17',
      pkgType: 'BGA',
      pkgCode: '00A9',
      substandardType: '外来物',
      issueNo: '36',
      discoveredBy: '刘佳',
      launchTime: '2026-03-08 13:04:09',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260308-Mold异常物料-BMD-17-TJPF10BC1060-异常次品',
      historyFile: 'c82774503e050603f59b04ce14bdc0f.jpg',
      reason: '人员抽检时发现一粒外来物',
      anomalyCategory: '原材料',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '陈鹏飞',
      teamLeaderActionTime: '2026-03-08 13:07:24',
      step2: {
        substandardTypes: ['外来物', 'N/A', 'N/A'],
        substandardQtys: ['1', 'N/A', 'N/A'],
        actionDesc: '追加此批100%X-RAY，除1粒外来物其它无次品，联系R班工程师1粒次品已画已拒，已HOLD,此批物料放行'
      },
      step3: {
        engineerOpinion: '放行',
        actionOpinion: '整批已xray: 共1粒次品，注意保留次品给闫鹏',
        engineerActionTime: '2026-03-09 10:44:58',
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中'
      },
      step4: {
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中',
        remark: 'N/A',
        teamLeaderActionTime: '2026-03-09 12:29:52'
      },
      step5: {
        isPublic: '未公示',
        qualityRiskLevel: '内部,对客户无质量影响',
        effortLevel: '职能责任内',
        rewardCalc: 'Rank6_10元',
        actionTime: '2026-03-09 13:43:27'
      },
      step6: {
        isModify: '否',
        auditResult: '通过',
        auditTime: '2026-03-09 16:59:49',
        auditReward: 'Rank6_10元'
      },
      step6_appeal: {
        isAppeal: '是',
        appellant: '马磊',
        appealTime: '2026-03-10 17:33:13',
        appealReward: 'Rank3_100元',
        appealReason: '已与R班工程师沟通具体情况，同意申诉请求'
      },
      step7: {
        reAuditResult: '通过',
        reAuditTime: '2026-03-11 09:27:47',
        finalReward: 'Rank3_100元',
        finalAuditResult: '通过'
      }
    }
  },
  {
    id: 'task-zl-abnormal-2',
    title: '异常物料 - [样例2] Saw 晶圆划片机下料散乱异常处置流程',
    description: '批号: TJPF10FNE000 | 工序: Saw | 机台: BSG-29 | pkgType: PQFN | pkgCode: 004S\n发现人王振智于2026-03-13 04:21:13因下料picker故障导致散乱。初步处理人金朋进行整批扣留，并在04:22:34移交带班孙志斌。带班完成100% VM无次品后，已处于 5. 工程师发放奖励 步骤。',
    category: '常规次品',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-20',
    createdDate: '2026-03-13',
    receivedDate: '2026-03-13 04:22',
    assignee: '后线工程师 - 马磊',
    urgencyExplanation: '常规安全合规与质量拦截奖励，需由后线工程师马磊核定发放等级并流转审批。',
    actionSteps: [
      { id: 'ab2-1', text: '核对拦截违规批次和防污染贡献度评分', completed: true },
      { id: 'ab2-2', text: '在线核准奖励包并发起奖金提请', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 5,
      steps: [
        { index: 1, name: '发起流程', handler: '孙志斌' },
        { index: 2, name: '按照需求检查物料', handler: '孙志斌' },
        { index: 3, name: '工程师给出处理意见', handler: '赵建国' },
        { index: 4, name: '带班按需处理物料', handler: '孙志斌' },
        { index: 5, name: '工程师发放奖励', handler: '赵建国' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10FNE000',
      processName: 'Saw',
      machineNo: 'BSG-29',
      pkgType: 'PQFN',
      pkgCode: '004S',
      substandardType: 'N/A',
      issueNo: 'N/A',
      discoveredBy: '王振智',
      launchTime: '2026-03-13 04:21:13',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260313-Saw-BSG-29-TJPF10FNE000-设备问题导致的物料处理',
      historyFile: '29.jpg',
      reason: '因下料picker故障，导致下料散乱。',
      anomalyCategory: '设备问题导致的物料处理',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '金朋',
      teamLeaderActionTime: '2026-03-13 04:22:34',
      step2: {
        substandardTypes: ['N/A', 'N/A', 'N/A'],
        substandardQtys: ['N/A', 'N/A', 'N/A'],
        actionDesc: '已将散乱物料100%vm，无次品，已通知PM。'
      },
      step3: {
        engineerOpinion: '放行',
        actionOpinion: 'N/A',
        engineerActionTime: '2026-03-13 08:02:32',
        isKeepSubstandard: '不保留',
        keepInfo: ''
      },
      step4: {
        isKeepSubstandard: '不保留',
        keepInfo: '',
        remark: 'N/A',
        teamLeaderActionTime: '2026-03-17 10:33:18'
      },
      step5: {
        isPublic: '未公示',
        qualityRiskLevel: '内部,对客户无质量影响',
        effortLevel: '职能责任内',
        rewardCalc: 'Rank6_10元',
        actionTime: '2026-03-17 16:20:49'
      },
      step6: {
        isModify: '否',
        auditResult: '通过',
        auditTime: '2026-03-18 09:04:04',
        auditReward: 'Rank6_10元'
      },
      step6_appeal: {
        isAppeal: '否',
        appellant: '孙志彬',
        appealTime: '2026-03-18 20:52:14',
        appealReward: 'Rank6_10元',
        appealReason: ''
      }
    }
  },
  {
    id: 'task-abnormal-mold-step1',
    title: '异常物料 - [样例1] Mold 外来物拦截 (Step 2 待带班录入检查)',
    description: '批号: TJPF10BC1060 | 工序: Mold异常物料 | 机台: BMD-17\n刘佳于03-08 13:04初检发现一粒外来物。陈鹏飞扣留整批。发起流程马磊已提交，当前节点：2. 按照需求检查物料（待当班带班录入100% X-RAY检验结果数据）。',
    category: '异常物料',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-15',
    createdDate: '2026-03-08',
    receivedDate: '2026-03-08 13:04',
    assignee: '后线工程师 - 闫鹏',
    urgencyExplanation: '在制品拦截初始流转，带班陈鹏飞、马磊正在机台前加急做100% X-RAY全检，请跟进录单。',
    actionSteps: [
      { id: 'ab1-s1-1', text: '协同带班获取100% X-RAY缺陷胶片并督查录单', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 2,
      steps: [
        { index: 1, name: '发起流程', handler: '马磊' },
        { index: 2, name: '按照需求检查物料', handler: '马磊' },
        { index: 3, name: '工程师给出处理意见', handler: '闫鹏' },
        { index: 4, name: '带班按需处理物料', handler: '马磊' },
        { index: 5, name: '工程师发放奖励', handler: '闫鹏' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10BC1060',
      processName: 'Mold异常物料',
      machineNo: 'BMD-17',
      pkgType: 'BGA',
      pkgCode: '00A9',
      substandardType: '外来物',
      issueNo: '36',
      discoveredBy: '刘佳',
      launchTime: '2026-03-08 13:04:09',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260308-Mold异常物料-BMD-17-TJPF10BC1060-异常次品',
      historyFile: 'c82774503e050603f59b04ce14bdc0f.jpg',
      reason: '人员抽检时发现一粒外来物',
      anomalyCategory: '原材料',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '陈鹏飞',
      teamLeaderActionTime: '2026-03-08 13:07:24'
    }
  },
  {
    id: 'task-abnormal-saw-step3',
    title: '异常物料 - [样例2] Saw 划片机下料散乱 (Step 3 待给出处置意见)',
    description: '批号: TJPF10FNE000 | 工序: Saw | 机台: BSG-29\n由于下料picker机械卡阻散片。金朋扣留，带班孙志斌已于04:22完成100% VM目检并宣布全部无次品。当前节点：3. 工程师给出处理意见（等待赵建国或当班代管后线工程师给出处理决定）。',
    category: '常规次品',
    status: 'pending',
    priority: 'medium',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-20',
    createdDate: '2026-03-13',
    receivedDate: '2026-03-13 04:22',
    assignee: '后线工程师 - 马磊',
    urgencyExplanation: '机械散乱可能产生暗裂，请核对VM结果后，批开放行决定或追查硅片参数。',
    actionSteps: [
      { id: 'ab2-s3-1', text: '对比此批号前序工艺裂纹及良率数据', completed: true },
      { id: 'ab2-s3-2', text: '签发工程师处理放行判定书', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 3,
      steps: [
        { index: 1, name: '发起流程', handler: '孙志斌' },
        { index: 2, name: '按照需求检查物料', handler: '孙志斌' },
        { index: 3, name: '工程师给出处理意见', handler: '赵建国' },
        { index: 4, name: '带班按需处理物料', handler: '孙志斌' },
        { index: 5, name: '工程师发放奖励', handler: '赵建国' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10FNE000',
      processName: 'Saw',
      machineNo: 'BSG-29',
      pkgType: 'PQFN',
      pkgCode: '004S',
      substandardType: 'N/A',
      issueNo: 'N/A',
      discoveredBy: '王振智',
      launchTime: '2026-03-13 04:21:13',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260313-Saw-BSG-29-TJPF10FNE000-设备问题导致的物料处理',
      historyFile: '29.jpg',
      reason: '因下料picker故障，导致下料散乱。',
      anomalyCategory: '设备问题导致的物料处理',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '金朋',
      teamLeaderActionTime: '2026-03-13 04:22:34',
      step2: {
        substandardTypes: ['N/A', 'N/A', 'N/A'],
        substandardQtys: ['N/A', 'N/A', 'N/A'],
        actionDesc: '已将散乱物料100%vm，无次品，已通知PM。'
      }
    }
  },
  {
    id: 'task-abnormal-mold-step6',
    title: '异常物料 - [样例1] Mold 外来物拦截 (Step 6 待负责人奖励审批)',
    description: '批号: TJPF10BC1060 | 工程师闫鹏已下达处理意见及后续带班跟进。工程师于03-09 13:43提报了Rank6 10元奖金包提请。当前节点：6. 奖励审批（待会签负责人沈勃点击审批通过或修改等级）。',
    category: '异常物料',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-15',
    createdDate: '2026-03-08',
    receivedDate: '2026-03-09 13:43',
    assignee: '部门经理 - 沈勃',
    urgencyExplanation: '奖励包在等沈勃会签批复，请主管沈勃率先查验该外来物拦截有无规避大宗良率滑坡风险。',
    actionSteps: [
      { id: 'ab1-s6-1', text: '点击核对10元奖励提款工单、风险评定及努力程度', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 6,
      steps: [
        { index: 1, name: '发起流程', handler: '马磊' },
        { index: 2, name: '按照需求检查物料', handler: '马磊' },
        { index: 3, name: '工程师给出处理意见', handler: '闫鹏' },
        { index: 4, name: '带班按需处理物料', handler: '马磊' },
        { index: 5, name: '工程师发放奖励', handler: '闫鹏' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10BC1060',
      processName: 'Mold异常物料',
      machineNo: 'BMD-17',
      pkgType: 'BGA',
      pkgCode: '00A9',
      substandardType: '外来物',
      issueNo: '36',
      discoveredBy: '刘佳',
      launchTime: '2026-03-08 13:04:09',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260308-Mold异常物料-BMD-17-TJPF10BC1060-异常次品',
      historyFile: 'c82774503e050603f59b04ce14bdc0f.jpg',
      reason: '人员抽检时发现一粒外来物',
      anomalyCategory: '原材料',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '陈鹏飞',
      teamLeaderActionTime: '2026-03-08 13:07:24',
      step2: {
        substandardTypes: ['外来物', 'N/A', 'N/A'],
        substandardQtys: ['1', 'N/A', 'N/A'],
        actionDesc: '追加此批100%X-RAY，除1粒外来物其它无次品，联系R班工程师1粒次品已画已拒，已HOLD,此批物料放行'
      },
      step3: {
        engineerOpinion: '放行',
        actionOpinion: '整批已xray: 共1粒次品，注意保留次品给闫鹏',
        engineerActionTime: '2026-03-09 10:44:58',
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中'
      },
      step4: {
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中',
        remark: 'N/A',
        teamLeaderActionTime: '2026-03-09 12:29:52'
      },
      step5: {
        isPublic: '未公示',
        qualityRiskLevel: '内部,对客户无质量影响',
        effortLevel: '职能责任内',
        rewardCalc: 'Rank6_10元',
        actionTime: '2026-03-09 13:43:27'
      }
    }
  },
  {
    id: 'task-abnormal-mold-step7',
    title: '异常物料 - [样例1] Mold 外来物拦截 (Step 7 申诉待终审定案)',
    description: '批号: TJPF10BC1060 | 带班马磊已于03-10提交100元(Rank3)申诉请求，主张在制品工艺漏网风险已有效防御，应属于高额专项奖。当前节点：7. 再次审批（等待高管沈勃核实、驳回或终审裁决定案）。',
    category: '异常物料',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-03-15',
    createdDate: '2026-03-08',
    receivedDate: '2026-03-10 17:33',
    assignee: '后线工程师 - 孙志斌',
    urgencyExplanation: '申诉期最终会签审批由沈勃主审（此任务由孙志斌代管协助物料归档），需查看申诉理由确定方案。',
    actionSteps: [
      { id: 'ab1-s7-1', text: '查验马磊提交的申诉佐证、工程师会签支持意见', completed: true },
      { id: 'ab1-s7-2', text: '在系统中点击提交同意其100元终审定案', completed: false }
    ],
    workflow: {
      systemName: '异常物料处理系统',
      currentStepIndex: 7,
      steps: [
        { index: 1, name: '发起流程', handler: '马磊' },
        { index: 2, name: '按照需求检查物料', handler: '马磊' },
        { index: 3, name: '工程师给出处理意见', handler: '闫鹏' },
        { index: 4, name: '带班按需处理物料', handler: '马磊' },
        { index: 5, name: '工程师发放奖励', handler: '闫鹏' },
        { index: 6, name: '奖励审批', handler: '沈勃' },
        { index: 7, name: '再次审批奖励', handler: '沈勃' }
      ]
    },
    materialAbnormalDetail: {
      lotNo: 'TJPF10BC1060',
      processName: 'Mold异常物料',
      machineNo: 'BMD-17',
      pkgType: 'BGA',
      pkgCode: '00A9',
      substandardType: '外来物',
      issueNo: '36',
      discoveredBy: '刘佳',
      launchTime: '2026-03-08 13:04:09',
      fiveMOneE: 'Machine(设备)',
      filePath: '\\\\10.192.144.74\\personal\\Fan Yaocheng\\异常物料处理记录/20260308-Mold异常物料-BMD-17-TJPF10BC1060-异常次品',
      historyFile: 'c82774503e050603f59b04ce14bdc0f.jpg',
      reason: '人员抽检时发现一粒外来物',
      anomalyCategory: '原材料',
      initialActionDesc: '整批扣留，联系相关工程师',
      initialActionBy: '陈鹏飞',
      teamLeaderActionTime: '2026-03-08 13:07:24',
      step2: {
        substandardTypes: ['外来物', 'N/A', 'N/A'],
        substandardQtys: ['1', 'N/A', 'N/A'],
        actionDesc: '追加此批100%X-RAY，除1粒外来物其它无次品，联系R班工程师1粒次品已画已拒，已HOLD,此批物料放行'
      },
      step3: {
        engineerOpinion: '放行',
        actionOpinion: '整批已xray: 共1粒次品，注意保留次品给闫鹏',
        engineerActionTime: '2026-03-09 10:44:58',
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中'
      },
      step4: {
        isKeepSubstandard: '保留',
        keepInfo: '次品放入相应工程师次品箱中',
        remark: 'N/A',
        teamLeaderActionTime: '2026-03-09 12:29:52'
      },
      step5: {
        isPublic: '未公示',
        qualityRiskLevel: '内部,对客户无质量影响',
        effortLevel: '职能责任内',
        rewardCalc: 'Rank6_10元',
        actionTime: '2026-03-09 13:43:27'
      },
      step6: {
        isModify: '否',
        auditResult: '通过',
        auditTime: '2026-03-09 16:59:49',
        auditReward: 'Rank6_10元'
      },
      step6_appeal: {
        isAppeal: '是',
        appellant: '马磊',
        appealTime: '2026-03-10 17:33:13',
        appealReward: 'Rank3_100元',
        appealReason: '已与R班工程师沟通具体情况，同意申诉请求'
      }
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
  },
  abnormal_material_alert: {
    text: `【异常物料处理系统】检测到 A3 生产线清洗用超纯特种物料被混入异常杂质微粒，带班已紧急发起拦截。请产品工程师立即介入会签，给出专业处理意见！`,
    sender: `Material-Monitor@fab3.corp.com`,
    system: `异常物料处理系统`,
    category: `故障警报`,
    priority: `high`
  }
};
