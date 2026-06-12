import React, { useState, useEffect, useMemo } from 'react';
import { Task, ActionStep, TaskStatus } from './types';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckSquare, 
  Square, 
  User, 
  Mail, 
  Plus, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Loader2,
  Trash2,
  Calendar,
  ClipboardCheck,
  Bell,
  Hourglass,
  Sparkles,
  Inbox,
  Workflow,
  Search,
  Filter,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  ChevronDown,
  Users,
  AlertTriangle,
  Video,
  RefreshCw,
  TrendingUp,
  Box
} from 'lucide-react';

// Profile representations for simulation
interface UserProfile {
  id: string;
  name: string;
  fullName: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  managerId?: string; // Reports to a manager
}

export default function App() {
  // Profiles for logged-in simulation (Each user sees their own task list from multiple systems)
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('smart_tasks_profiles_v4');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'liming', name: '李明', fullName: 'BD经理 - 李明', role: '晶圆代工量产与大客户投片拓展BD经理', avatarBg: 'bg-emerald-600 text-white', avatarText: 'LM', managerId: '' },
      { id: 'zhangjing', name: '张静', fullName: '后线工程师 - 张静', role: '厂务工艺保障与化学特气用料结算工程师', avatarBg: 'bg-indigo-600 text-white', avatarText: 'ZJ', managerId: 'liming' },
      { id: 'zhaolei', name: '赵磊', fullName: '后线工程师 - 赵磊', role: '高精密机台控制与EAP自动化连线研发工程师', avatarBg: 'bg-amber-500 text-slate-900', avatarText: 'ZL', managerId: 'liming' },
      { id: 'wangfang', name: '王芳', fullName: '后线工程师 - 王芳', role: '芯片洁净室安全防火与EHS环保合规检测工程师', avatarBg: 'bg-rose-500 text-white', avatarText: 'WF', managerId: 'liming' }
    ];
  });

  const defaultTasks: Task[] = [
    // === 李明 (BD拓展组) ===
    {
      id: 'task-lm-1',
      title: '新加坡Fabless高端车载SoC芯片追加首批3.5万片晶圆流片容量协调',
      description: '大客户追加车载高端流片工单并要求12nm制程特急加塞流转，需独占光刻高精密对准线。BD经理李明需协调洁净室产能并向工艺班组呈报核可。',
      category: '订单协调',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'MES系统',
      dueDate: '2026-06-10', // Overdue
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
    // === 张静 (厂务与特气材料 - 5项高拟真假数据) ===
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
      id: 'task-zj-3',
      title: '进口先进制程高端机台运转小时海关合规自查填报',
      description: '海关综保区复核自检：本季度开始，需在OA系统完备高精量测机台、大修复产机台的运行个小时数据统计申报。需录入精密光刻、微区刻蚀时数。',
      category: '安全合规',
      status: 'pending',
      priority: 'low',
      sourceSystem: 'OA系统',
      dueDate: '2026-06-17',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 张静',
      urgencyExplanation: '国家部委合规自查，不涉及实时生产停工。',
      actionSteps: [
        { id: 'zj3-1', text: '从Buyoff审签大厅拉取机台良率校验时段数据', completed: false },
        { id: 'zj3-2', text: '汇编机器完备清单及关税辅助自报台账进行备案', completed: false }
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
      id: 'task-zj-5',
      title: '高敏高精外协探针仪临时调拨申请流转',
      description: '应一期良率攻关小组特急申请，由于现有阻温探头校验超差，需调用借还机申请，调借原厂探针仪两台（调入一期302操作间），张静需审核领用。',
      category: '大额审批',
      status: 'pending',
      priority: 'medium',
      sourceSystem: '借还机申请',
      dueDate: '2026-06-14',
      createdDate: '2026-06-12',
      assignee: '后线工程师 - 张静',
      urgencyExplanation: '攻关一期良率死锁急耗备品硬件。',
      actionSteps: [
        { id: 'zj5-1', text: '在系统中核实空闲物资并在短期调拨单栏加盖电子签章', completed: false }
      ]
    },
    // === 赵磊 (EAP/MES连线及机控 - 5项高拟真假数据) ===
    {
      id: 'task-zl-1',
      title: '晶圆切片电镜图像包加载会话中断及KLA高阶诊断沙盒鉴权复原',
      description: '高维分析故障：2代失效分析系统(FA)图像传感器在多层切片时溢出，分析引擎抛出Socket通信超帧异常导致连带断拨。赵磊需跟进EAP重试 and 算法加固。',
      category: '故障警报',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'EAP系统',
      dueDate: '2026-06-11',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 赵磊',
      urgencyExplanation: '分析超时会堆积良率阻尼锁释放，必须两小时内更新分析算法高阶鉴权复原。',
      actionSteps: [
        { id: 'zl1-1', text: '获取2代分析系统主日志，搜寻高维切片图像传输超时', completed: true },
        { id: 'zl1-2', text: '在机台限流网关注入解挂脚本，使测试界面恢复', completed: false }
      ]
    },
    {
      id: 'task-zl-2',
      title: '膜厚分析仪高密度图像JVM堆栈溢出(OOM)截流降采样保护排查',
      description: 'SPC系统高负荷告警：由于Wafer采集点从50批次突破至2万点，单点物理测算数据包大于7.2G，触发SPC崩溃。赵磊需对前台大数据图表作过滤页限制。',
      category: '设备警报',
      status: 'pending',
      priority: 'medium',
      sourceSystem: 'SPC系统',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 赵磊',
      urgencyExplanation: '若不截流，会导致SPC控制看板数据脱节，进而可能漏放重大晶圆缺陷成片，属于高质控风险。',
      actionSteps: [
        { id: 'zl2-1', text: '修改后台图像缓冲处理算法，按页式切片载入并降采样配置', completed: false }
      ]
    },
    {
      id: 'task-zl-3',
      title: '晶圆表面非晶化形貌高维对比系统崩溃调试',
      description: '2代分析系统核心算法溢出：由于电镜三阶成像分析并发率飙升，造成高维矩阵模型对比队列死锁崩塌。赵磊需修改线程池池容。',
      category: '故障警报',
      status: 'pending',
      priority: 'high',
      sourceSystem: '2代分析系统',
      dueDate: '2026-06-13',
      createdDate: '2026-06-12',
      assignee: '后线工程师 - 赵磊',
      urgencyExplanation: '此为良率高阶诊断卡点，直接卡断诊断流转. ',
      actionSteps: [
        { id: 'zl3-1', text: '拉取物理多核占用数据，限制计算深度层数并调增JVM堆容', completed: false }
      ]
    },
    {
      id: 'task-zl-4',
      title: 'ASML对准曝光机维保后自愈诊断及buyoff良率释放判定审批',
      description: '大修复产签发：Twinscan光刻双台由ASML原厂工程师重置干涉镜后，首批质谱切片对套精度已测试连放，需登录buyoff流程，由赵磊填报机控复位在控判定。',
      category: '安全合规',
      status: 'pending',
      priority: 'medium',
      sourceSystem: 'buyoff流程',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 赵磊',
      urgencyExplanation: '释放后便可重新开工车载流片批。',
      actionSteps: [
        { id: 'zl4-1', text: '核对工艺配方与机器物理锁校验码一致性，在签批处点击全通签字', completed: false }
      ]
    },
    {
      id: 'task-zl-5',
      title: 'FOUP传送密封隔离盒智能密封弹扣领出去向登记',
      description: '极净弹弹夹周转跟单：由于微颗粒漏风导致首台周转密封盒故障，需在“自由弹夹领用”中领用新型隔离卡扣2组装配，赵磊受托录入流向及登记。',
      category: '大额审批',
      status: 'pending',
      priority: 'low',
      sourceSystem: '自由弹夹领用',
      dueDate: '2026-06-15',
      createdDate: '2026-06-12',
      assignee: '后线工程师 - 赵磊',
      urgencyExplanation: '保障封舱级流片周转，降低防爆颗粒损漏。',
      actionSteps: [
        { id: 'zl5-1', text: '扫描新型容器底部RFID防伪码，跟单登记流向下属工作组', completed: false }
      ]
    },
    // === 王芳 (安全、洁净室环保EHS - 5项高拟真假数据) ===
    {
      id: 'task-wf-1',
      title: '剧毒高氟酸全周期危化物资耗销异常安环一键签报案',
      description: '危化环保红线审核：等离子刻蚀一期备品氟氢酸消耗达到高压力预定值。王芳需审核并填报WMS废酸防漫池完整性及常闭异常断流网阀巡检报告。',
      category: '安全合规',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'WMS系统',
      dueDate: '2026-06-13',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 王芳',
      urgencyExplanation: '本市危化局环保严禁盲区。如果不通过，则面临停炉整改风险。',
      actionSteps: [
        { id: 'wf1-1', text: '索取等离子刻蚀防溢泄漏物理警报系统测试正常台账', completed: true },
        { id: 'wf1-2', text: '统编本季度危化安全防范合规案，签发入档', completed: false }
      ]
    },
    {
      id: 'task-wf-2',
      title: '百级/超百级纯净光刻操作间启用防微尘汗粒子刷卡推行案',
      description: '等保物理加强实施：一、二期最高机台曝光洁净室在人脸外加推RFID两步碰卡。高规格洗消和高纯环境风淋强制验证方案，需芳姐在MES系统落章。',
      category: '安全合规',
      status: 'pending',
      priority: 'medium',
      sourceSystem: 'MES系统',
      dueDate: '2026-06-15',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 王芳',
      urgencyExplanation: '套刻纯净度保障的常设条例。',
      actionSteps: [
        { id: 'wf2-1', text: '校准防静电RFID频段防屏蔽抗干扰波幅', completed: false }
      ]
    },
    {
      id: 'task-wf-3',
      title: '高压爆燃监测气路自动断气自锁报警研判排查',
      description: '光刻供气气路误判自锁分析：气路压震异常，气阀触动自动断泄防事故连锁，王芳需协同李明分析在EAP系统中排除机台自锁并查证感温探头。',
      category: '故障警报',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'EAP系统',
      dueDate: '2026-06-11',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 王芳',
      urgencyExplanation: '易燃气泄火关系到全厂生命和财产安全。',
      actionSteps: [
        { id: 'wf3-1', text: '剔除气路监测机台误报警数据源，在EAP降噪测试并关闭连锁', completed: false }
      ]
    },
    {
      id: 'task-wf-4',
      title: '退役高毒过期三氟化氮清洗液绿色无害化物理报废一键签呈',
      description: '化学原料无害销账：存放于南区3号防爆库的一批高特气低温氟化物已过极敏期，需通过物料报废，走EHS正规危化销毁流程。',
      category: '安全合规',
      status: 'pending',
      priority: 'high',
      sourceSystem: '物料报废',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '后线工程师 - 王芳',
      urgencyExplanation: '环保督查自检红线事项。',
      actionSteps: [
        { id: 'wf4-1', text: '核对特气桶重和销毁清单签名，并在后台提交海关和环保联动核销', completed: false }
      ]
    },
    {
      id: 'task-wf-5',
      title: '防静风淋区气闸压差异常震荡24小时视频查调申请审签',
      description: '物理安防审签：本月中，二期特高压洁净走廊第3泄气阀探头频繁抖动。由于怀疑有工友未按风淋门禁规范误入特区，需启用查询录像审批流程，授权芳姐调查调阅该走廊昨晚22时至今日凌晨录像。',
      category: '大额审批',
      status: 'pending',
      priority: 'medium',
      sourceSystem: '查询录像审批流程',
      dueDate: '2026-06-14',
      createdDate: '2026-06-12',
      assignee: '后线工程师 - 王芳',
      urgencyExplanation: '先进制程高规格禁区物理防护排查。',
      actionSteps: [
        { id: 'wf5-1', text: '在系统中下发摄像头MAC指指认和面部时间检索授权，呈工厂值班长签阅', completed: false }
      ]
    }
  ];

  // States
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('smart_tasks_current_user_id');
    return saved || 'liming';
  });

  const currentUser = useMemo(() => {
    return profiles.find(p => p.id === currentUserId) || profiles[0];
  }, [profiles, currentUserId]);

  const setCurrentUser = (profile: UserProfile) => {
    setCurrentUserId(profile.id);
    localStorage.setItem('smart_tasks_current_user_id', profile.id);
  };

  const [selectedSubordinateFilterId, setSelectedSubordinateFilterId] = useState<string | null>(null);
  const [activeSystemMenu, setActiveSystemMenu] = useState<{ userId: string; systemId: string } | null>(null);

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveSystemMenu(null);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const [dashboardTab, setDashboardTab] = useState<'analytics' | 'hierarchy'>('analytics');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('smart_tasks_v6');
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  // Track if users are on vacation/away (true) or on duty (false, default)
  const [userStatusMap, setUserStatusMap] = useState<Record<string, { isVacation: boolean }>>(() => {
    const saved = localStorage.getItem('smart_tasks_duty_status');
    if (saved) return JSON.parse(saved);
    return {
      liming: { isVacation: false },
      zhangjing: { isVacation: false },
      zhaolei: { isVacation: false },
      wangfang: { isVacation: false }
    };
  });

  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>('all'); // Tab or Card Click filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null); // Detail modal anchor
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'sandbox'>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<Array<{ time: string; type: 'info' | 'success' | 'warn' | 'error'; message: string }>>([
    { time: '14:20:11', type: 'info', message: '💡 芯片Fab制造自愈系统 SECS/GEM 集成总线接入监听中...' },
    { time: '14:21:45', type: 'success', message: '📡 成功连通主线 MES 制造执行系统 200 OK，并自动对接排程流水' },
    { time: '14:22:01', type: 'success', message: '📡 监测到 EAP 装备控制系统与 SPC 制程统计系统双向联通测试成功' },
  ]);

  // Simulation unstructured input
  const [customTextInput, setCustomTextInput] = useState<string>('');
  const [isRuleParsing, setIsRuleParsing] = useState<boolean>(false);
  const [assistantTemplate, setAssistantTemplate] = useState<string>('oom_crash');

  // Dynamic Onboarding Wizard & Simulated Webhook States
  const [showOnboardForm, setShowOnboardForm] = useState<boolean>(false);
  const [newSysId, setNewSysId] = useState<string>('');
  const [newSysName, setNewSysName] = useState<string>('');
  const [newSysDesc, setNewSysDesc] = useState<string>('');
  const [newSysIcon, setNewSysIcon] = useState<string>('Bell');
  const [newSysTheme, setNewSysTheme] = useState<string>('purple');
  const [activeSimulatedSystemId, setActiveSimulatedSystemId] = useState<string>('MES系统');
  const [simulatedTaskText, setSimulatedTaskText] = useState<string>(
    `【MES排程流程单】工艺单号#MES-9491: 需要为ASML DUV曝光线特急追加首批高端车载SoC芯片(Wafer Lot)加塞流片排程，请大客户拓展经理李明在MES中核定流片Slots并在2小时内流转至下一步专家张静会签审批！`
  );

  // Optimization states for the personnel & layout control
  const [hideEmptySystems, setHideEmptySystems] = useState<boolean>(true);
  const [subHideEmptySystems, setSubHideEmptySystems] = useState<boolean>(true);
  const [subViewMode, setSubViewMode] = useState<'card' | 'list'>('card');
  const [subSearchQuery, setSubSearchQuery] = useState<string>('');

  // Handle Onboard New System Action
  const handleOnboardSystem = () => {
    if (!newSysId.trim() || !newSysName.trim()) {
      triggerToast('❌ 请填写完整的系统ID(识别码，如 JIRA) 和 汉化展示名称！');
      return;
    }

    const exists = corporateSystems.some(sys => sys.id.toLowerCase() === newSysId.trim().toLowerCase());
    if (exists) {
      triggerToast('❌ 注册冲突！该系统编码ID已被占用，请定义新的标识。');
      return;
    }

    const newSysObj = {
      id: newSysId.trim(),
      name: newSysName.trim(),
      icon: newSysIcon,
      theme: newSysTheme,
      description: newSysDesc.trim() || '自主系统极速接入协同通道对齐'
    };

    setCorporateSystems(prev => [...prev, newSysObj]);
    setActiveSimulatedSystemId(newSysObj.id);
    
    // Automatically fill simulated sandbox with realistic template
    setSimulatedTaskText(`【${newSysObj.name} API Webhook 报警】关于向各部门指派对应负责人执行整改：请主管李明协同开发赵磊对网络网关层进行加固测试，明日截止。`);
    
    setNewSysId('');
    setNewSysName('');
    setNewSysDesc('');
    setShowOnboardForm(false);

    triggerToast(`🎉 系统【${newSysObj.name}】注册成功！安全 SMTP 代理已激活，已在大盘与筛选列表中全量对齐！`);
  };

  // Handle Changing Simulated Host System
  const handleSwitchSimulatedSystem = (sysId: string) => {
    setActiveSimulatedSystemId(sysId);
    let mockText = '';
    if (sysId === 'OA系统' || sysId === 'MES系统') {
      mockText = `【MES排程流程单】工艺单号#MES-9491: 需要为ASML DUV曝光线特急追加首批高端车载SoC芯片(Wafer Lot)加塞流片排程，请大客户拓展经理李明在MES中核定流片Slots并在2小时内流转至下一步专家张静会签审批！`;
    } else if (sysId === '监控系统' || sysId === 'EAP系统') {
      mockText = `【EAP装备故障报警】微特警报：ASML Twinscan NXT 曝光主台HSMS连线突发致命闪断，SECS/GEM离线，在线精密晶圆(LOT-SGP-12102)卡阻暂停！请后线机控工程师赵磊和工厂设备主管李明配合排查并下发自愈网关复位脚本复原！`;
    } else if (sysId === 'CRM系统' || sysId === 'SPC系统') {
      mockText = `【SPC临界值超差警报】高品质控制警讯：涂布显影工艺段硅片实测极限线宽CD均值严重超上限(UCL)。已自动锁定后续传送带阻尼。请后线工程师赵磊与品质部门紧急排查并在2小时内强制消除偏差，使控制灯恢复常绿！`;
    } else if (sysId === '核心邮箱' || sysId === 'WMS系统') {
      mockText = `【WMS极特危化耗料申报】安环合规急令：本区特高感度低温光刻胶及超纯三氟化氮清洗液库存逼近红线阈值需加急签购，请环保合规官王芳及厂务张静火速在WMS物料系统系统中录入等保限额销账并通关报关单！`;
    } else {
      const matchSys = corporateSystems.find(s => s.id === sysId);
      const name = matchSys ? matchSys.name : sysId;
      mockText = `【${name} Webhook 实时制程报文】指令通知：监测到精密生产数据漂移偏离，请后线工程师赵磊与BD经理李明协同查验，2天内流转处置。`;
    }
    setSimulatedTaskText(mockText);
  };

  // Handle Fill Selected Simulator Preset Text
  const handleFillSpecificSystemPreset = () => {
    handleSwitchSimulatedSystem(activeSimulatedSystemId);
    triggerToast('⚡ 已自动根据选中的异构系统类型装载高保真业务生产报文样本。');
  };

  // Handle Simulated Webhook Push Action
  const handleSimulateWebhookPush = async () => {
    if (!simulatedTaskText.trim()) {
      triggerToast('❌ 模拟报文内容不能为空！');
      return;
    }

    setIsRuleParsing(true);
    try {
      const response = await fetch('/api/parse-unstructured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: simulatedTaskText, currentDate: '2026-06-11' })
      });

      if (!response.ok) {
        throw new Error('API parse failed');
      }

      const resJson = await response.json();
      
      // Force sourceSystem representing active simulation
      resJson.sourceSystem = activeSimulatedSystemId;

      let targetAssignee = currentUser.fullName;
      const fullTextToMatch = (resJson.title + ' ' + resJson.description + ' ' + simulatedTaskText).toLowerCase();
      
      if (fullTextToMatch.includes('李明') || fullTextToMatch.includes('运维') || fullTextToMatch.includes('监测') || fullTextToMatch.includes('备件') || fullTextToMatch.includes('崩溃')) {
        targetAssignee = 'BD经理 - 李明';
      } else if (fullTextToMatch.includes('张静') || fullTextToMatch.includes('财务') || fullTextToMatch.includes('审计') || fullTextToMatch.includes('付款') || fullTextToMatch.includes('核定')) {
        targetAssignee = '后线工程师 - 张静';
      } else if (fullTextToMatch.includes('赵磊') || fullTextToMatch.includes('开发') || fullTextToMatch.includes('测试') || fullTextToMatch.includes('漏洞') || fullTextToMatch.includes('网关')) {
        targetAssignee = '后线工程师 - 赵磊';
      } else if (fullTextToMatch.includes('王芳') || fullTextToMatch.includes('安全') || fullTextToMatch.includes('等保') || fullTextToMatch.includes('合规')) {
        targetAssignee = '后线工程师 - 王芳';
      }

      const newTask: Task = {
        id: `task-sim-${Date.now()}`,
        title: resJson.title || '提取的微服务协同指令',
        description: resJson.description || simulatedTaskText,
        category: resJson.category || 'API推入',
        status: 'pending',
        priority: (resJson.priority || 'medium') as any,
        sourceSystem: activeSimulatedSystemId,
        dueDate: resJson.dueDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0],
        urgencyExplanation: resJson.urgencyExplanation || '根据该集成源系统Webhook紧急程度规则判定。',
        assignee: targetAssignee,
        actionSteps: (resJson.actionSteps || []).map((stepText: string, idx: number) => ({
          id: `step-sim-${Date.now()}-${idx}`,
          text: stepText,
          completed: false
        }))
      };

      setTasks(prev => [newTask, ...prev]);

      const matchedUser = profiles.find(p => p.fullName === targetAssignee);
      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
      setSelectedSystemFilter('all');
      setSelectedTaskId(newTask.id);

      const parsedUserId = matchedUser ? matchedUser.id : 'liming';
      const isParsedVacation = userStatusMap[parsedUserId]?.isVacation || false;
      const parsedSimpleName = targetAssignee.split(' - ')[1];
      const safetyRuleHint = isParsedVacation 
        ? `【📬 SMTP双重保障】由于 ${parsedSimpleName} 当前请假离岗，中枢已将其自动抄送投递至 ${parsedUserId}@corp.com！`
        : `【🔇 各源系统静音】成员正在就位，免打扰，静音拦截外部邮件。`;

      const tStr = new Date().toTimeString().split(' ')[0];
      setSimulationLogs(prev => [
        { time: tStr, type: 'info', message: `Incoming POST /v1/webhook/receiver?token=sk_live_... (Channel: ${activeSimulatedSystemId})` },
        { time: tStr, type: 'success', message: `200 OK - Authorized and validated. Routing to rule-matching parse engine...` },
        { time: tStr, type: 'success', message: `Parsed text into task: "${newTask.title}". Auto-assigned to: [${targetAssignee}]` },
        { time: tStr, type: isParsedVacation ? 'warn' : 'info', message: isParsedVacation ? `⚠️ Mail rule: Assigned user ${parsedSimpleName} is on leave. Dynamic SMTP fallback activated.` : `🔇 Mail rule: Assigned user ${parsedSimpleName} is active. Silent routing mode active.` },
        ...prev
      ]);

      triggerToast(`🚀 API Webhook 分发成功！通过认证：1条任务完美写入【${activeSimulatedSystemId}】，并分派给 [${targetAssignee}] 批办。${safetyRuleHint}`);

    } catch (err) {
      // Offline fallback simulator execution
      const matchSysObj = corporateSystems.find(s => s.id === activeSimulatedSystemId);
      const hostName = matchSysObj ? matchSysObj.name : activeSimulatedSystemId;

      let targetAssignee = 'BD经理 - 李明';
      if (simulatedTaskText.includes('张静') || simulatedTaskText.includes('财务') || simulatedTaskText.includes('核定')) targetAssignee = '后线工程师 - 张静';
      if (simulatedTaskText.includes('赵磊') || simulatedTaskText.includes('开发') || simulatedTaskText.includes('工单') || simulatedTaskText.includes('网关')) targetAssignee = '后线工程师 - 赵磊';
      if (simulatedTaskText.includes('王芳') || simulatedTaskText.includes('等保') || simulatedTaskText.includes('安全')) targetAssignee = '后线工程师 - 王芳';

      const offlineTask: Task = {
        id: `task-sim-offline-${Date.now()}`,
        title: hostName + '：API 网关业务流转指令配单',
        description: simulatedTaskText,
        category: 'Webhook自愈',
        status: 'pending',
        priority: 'high',
        sourceSystem: activeSimulatedSystemId,
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0],
        urgencyExplanation: '本自愈引擎抓取：通过离线 Webhook Token 联通，自主规则解析匹配。',
        assignee: targetAssignee,
        actionSteps: [
          { id: `step-soff-1-${Date.now()}`, text: '核对该异构系统对接 API 报文数据指纹，评估阻断/补救可行性方案', completed: false },
          { id: `step-soff-2-${Date.now()}`, text: '落实具体的系统限流/配置恢复/文件盖章流转手续', completed: false }
        ]
      };

      setTasks(prev => [offlineTask, ...prev]);

      const matchedUser = profiles.find(p => p.fullName === targetAssignee);
      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
      setSelectedSystemFilter('all');
      setSelectedTaskId(offlineTask.id);

      const parsedUserId = matchedUser ? matchedUser.id : 'liming';
      const isParsedVacation = userStatusMap[parsedUserId]?.isVacation || false;
      const parsedSimpleName = targetAssignee.split(' - ')[1];
      const safetyRuleHint = isParsedVacation 
        ? `【📬 SMTP双重保障】由于其处于 [请假离岗] 模式中，中枢已通过 SMTP 网关成功下传备份邮件至 ${parsedUserId}@corp.com！`
        : `【🔇 各源系统静音】成员在岗免骚扰，自愈看板拦截下流邮件。`;

      const tStr = new Date().toTimeString().split(' ')[0];
      setSimulationLogs(prev => [
        { time: tStr, type: 'info', message: `Incoming POST /v1/webhook/receiver?token=sk_live_... (Channel: ${activeSimulatedSystemId})` },
        { time: tStr, type: 'warn', message: `Cloud connection timeout. Falling back to local heuristic keyword assignment router...` },
        { time: tStr, type: 'success', message: `Merged local task and dispatched to: [${targetAssignee}]` },
        ...prev
      ]);

      triggerToast(`⚠️ Webhook 本地快速响应！新单已安全合并入库，指派给 [${targetAssignee}] 主理。${safetyRuleHint}`);
    } finally {
      setIsRuleParsing(false);
    }
  };

  // Sync state
  useEffect(() => {
    localStorage.setItem('smart_tasks_v6', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('smart_tasks_duty_status', JSON.stringify(userStatusMap));
  }, [userStatusMap]);

  // Toggle user's duty status wrapper
  const toggleUserVacation = (userId: string) => {
    setUserStatusMap(prev => {
      const current = prev[userId]?.isVacation || false;
      const updated = {
        ...prev,
        [userId]: { isVacation: !current }
      };
      
      const pName = profiles.find(p => p.id === userId)?.name || '';
      triggerToast(
        !current 
          ? `🌴 【${pName}】已设为 [请假离岗]！中枢中转后将正常向 ${pName}（${pName === '李明' ? 'LM' : pName === '张静' ? 'ZJ' : pName === '赵磊' ? 'ZL' : 'WF'}@corp.com）投递邮件通知，保障离岗备忘。`
          : `💼 【${pName}】已设为 [在岗/在公司]！各异构系统已完成 API 握手，开启静音模式，免除所有邮件与短信，仅看板呈现！`
      );
      return updated;
    });
  };

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // COLOR_THEMES static definition for dynamic system styling configurations
  const COLOR_THEMES: Record<string, {
    color: string;
    bg: string;
    badgeBg: string;
    gradient: string;
    hoverBorder: string;
    badgeText: string;
  }> = {
    indigo: {
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200/65',
      badgeBg: 'bg-indigo-100 text-indigo-700',
      gradient: 'from-indigo-600 to-indigo-700 border-indigo-700 shadow-indigo-600/10 shadow-lg text-white',
      hoverBorder: 'hover:border-indigo-300',
      badgeText: 'bg-indigo-50 text-indigo-600 px-1.5 py-0.2 rounded border border-indigo-150'
    },
    emerald: {
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200/65',
      badgeBg: 'bg-emerald-100 text-emerald-700',
      gradient: 'from-emerald-600 to-emerald-700 border-emerald-700 shadow-emerald-600/10 shadow-lg text-white',
      hoverBorder: 'hover:border-emerald-300',
      badgeText: 'bg-emerald-50 text-emerald-650 px-1.5 py-0.2 rounded border border-emerald-150'
    },
    amber: {
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200/65',
      badgeBg: 'bg-amber-100 text-amber-800',
      gradient: 'from-amber-500 to-amber-600 border-amber-600 shadow-amber-500/10 shadow-lg text-white',
      hoverBorder: 'hover:border-amber-300',
      badgeText: 'bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-150'
    },
    rose: {
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200/65',
      badgeBg: 'bg-rose-100 text-rose-700',
      gradient: 'from-rose-600 to-rose-700 border-rose-700 shadow-rose-600/10 shadow-lg text-white',
      hoverBorder: 'hover:border-rose-300',
      badgeText: 'bg-rose-50 text-rose-700 px-1.5 py-0.2 rounded border border-rose-150'
    },
    purple: {
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200/65',
      badgeBg: 'bg-purple-100 text-purple-700',
      gradient: 'from-purple-600 to-purple-700 border-purple-700 shadow-purple-600/10 shadow-lg text-white',
      hoverBorder: 'hover:border-purple-300',
      badgeText: 'bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded border border-purple-150'
    },
    sky: {
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200/65',
      badgeBg: 'bg-sky-100 text-sky-700',
      gradient: 'from-sky-500 to-sky-600 border-sky-600 shadow-sky-500/10 shadow-lg text-white',
      hoverBorder: 'hover:border-sky-305',
      badgeText: 'bg-sky-50 text-sky-600 px-1.5 py-0.2 rounded border border-sky-150'
    },
    teal: {
      color: 'text-teal-600',
      bg: 'bg-teal-50 border-teal-200/65',
      badgeBg: 'bg-teal-100 text-teal-800',
      gradient: 'from-teal-600 to-teal-700 border-teal-700 shadow-teal-600/10 shadow-lg text-white',
      hoverBorder: 'hover:border-teal-300',
      badgeText: 'bg-teal-50 text-teal-750 px-1.5 py-0.2 rounded border border-teal-150'
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Cpu': return Cpu;
      case 'Workflow': return Workflow;
      case 'Mail': return Mail;
      case 'Bell': return Bell;
      case 'Calendar': return Calendar;
      case 'Inbox': return Inbox;
      case 'Layers': return Layers;
      case 'HelpCircle': return HelpCircle;
      case 'ShieldCheck': return ShieldCheck;
      case 'AlertTriangle': return AlertTriangle;
      case 'Video': return Video;
      case 'RefreshCw': return RefreshCw;
      case 'TrendingUp': return TrendingUp;
      case 'Trash2': return Trash2;
      case 'Box': return Box;
      default: return Workflow;
    }
  };

  // Systems Dynamic Config
  const [corporateSystems, setCorporateSystems] = useState<Array<{
    id: string;
    name: string;
    icon: string;
    theme: string;
    description: string;
  }>>(() => {
    const saved = localStorage.getItem('smart_tasks_systems_v6');
    if (saved) return JSON.parse(saved);
    return [
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
  });

  useEffect(() => {
    localStorage.setItem('smart_tasks_systems_v6', JSON.stringify(corporateSystems));
  }, [corporateSystems]);

  // Templates for system rule flow
  const messageTemplates = {
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

  // Switch simulation users
  const handleUserLoginChange = (profile: UserProfile) => {
    setCurrentUser(profile);
    setSelectedTaskId(null); // Clear selected details to avoid mismatched context
    setSelectedSubordinateFilterId(null); // Clear subordinate filter on switch
    triggerToast(`🔑 登录切换：已作为【${profile.fullName}】登录，各系统待办表格已核实过滤`);
  };

  // Toggle Sub-step completed or not within details
  const handleToggleSubStep = (taskId: string, stepId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedSteps = (t.actionSteps || []).map(step => 
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        return { ...t, actionSteps: updatedSteps };
      }
      return t;
    }));
  };

  // Submit parsing from local rule-based / regex parser
  const handleRuleParsingUnstructured = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRuleParsing(true);

    const activeRawText = customTextInput.trim() !== '' ? customTextInput : (messageTemplates as any)[assistantTemplate].text;

    try {
      // Direct POST to backend express validator
      const response = await fetch('/api/parse-unstructured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: activeRawText, 
          currentDate: '2026-06-11' 
        })
      });

      if (!response.ok) {
        throw new Error('Fallback needed');
      }

      const resJson = await response.json();

      // Rule-based assignee resolver according to keywords
      let targetAssignee = currentUser.fullName; // Default fallback assign
      const fullNormalizedStr = (resJson.title + ' ' + resJson.description + ' ' + resJson.sourceSystem + ' ' + activeRawText).toLowerCase();
      
      if (fullNormalizedStr.includes('李明') || fullNormalizedStr.includes('运维') || fullNormalizedStr.includes('监控') || fullNormalizedStr.includes('崩溃') || fullNormalizedStr.includes('宕机') || fullNormalizedStr.includes('oom')) {
        targetAssignee = 'BD经理 - 李明';
      } else if (fullNormalizedStr.includes('张静') || fullNormalizedStr.includes('财务') || fullNormalizedStr.includes('审计') || fullNormalizedStr.includes('预算') || fullNormalizedStr.includes('款项') || fullNormalizedStr.includes('付款')) {
        targetAssignee = '后线工程师 - 张静';
      } else if (fullNormalizedStr.includes('赵磊') || fullNormalizedStr.includes('测试') || fullNormalizedStr.includes('开发') || fullNormalizedStr.includes('中台') || fullNormalizedStr.includes('漏洞') || fullNormalizedStr.includes('paypal')) {
        targetAssignee = '后线工程师 - 赵磊';
      } else if (fullNormalizedStr.includes('王芳') || fullNormalizedStr.includes('安全') || fullNormalizedStr.includes('等保') || fullNormalizedStr.includes('合规') || fullNormalizedStr.includes('碰撞') || fullNormalizedStr.includes('暴力')) {
        targetAssignee = '后线工程师 - 王芳';
      }

      const newlyFormedTask: Task = {
        id: `task-parsed-${Date.now()}`,
        title: resJson.title || '提取的微服务协同命令待办',
        description: resJson.description || activeRawText,
        category: resJson.category || '临时指派',
        status: 'pending',
        priority: (resJson.priority || 'medium') as any,
        sourceSystem: resJson.sourceSystem || 'WMS系统',
        dueDate: resJson.dueDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        createdDate: new Date().toISOString().split('T')[0],
        urgencyExplanation: resJson.urgencyExplanation || '由系统根据消息等级判定的紧急度。',
        assignee: targetAssignee,
        actionSteps: (resJson.actionSteps || []).map((t: string, idx: number) => ({
          id: `step-parse-${Date.now()}-${idx}`,
          text: t,
          completed: false
        }))
      };

      setTasks(prev => [newlyFormedTask, ...prev]);

      // Automatically switch viewer perspective so they can audit it instantly
      const targetUser = profiles.find(p => p.fullName === targetAssignee);
      if (targetUser) {
        setCurrentUser(targetUser);
      }
      setSelectedSystemFilter('all'); // Clear filters
      setSelectedTaskId(newlyFormedTask.id); // Open Detail popup directly!
      setCustomTextInput('');

      const parsedUserId = targetUser ? targetUser.id : 'liming';
      const isParsedVacation = userStatusMap[parsedUserId]?.isVacation || false;
      const parsedSimpleName = targetAssignee.split(' - ')[1];
      const safetyRuleHint = isParsedVacation 
        ? `【📬 SMTP双重保障】由于 ${parsedSimpleName} 当前处于 [请假离岗] 模式下，系统除看板记录外，已同步自动向其账户邮箱 ${parsedUserId}@corp.com 成功投递了一份提醒其备忘的邮件！`
        : `【🔇 各源系统静音】由于 ${parsedSimpleName} 当前处于 [正常在岗] 状态下，系统已联通源系统将对应的通知邮件拦截，看板安全承接，免骚扰！`;

      triggerToast(`🔔 解析自【${newlyFormedTask.sourceSystem}】信息已分派至 [${targetAssignee}]。${safetyRuleHint}`);

    } catch (err) {
      // Resilient Client Side Static Extraction during server hiccups
      const mappedTemplateObj = (messageTemplates as any)[assistantTemplate];
      
      let targetAssignee = 'BD经理 - 李明';
      if (assistantTemplate === 'audit_approval') targetAssignee = '后线工程师 - 张静';
      if (assistantTemplate === 'ticket_error') targetAssignee = '后线工程师 - 赵磊';
      if (assistantTemplate === 'threat_alert') targetAssignee = '后线工程师 - 王芳';

      const offlineTask: Task = {
        id: `task-offline-${Date.now()}`,
        title: mappedTemplateObj.category + '：未结构化信息系统解构自愈印单',
        description: activeRawText,
        category: mappedTemplateObj.category,
        status: 'pending',
        priority: mappedTemplateObj.priority as any,
        sourceSystem: mappedTemplateObj.system,
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        createdDate: new Date().toISOString().split('T')[0],
        urgencyExplanation: '本自愈引擎抓取：涉及企业生产环境健康度和大客充值问题，应置于特急序列处理。',
        assignee: targetAssignee,
        actionSteps: [
          { id: `step-off-1-${Date.now()}`, text: '根据来源报文原文，核对生产/业务配置 and 数据库中继状态', completed: false },
          { id: `step-off-2-${Date.now()}`, text: '落实具体的系统限流/配置恢复/文件盖章流转手续', completed: false },
          { id: `step-off-3-${Date.now()}`, text: '将处理进展向合规 and 安全部门呈报，彻底消除此条异常隐患', completed: false }
        ]
      };

      setTasks(prev => [offlineTask, ...prev]);
      
      const targetUser = profiles.find(p => p.fullName === targetAssignee);
      if (targetUser) {
        setCurrentUser(targetUser);
      }
      setSelectedSystemFilter('all');
      setSelectedTaskId(offlineTask.id);

      const parsedUserId = targetUser ? targetUser.id : 'liming';
      const isParsedVacation = userStatusMap[parsedUserId]?.isVacation || false;
      const parsedSimpleName = targetAssignee.split(' - ')[1];
      const safetyRuleHint = isParsedVacation 
        ? `【📬 SMTP双重保障】由于其处于 [请假离岗] 模式中，中枢已通过 SMTP 网关成功下发一封通知提醒备忘邮件至其邮箱 ${parsedUserId}@corp.com！`
        : `【🔇 各源系统静音】由于当前人员在岗，已向对接多平台发送 API 静默指令，屏蔽对应提醒邮件，看板正常呈现。`;

      triggerToast(`⚠️ (已激活系统规整自愈) 新通知指派至 【${targetAssignee}】办。${safetyRuleHint}`);
    } finally {
      setIsRuleParsing(false);
    }
  };


  // Perform processing and archive (Mark Completed)
  const handleCompleteTask = (taskId: string) => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const fullyCompleted = (t.actionSteps || []).map(s => ({ ...s, completed: true }));
        return { ...t, status: 'completed' as TaskStatus, actionSteps: fullyCompleted };
      }
      return t;
    }));

    setSelectedTaskId(null); // Close Modal
    triggerToast(`✅ 操作已成功办结归档！来自【${targetTask.sourceSystem}】的待办已划为办结状态，计数器已更新。`);
  };

  // Restore task to need-attention
  const handleReopenTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'pending' as TaskStatus };
      }
      return t;
    }));
    triggerToast(`♻️ 已将该待办重新放入待办队列。`);
  };

  // Hard delete records
  const handleDeleteTaskRecord = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确认要在中枢中彻底删除该条待办数据存档吗？')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
      }
      triggerToast('🗑️ 待办已被撤底物理移除。');
    }
  };

  // Resolve subordinate being filtered
  const activeSubordinateFilterObj = useMemo(() => {
    if (!selectedSubordinateFilterId) return null;
    return profiles.find(p => p.id === selectedSubordinateFilterId) || null;
  }, [profiles, selectedSubordinateFilterId]);

  const activeTargetUser = useMemo(() => {
    return activeSubordinateFilterObj ? activeSubordinateFilterObj : currentUser;
  }, [activeSubordinateFilterObj, currentUser]);

  // Filter Tasks for the Logged-in User or Subordinate
  const usersActiveUnresolvedTasks = useMemo(() => {
    return tasks.filter(t => {
      // 1. Must belong to the active target user
      if (t.assignee !== activeTargetUser.fullName) return false;
      // 2. Only active/processing status
      if (t.status === 'completed') return false;
      // 3. Match text search if typed
      if (searchQuery.trim() !== '') {
        const sq = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(sq) || t.description.toLowerCase().includes(sq);
      }
      return true;
    });
  }, [tasks, activeTargetUser, searchQuery]);

  // Dynamic Active task counts aggregate for Dashboard modules
  const unresolvedCountsBySystem = useMemo(() => {
    const stats: Record<string, number> = {
      all: 0,
    };

    // Initialize counters dynamically based on registered channels
    corporateSystems.forEach(sys => {
      stats[sys.id] = 0;
    });

    tasks.forEach(t => {
      if (t.status !== 'completed' && t.assignee === activeTargetUser.fullName) {
        stats.all++;
        if (stats[t.sourceSystem] !== undefined) {
          stats[t.sourceSystem]++;
        } else {
          stats[t.sourceSystem] = 1; // Fallback helper if an unlisted channel submits a task
        }
      }
    });

    return stats;
  }, [tasks, activeTargetUser, corporateSystems]);

  // Sorted Completed Items archive specifically for active user
  const usersCompletedTasksArchive = useMemo(() => {
    return tasks.filter(t => t.status === 'completed' && t.assignee === activeTargetUser.fullName);
  }, [tasks, activeTargetUser]);

  // Get all direct and indirect subordinates of a user
  const getSubordinatesForLeader = (userId: string, allProfiles: UserProfile[]): UserProfile[] => {
    const list: UserProfile[] = [];
    const findSubordinates = (targetId: string) => {
      const direct = allProfiles.filter(p => p.managerId === targetId);
      direct.forEach(sub => {
        if (!list.some(item => item.id === sub.id)) {
          list.push(sub);
          findSubordinates(sub.id);
        }
      });
    };
    findSubordinates(userId);
    return list;
  };

  const subordinatesList = useMemo(() => {
    return getSubordinatesForLeader(currentUser.id, profiles);
  }, [currentUser.id, profiles]);

  const directLeader = useMemo(() => {
    if (!currentUser.managerId) return null;
    return profiles.find(p => p.id === currentUser.managerId) || null;
  }, [currentUser, profiles]);

  // Prevent circular reporting lines by filtering out the user themselves and all subordinates
  const getEligibleManagers = (profileId: string) => {
    const subordinates = getSubordinatesForLeader(profileId, profiles);
    const subordinateIds = subordinates.map(s => s.id);
    return profiles.filter(p => p.id !== profileId && !subordinateIds.includes(p.id));
  };

  // Compute pending tasks by system for all profiles
  const profilesPendingStats = useMemo(() => {
    const statsMap: Record<string, { total: number; bySystem: Record<string, number> }> = {};
    
    profiles.forEach(p => {
      const systemCounts: Record<string, number> = {};
      corporateSystems.forEach(sys => {
        systemCounts[sys.id] = 0;
      });
      
      const userTasks = tasks.filter(t => t.assignee === p.fullName && t.status !== 'completed');
      
      userTasks.forEach(t => {
        if (systemCounts[t.sourceSystem] !== undefined) {
          systemCounts[t.sourceSystem]++;
        } else {
          systemCounts[t.sourceSystem] = 1;
        }
      });
      
      statsMap[p.id] = {
        total: userTasks.length,
        bySystem: systemCounts
      };
    });
    
    return statsMap;
  }, [tasks, profiles, corporateSystems]);

  // Selected item detail configuration
  const activeDetailTask = useMemo(() => {
    if (!selectedTaskId) return null;
    return tasks.find(t => t.id === selectedTaskId);
  }, [tasks, selectedTaskId]);

  // Filter subordinates list by query
  const filteredSubordinatesList = useMemo(() => {
    return subordinatesList.filter(sub => {
      if (!subSearchQuery.trim()) return true;
      const q = subSearchQuery.toLowerCase().trim();
      return sub.name.toLowerCase().includes(q) || sub.role.toLowerCase().includes(q) || sub.id.toLowerCase().includes(q);
    });
  }, [subordinatesList, subSearchQuery]);

  // System Popover Renderer helper
  const renderSystemPopover = (sub: UserProfile, sys: { id: string; name: string }, c: number) => {
    return (
      <div 
        className="absolute bottom-full mb-2 right-0 w-72 bg-white border border-slate-200/80 shadow-xl rounded-xl p-3 z-50 text-left cursor-default animate-fadeIn"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
            <span>{sub.name}</span>
            <span className="text-slate-300 font-extrabold font-mono">·</span>
            <span className="text-indigo-600 font-bold">{sys.name} ({c})</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setActiveSystemMenu(null);
            }}
            className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer font-bold px-1"
          >
            ✕
          </button>
        </div>

        <div className="max-h-44 overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar">
          {tasks
            .filter(t => t.assignee === sub.fullName && t.sourceSystem === sys.id && t.status !== 'completed')
            .map(task => {
              const priorityBadge = task.priority === 'high' 
                ? 'bg-rose-50 text-rose-700 border-rose-250/50 hover:bg-rose-100/30' 
                : task.priority === 'medium' 
                  ? 'bg-amber-50 text-amber-700 border-amber-250/55 hover:bg-amber-100/30' 
                  : 'bg-slate-50 text-slate-400 border-slate-200/80 hover:bg-slate-100/50';

              return (
                <div
                  key={task.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedSubordinateFilterId(sub.id);
                    setSelectedTaskId(task.id);
                    setActiveSystemMenu(null);
                    
                    // Scroll to active table dynamically
                    const tableEl = document.getElementById('smart-task-dashboard-active-table');
                    if (tableEl) {
                      tableEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    
                    triggerToast(`🔎 已定位下属【${sub.name}】的未办：${task.title}`);
                  }}
                  className="group border border-slate-200 bg-slate-50/40 hover:bg-indigo-50/30 hover:border-indigo-200 p-2 rounded-lg transition text-left cursor-pointer flex flex-col gap-1"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10.5px] font-bold text-slate-700 group-hover:text-indigo-950 line-clamp-1 flex-1 leading-tight">
                      {task.title}
                    </span>
                    <span className={`text-[8px] font-black px-1 rounded border shrink-0 ${priorityBadge}`}>
                      {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-slate-400">
                    <span className="truncate max-w-[120px] font-mono">{task.id}</span>
                    <span className="font-bold flex items-center gap-0.5">📅 {task.dueDate}</span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-2 pt-1.5 border-t border-slate-100 text-[8.5px] text-slate-400 italic">
          💡 点击任意事项可一键穿透过滤查看其详情
        </div>
      </div>
    );
  };

  return (
    <div id="clean-unified-todo-center" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* 1. Header with Title & Live UTC Clock */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-200">
              <Workflow className="w-5.5 h-5.5 text-indigo-50" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">多系统极简统一待办中枢</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">已同步联通</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">将您在芯片厂异构系统（MES制造执行、EAP装备控制、SPC制程统计与WMS智能仓储系统）中沉淀的代办自愈聚合在同一干净表格视图中</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1 shadow-2xs text-[11px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>数据大盘即时互联</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-750 font-mono font-bold">2026-06-11 UTC</span>
            </div>
            
            <button
              onClick={() => {
                setActiveView(activeView === 'dashboard' ? 'sandbox' : 'dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-black transition flex items-center gap-1.5 cursor-pointer border shadow-sm ${
                activeView === 'sandbox'
                  ? 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-indigo-50'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-slate-100'
              }`}
            >
              {activeView === 'sandbox' ? (
                <>
                  <span>📋 待办中枢大盘</span>
                </>
              ) : (
                <>
                  <span>🔌 API & 仿真沙盒专区</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* 个人信息中心 Dropdown */}
            <div className="relative">
              <button
                id="btn-profile-center"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition duration-200 cursor-pointer text-left select-none shadow-2xs"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-[12px] shadow-xs ${currentUser.avatarBg}`}>
                  {currentUser.avatarText}
                </div>
                <div className="hidden sm:block leading-none">
                  <div className="text-xs font-black text-slate-800 flex items-center gap-1">
                    <span>{currentUser.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium mt-0.5">{currentUser.fullName.split(' - ')[0]}</div>
                </div>
                {/* Arrow indicator */}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Backdrop overlay to click outside can close */}
                  <div className="fixed inset-0 z-40 cursor-default shadow-none bg-transparent" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-[320px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 animate-fadeIn text-left">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-md ${currentUser.avatarBg}`}>
                        {currentUser.avatarText}
                      </div>
                      <div className="leading-tight flex-1">
                        <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                          <span>{currentUser.name}</span>
                          <span class              {/* Dynamic Registration Form (Expanded) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-left text-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-45 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                  <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    极速自助新异构应用连接配置中心 (Connect New System)
                  </h4>
                  <span className="text-[9px] font-mono bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-sm uppercase font-bold">
                    Zero-Code SDK
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">系统ID/物理路由前缀 (纯大写英文ID / 唯一辨别号)</label>
                      <input
                        type="text"
                        value={newSysId}
                        onChange={(e) => setNewSysId(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                        placeholder="例如: FEISHU_ALERTS, RETRY_CRM"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-700 font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">汉化系统展示名称</label>
                      <input
                        type="text"
                        value={newSysName}
                        onChange={(e) => setNewSysName(e.target.value)}
                        placeholder="例如: 内部飞书审批与故障通知"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1 font-mono">分配系统卡片视觉主题 (Theme Palette)</label>
                      <div className="grid grid-cols-4 gap-1">
                        {['purple', 'sky', 'teal', 'indigo', 'emerald', 'amber', 'rose'].map((tName) => (
                          <button
                            key={tName}
                            type="button"
                            onClick={() => setNewSysTheme(tName)}
                            className={`py-1 px-1.5 rounded-sm font-extrabold text-[9px] uppercase border transition truncate ${
                              newSysTheme === tName
                                ? 'bg-indigo-650 border-indigo-400 text-indigo-50 font-black shadow-inner'
                                : 'bg-slate-950 border-slate-850 text-slate-500 hover:bg-slate-855'
                            }`}
                          >
                            {tName}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">系统专属拟真图标 (Lucide Symbol)</label>
                      <select
                        value={newSysIcon}
                        onChange={(e) => setNewSysIcon(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-205 font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                      >
                        <option value="Bell">🔔 警报器 (Bell)</option>
                        <option value="Calendar">📅 计划排程 (Calendar)</option>
                        <option value="Layers">🗄️ 数据节点 (Layers)</option>
                        <option value="Inbox">📥 输入信卡 (Inbox)</option>
                        <option value="HelpCircle">❓ 客服反馈 (HelpCircle)</option>
                        <option value="ShieldCheck">🛡️ 安全审计 (ShieldCheck)</option>
                        <option value="Workflow">🎫 流程工单 (Workflow)</option>
                        <option value="FileText">📄 拟草文档 (FileText)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">系统关联职责及背景描述 (将会由 NLP 自然语言识别规则参考)</label>
                    <input
                      type="text"
                      value={newSysDesc}
                      onChange={(e) => setNewSysDesc(e.target.value)}
                      placeholder="描述本接入源的主要背景。例如：主要上行国际监控节点异常与各海外运营专线催单指令。"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-755 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleOnboardSystem}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white py-3 px-4 rounded-xl font-black transition text-xs shadow-md shrink-0 flex items-center justify-center gap-1 cursor-pointer select-none font-mono tracking-wider animate-pulse"
                    >
                      <Check className="w-4 h-4 font-bold" />
                      <span>确认并一键上线 API & 注册业务流转专线</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 font-mono text-[10px] space-y-1 mt-4">
                  <div className="text-slate-500">⚡ JWT 应用接入密钥: <span className="text-amber-500/80">sk_live_6f84d00868fefa81845bb08de-SaaS</span></div>
                  <div className="text-slate-500">📡 Webhook 网关接收入口: <span className="text-indigo-400">https://api.corp.com/v1/webhook/receiver?token=sk_live_...</span></div>
                </div>
              </div>                     matches 
                                  ? 'bg-indigo-50 border border-indigo-100/60 text-indigo-950' 
                                  : 'hover:bg-slate-50 border border-transparent text-slate-700'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-[11px] shadow-sm shrink-0 ${p.avatarBg}`}>
                                {p.avatarText}
                              </div>
                              <div className="flex-1 leading-tight min-w-0">
                                <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                                  <span className="truncate">{p.name} <span className="font-normal text-[9px] text-slate-400">({p.fullName.split(' - ')[0].trim()})</span></span>
                                  {isVacant && <span className="text-[10px] text-amber-600 shrink-0">🌴</span>}
                                </div>
                                <div className="text-[9px] text-slate-400 truncate mt-0.5">{p.role}</div>
                              </div>
                              {count > 0 ? (
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold shrink-0 ${
                                  matches ? 'bg-indigo-600 text-indigo-100' : 'bg-amber-50 text-amber-805 border border-amber-200/50'
                                }`}>
                                  {count}项
                                </span>
                              ) : (
                                <span className="text-[8px] text-slate-400 shrink-0">✔</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase">管理我的状态</span>
                      <button
                        onClick={() => {
                          toggleUserVacation(currentUser.id);
                        }}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-lg border transition shadow-2xs whitespace-nowrap cursor-pointer ${
                          userStatusMap[currentUser.id]?.isVacation
                            ? 'bg-amber-500 hover:bg-amber-400 text-white border-amber-600'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700'
                        }`}
                      >
                        {userStatusMap[currentUser.id]?.isVacation ? '🌴 已在假 (设为在岗)' : '💼 已在岗 (设为请假)'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {activeView === 'sandbox' ? (
        /* SENSATIONAL HIGH-FIDELITY DEDICATED SANDBOX WORKSPACE PAGE */
        <section className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 animate-fadeIn pb-16">
          
          {/* Breadcrumb & Navigation Back Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-left">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-600 transition flex items-center justify-center cursor-pointer border border-slate-200/65"
                title="返回总控制台"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-150 px-1.5 py-0.2 rounded">企业级流转中枢</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-150 font-mono font-bold">API ACTIVE v2</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">🔌 异构业务应用自助流转、注册与仿真沙盒中心</h2>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-900 hover:bg-slate-800 text-slate-100 px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md justify-center cursor-pointer font-mono"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>返回待办监控大盘</span>
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            {/* Left/Top Column: Current Integrations & New System Onboarder (7 cols) */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              
              {/* Dynamic Channels Grid */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-left">
                <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    已激活接入的异构子系统业务专线 ({corporateSystems.length})
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">双向握手协议互通中</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {corporateSystems.map((sys) => {
                    const IconComp = getIconComponent(sys.icon);
                    const tTheme = COLOR_THEMES[sys.theme] || COLOR_THEMES.indigo;
                    
                    return (
                      <div 
                        key={sys.id}
                        className={`p-4 rounded-xl border transition-all hover:shadow-subtle relative overflow-hidden flex flex-col justify-between ${
                          activeSimulatedSystemId === sys.id 
                            ? 'bg-slate-50/50 border-slate-300 ring-2 ring-indigo-500/5' 
                            : 'bg-white border-slate-150/80 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${tTheme.bg} ${tTheme.color}`}>
                                <IconComp className="w-4.5 h-4.5" />
                              </div>
                              <span className="font-extrabold text-sm text-slate-800 truncate">{sys.name}</span>
                            </div>
                            
                            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-slate-100 border px-1.5 py-0.2 rounded">
                              {sys.id}
                            </span>
                          </div>

                          <p className="text-slate-500 text-[11px] mt-2.5 line-clamp-2 leading-relaxed">
                            {sys.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span>连接在线</span>
                          </span>
                          
                          <button
                            onClick={() => {
                              handleSwitchSimulatedSystem(sys.id);
                              triggerToast(`💡 成功加载并切换到 [${sys.name}] 仿真通道！`);
                            }}
                            className={`px-2.5 py-1 rounded-md border text-[10px] font-black transition cursor-pointer flex items-center gap-1 select-none ${
                              activeSimulatedSystemId === sys.id 
                                ? 'bg-indigo-600 text-indigo-50 border-indigo-600 shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>选定调试</span>
                            {activeSimulatedSystemId === sys.id && <Check className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Registration Form (Expanded) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-left text-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-45 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between gap-4 border-b bord                  {simulationLogs.length === 0 ? (
                    <div className="text-slate-650 text-center py-10">
                      [INFO] 等待 API 报文流入，终端无事件跟踪。请输入并点击【虚拟发送 Webhook 事件】。
                    </div>
                  ) : (
                    simulationLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 animate-fadeIn">
                        <span className="text-slate-600 select-none">[{log.time}]</span>
                        <span className={`font-bold shrink-0 ${
                          log.type === 'success' ? 'text-emerald-400' :
                          log.type === 'warn' ? 'text-amber-400 animate-pulse' :
                          log.type === 'error' ? 'text-rose-400' :
                          'text-sky-400'
                        }`}>
                          {log.type === 'success' ? '[  OK  ]' : log.type === 'warn' ? '[ WARN ]' : log.type === 'error' ? '[ FAIL ]' : '[ INFO ]'}
                        </span>
                        <span className="text-slate-300 break-words flex-1 leading-normal">{log.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      ) : (
        <>
          {/* 2. Interactive Identity Authentication Switcher */}
          <section className="bg-white border-b border-slate-200/80 py-5 px-4 sm:px-6 shadow-2xs">
        <div className="max-w-[1500px] mx-auto flex flex-col gap-5">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shrink-0">
                <User className="w-5.5 h-5.5 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-indigo-500 font-extrabold uppercase tracking-widest leading-none">企业单点登录已连通：</div>
                <div className="text-sm font-black text-slate-900 mt-1 flex items-center gap-2">
                  <span>当前正作为 <span className="text-indigo-600 underline decoration-indigo-250 underline-offset-4">{currentUser.fullName}</span> 登录</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs text-slate-500 font-medium">{currentUser.role}</span>
                </div>
              </div>
            </div>


          </div>


          {/* 3. 岗态自适应判定与对接系统通知广播中控 */}
          <div className={`mt-2 rounded-2xl border-2 p-6 transition-all duration-300 flex flex-col lg:flex-row items-stretch gap-6 ${
            userStatusMap[currentUser.id]?.isVacation 
              ? 'bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-300/85 shadow-md shadow-amber-500/5' 
              : 'bg-gradient-to-br from-indigo-50/50 to-emerald-50/30 border-indigo-200/85 shadow-md shadow-indigo-500/5'
          }`}>
            
            {/* Left Side: Status Display & Explanation (Grows to adapt nicely) */}
            <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
              <div className={`p-4 rounded-xl shrink-0 flex items-center justify-center shadow-xs ${
                userStatusMap[currentUser.id]?.isVacation 
                  ? 'bg-amber-100 text-amber-805 border border-amber-205' 
                  : 'bg-emerald-100 text-emerald-805 border border-emerald-205'
              }`}>
                {userStatusMap[currentUser.id]?.isVacation ? (
                  <Mail className="w-6 h-6 animate-pulse text-amber-600" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 animate-pulse" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">
                    当前选定人员【{currentUser.name}】岗态防漏判定中枢
                  </span>
                  
                  {/* High visibility state status badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${
                    userStatusMap[currentUser.id]?.isVacation 
                      ? 'bg-amber-500 text-white animate-bounce' 
                      : 'bg-emerald-600 text-white shadow-emerald-600/10'
                  }`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    {userStatusMap[currentUser.id]?.isVacation ? '🌴 当前处于 [请假离岗] 状态' : '💼 当前处于 [正常在岗] 状态'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {userStatusMap[currentUser.id]?.isVacation ? (
                    <span>
                      📬 <b>【已开启 SMTP 邮箱代发双保障机制】</b>：系统判定当前负责人 <b>{currentUser.name}</b> 处于请假模式下，为防止看板任务积压造成业务窒息。各子业务源系统已解锁投递阻尼锁，同步将急件<b>常态化投递到账户邮箱（{currentUser.id}@corp.com）并短信提醒</b>！
                    </span>
                  ) : (
                    <span>
                      🎉 <b>【多源拦截生效中：厂内现场静音免打扰】</b>：系统已向 MES系统、EAP系统、SPC系统 发出常时免打扰指令。由于 <b>{currentUser.name}</b> 当前在岗，所有临时待办消息在看板内<b>即时显示、自动协同，拦截外界一切邮件 and 短信，防打扰度 100%</b>！
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right Side: Massive High-contrast interactive Duty status buttons */}
            <div className="flex flex-col gap-2 shrink-0 w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-5 lg:pt-0 lg:pl-6 justify-center">
              <span className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wide flex items-center gap-1 justify-center lg:justify-start">
                <span className="inline-block w-1.5 h-3 bg-indigo-600 rounded-full"></span>
                请一键管理【{currentUser.name}】当前的岗态：
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                {/* 1. On Duty Button */}
                <button
                  onClick={() => {
                    if (userStatusMap[currentUser.id]?.isVacation) {
                      toggleUserVacation(currentUser.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition duration-300 border text-center relative overflow-hidden group cursor-pointer ${
                    !userStatusMap[currentUser.id]?.isVacation 
                      ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 border-emerald-700 text-white shadow-md shadow-emerald-600/35 ring-3 ring-emerald-500/20 scale-100' 
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-700'
                  }`}
                >nter justify-center gap-1 cursor-pointer select-none font-mono tracking-wider"
                    >
                      <Check className="w-4 h-4 font-bold animate-pulse" />
                      <span>确认并一键上线 API & 注册业务流转专线</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 font-mono text-[10px] space-y-1 mt-4">
                  <div className="text-slate-500">⚡ JWT 应用接入密钥: <span className="text-amber-500/80">sk_live_6f84d00868fefa81845bb08de-SaaS</span></div>
                  <div className="text-slate-500">📡 Webhook 网关接收入口: <span className="text-indigo-400">https://api.corp.com/v1/webhook/receiver?token=sk_live_...</span></div>
                </div>
              </div>

            </div>

            {/* Right Column: Webhook Simulator & HTTP Terminal (5 cols) */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              
              {/* Simulator Dispatcher Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex-1 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Cpu className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
                      API Webhook 智能派发模拟器
                    </span>
                    <span className="text-[10px] bg-slate-150 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">API CONSOLE</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">第一步：选择用于派发的对接事件源系统</label>
                      <select
                        value={activeSimulatedSystemId}
                        onChange={(e) => handleSwitchSimulatedSystem(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden font-extrabold cursor-pointer text-xs"
                      >
                        {corporateSystems.map(sys => (
                          <option key={sys.id} value={sys.id}>🔌 {sys.name} (ID: {sys.id})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">第二步：需要派发的非结构化文字报文</label>
                        <button
                          onClick={handleFillSpecificSystemPreset}
                          className="text-[10px] text-indigo-600 hover:text-indigo-700 cursor-pointer flex items-center gap-0.5 font-bold select-none hover:underline"
                        >
                          ⚡ 极速加载本源高频样例
                        </button>
                      </div>
                      
                      <textarea
                        value={simulatedTaskText}
                        onChange={(e) => setSimulatedTaskText(e.target.value)}
                        rows={5}
                        placeholder="在此输入任何口语化的工作指令。提及团队成员（李明、赵磊、张静、王芳）或者相关职责（财务、安全、开发、运维、补救等）可自动触发分发。系统将启用本地规则匹配和关键词引擎进行实时拆解分析结构..."
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg px-3 py-2 text-slate-855 placeholder-slate-400 font-mono text-[11.5px] leading-relaxed focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleSimulateWebhookPush}
                    disabled={isRuleParsing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-indigo-50 py-3.5 px-4 rounded-xl font-black transition tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10 active:scale-[0.99] select-none font-sans"
                  >
                    {isRuleParsing ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin text-white" />
                        <span>中枢 API 网关鉴权 & 解析中...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 text-white font-bold" />
                        <span>🚀 确认发送 Webhook 事件 & 触发自愈分派</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Retro Terminal Console with Live Log Trace */}
              <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 shadow-2xl flex-1 flex flex-col justify-start text-left font-mono">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider ml-1.5">HTTP API Live Track Trace</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSimulationLogs([]);
                      triggerToast('🧹 沙盒控制台追踪日志已清空！');
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-350 hover:underline cursor-pointer font-bold select-none"
                  >
                    Clear trace
                  </button>
                </div>

                <div className="space-y-2 text-[11px] overflow-y-auto max-h-[280px] leading-relaxed pr-1 flex-1">
                  {simulationLogs.length === 0 ? (
                    <div className="text-slate-650 text-center py-10">
                      [INFO] 等待 API 报文流入，终端无事件跟踪。请输入并点击【虚拟发送 Webhook 事件】。
                    </div>
                  ) : (
                                 {/* Left Column: Personal Distribution */}
              <div className="xl:col-span-4 bg-slate-50/75 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                      <span>💼 我的自留待办分布</span>
                    </h4>
                    <span id="my-pending-total-badge" className="text-[10px] bg-indigo-50 text-indigo-750 px-2 py-0.5 rounded font-bold font-mono">
                      {profilesPendingStats[currentUser.id]?.total || 0} 待办
                    </span>
                  </div>

                  {/* Profile mini bar */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${currentUser.avatarBg}`}>
                      {currentUser.avatarText}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-800">{currentUser.name} <span className="font-medium text-slate-500 text-[10px]">(您)</span></div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{currentUser.role}</div>
                    </div>
                  </div>

                  {/* Meter rows */}
                  <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                    {(() => {
                      const systemEntries = corporateSystems.map(sys => {
                        const count = (profilesPendingStats[currentUser.id]?.bySystem[sys.id]) || 0;
                        return { sys, count };
                      });

                      return (
                        <div className="space-y-3">
                          {systemEntries.map(({ sys, count }) => {
                            const hasTasks = count > 0;
                            const totalPending = profilesPendingStats[currentUser.id]?.total || 0;
                            const percentage = totalPending > 0 ? Math.round((count / totalPending) * 100) : 0;
                            
                            const themeColors: Record<string, string> = {
                              indigo: 'bg-indigo-600',
                              emerald: 'bg-emerald-600',
                              amber: 'bg-amber-500',
                              rose: 'bg-rose-600',
                              purple: 'bg-purple-600',
                              sky: 'bg-sky-500',
                              teal: 'bg-teal-500'
                            };
                            const barColor = themeColors[sys.theme] || 'bg-slate-600';

                            return (
                              <div key={sys.id} className="space-y-1 text-xs">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-bold text-slate-700 flex items-center gap-1.5 truncate max-w-[190px]" title={sys.name}>
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hasTasks ? barColor : 'bg-slate-300'}`}></span>
                                    <span className={hasTasks ? 'font-black text-slate-850' : 'text-slate-500'}>{sys.name}</span>
                                  </span>
                                  <span className={`font-mono font-bold ${hasTasks ? 'text-slate-850' : 'text-slate-400'}`}>
                                    {count} 件 {hasTasks && <span className="text-slate-400 font-normal">({percentage}%)</span>}
                                  </span>
                                </div>
                                <div className="h-1 bg-slate-200/55 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${barColor} rounded-full transition-all duration-550`}
                                    style={{ width: `${hasTasks ? percentage : 0}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/50 text-[10px] text-slate-450 leading-relaxed font-sans">
                  💡 列表中集成了您名下关联的所有核心在制和运营辅助子系统对口待办。
                </div>
              </div> {
                      toggleUserVacation(currentUser.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition duration-300 border text-center relative overflow-hidden group cursor-pointer ${
                    !userStatusMap[currentUser.id]?.isVacation 
                      ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 border-emerald-700 text-white shadow-md shadow-emerald-600/35 ring-3 ring-emerald-500/20 scale-100' 
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-sm font-black leading-none">
                    <span className="text-base group-hover:scale-125 transition-transform">💼</span>
                    <span>我在岗运营</span>
                  </div>
                  <span className={`text-[9px] mt-2 block font-extrabold leading-tight tracking-wider ${
                    !userStatusMap[currentUser.id]?.isVacation ? 'text-emerald-100' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}>
                    🔇 拦截全部邮件
                  </span>
                  
                  {!userStatusMap[currentUser.id]?.isVacation && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                </button>

                {/* 2. On Vacation Button */}
                <button
                  onClick={() => {
                    if (!userStatusMap[currentUser.id]?.isVacation) {
                      toggleUserVacation(currentUser.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition duration-300 border text-center relative overflow-hidden group cursor-pointer ${
                    userStatusMap[currentUser.id]?.isVacation 
                      ? 'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-600 text-white shadow-md shadow-amber-500/35 ring-3 ring-amber-400/20 scale-100' 
                      : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-sm font-black leading-none">
                    <span className="text-base group-hover:scale-125 transition-transform">🌴</span>
                    <span>我请假离岗</span>
                  </div>
                  <span className={`text-[9px] mt-2 block font-extrabold leading-tight tracking-wider ${
                    userStatusMap[currentUser.id]?.isVacation ? 'text-amber-100' : 'text-slate-400 group-hover:text-amber-600'
                  }`}>
                    📬 开启邮件代发
                  </span>
                  
                  {userStatusMap[currentUser.id]?.isVacation && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

        {/* ========================================== */}
        {/*           人员权限与智效管理中枢          */}
        {/* ========================================== */}
        <div id="personnel-intelligence-control" className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-6 shadow-sm text-left animate-fadeIn">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
            <div className="space-y-1.5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[9px] font-black font-mono uppercase border border-indigo-150">
                  Leadership Hub
                </span>
                {directLeader ? (
                  <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                    直属主管: <span className="text-slate-800">{directLeader.name}</span> ({directLeader.role})
                  </span>
                ) : (
                  <span className="text-[11px] text-indigo-650 font-bold flex items-center gap-1">
                    👑 <span>本组织最高主管层 (无直属上级)</span>
                  </span>
                )}
              </div>
              <h3 className="text-base font-black tracking-tight text-slate-900 flex items-center gap-2">
                👥 智能人员权限与代办看盘中枢
              </h3>
              <p className="text-xs text-slate-500">
                依据当前登录人的主管角色，动态汇总或钻取下属成员在各业务系统下的积压代办。
              </p>
            </div>

            {/* Tab switch control */}
            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl self-start lg:self-center shrink-0">
              <button
                id="btn-tab-analytics"
                onClick={() => setDashboardTab('analytics')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  dashboardTab === 'analytics'
                    ? 'bg-white text-indigo-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>📊 团队与个人大盘</span>
              </button>

            </div>
          </div>

          {/* Tab 1: Analytics */}
          {dashboardTab === 'analytics' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
              
              {/* Left Column: Personal Distribution */}
              <div className="xl:col-span-4 bg-slate-50/75 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span>💼 我的自留待办分布</span>
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setHideEmptySystems(!hideEmptySystems)}
                        className={`px-2 py-0.5 rounded-md text-[9px] font-black transition cursor-pointer border ${
                          hideEmptySystems 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-750' 
                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                        }`}
                        title={hideEmptySystems ? "显示所有业务系统" : "仅显示有活跃待办的系统"}
                      >
                        {hideEmptySystems ? '👁️ 仅看在制' : '🌐 显示全量'}
                      </button>
                      <span id="my-pending-total-badge" className="text-[10px] text-slate-605 font-bold font-mono">
                        {profilesPendingStats[currentUser.id]?.total || 0} 待办
                      </span>
                    </div>
                  </div>

                  {/* Profile mini bar */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${currentUser.avatarBg}`}>
                      {currentUser.avatarText}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-800">{currentUser.name} <span className="font-medium text-slate-500 text-[10px]">(您)</span></div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{currentUser.role}</div>
                    </div>
                  </div>

                  {/* Meter rows */}
                  <div className="space-y-3 pt-1">
                    {(() => {
                      const systemEntries = corporateSystems.map(sys => {
                        const count = (profilesPendingStats[currentUser.id]?.bySystem[sys.id]) || 0;
                        return { sys, count };
                      });

                      const visibleEntries = hideEmptySystems 
                        ? systemEntries.filter(e => e.count > 0) 
                        : systemEntries;

                      const hiddenCount = systemEntries.length - visibleEntries.length;

                      return (
                        <>
                          {visibleEntries.length > 0 ? (
                            <div className="space-y-3">
                              {visibleEntries.map(({ sys, count }) => {
                                const hasTasks = count > 0;
                                const totalPending = profilesPendingStats[currentUser.id]?.total || 0;
                                const percentage = totalPending > 0 ? Math.round((count / totalPending) * 100) : 0;
                                
                                const themeColors: Record<string, string> = {
                                  indigo: 'bg-indigo-600',
                                  emerald: 'bg-emerald-600',
                                  amber: 'bg-amber-500',
                                  rose: 'bg-rose-600',
                                  purple: 'bg-indigo-500',
                                };
                                const barColor = themeColors[sys.theme] || 'bg-slate-600';

                                return (
                                  <div key={sys.id} className="space-y-1.5 text-xs">
                                    <div className="flex items-center justify-between text-[11px]">
                                      <span className="font-bold text-slate-700 flex items-center gap-1 truncate max-w-[150px]" title={sys.name}>
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${barColor}`}></span>
                                        {sys.name}
                                      </span>
                                      <span className="font-mono font-bold text-slate-805">
                                        {count} 件 {hasTasks && <span className="text-slate-400 font-normal">({percentage}%)</span>}
                                      </span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${barColor} rounded-full transition-all duration-550`}
                                        style={{ width: `${hasTasks ? percentage : 0}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="py-8 text-center text-slate-450 border border-dashed border-slate-205 rounded-xl bg-white mt-1">
                              <span className="text-xl block mb-1">🌿</span>
                              <p className="text-[10px] font-black text-slate-700">暂无个人在制代办</p>
                              <p className="text-[9px] text-slate-400 mt-0.5">所有连结业务子系统运行在绿区</p>
                            </div>
                          )}

                          {hideEmptySystems && hiddenCount > 0 && (
                            <button
                              onClick={() => setHideEmptySystems(false)}
                              className="w-full mt-2 py-1 border border-dashed border-slate-200 hover:border-slate-300 rounded-xl text-center text-[10px] text-indigo-650 hover:text-indigo-850 font-black bg-white hover:bg-indigo-50/20 transition cursor-pointer"
                            >
                              展开其余 {hiddenCount} 个空置子系统 (0待办) ▾
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/50 text-[10px] text-slate-405 leading-relaxed">
                  💡 点击下方的源系统页签可直接在大盘过滤特定工序。
                </div>
              </div>

              {/* Right Column: Subordinates Area */}
              <div className="xl:col-span-8">
                <div className="bg-slate-50/40 border border-slate-200/50 rounded-2xl p-5 h-full flex flex-col justify-between">
                  <div>
                    {/* Header Toolbar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200/60 pb-3 mb-4 text-left">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                          <span>👥 我的团队下属待办监控</span>
                          <span className="bg-indigo-100 text-indigo-750 text-[10px] font-mono px-2 py-0.5 rounded-full font-black">
                            {subordinatesList.length} 人 reports
                          </span>
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          汇总生产岗位卡点，点击人员进行<b>大盘穿透式过滤。</b>
                        </p>
                      </div>

                      {/* Toolbar actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* 1. Subordinate search input */}
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="🔍 检索姓名/职责描述..."
                            value={subSearchQuery}
                            onChange={(e) => setSubSearchQuery(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-[10.5px] font-bold text-slate-700 w-44 focus:outline-none focus:border-indigo-400 transition"
                          />
                          {subSearchQuery && (
                            <button 
                              onClick={() => setSubSearchQuery('')}
                              className="absolute right-2 top-1.5 text-slate-405 hover:text-slate-600 text-xs"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* 2. System slots mode toggle */}
                        <button
                          onClick={() => setSubHideEmptySystems(!subHideEmptySystems)}
                          className={`px-2.5 py-1 rounded-xl text-[10.5px] font-black border transition cursor-pointer flex items-center gap-1 ${
                            subHideEmptySystems 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-750' 
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800'
                          }`}
                        >
                          {subHideEmptySystems ? '👁️ 隐藏零待办系统' : '🌐 显示全部系统槽'}
                        </button>

                        {/* 3. Layout switcher */}
                        <div className="flex items-center gap-0.5 bg-slate-200/50 border border-slate-200/40 p-0.5 rounded-xl text-xs font-medium shrink-0">
                          <button
                            onClick={() => setSubViewMode('card')}
                            className={`px-2 py-1 rounded-lg text-[10.5px] font-black transition cursor-pointer ${
                              subViewMode === 'card'
                                ? 'bg-white text-indigo-950 shadow-3xs'
                                : 'text-slate-550 hover:text-slate-750'
                            }`}
                          >
                            🎴 智能名片
                          </button>
                          <button
                            onClick={() => setSubViewMode('list')}
                            className={`px-2 py-1 rounded-lg text-[10.5px] font-black transition cursor-pointer ${
                              subViewMode === 'list'
                                ? 'bg-white text-indigo-950 shadow-3xs'
                                : 'text-slate-550 hover:text-slate-750'
                            }`}
                          >
                            📋 极简宽列
                          </button>
                        </div>

                        {/* 4. Active reset filter */}
                        {selectedSubordinateFilterId && (
                          <button
                            onClick={() => setSelectedSubordinateFilterId(null)}
                            className="text-[10px] bg-slate-900 border border-slate-950 hover:bg-slate-850 text-white font-black px-2.5 py-1 rounded-xl transition cursor-pointer shrink-0"
                          >
                            ↩ 取消过滤
                          </button>
                        )}
                      </div>
                    </div>

                    {subordinatesList.length > 0 ? (
                      filteredSubordinatesList.length > 0 ? (
                        subViewMode === 'card' ? (
                          /* Mode 1: Smart Card Grid View */
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredSubordinatesList.map(sub => {
                              const subStats = profilesPendingStats[sub.id] || { total: 0, bySystem: {} };
                              const isSelected = selectedSubordinateFilterId === sub.id;
                              const isSubOnVacation = userStatusMap[sub.id]?.isVacation || false;

                              return (
                                <div
                                  key={sub.id}
                                  id={`subordinate-card-${sub.id}`}
                                  onClick={() => {
                                    setSelectedSubordinateFilterId(isSelected ? null : sub.id);
                                  }}
                                  className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none text-left flex flex-col justify-between relative ${
                                    activeSystemMenu?.userId === sub.id ? 'z-20 overflow-visible' : 'z-10 overflow-hidden'
                                  } ${
                                    isSelected
                                      ? 'bg-gradient-to-br from-indigo-50/60 to-slate-50 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-350 shadow-3xs'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-start justify-between gap-2 pb-2">
                                      <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-xs shrink-0 ${sub.avatarBg}`}>
                                          {sub.avatarText}
                                        </div>
                                        <div className="leading-tight">
                                          <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                            <span>{sub.name}</span>
                                            {isSubOnVacation && (
                                              <span className="text-[9px] bg-amber-50 text-amber-705 border border-amber-200/50 px-1 py-0 rounded font-bold">🌴 假</span>
                                            )}
                                          </div>
                                          <div className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[130px]" title={sub.role}>{sub.role}</div>
                                        </div>
                                      </div>

                                      <div className="flex flex-col items-end shrink-0">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                                          subStats.total > 0
                                            ? 'bg-rose-50 text-rose-800 border-rose-200/45 border'
                                            : 'bg-slate-100 text-slate-400'
                                        }`}>
                                          {subStats.total} 待办
                                        </span>
                                        {isSelected && (
                                          <span className="text-[8px] text-indigo-750 font-extrabold animate-pulse mt-0.5">穿透透视中 🔎</span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Systems pending list tags */}
                                    {(() => {
                                      if (subHideEmptySystems) {
                                        const activeSystems = corporateSystems.filter(sys => (subStats.bySystem[sys.id] || 0) > 0);
                                        if (activeSystems.length === 0) {
                                          return (
                                            <div className="mt-3 py-1.5 px-2 bg-emerald-50/30 border border-emerald-150/50 rounded-xl text-emerald-850 text-[10px] leading-relaxed select-none">
                                              <span className="text-emerald-500 font-extrabold mr-1">●</span>
                                              <span className="font-semibold">运行状态优异 · 暂无待办积压</span>
                                            </div>
                                          );
                                        }

                                        return (
                                          <div className="flex flex-wrap gap-1.5 mt-3 min-h-[32px]">
                                            {activeSystems.map(sys => {
                                              const c = subStats.bySystem[sys.id] || 0;
                                              const isPopoverOpen = activeSystemMenu?.userId === sub.id && activeSystemMenu?.systemId === sys.id;
                                              const IconComp = getIconComponent(sys.icon);

                                              return (
                                                <div key={sys.id} className="relative">
                                                  <div 
                                                    onClick={(e) => {
                                                      e.stopPropagation(); // Avoid selecting the whole card
                                                      if (isPopoverOpen) {
                                                        setActiveSystemMenu(null);
                                                      } else {
                                                        setActiveSystemMenu({ userId: sub.id, systemId: sys.id });
                                                      }
                                                    }}
                                                    className="flex items-center gap-1 text-[10px] border border-indigo-150 bg-indigo-50/60 hover:bg-indigo-100/80 text-indigo-950 p-1 px-2 rounded-lg transition-all cursor-pointer font-bold shadow-4xs"
                                                  >
                                                    <IconComp className="w-2.5 h-2.5 text-indigo-500 shrink-0" />
                                                    <span className="truncate max-w-[65px]">{sys.id.replace('系统', '')}</span>
                                                    <span className="font-mono bg-rose-500 text-white rounded px-1 text-[8px] font-black scale-90">
                                                      {c}
                                                    </span>
                                                  </div>

                                                  {/* Dropdown popup with tasks list */}
                                                  {isPopoverOpen && renderSystemPopover(sub, sys, c)}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div className="grid grid-cols-2 gap-2 mt-3">
                                            {corporateSystems.map(sys => {
                                              const c = subStats.bySystem[sys.id] || 0;
                                              const hasItems = c > 0;
                                              const isPopoverOpen = activeSystemMenu?.userId === sub.id && activeSystemMenu?.systemId === sys.id;
                                              const IconComp = getIconComponent(sys.icon);

                                              return (
                                                <div key={sys.id} className="relative">
                                                  <div 
                                                    onClick={(e) => {
                                                      e.stopPropagation(); // Avoid selecting the whole card
                                                      if (hasItems) {
                                                        if (isPopoverOpen) {
                                                          setActiveSystemMenu(null);
                                                        } else {
                                                          setActiveSystemMenu({ userId: sub.id, systemId: sys.id });
                                                        }
                                                      }
                                                    }}
                                                    className={`flex items-center justify-between text-[10px] border p-1 px-2 rounded-lg transition-all ${
                                                      hasItems 
                                                        ? 'border-indigo-150 bg-indigo-50/55 hover:bg-indigo-100/70 text-indigo-950 cursor-pointer hover:scale-[1.01] shadow-3xs font-medium' 
                                                        : 'border-slate-100 bg-slate-50/70 text-slate-400 cursor-not-allowed'
                                                    }`}
                                                  >
                                                    <span className="text-slate-550 truncate max-w-[70px] flex items-center gap-1">
                                                      <IconComp className={`w-2.5 h-2.5 shrink-0 ${hasItems ? 'text-indigo-550' : 'text-slate-350'}`} />
                                                      {sys.id.replace('系统', '')}
                                                    </span>
                                                    <span className={`font-mono font-bold ${hasItems ? 'text-rose-600 font-extrabold' : 'text-slate-400'}`}>
                                                      {c}
                                                    </span>
                                                  </div>

                                                  {/* Dropdown popup with tasks list */}
                                                  {isPopoverOpen && renderSystemPopover(sub, sys, c)}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>

                                  {/* Ping subordinate button */}
                                  <button
                                    id={`btn-ping-subordinate-${sub.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Stop trigger card selection
                                      if (isSubOnVacation) {
                                        triggerToast(`📬 【SMTP 触发代发】下属【${sub.name}】正在休假离岗，系统已触发特快 SMTP 防积压邮件代发至：${sub.id}@corp.com，并抄送紧急代理人。`);
                                      } else {
                                        triggerToast(`⚡ 【智能督办消息】已对【${sub.name}】发出系统催办指令，解除免打扰通知，已通过多源工作提醒在岗完成。`);
                                      }
                                    }}
                                    className="w-full mt-3 bg-slate-900 hover:bg-slate-800 border border-slate-950 text-white text-[10px] font-black py-1.5 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <span>🔔 一键智能督办此人</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          /* Mode 2: Compact Wide List View */
                          <div className="space-y-2">
                            {filteredSubordinatesList.map(sub => {
                              const subStats = profilesPendingStats[sub.id] || { total: 0, bySystem: {} };
                              const isSelected = selectedSubordinateFilterId === sub.id;
                              const isSubOnVacation = userStatusMap[sub.id]?.isVacation || false;

                              return (
                                <div
                                  key={sub.id}
                                  id={`subordinate-list-row-${sub.id}`}
                                  onClick={() => {
                                    setSelectedSubordinateFilterId(isSelected ? null : sub.id);
                                  }}
                                  className={`border rounded-xl p-3 transition-all duration-200 cursor-pointer select-none text-left flex flex-col md:flex-row md:items-center justify-between gap-3 relative ${
                                    activeSystemMenu?.userId === sub.id ? 'z-20 overflow-visible' : 'z-10 overflow-hidden'
                                  } ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-indigo-50/60 to-slate-50 border-indigo-500 shadow-sm ring-1 ring-indigo-500/10'
                                      : 'bg-white hover:bg-slate-50/75 border-slate-200'
                                  }`}
                                >
                                  {/* Employee profile row info */}
                                  <div className="flex items-center gap-2.5 min-w-[180px] shrink-0">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] shadow-3xs shrink-0 ${sub.avatarBg}`}>
                                      {sub.avatarText}
                                    </div>
                                    <div className="leading-tight truncate">
                                      <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                        <span>{sub.name}</span>
                                        {isSubOnVacation && (
                                          <span className="text-[8px] bg-amber-50 text-amber-705 border border-amber-200/50 px-1 py-0 rounded font-bold">🌴 假</span>
                                        )}
                                        {isSelected && (
                                          <span className="text-[8px] text-indigo-750 font-extrabold">🔎 穿透卡点中</span>
                                        )}
                                      </div>
                                      <div className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[140px]" title={sub.role}>{sub.role}</div>
                                    </div>
                                  </div>

                                  {/* Center systems pending indicators */}
                                  <div className="flex-1 min-w-[200px]">
                                    {(() => {
                                      const activeSystems = corporateSystems.filter(sys => (subStats.bySystem[sys.id] || 0) > 0);
                                      if (activeSystems.length === 0) {
                                        return (
                                          <span className="inline-flex items-center gap-1 py-0.5 px-2 bg-emerald-50/40 border border-emerald-150/60 rounded-lg text-emerald-800 text-[9px] font-bold">
                                            <span className="text-emerald-500 text-[10px] animate-pulse">●</span>
                                            <span>全线通畅 · 0 挂起待办项</span>
                                          </span>
                                        );
                                      }

                                      if (subHideEmptySystems) {
                                        return (
                                          <div className="flex flex-wrap gap-1.5">
                                            {activeSystems.map(sys => {
                                              const c = subStats.bySystem[sys.id] || 0;
                                              const isPopoverOpen = activeSystemMenu?.userId === sub.id && activeSystemMenu?.systemId === sys.id;
                                              const IconComp = getIconComponent(sys.icon);

                                              return (
                                                <div key={sys.id} className="relative">
                                                  <div 
                                                    onClick={(e) => {
                                                      e.stopPropagation(); // Avoid triggering row selection
                                                      if (isPopoverOpen) {
                                                        setActiveSystemMenu(null);
                                                      } else {
                                                        setActiveSystemMenu({ userId: sub.id, systemId: sys.id });
                                                      }
                                                    }}
                                                    className="flex items-center gap-1 text-[9.5px] border border-indigo-150 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-950 p-1 px-2 rounded-lg transition cursor-pointer font-bold"
                                                  >
                                                    <IconComp className="w-2.5 h-2.5 text-indigo-500 shrink-0" />
                                                    <span className="truncate max-w-[65px]">{sys.id.replace('系统', '')}</span>
                                                    <span className="font-mono bg-rose-500 text-white rounded px-0.5 text-[8px] font-black scale-90">
                                                      {c}
                                                    </span>
                                                  </div>

                                                  {/* Popover popup */}
                                                  {isPopoverOpen && renderSystemPopover(sub, sys, c)}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div className="flex flex-wrap gap-1.5">
                                            {corporateSystems.map(sys => {
                                              const c = subStats.bySystem[sys.id] || 0;
                                              const hasItems = c > 0;
                                              const isPopoverOpen = activeSystemMenu?.userId === sub.id && activeSystemMenu?.systemId === sys.id;
                                              const IconComp = getIconComponent(sys.icon);

                                              return (
                                                <div key={sys.id} className="relative">
                                                  <div 
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      if (hasItems) {
                                                        if (isPopoverOpen) {
                                                          setActiveSystemMenu(null);
                                                        } else {
                                                          setActiveSystemMenu({ userId: sub.id, systemId: sys.id });
                                                        }
                                                      }
                                                    }}
                                                    className={`flex items-center gap-1 text-[9.5px] border p-0.5 px-2 rounded-lg transition-all ${
                                                      hasItems 
                                                        ? 'border-indigo-150 bg-indigo-50/55 hover:bg-indigo-100/70 text-indigo-950 cursor-pointer font-bold' 
                                                        : 'border-slate-100 bg-slate-50/50 text-slate-400 font-medium cursor-not-allowed text-[8.5px]'
                                                    }`}
                                                  >
                                                    <IconComp className={`w-2.5 h-2.5 ${hasItems ? 'text-indigo-500' : 'text-slate-350'}`} />
                                                    <span className="truncate max-w-[60px]">{sys.id.replace('系统', '')}</span>
                                                    <span className={`font-mono font-bold ${hasItems ? 'text-rose-600' : 'text-slate-400'}`}>
                                                      {c}
                                                    </span>
                                                  </div>

                                                  {/* Popover popup */}
                                                  {isPopoverOpen && renderSystemPopover(sub, sys, c)}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      }
                                    })()}
                                  </div>

                                  {/* Right actions: stats & single notification ping */}
                                  <div className="flex items-center gap-2 md:justify-end shrink-0">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                                      subStats.total > 0
                                        ? 'bg-rose-50 text-rose-800 border-rose-200/40 border'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                      {subStats.total} 待办
                                    </span>

                                    <button
                                      id={`btn-ping-subordinate-list-${sub.id}`}
                                      onClick={(e) => {
                                        e.stopPropagation(); // Avoid triggering row selection
                                        if (isSubOnVacation) {
                                          triggerToast(`📬 【SMTP 触发代发】下属【${sub.name}】正在休假离岗，系统已触发特快 SMTP 防积压邮件代发至：${sub.id}@corp.com，并抄送紧急代理人。`);
                                        } else {
                                          triggerToast(`⚡ 【智能督办消息】已对【${sub.name}】发出系统催办指令，已在岗完成关联通。`);
                                        }
                                      }}
                                      className="bg-slate-900 border border-slate-950 hover:bg-slate-800 text-white text-[9.5px] font-black px-2 py-1 rounded-lg transition shrink-0 cursor-pointer"
                                    >
                                      🔔 督办
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )
                      ) : (
                        /* Subordinate Search Results Empty */
                        <div className="bg-white border border-dashed border-slate-200/80 p-8 rounded-2xl text-center space-y-3 shadow-3xs flex flex-col items-center justify-center min-h-[160px]">
                          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-sm font-bold text-indigo-500">
                            🔍
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-black text-slate-750">未查找到匹配此特征特征的团队下属</p>
                            <p className="text-[10px] text-slate-400 leading-relaxed max-w-sm">
                              请检查名字或岗位检索条件。您可以一键恢复筛选，查看全体团队成员状态。
                            </p>
                          </div>
                          <button
                            onClick={() => setSubSearchQuery('')}
                            className="text-[10.5px] bg-slate-100 border border-slate-200 hover:bg-slate-150 text-slate-600 font-extrabold px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            🧹 清空并恢复全体显示
                          </button>
                        </div>
                      )
                    ) : (
                      /* No direct subordinates at all */
                      <div className="bg-white border border-dashed border-slate-200 p-8 rounded-2xl text-center space-y-3 shadow-3xs flex flex-col items-center justify-center min-h-[160px]">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-base text-slate-400">
                          👥
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-700">您当前所在的权限组没有直接下属</p>
                          <p className="text-[10px] text-slate-400 leading-relaxed max-w-sm">
                            无法展示部门统计。请在上方切换到<b>【汇报关系治理】</b>，将其他人员划归到您名下（主管），一键激活跨系统管理视角！
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Hierarchy Organization */}
          {dashboardTab === 'hierarchy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
              
              {/* Left Tree visual */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-3xs">
                  <h5 className="text-xs font-black text-slate-800 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                    <span>📈 部门即时汇报拓扑树</span>
                  </h5>
                  <div className="bg-slate-50/50 border border-slate-150 p-4 rounded-xl min-h-[140px] flex flex-col justify-center overflow-x-auto text-[11px]">
                    {profiles.filter(p => !p.managerId || !profiles.some(parent => parent.id === p.managerId)).map(root => {
                      const rootPending = profilesPendingStats[root.id]?.total || 0;
                      
                      return (
                        <div key={root.id} className="first:mt-0 mt-4">
                          <div className="inline-flex items-center gap-2 bg-indigo-650 text-white rounded-xl p-2 px-3.5 shadow-sm border border-indigo-700">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${root.avatarBg} shrink-0`}>
                              {root.avatarText}
                            </div>
                            <div>
                              <div className="text-xs font-extrabold flex items-center gap-1 text-white">
                                <span>{root.name}</span>
                                <span className="text-[8px] text-indigo-200 font-medium bg-indigo-950/30 px-1 rounded-sm">直辖</span>
                              </div>
                            </div>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold leading-none shrink-0 border border-white/5">
                              {rootPending} 待办
                            </span>
                          </div>
                          
                          {/* Children */}
                          {profiles.filter(p => p.managerId === root.id).length > 0 && (
                            <div className="mt-1">
                              {profiles.filter(p => p.managerId === root.id).map(child => {
                                const childPending = profilesPendingStats[child.id]?.total || 0;
                                const subChildren = profiles.filter(p => p.managerId === child.id);

                                return (
                                  <div key={child.id} className="ml-5 border-l-2 border-dashed border-slate-200 pl-4 my-2 relative">
                                    <div className="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-indigo-500 border border-white"></div>
                                    <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-205 rounded-lg p-1 px-2">
                                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black ${child.avatarBg}`}>{child.avatarText}</span>
                                      <span className="font-extrabold text-slate-800">{child.name}</span>
                                      <span className="text-slate-400 py-0.5 px-1 bg-slate-100 rounded text-[8px] font-mono font-bold">{childPending} 待办</span>
                                    </div>

                                    {/* Grandchildren */}
                                    {subChildren.map(gc => {
                                      const gcPending = profilesPendingStats[gc.id]?.total || 0;
                                      return (
                                        <div key={gc.id} className="ml-6 border-l-2 border-dashed border-slate-200 pl-4 my-2 relative">
                                          <div className="absolute -left-1 top-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 border border-white"></div>
                                          <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded p-1 px-1.5">
                                            <span className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-black ${gc.avatarBg}`}>{gc.avatarText}</span>
                                            <span className="font-bold text-slate-750">{gc.name}</span>
                                            <span className="text-slate-400 py-0.5 px-1 bg-slate-100 rounded text-[8px] font-mono font-bold">{gcPending} 待办</span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Table editor */}
              <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200/80 p-5 rounded-2xl text-left">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider border-b border-slate-200/60 pb-3 mb-4">
                  <span>⚙ 组织汇报关系重构配置（实时修改，即刻统合数据）</span>
                </h4>
                <p className="text-[10px] text-slate-450 mb-4 leading-relaxed">
                  可任意修改任何人的领导，中枢将在一秒内自动应用汇报穿透关系，主管可透视下属。
                </p>

                <div className="space-y-2.5">
                  {profiles.map(p => {
                    const eligibleManagers = getEligibleManagers(p.id);
                    const isSelf = p.id === currentUser.id;

                    return (
                      <div key={p.id} className="bg-white border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition hover:shadow-3xs">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shadow-xs shrink-0 ${p.avatarBg}`}>
                            {p.avatarText}
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {isSelf && (
                                <span className="bg-indigo-600 text-white text-[8px] font-mono px-1 rounded-sm">我</span>
                              )}
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[200px]">{p.role}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">直属领导:</span>
                          <select
                            id={`select-manager-for-${p.id}`}
                            value={p.managerId || ''}
                            onChange={(e) => {
                              const newManagerId = e.target.value;
                              
                              // Update roles in state
                              setProfiles(prev => prev.map(item => 
                                item.id === p.id ? { ...item, managerId: newManagerId } : item
                              ));
                              
                              if (newManagerId === '') {
                                triggerToast(`🔄 架构变更：已解除【${p.name}】的主从隶属，使其无直属领导。`);
                              } else {
                                const mName = profiles.find(item => item.id === newManagerId)?.name || '主管';
                                triggerToast(`🔄 汇报拓扑重塑：已将【${p.name}】的直接主管配置变更为【${mName}】。下属大盘数据动态合并完成！`);
                              }
                            }}
                            className="bg-slate-50 border border-slate-300 rounded-lg p-1 px-2 text-xs text-slate-800 font-bold focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer outline-none min-w-[120px]"
                          >
                            <option value="">(无领导/最高级)</option>
                            {eligibleManagers.map(m => (
                              <option key={m.id} value={m.id}>
                                {m.name} ({m.fullName.split(' - ')[0]})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Subordinate Drill-down 透视模式悬浮控制条 */}
        {activeSubordinateFilterObj && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/75 p-4.5 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs animate-fadeIn text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <div className="leading-tight">
                <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5 flex-wrap">
                  <span>🕵️‍♂️ 当前处于主管透视透察模式，正在下钻浏览下属成员 【{activeSubordinateFilterObj.name}】 的生产线待办！</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[8px] font-bold font-mono">DRILL_DOWN_ACTIVE</span>
                </h4>
                <p className="text-[10px] text-amber-700/90 mt-1">
                  下方列表中的所有状态卡点分类计数、筛选标签和已办催办已完成动态切重定向，均由下属真实流转反馈。
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSubordinateFilterId(null)}
              className="bg-slate-900 shadow-sm border border-slate-950 text-slate-100 hover:bg-slate-800 text-[10px] px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer shrink-0"
            >
              ↩ 一键退出，回到我的个人待办
            </button>
          </div>
        )}

        <div id="quick-system-tabs-filter" className="bg-white border border-slate-200/80 rounded-2xl p-4.5 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-2xs text-left animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[9px] font-black text-indigo-700 tracking-wider font-mono">
              FILTER
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-black text-slate-800 tracking-tight">按核心来源系统过滤</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">即刻筛选并单独呈现特定业务系统底层的异构待办通知卡</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-1 lg:justify-end">
            {/* All systems */}
            <button
              id="filter-tab-all"
              onClick={() => setSelectedSystemFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-3xs border active:scale-[0.98] select-none ${
                selectedSystemFilter === 'all'
                  ? 'bg-slate-900 border-slate-900 text-white font-extrabold shadow-sm shadow-slate-950/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>全部挂在待办 ({usersActiveUnresolvedTasks.length})</span>
            </button>

            {corporateSystems.map((sys) => {
              const count = usersActiveUnresolvedTasks.filter(t => t.sourceSystem === sys.id).length;
              const IconComp = getIconComponent(sys.icon);
              const isSelected = selectedSystemFilter === sys.id;
              const tTheme = COLOR_THEMES[sys.theme] || COLOR_THEMES.indigo;

              return (
                <button
                  key={sys.id}
                  id={`filter-tab-${sys.id}`}
                  onClick={() => setSelectedSystemFilter(sys.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-3xs border active:scale-[0.98] select-none ${
                    isSelected
                      ? `${tTheme.bg} border-transparent text-white font-extrabold shadow-sm shadow-slate-950/15`
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-705'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : tTheme.color}`} />
                  <span className="truncate max-w-[100px]">{sys.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-black shrink-0 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : count > 0 ? 'bg-amber-100 text-amber-900 font-bold border border-amber-200/50' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/*           待办大盘动态多表格映射数据中枢         */}
        {/* ========================================== */}
        {corporateSystems.map((sys) => {
          if (selectedSystemFilter !== 'all' && selectedSystemFilter !== sys.id) return null;

          const sysTasks = usersActiveUnresolvedTasks.filter(t => t.sourceSystem === sys.id);
          const IconComp = getIconComponent(sys.icon);
          const tTheme = COLOR_THEMES[sys.theme] || COLOR_THEMES.indigo;

          return (
            <div key={sys.id} id={`table-container-${sys.id}`} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition hover:shadow-sm mb-6 text-left">
              
              {/* Dynamic Header */}
              <div className={`p-4 bg-linear-to-r ${tTheme.bg.split(' ')[0]}/30 to-white border-b border-slate-105 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${tTheme.bg} ${tTheme.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                      {sys.name}
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${tTheme.bg} ${tTheme.color}`}>
                        {sys.id === '异常物料处理系统' ? 'MRB PROCESS' : sys.id === '异常处理系统-Others' ? 'OTHERS SYS' : sys.id === '查询录像审批流程' ? 'CCTV RECORD' : sys.id === '借还机申请' ? 'EQUIP LOAN' : sys.id === 'buyoff流程' ? 'BUYOFF CHECK' : sys.id === '2代分析系统' ? 'FA SYS V2' : sys.id === '物料报废' ? 'EHS SCRAP' : sys.id === '自由弹夹领用' ? 'FOUP REQUEST' : 'DYNAMIC SOURCE'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sys.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
                  <span>待处理挂件:</span>
                  <span className={`px-2.5 py-0.5 rounded-full ${tTheme.badgeBg} font-extrabold`}>{sysTasks.length} 条</span>
                </div>
              </div>

              {/* Dynamic Table Layout */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4 w-[28%]">主题/名称 (Title / Subject)</th>
                      <th className="py-3 px-4 w-[32%]">详情描述/正文摘要 (Details / Content)</th>
                      <th className="py-3 px-4 w-[12%]">分类类型 (Category)</th>
                      <th className="py-3 px-4 w-[10%] text-center">优先度 (Priority)</th>
                      <th className="py-3 px-4 w-[11%]">最终截止时限 (Due Time)</th>
                      <th className="py-3 px-4 w-[7%] text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sysTasks.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-405 font-medium">
                          <div className="flex flex-col items-center justify-center gap-2 max-w-[280px] mx-auto text-center">
                            <CheckCircle2 className={`w-8 h-8 ${tTheme.color}`} />
                            <span className="text-slate-700 font-bold text-xs mt-1">完美！【{sys.name}】中无挂置待办</span>
                            <span className="text-[10px] text-slate-400 leading-normal">没有需要您即时批办的待办项或安全通阻指令，当前通道健康绿色。</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      sysTasks.map((task) => (
                        <tr 
                          key={task.id} 
                          id={`tr-${task.id}`}
                          onClick={() => setSelectedTaskId(task.id)}
                          className="hover:bg-slate-50/40 cursor-pointer transition relative group"
                        >
                          <td className="py-4 px-4 font-extrabold text-slate-900 group-hover:text-indigo-650 flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${tTheme.color.replace('text-', 'bg-')} shrink-0`}></span>
                            <span className="line-clamp-2 leading-snug">{task.title}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-500 leading-relaxed">
                            <span className="line-clamp-2 text-slate-500">{task.description}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600 font-bold border border-slate-200/50 text-[10px]">
                                {task.category}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-xs border text-[10px] font-bold ${
                              task.priority === 'high' 
                                ? 'bg-rose-50 border-rose-300 text-rose-700 font-black' 
                                : task.priority === 'medium' ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}>
                              {task.priority === 'high' ? '🔴 特急' : task.priority === 'medium' ? '🟡 中急' : '🔵 低缓'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-400 font-mono font-bold">
                            <div className="flex flex-col">
                              <span className="text-slate-700">{task.dueDate}</span>
                              <span className="text-[10px] text-red-500">
                                {task.dueDate === '2026-06-11' ? '今天截止' : task.dueDate < '2026-06-11' ? '已超期' : '限期安全'}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTaskId(task.id);
                              }}
                              className={`bg-slate-50 hover:text-white border px-2 py-1 text-[11px] font-extrabold rounded-md transition flex items-center gap-1 mx-auto cursor-pointer ${
                                sys.theme === 'indigo' ? 'hover:bg-indigo-600 hover:border-indigo-600 text-indigo-700' :
                                sys.theme === 'emerald' ? 'hover:bg-emerald-600 hover:border-emerald-600 text-emerald-700' :
                                sys.theme === 'amber' ? 'hover:bg-amber-600 hover:border-amber-600 text-amber-800' :
                                sys.theme === 'rose' ? 'hover:bg-rose-600 hover:border-rose-600 text-rose-700' :
                                sys.theme === 'violet' ? 'hover:bg-violet-600 hover:border-violet-600 text-violet-700' :
                                sys.theme === 'cyan' ? 'hover:bg-cyan-600 hover:border-cyan-600 text-cyan-700' :
                                sys.theme === 'red' ? 'hover:bg-red-600 hover:border-red-600 text-red-700' :
                                sys.theme === 'teal' ? 'hover:bg-teal-600 hover:border-teal-600 text-teal-700' :
                                'hover:bg-slate-600 hover:border-slate-600 text-slate-700'
                              }`}
                            >
                              <span>批阅</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          );
        })}

        {/* --- SYSTEM HISTORICAL ARCHIVE FOR COMPLETED ITEMS (DASHBOARD REPLICATE) --- */}
        {usersCompletedTasksArchive.length > 0 && (
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-left">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-emerald-600" />
              当前登录人 ( {currentUser.name} ) 今日已办结的历史挂号记录 ({usersCompletedTasksArchive.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {usersCompletedTasksArchive.map((completedItem) => (
                <div 
                  key={completedItem.id}
                  className="p-3 bg-white border border-slate-200/60 rounded-lg text-xs flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded-sm bg-slate-100 text-slate-500 text-[9px] border font-bold">
                        {completedItem.sourceSystem}
                      </span>
                      <span className="text-slate-400 text-[10px]">•</span>
                      <span className="text-slate-400 font-mono text-[9px]">结案于: 2026-06-11</span>
                    </div>

                    <p className="font-extrabold text-slate-600 truncate mt-1 line-through decoration-slate-400/60">
                      {completedItem.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleReopenTask(completedItem.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-[10px] font-extrabold cursor-pointer hover:underline"
                    >
                      恢复重新办理
                    </button>
                    <button 
                      onClick={(e) => handleDeleteTaskRecord(completedItem.id, e)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      title="删除记录"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
        </>
      )}

      {/* ======================================================== */}
      {/* 5. GORGEOUS HIGH-FIDELITY DETAILED SIMULATED SYSTEM MODAL */}
      {/* ======================================================== */}
      {activeDetailTask && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          
          <div className="bg-white rounded-2xl border border-slate-100 max-w-2xl w-full text-left shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Top Color Ribbon based on system origin */}
            <div className={`h-2.5 w-full ${
              (() => {
                const sysOpt = corporateSystems.find(s => s.id === activeDetailTask.sourceSystem);
                if (sysOpt?.theme === 'indigo') return 'bg-indigo-600';
                if (sysOpt?.theme === 'emerald') return 'bg-emerald-500';
                if (sysOpt?.theme === 'amber') return 'bg-amber-500';
                if (sysOpt?.theme === 'rose') return 'bg-rose-500';
                if (sysOpt?.theme === 'violet') return 'bg-violet-500';
                if (sysOpt?.theme === 'cyan') return 'bg-cyan-500';
                if (sysOpt?.theme === 'red') return 'bg-red-500';
                if (sysOpt?.theme === 'teal') return 'bg-teal-500';
                return 'bg-blue-500';
              })()
            }`} />

            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                {(() => {
                  const sysOpt = corporateSystems.find(s => s.id === activeDetailTask.sourceSystem);
                  const IconComp = getIconComponent(sysOpt?.icon || 'Workflow');
                  const themeColorClass = 
                    sysOpt?.theme === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                    sysOpt?.theme === 'emerald' ? 'bg-emerald-50 text-emerald-700' :
                    sysOpt?.theme === 'amber' ? 'bg-amber-50 text-amber-700' :
                    sysOpt?.theme === 'rose' ? 'bg-rose-50 text-rose-700' :
                    sysOpt?.theme === 'violet' ? 'bg-violet-50 text-violet-750' :
                    sysOpt?.theme === 'cyan' ? 'bg-cyan-50 text-cyan-750' :
                    sysOpt?.theme === 'red' ? 'bg-red-50 text-red-700' :
                    sysOpt?.theme === 'teal' ? 'bg-teal-50 text-teal-750' :
                    'bg-blue-50 text-blue-750';
                  return (
                    <div className={`p-2.5 rounded-xl ${themeColorClass}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                  );
                })()}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-400">原系统详情页 (Simulated Embedded Document)</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono font-bold">
                      {activeDetailTask.sourceSystem}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mt-1 leading-snug">
                    {activeDetailTask.title}
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTaskId(null)}
                className="p-1 px-2.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 text-sm font-bold block cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Document Content Box */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Core Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-xs">
                <div>
                  <div className="text-slate-400 font-bold uppercase text-[10px]">当前经办负责人：</div>
                  <div className="text-slate-800 font-extrabold mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {activeDetailTask.assignee}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-bold uppercase text-[10px]">要求完成时限 (SLA)：</div>
                  <div className="text-slate-800 font-extrabold mt-1 font-mono">
                    {activeDetailTask.dueDate} 
                    <span className="ml-2 text-red-500">
                      ({activeDetailTask.dueDate === '2026-06-11' ? '今日24点前' : activeDetailTask.dueDate < '2026-06-11' ? '超期预警' : '剩余时间安全'})
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-bold uppercase text-[10px]">源任务发起类别：</div>
                  <div className="text-slate-800 font-medium mt-1">
                    {activeDetailTask.category} (系统内录)
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 font-bold uppercase text-[10px]">加急研判说明：</div>
                  <div className="text-slate-600 font-normal mt-1 leading-snug">
                    {activeDetailTask.urgencyExplanation || '等级制度化决策配置，确保各级业务通达。'}
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 border-t border-slate-200/60 pt-3">
                  <div className="text-slate-400 font-bold uppercase text-[10px] mb-1">内网 SMTP 连接器投递判定：</div>
                  {(() => {
                    const userKey = activeDetailTask.assignee.includes('李明') ? 'liming' : activeDetailTask.assignee.includes('张静') ? 'zhangjing' : activeDetailTask.assignee.includes('赵磊') ? 'zhaolei' : 'wangfang';
                    const isTrgVacation = userStatusMap[userKey]?.isVacation || false;
                    const name = activeDetailTask.assignee.split(' - ')[1];
                    return isTrgVacation ? (
                      <div className="text-slate-700 leading-relaxed bg-amber-50 h-[38] px-3 border border-amber-200/50 rounded-lg flex items-center gap-2 select-none">
                        <span className="shrink-0 text-xs">📬</span>
                        <span>因 <strong>{name}</strong> 当前处于<strong>【请假离岗】</strong>模式下，微件已触发 SMTP 保障性同步下发。请在 <u>{userKey}@corp.com</u> 查收。</span>
                      </div>
                    ) : (
                      <div className="text-slate-700 leading-relaxed bg-emerald-50 h-[38] px-3 border border-emerald-200/50 rounded-lg flex items-center gap-2 select-none">
                        <span className="shrink-0 text-xs">🔇</span>
                        <span>因 <strong>{name}</strong> 当前处于<strong>【在岗运营】</strong>状态中，看板代办正常显示，已成功静默拦截多余的通知发函。</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* High Fidelity System Template Representation */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 flex items-center justify-between">
                  <span>📄 原系统表单数据凭证 (Original Form Data View)</span>
                  <span className="text-[10px] text-slate-400 font-mono">NO. {activeDetailTask.id}</span>
                </div>

                <div className="p-4 bg-slate-50/40 text-slate-700 space-y-3 font-mono leading-relaxed">
                  
                  {/* 异常物料处理系统 Form Mock */}
                  {activeDetailTask.sourceSystem === '异常物料处理系统' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-rose-600 font-bold">异常在制品批次：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Wafer Lot #LOT-SGP-12102 (12nm Core SoC先进制程批)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-rose-600 font-bold">MRB 拦截节点：</span>
                        <span className="col-span-9 text-slate-500 font-mono">Process_Step_Code === EXP_P010_DUV or Sorter_Action === HOLD</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-rose-600 font-bold">异常追溯快照：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 异常处理系统-Others Form Mock */}
                  {activeDetailTask.sourceSystem === '异常处理系统-Others' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-amber-600 font-bold">Others 物理站点：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Fab3_Substation_GasHall (特气主配送间/厂务二次配管)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-amber-600 font-bold">应急自愈规则：</span>
                        <span className="col-span-9 text-slate-500 font-mono">Safety_Check_Status === VERIFYING or Air_Ventilation_Rate_Ratio &gt; 98%</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-amber-600 font-bold">异常日志事件：</span>
                        <span className="col-span-9 leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-400 font-mono whitespace-pre-wrap">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 查询录像审批流程 Form Mock */}
                  {activeDetailTask.sourceSystem === '查询录像审批流程' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-indigo-600 font-bold">监控调阅机台：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">CCTV-F3-EXPOSURE-04 (曝光净化间ASML作业区)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-indigo-600 font-bold">时间戳范围：</span>
                        <span className="col-span-9 text-slate-500 font-mono">2026-06-11 13:30:00 - 14:00:00 (前置30分钟回溯)</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-indigo-600 font-bold">回放申请说明：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 借还机申请 Form Mock */}
                  {activeDetailTask.sourceSystem === '借还机申请' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-emerald-600 font-bold">借调装配机件：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">ASML-Scanner-LaserDuo (超高精对准双工模组零配)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-emerald-600 font-bold">流转结算状态：</span>
                        <span className="col-span-9 text-slate-500">申请借用 48 小时极速测试，完毕即刻状态通退</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-emerald-600 font-bold">借件需求摘要：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* buyoff流程 Form Mock */}
                  {activeDetailTask.sourceSystem === 'buyoff流程' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-violet-600 font-bold">复产 Buyoff 批次：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Wafer Lot Buyoff #LOT-BO-88941</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-violet-600 font-bold">WeCo 失控规则对齐：</span>
                        <span className="col-span-9 text-slate-500">失控规则(UCL/LCL)在控校验通过, 临界良率验证完毕</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-violet-600 font-bold">Buyoff 判定说明：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 2代分析系统 Form Mock */}
                  {activeDetailTask.sourceSystem === '2代分析系统' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-cyan-600 font-bold">失效分析项目(FA)：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">KLA-Yield-Defect (先进制程缺陷图像电镜切片图像分析)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-cyan-600 font-bold">电镜测试编号：</span>
                        <span className="col-span-9 text-slate-500 font-mono">SEM-FA-SYS2-V2 === EXECUTED</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-cyan-600 font-bold">分析诊断详情：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 物料报废 Form Mock */}
                  {activeDetailTask.sourceSystem === '物料报废' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-red-600 font-bold">报废物料清单：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Expired Ultra-Photoresist-Cryo (过期低温避光光刻原料)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-red-600 font-bold">环境安全级别：</span>
                        <span className="col-span-9 font-bold bg-rose-50 border border-rose-250 text-rose-700 px-2 rounded-sm text-[10px] w-fit">危化品EHS安全报废受控级</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-red-600 font-bold">报废理由及数量：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* 自由弹夹领用 Form Mock */}
                  {activeDetailTask.sourceSystem === '自由弹夹领用' && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-teal-600 font-bold">申领弹夹箱(FOUP)：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Standard Wafer FOUP #MC-881 (晶圆隔离防污染弹夹)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-teal-600 font-bold">洗消状态记录：</span>
                        <span className="col-span-9 text-[10px] text-teal-700 font-bold bg-teal-50 px-2 rounded border border-teal-200 w-fit">已烘干洗消，洁净度及微粒子检测通过</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-teal-600 font-bold">领用去向说明：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* Fallback Form Mock if other */}
                  {!['异常物料处理系统', '异常处理系统-Others', '查询录像审批流程', '借还机申请', 'buyoff流程', '2代分析系统', '物料报废', '自由弹夹领用'].includes(activeDetailTask.sourceSystem) && (
                    <div className="space-y-2 text-slate-700 font-sans text-xs">
                      <div className="grid grid-cols-12 border-b border-slate-200 pb-2">
                        <span className="col-span-3 text-slate-500 font-bold">关联生产系统：</span>
                        <span className="col-span-9 font-bold text-slate-850">{activeDetailTask.sourceSystem}</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-slate-500 font-bold">指令内容正文：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Sub-steps Process List checklist */}
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <ClipboardCheck className="w-4.5 h-4.5 text-indigo-600" />
                  拆解行动子任务步骤 (请勾选协同，确认是否全部检查完毕)：
                </h4>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                  {(activeDetailTask.actionSteps || []).map((step) => (
                    <div 
                      key={step.id}
                      onClick={() => handleToggleSubStep(activeDetailTask.id, step.id)}
                      className="flex items-start gap-2.5 cursor-pointer p-1 hover:bg-slate-200/30 rounded transition"
                    >
                      <button className="text-indigo-600 mt-0.5 shrink-0 select-none">
                        {step.completed ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                        )}
                      </button>
                      <span className={`leading-tight font-medium ${step.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                  
                  {(!activeDetailTask.actionSteps || activeDetailTask.actionSteps.length === 0) && (
                    <div className="text-slate-400 italic">由规则中枢系统配置中，暂无强制硬性子项规范。可直接执行整改办结。</div>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>该待办流转中枢关联ID:</span>
                <span className="font-mono font-bold bg-white text-slate-600 border px-1.5 py-0.5 rounded">{activeDetailTask.id}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedTaskId(null)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 bg-white transition cursor-pointer text-center"
                >
                  暂存不办，返回
                </button>

                <button
                  onClick={() => handleCompleteTask(activeDetailTask.id)}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-black text-slate-100 bg-indigo-600 hover:bg-indigo-500 transition shadow-inner flex items-center justify-center gap-1 cursor-pointer text-center"
                >
                  <Check className="w-4.5 h-4.5" />
                  <span>我已处理完毕，直接办结销除</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}



    </div>
  );
}
