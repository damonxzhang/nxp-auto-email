import { UserProfile, Task } from './types';

export const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'liming', name: '李明', fullName: 'BD经理 - 李明', role: '晶圆代工量产与大客户投片拓展BD经理', avatarBg: 'bg-emerald-600 text-white', avatarText: 'LM', managerId: '' },
  { id: 'zhangjing', name: '张静', fullName: '后线工程师 - 张静', role: '廠務工藝保障與化學特氣用料結算工程師', avatarBg: 'bg-indigo-600 text-white', avatarText: 'ZJ', managerId: 'liming' },
  { id: 'zhaolei', name: '赵磊', fullName: '后线工程师 - 赵磊', role: '高精密機台控制與EAP自動化連線研發工程師', avatarBg: 'bg-amber-500 text-slate-900', avatarText: 'ZL', managerId: 'liming' },
  { id: 'wangfang', name: '王芳', fullName: '后线工程师 - 王芳', role: '芯片潔淨室安全防火與EHS環保合規檢測工程師', avatarBg: 'bg-rose-500 text-white', avatarText: 'WF', managerId: 'liming' }
];

export const CORPORATE_SYSTEMS = [
  { id: 'MES系统', name: 'MES系统 (先进制程调度)', icon: 'Cpu', theme: 'indigo', description: '微米及纳米级高精度生产排程流片控制与加急工艺加塞调度系统' },
  { id: 'OA系统', name: 'OA系统 (日常行政审批)', icon: 'Inbox', theme: 'purple', description: '日常商务款额审批、进口机台稼动小时申报、外协采购及款批签单' },
  { id: 'WMS系统', name: 'WMS系统 (高危危化仓储)', icon: 'Box', theme: 'emerald', description: '剧毒高氟酸、低温敏感光刻胶等高敏危化物资消耗申报与闭环监管' },
  { id: 'EAP系统', name: 'EAP系统 (装备自愈控制)', icon: 'RefreshCw', theme: 'rose', description: 'ASML曝光机微压自锁拦截、气动连锁触发、SECS/GEM主控制总阀微调系统' },
  { id: 'SPC系统', name: 'SPC系统 (制程质量看板)', icon: 'TrendingUp', theme: 'amber', description: '高负荷硅片膜厚分析仪、线宽CD超差拦截与SPC图表偏差限制' },
  { id: '异常物料处理系统', name: '异常物料处理系统', icon: 'AlertTriangle', theme: 'rose', description: '先进制程晶圆缺陷与异常物料追溯拦截、MRB节点控制与审签判定' },
  { id: '异常处理系统-Others', name: '异常处理系统-Others', icon: 'HelpCircle', theme: 'amber', description: '厂务二次配管、气室动力、水电气运行环境辅助非标站点异常应急与自愈校验' },
  { id: '查询录像审批流程', name: '查询录像审批流程', icon: 'Video', theme: 'sky', description: '洁净操作车间、高精ASML曝光区物理监控视频授权调阅与安全凭证流程审批' },
  { id: '借还机申请', name: '借还机申请', icon: 'RefreshCw', theme: 'indigo', description: '高精密量测探仪、装配机件及厂务备品零配件短期调借、流转借还结算' },
  { id: 'buyoff流程', name: 'buyoff流程', icon: 'ShieldCheck', theme: 'emerald', description: '机台复产/大修后产品质量批复流程、失控规则在控校验良率释放判定' },
  { id: '2代分析系统', name: '2代分析系统', icon: 'Cpu', theme: 'purple', description: '失效分析(FA)、KLA电镜高维切片精密检测监控良率高维矩阵诊断' },
  { id: '物料报废', name: '物料报废', icon: 'Trash2', theme: 'teal', description: '高危化学物资、失效特种敏感耗料EHS环保等保合规离线销账安全报废申报' },
  { id: '自由弹夹领用', name: '自由弹夹领用', icon: 'Box', theme: 'indigo', description: 'FOUP晶圆密封隔离传送盒、极净容器自由周转领用去向登记追踪' },
];

export const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-lm-1',
    title: '新加坡Fabless高端车载SoC芯片追加首批3.5万片晶圆流片容量协调',
    description: '大客户追加车载高端流片工单并要求12nm制程特急加塞流转，需独占光刻高精密对准线。BD经理李明需协调洁净室产能并向工艺班组呈报核可。',
    category: '订单协调',
    status: 'pending',
    priority: 'high',
    sourceSystem: 'MES系统',
    dueDate: '2026-06-10',
    createdDate: '2026-06-09',
    assignee: 'BD经理 - 李明',
    urgencyExplanation: '车载芯片关系重大整车订单交付保障与全年晶圆线稼动率指标，定为高急Hot Run。',
    actionSteps: [
      { id: 'lm1-1', text: '登录异常物料处理系统，评估下月高精度曝光与刻蚀多层 slots 空闲量', completed: true },
      { id: 'lm1-2', text: '在物料控制排程中将该批次晶圆(Wafer Lot)设定为超高优特运行序列', completed: false },
      { id: 'lm1-3', text: '与新加坡大客户技术组对接曝光干涉套刻精度补偿甘特图细节', completed: false }
    ]
  },
  {
    id: 'task-lm-2',
    title: 'ASML 浸没式 DUV 双工件台光刻机原厂零配件精密维保款项呈批案',
    description: '设备维保单号#FAB-7402：ASML先进光刻机（Twinscan NXT）由于连续运作套刻精度产生轻微漂移，需原厂高精密零件干涉仪和光学单元精密维护扣备，费用款额 9.8 万元，需部门签章。',
    category: '物料采购',
    status: 'pending',
    priority: 'medium',
    sourceSystem: 'OA系统',
    dueDate: '2026-06-13',
    createdDate: '2026-06-11',
    assignee: 'BD经理 - 李明',
    urgencyExplanation: '保障光刻段不发生重大硅片失常或精度故障导致线体停机，属于设备高优维护。',
    actionSteps: [
      { id: 'lm2-1', text: '向工厂副总报告维保需求并加盖部门预算外加急备用款审签单', completed: false },
      { id: 'lm2-2', text: '与ASML深圳或上海客服工程师就流转光路及镜桶除微尘工序对齐交期', completed: false }
    ]
  },
  {
    id: 'task-zj-1',
    title: '高密度车间ASML曝光段硅片加塞流片工艺会签案',
    description: '曝光间加温加敏对准气力补偿案：由于车载芯片加急投片高负荷导致涂布环境气能波动，需通过MES及OA系统加急会签首期氮气与二氧化氮阀门压力调整，核准温湿度连锁释放。',
    category: '订单协调',
    status: 'pending',
    priority: 'high',
    sourceSystem: 'MES系统',
    dueDate: '2026-06-12',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '属于特急生产红线特耗，一旦断供将导致千万元级别涂布原料报废，张静需与李明联合签署。',
    actionSteps: [
      { id: 'zj1-1', text: '确认高超额度辅助环境和气体配管的用资水位', completed: true },
      { id: 'zj1-2', text: '协同李明，针对厂务非标站点二级配管进行泄压气阀联动状态测通', completed: false }
    ]
  },
  {
    id: 'task-zj-2',
    title: '低敏光刻胶低温冷链专用恒敏氮气大额付款应急追加',
    description: '原装昭和电工超纯气体采购审批：特种配管消耗指标突破上限，需进入WMS系统做大额资金调拨申请（25万元），从而紧急追加配用气罐以解高超CD形变隐患。',
    category: '大额审批',
    status: 'pending',
    priority: 'high',
    sourceSystem: 'WMS系统',
    dueDate: '2026-06-11',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '原料供应商信用保障，需张静进入高密终端调取报退账COA并直接强制录调销账。',
    actionSteps: [
      { id: 'zj2-1', text: '调取到港特种气体仓库扫码信息、分析出入库台账', completed: false },
      { id: 'zj2-2', text: '与财务外汇付讫底账做差异核准并线上对账销项', completed: false }
    ]
  },
  {
    id: 'task-zj-4',
    title: '晶圆Wafer#3202曝光对准超阈值形变硬拦截与异常放行鉴定',
    description: '由于洁净间换气震荡，首批3202槽位发生了0.02nm微区位移漂移。需在“异常物料处理系统”下发MRB阻断，并进行专家人工干涉比对，确定套刻修正补偿参数后方可恢复过站。',
    category: '故障警报',
    status: 'pending',
    priority: 'high',
    sourceSystem: '异常物料处理系统',
    dueDate: '2026-06-12',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 张静',
    urgencyExplanation: '高优批次，处于热流生产卡点。',
    actionSteps: [
      { id: 'zj4-1', text: '进入缺陷定位图库，拉取形变测定红线范围', completed: true },
      { id: 'zj4-2', text: '调用ASML补偿软件做离线形变模拟回归并在异常系统签批放行', completed: false }
    ]
  },
  {
    id: 'task-zl-1',
    title: 'EAP自愈协议闪断告警 - ASML#03机台SecsGem证书失效',
    description: '自动监控中心发现03号机台由于网络抖动引发协议证书握手失败，导致生产配方无法自动下发。赵磊需进入系统手动重新导入安全令牌并校验连通性。',
    category: '故障警报',
    status: 'pending',
    priority: 'high',
    sourceSystem: 'EAP系统',
    dueDate: '2026-06-11',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 赵磊',
    urgencyExplanation: '证书失效会导致全线机台锁定，必须立即处理。',
    actionSteps: [
      { id: 'zl1-1', text: '重置机台EAP网关进程', completed: true },
      { id: 'zl1-2', text: '在EAP证书管理中心重新下发由ASML原厂核审的RSA令牌', completed: false }
    ]
  },
  {
    id: 'task-wf-1',
    title: 'EHS剧毒氟氢酸刻蚀间气阀异常排查与合规自检',
    description: '季度环境安全自查：检测到高危物料仓储区3号传感器水位波动，王芳需核实是否存在微量泄露风险，并填写安信合规日志归档。',
    category: '安全合规',
    status: 'pending',
    priority: 'medium',
    sourceSystem: 'WMS系统',
    dueDate: '2026-06-15',
    createdDate: '2026-06-11',
    assignee: '后线工程师 - 王芳',
    urgencyExplanation: '合规性检查，预防性维护。',
    actionSteps: [
      { id: 'wf1-1', text: '调取传感器过去24小时运行图表', completed: false },
      { id: 'wf1-2', text: '实地录像查核阀门气闭状态', completed: false }
    ]
  },
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
    ]
  }
];

export const MESSAGE_TEMPLATES = {
  oom_crash: {
    text: `【EAP机台重大异常警报】ASML浸没曝光机（Twinscan NXT）于13:40突发SECS协议闪闪断连, 工艺配方(Recipe)下发校验失败, 造成在线精密晶圆(Wafer Lot)阻滞停机。请后线机控工程师赵磊火速跟进自愈重拨证书, 1小时内复绿！`,
    sender: `ASML-NXT-Detector@fab3.corp.com`,
    system: `EAP系统`,
    category: `故障警报`,
    priority: `high`
  },
  audit_approval: {
    text: `【WMS大额审批流程催办】流程号#WMS-7492：曝光间高敏光刻胶低温冷链配套恒温高压氮气瓶由于投片追加超载，警戒红线剧降，需追加限额25万元资金订购，急需厂务保障专家张静今天下午核准签批！`,
    sender: `WMS-Inventory-Robot@fab3.corp.com`,
    system: `WMS系统`,
    category: `大额审批`,
    priority: `high`
  },
  ticket_error: {
    text: `【MES车载芯片加急排程单】大客户新加坡车载片追加首期3.5万片投产(Lot), 要求抢占ASML光刻极速套刻曝光Slots槽位。急调BD总监李明核对晶圆首批流片排程以及洁净室备件承载度方案！`,
    sender: `MES-Plan-Dispatcher@fab3.corp.com`,
    system: `MES系统`,
    category: `订单协调`,
    priority: `high`
  },
  threat_alert: {
    text: `【EHS剧毒氟氢酸环控红线自查函】国家安信总办环保协查明令：请环保合规官王芳主领，运维专家李明和耗料组张静配合，火速汇总拉取等离子刻蚀气阀和溢漫池自动切断故障日志及危险品量化清单！`,
    sender: `EHS-Gov-Safety@gov.cn`,
    system: `WMS系统`,
    category: `安全合规`,
    priority: `high`
  }
};
