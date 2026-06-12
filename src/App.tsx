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
  Users
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
    const saved = localStorage.getItem('smart_tasks_profiles_v3');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'liming', name: '李明', fullName: '运维组 - 李明', role: '系统与硬件运维组负责人', avatarBg: 'bg-emerald-600 text-white', avatarText: 'LM', managerId: 'zhangjing' },
      { id: 'zhangjing', name: '张静', fullName: '财务总监 - 张静', role: '核心财务总监 & 商务审计', avatarBg: 'bg-indigo-600 text-white', avatarText: 'ZJ', managerId: '' },
      { id: 'zhaolei', name: '赵磊', fullName: '系统开发 - 赵磊', role: '中台开发与客户服务工程师', avatarBg: 'bg-amber-500 text-slate-900', avatarText: 'ZL', managerId: 'liming' },
      { id: 'wangfang', name: '王芳', fullName: '安全合规官 - 王芳', role: '合规官 & CISO 首席安全官', avatarBg: 'bg-rose-600 text-white', avatarText: 'WF', managerId: 'zhangjing' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('smart_tasks_profiles_v3', JSON.stringify(profiles));
  }, [profiles]);

  // Deeply expanded initial tasks to ensure all 4 users get rich system tasks
  const defaultTasks: Task[] = [
    // === 李明 (运维组) ===
    {
      id: 'task-lm-1',
      title: '华北1区主数据库(10.150)连接数过载崩溃告警',
      description: 'IT监控报警详情：数据库连接池空闲数低至2%，查询响应延迟达2500ms以上。极大概率存在慢语句或者内存泄漏，需要分配主节点限流。',
      category: '系统告警',
      status: 'pending',
      priority: 'high',
      sourceSystem: '监控系统',
      dueDate: '2026-06-10', // Overdue
      createdDate: '2026-06-09',
      assignee: '运维组 - 李明',
      urgencyExplanation: '数据库主节点过载直接影响线上订单下单提交，属于特急高优，建议立刻执行限流并检查慢查询SQL日志。',
      actionSteps: [
        { id: 'lm1-1', text: '登录监控控制台，拉取慢查询SQL列表定位堵塞事务', completed: true },
        { id: 'lm1-2', text: '对数据库应用连接池配置动态限流，释放空闲连接', completed: false },
        { id: 'lm1-3', text: '联系DBA在低峰期创建物理覆盖索避免全表扫描', completed: false }
      ]
    },
    {
      id: 'task-lm-2',
      title: '华南B机房年度精密空调恒温恒湿维保款项审批案',
      description: 'OA审核编号#OA-9402：2026年度托管机房合同续签。包含维保周期清洁及故障全天候上门技术支持，合同总金额 9.8 万元。',
      category: '款项审批',
      status: 'pending',
      priority: 'medium',
      sourceSystem: 'OA系统',
      dueDate: '2026-06-13',
      createdDate: '2026-06-11',
      assignee: '运维组 - 李明',
      urgencyExplanation: '保障华南主IDC安全运行的后勤维护，属常规中急，需本周五前签署完毕。',
      actionSteps: [
        { id: 'lm2-1', text: '核对维保方案中提及的巡检频率与违约赔偿条款', completed: true },
        { id: 'lm2-2', text: '于OA表单上传运维小组核可纪要并流转下一级财务初审', completed: false }
      ]
    },
    {
      id: 'task-lm-3',
      title: '关于运维全员堡垒机单端共享鉴权证书风险排查',
      description: '高密邮箱报文：信息安全室检测到数个三方堡垒机账号通过非授权方式共享鉴权密钥。李明，请检查运维团队多端登录现状并重新发放独立证书。',
      category: '合规排查',
      status: 'pending',
      priority: 'low',
      sourceSystem: '核心邮箱',
      dueDate: '2026-06-16',
      createdDate: '2026-06-11',
      assignee: '运维组 - 李明',
      urgencyExplanation: '等保二级红线警告，无实时攻击发生，可在本周内完成人员规范自查。',
      actionSteps: [
        { id: 'lm3-1', text: '收回运维群组通用的公共调试私钥证书', completed: false },
        { id: 'lm3-2', text: '为每位工程师下发硬件双因子绑定与专属RSA密钥链', completed: false }
      ]
    },
    // === 张静 (财务总监) ===
    {
      id: 'task-zj-1',
      title: '市场部第二季度追加大促渠道投放款预算呈批 (50万元)',
      description: 'OA大额付款案#OA-9483：年中大促期间由于投放抖音和红人信息流成本大幅上升，申请进行跨额度追加款。总裁办已签署同意性批复。',
      category: '预算追加',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'OA系统',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '财务总监 - 张静',
      urgencyExplanation: '高大金额追加审批。关系投放档期的排期与现金划扣，设为特急处理，核准后将提交划转付款。',
      actionSteps: [
        { id: 'zj1-1', text: '核验市场部第一季度财务消耗实绩和ROI数据', completed: true },
        { id: 'zj1-2', text: '确认追加额度在集团后备专项营销开盘池中划拨的科目', completed: false },
        { id: 'zj1-3', text: '完成纸质凭证电签盖章提交银行电汇备款', completed: false }
      ]
    },
    {
      id: 'task-zj-2',
      title: '新加坡分部大客户PayPal结汇未自动销账协助工单',
      description: 'CRM客服派单：新加坡科技向我方电汇5万美元，对方显示授权通过，但由于PayPal对账接口断连，财务后台至今未自动到账并销除未结余款，需财务人员通过手工录入对账单。',
      category: '对账销号',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'CRM系统',
      dueDate: '2026-06-11', // Today
      createdDate: '2026-06-11',
      assignee: '财务总监 - 张静',
      urgencyExplanation: '影响大客户在系统内的信用评级与自动发卡。财务总监需登录PayPal对账流水无误后进行手工强销。',
      actionSteps: [
        { id: 'zj2-1', text: '登录PayPal亚太特约商户后台，调取交易流水检索该笔订单', completed: false },
        { id: 'zj2-2', text: '查验到账银行账户境外对账底单，将收款码并关联至CRM账户', completed: false }
      ]
    },
    {
      id: 'task-zj-3',
      title: '第二季度企业增值税汇算清缴与出口电子发票税务自查',
      description: '安全邮箱报文：接当地税务主管机关通知，近期全行业核实电子专票发票状态。财务部需开展跨区域电子发票抽退与抵扣抵算合规填报。',
      category: '财税自查',
      status: 'pending',
      priority: 'low',
      sourceSystem: '核心邮箱',
      dueDate: '2026-06-17',
      createdDate: '2026-06-11',
      assignee: '财务总监 - 张静',
      urgencyExplanation: '国家法定例行自查，可在到期前安排税务专员整理出合并抵扣明细表。',
      actionSteps: [
        { id: 'zj3-1', text: '提取4-6月全部开具的跨国货贸免税电子发票底账', completed: false },
        { id: 'zj3-2', text: '比对进项抵扣发票与销项发票金额，生成税务辅助自报底表', completed: false }
      ]
    },
    // === 赵磊 (中台开发) ===
    {
      id: 'task-zl-1',
      title: '海外线上PayPal充值大面积报错10034(Token Expiration)异常',
      description: 'CRM P0极速服务工单：海外用户在结账前100%无法加载PayPal授权，报错商户密钥断链过期。造成线上回款瘫痪，急需中台技术排查。',
      category: '支付障碍',
      status: 'pending',
      priority: 'high',
      sourceSystem: 'CRM系统',
      dueDate: '2026-06-11', // Today
      createdDate: '2026-06-11',
      assignee: '系统开发 - 赵磊',
      urgencyExplanation: '事关海外站点的实时流水。需紧急登录中台网关更新PayPal SDK商户凭证私钥并灰度重启。',
      actionSteps: [
        { id: 'zl1-1', text: '进入PayPal商户管理台后台，确保证书未被官方挂起', completed: true },
        { id: 'zl1-2', text: '本地替换API client_id及密匙，测试沙盒付款通路是否打通', completed: false },
        { id: 'zl1-3', text: '热更新中台加密配置文件并热重载核心结算容器服务', completed: false }
      ]
    },
    {
      id: 'task-zl-2',
      title: '中台核心包 fastjson-1.2.83 远程代码执行漏洞修复整改令',
      description: '安全邮箱安全令：安合组白帽子提报，当前使用的反序列化包存在高危旁路绕过漏洞，可直接提权远程宿主机。全研发中心受波及，限时本周闭环升级至2.0版本。',
      category: '安全整改',
      status: 'pending',
      priority: 'high',
      sourceSystem: '核心邮箱',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '系统开发 - 赵磊',
      urgencyExplanation: '公网接口面临嗅探和勒索投毒风险，划定为最高安全整改命令，修改后需提交CI测试网。',
      actionSteps: [
        { id: 'zl2-1', text: '在父POM文件中将fastjson升级至2.0.32强兼容版本', completed: false },
        { id: 'zl2-2', text: '在集成测试环境跑全链路回归脚本，查看反序列化兼容性', completed: false }
      ]
    },
    {
      id: 'task-zl-3',
      title: '由于报表导出行未截断引起 JVM 垃圾堆满发生内存崩溃(OOM)报警',
      description: 'IT监控警讯：批量采购报表在新导出任务下超载占用7.2G物理内存，导致应用Pod自动拉起。赵磊需要排查导出大数据分页及内存截流。',
      category: '代码溢出',
      status: 'pending',
      priority: 'medium',
      sourceSystem: '监控系统',
      dueDate: '2026-06-12',
      createdDate: '2026-06-11',
      assignee: '系统开发 - 赵磊',
      urgencyExplanation: '影响商家后台数据调阅，需要配置分页查询并限制单次导出峰值为2万条。',
      actionSteps: [
        { id: 'zl3-1', text: '引入SXSSFWorkbook机制缓冲物理写入，释放即时内存占领', completed: false },
        { id: 'zl3-2', text: '上游追加限度配置，提示用户“单次最多筛选导出一季”', completed: false }
      ]
    },
    // === 王芳 (安全合规) ===
    {
      id: 'task-wf-1',
      title: '筹措并填报第二季度集团核心网络安全国家等保三级评测报告',
      description: '高密邮件报文：集团已接到网安通告复查。合规官王芳需组织运维李明和开发赵磊提供网络防撞报告、防勒索审计日志及数据加密配置清单。',
      category: '等保复核',
      status: 'pending',
      priority: 'high',
      sourceSystem: '核心邮箱',
      dueDate: '2026-06-13',
      createdDate: '2026-06-11',
      assignee: '安全合规官 - 王芳',
      urgencyExplanation: '本市等保年度考核项目，不合格者网安将责令下线甚至下发罚单，属于硬性法规待办。',
      actionSteps: [
        { id: 'wf1-1', text: '向开发及运维下发双因子和补丁扫描证据收集模板', completed: true },
        { id: 'wf1-2', text: '起草综合性整改备忘，报送总办签批并打印盖章封档', completed: false }
      ]
    },
    {
      id: 'task-wf-2',
      title: '全员进入高密内网启用动态MFA强身份验证合规条例推行审批',
      description: 'OA流程编号#OA-9490：本季度起，办公网登堡垒机与测试机房除口令外必须强绑Google Authenticator两步特征指引，现提送合规推行官初审。',
      category: '合规签发',
      status: 'pending',
      priority: 'medium',
      sourceSystem: 'OA系统',
      dueDate: '2026-06-15',
      createdDate: '2026-06-11',
      assignee: '安全合规官 - 王芳',
      urgencyExplanation: '此项安全整改为等保三级的支撑依据，审批通过后将通过邮件及飞书系统在全研发大群公示。',
      actionSteps: [
        { id: 'wf2-1', text: '校对安全技术指标和受众人群，批准对于特派紧急设备网卡的豁免方案', completed: false },
        { id: 'wf2-2', text: '在OA中提交批准结论流转向合伙人作终审备案', completed: false }
      ]
    },
    {
      id: 'task-wf-3',
      title: '主堡垒机 (10.90) 遭受连续境外恶意IP恶意暴力解碰撞监控警讯',
      description: '态势感知安全报告：检测到来自北美与日韩数个恶意服务器通过外网备用2222端口进行自动化脚本碰撞。累计拦截攻击4.5万次，未成功攻破。',
      category: '风险通阻',
      status: 'pending',
      priority: 'high',
      sourceSystem: '监控系统',
      dueDate: '2026-06-11', // Today
      createdDate: '2026-06-11',
      assignee: '安全合规官 - 王芳',
      urgencyExplanation: '持续外网探测风险。需要和运维部李明协定，关闭外网堡垒机2222端口，必须连接海外专线VPN后才能访问私网。',
      actionSteps: [
        { id: 'wf3-1', text: '在网关层将恶意IP群阻断拉黑240小时并配置行为追踪', completed: false },
        { id: 'wf3-2', text: '下发运维紧急命令：将2222中继暴露端口完全隔离下架', completed: false }
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
  const [dashboardTab, setDashboardTab] = useState<'analytics' | 'hierarchy'>('analytics');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('smart_tasks_v2');
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
    { time: '14:20:11', type: 'info', message: '💡 异构自愈系统 API 网关连接监听中...' },
    { time: '14:21:45', type: 'success', message: '📡 成功连通主线 OA 审批 200 OK，已自动导入历史未完件' },
    { time: '14:22:01', type: 'success', message: '📡 监测到 IT 监控源与 CRM 数据流双向联通测试成功' },
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
  const [activeSimulatedSystemId, setActiveSimulatedSystemId] = useState<string>('OA系统');
  const [simulatedTaskText, setSimulatedTaskText] = useState<string>(
    `【审批请办件】拟章编号#OA-9491: 广州管理总线申请给李明购买三季度物理服务器备件预算4万元，请财务审核官张静立即核定付款流程并在12小时内下发盖章公函。`
  );

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
    if (sysId === 'OA系统') {
      mockText = `【审批请办件】拟章编号#OA-9491: 广州管理总线申请给李明购买三季度物理服务器备件预算4万元，请财务审核官张静立即核定付款流程并在12小时内下发盖章公函。`;
    } else if (sysId === '监控系统') {
      mockText = `【监控系统异常报警】宿主机告警：Shenzhen-Cluster-IDC-Node3 (K8S POD CORE) 内存泄漏比率超过 94%。代码引起崩溃，涉及生产数据库，请开发部的赵磊和运维李明进行双副本分析配置。`;
    } else if (sysId === 'CRM系统') {
      mockText = `【CRM离线大客工单】新加坡VIP大客户申诉支付网关断连，PayPal对账发生 10243 故障码越权崩溃。请系统开发官赵磊和前台退款协调。`;
    } else if (sysId === '核心邮箱') {
      mockText = `【高密机要信件】等保合规办公室安全王芳呈递：本季度需开展全网堡垒机与云桌面强制MFA双因子登录审计评测，王芳应汇总碰撞日志并在明日下班前对网关层进行加固！`;
    } else {
      const matchSys = corporateSystems.find(s => s.id === sysId);
      const name = matchSys ? matchSys.name : sysId;
      mockText = `【${name} Webhook 实时生产报文】指令通知：监测到海外PayPal网关配置异常，请开发主管赵磊加紧排查，运维主管李明配合，2天内流转结案。`;
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
        targetAssignee = '运维组 - 李明';
      } else if (fullTextToMatch.includes('张静') || fullTextToMatch.includes('财务') || fullTextToMatch.includes('审计') || fullTextToMatch.includes('付款') || fullTextToMatch.includes('核定')) {
        targetAssignee = '财务总监 - 张静';
      } else if (fullTextToMatch.includes('赵磊') || fullTextToMatch.includes('开发') || fullTextToMatch.includes('测试') || fullTextToMatch.includes('漏洞') || fullTextToMatch.includes('网关')) {
        targetAssignee = '系统开发 - 赵磊';
      } else if (fullTextToMatch.includes('王芳') || fullTextToMatch.includes('安全') || fullTextToMatch.includes('等保') || fullTextToMatch.includes('合规')) {
        targetAssignee = '安全合规官 - 王芳';
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

      let targetAssignee = '运维组 - 李明';
      if (simulatedTaskText.includes('张静') || simulatedTaskText.includes('财务') || simulatedTaskText.includes('核定')) targetAssignee = '财务总监 - 张静';
      if (simulatedTaskText.includes('赵磊') || simulatedTaskText.includes('开发') || simulatedTaskText.includes('工单') || simulatedTaskText.includes('网关')) targetAssignee = '系统开发 - 赵磊';
      if (simulatedTaskText.includes('王芳') || simulatedTaskText.includes('等保') || simulatedTaskText.includes('安全')) targetAssignee = '安全合规官 - 王芳';

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
    localStorage.setItem('smart_tasks_v2', JSON.stringify(tasks));
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
    const saved = localStorage.getItem('smart_tasks_systems_v3');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'OA系统', name: 'OA审批系统', icon: 'FileText', theme: 'indigo', description: '待办审批、报销流转、预算申请及大额款项签报' },
      { id: '监控系统', name: 'IT监控系统', icon: 'Cpu', theme: 'emerald', description: '容器性能负载、内存泄漏、慢查询、安全防御态势阻断' },
      { id: 'CRM系统', name: 'CRM工单系统', icon: 'Workflow', theme: 'amber', description: '大客户申诉、离线故障提报、付款断连与跨境对账跟进' },
      { id: '核心邮箱', name: '企业级密邮', icon: 'Mail', theme: 'rose', description: '国家等保测评指令、白帽子漏洞整改、机房自查公示报告' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('smart_tasks_systems_v3', JSON.stringify(corporateSystems));
  }, [corporateSystems]);

  // Templates for system rule flow
  const messageTemplates = {
    oom_crash: {
      text: `【IT紧急监控通报】宿主机崩溃：广州3区测试负载容器于13:40发生物理节点过载宕机。由于大数据导出报表未加缓存泄出引起，目前微服务已进行多副本切换防宕机，由于代码引发，请研发的赵磊跟进检测，今日内排除故障。`,
      sender: `K8s-Deployment-Overseer@corp.com`,
      system: `监控系统`,
      category: `故障警报`,
      priority: `medium`
    },
    audit_approval: {
      text: `【OA流程催办单】事项通知#OA-9499：市场推广部向财务审计室申请支拨10万元预备款，用于本周五的供应商垫資与合规咨询，本流程已越过主管，需要特级财务负责人张静今天下午核准签字。`,
      sender: `OA日常预警机器人`,
      system: `OA系统`,
      category: `大数审批`,
      priority: `high`
    },
    ticket_error: {
      text: `【CRM大客工单报出】美股直销商黄先生在PayPal结算时无法呼出账户名创建Token，返回报错10034，可能导致全网新客户无法购买服务。急调中台赵磊核实商户密钥 and 证书签名！`,
      sender: `CRM前台客服关怀小组`,
      system: `CRM系统`,
      category: `支付接口`,
      priority: `high`
    },
    threat_alert: {
      text: `【机房安全密令】网信安监协查函：本区高密政务网接公安分局通知，建议本企业重点排查外网暴露的VPN或中继跳板堡垒机的SSH暴力破解情况。王芳，请你汇总防碰撞统计表和端口屏蔽方案。`,
      sender: `national-security@govt.cn`,
      system: `核心邮箱`,
      category: `法规整改`,
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
        targetAssignee = '运维组 - 李明';
      } else if (fullNormalizedStr.includes('张静') || fullNormalizedStr.includes('财务') || fullNormalizedStr.includes('审计') || fullNormalizedStr.includes('预算') || fullNormalizedStr.includes('款项') || fullNormalizedStr.includes('付款')) {
        targetAssignee = '财务总监 - 张静';
      } else if (fullNormalizedStr.includes('赵磊') || fullNormalizedStr.includes('测试') || fullNormalizedStr.includes('开发') || fullNormalizedStr.includes('中台') || fullNormalizedStr.includes('漏洞') || fullNormalizedStr.includes('paypal')) {
        targetAssignee = '系统开发 - 赵磊';
      } else if (fullNormalizedStr.includes('王芳') || fullNormalizedStr.includes('安全') || fullNormalizedStr.includes('等保') || fullNormalizedStr.includes('合规') || fullNormalizedStr.includes('碰撞') || fullNormalizedStr.includes('暴力')) {
        targetAssignee = '安全合规官 - 王芳';
      }

      const newlyFormedTask: Task = {
        id: `task-parsed-${Date.now()}`,
        title: resJson.title || '提取的微服务协同命令待办',
        description: resJson.description || activeRawText,
        category: resJson.category || '临时指派',
        status: 'pending',
        priority: (resJson.priority || 'medium') as any,
        sourceSystem: resJson.sourceSystem || '核心邮箱',
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
      
      let targetAssignee = '运维组 - 李明';
      if (assistantTemplate === 'audit_approval') targetAssignee = '财务总监 - 张静';
      if (assistantTemplate === 'ticket_error') targetAssignee = '系统开发 - 赵磊';
      if (assistantTemplate === 'threat_alert') targetAssignee = '安全合规官 - 王芳';

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
              <p className="text-xs text-slate-500 mt-0.5">将您在各异构系统（OA审批、监控、CRM工单与核心邮箱）中沉淀的代办聚合在同一干净表格视图中</p>
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
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black leading-none ${
                            userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-100 text-amber-800 border border-amber-200/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-250/30'
                          }`}>
                            {userStatusMap[currentUser.id]?.isVacation ? '🌴 请假离岗' : '💼 正常在岗'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{currentUser.role}</div>
                      </div>
                    </div>

                    <div className="py-2.5">
                      <div className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase mb-2">切换身份单点登录：</div>
                      <div className="space-y-1.5">
                        {profiles.map((p) => {
                          const matches = p.id === currentUser.id;
                          const count = tasks.filter(t => t.status !== 'completed' && t.assignee === p.fullName).length;
                          const isVacant = userStatusMap[p.id]?.isVacation || false;
                          return (
                            <button
                              key={p.id}
                              id={`profile-dropdown-user-${p.id}`}
                              onClick={() => {
                                handleUserLoginChange(p);
                                setIsProfileOpen(false);
                              }}
                              className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left cursor-pointer transition ${
                                matches 
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
                      className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white py-3 px-4 rounded-xl font-black transition text-xs shadow-md shrink-0 flex items-center justify-center gap-1 cursor-pointer select-none font-mono tracking-wider"
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

            {/* Hint pointing to top right profile center */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-semibold shadow-2xs">
              <span className="text-sm">💡</span>
              <span>多角色及单点登录已整合至页面右上角<b>【个人信息中心】</b>，请在顶部直接点击快速切换身份！</span>
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
                      🎉 <b>【多源拦截生效中：工作邮件静音免打扰】</b>：系统已向 OA审批、IT监控、CRM工单 系统发出常时免打扰指令。由于 <b>{currentUser.name}</b> 当前在岗，所有临时待办消息在看板内<b>即时显示、默默代办，拦截一切邮件和短信，防打扰度 100%</b>！
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
              <button
                id="btn-tab-hierarchy"
                onClick={() => setDashboardTab('hierarchy')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  dashboardTab === 'hierarchy'
                    ? 'bg-white text-indigo-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <span>👥 汇报关系治理</span>
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
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1">
                      <span>💼 我的自留待办分布</span>
                    </h4>
                    <span id="my-pending-total-badge" className="text-[10px] text-slate-500 font-bold font-mono">
                      {profilesPendingStats[currentUser.id]?.total || 0} 件待办
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
                  <div className="space-y-3 pt-2">
                    {corporateSystems.map(sys => {
                      const count = (profilesPendingStats[currentUser.id]?.bySystem[sys.id]) || 0;
                      const hasTasks = count > 0;
                      const totalPending = profilesPendingStats[currentUser.id]?.total || 0;
                      const percentage = totalPending > 0 ? Math.round((count / totalPending) * 100) : 0;
                      
                      // Theme styles
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
                            <span className="font-bold text-slate-700 flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${barColor}`}></span>
                              {sys.name}
                            </span>
                            <span className="font-mono font-bold text-slate-805">
                              {count} 件 {hasTasks && <span className="text-slate-400 font-normal">({percentage}%)</span>}
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${barColor} rounded-full transition-all duration-500`}
                              style={{ width: `${hasTasks ? percentage : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3 mb-4 text-left">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                          <span>👥 我的团队下属待办监控 (按人统计)</span>
                          <span className="bg-indigo-100 text-indigo-750 text-[10px] font-mono px-2 py-0.5 rounded-full font-black">
                            {subordinatesList.length} 人 reports
                          </span>
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          监控各生产卡点，<b>点击以下名片一键穿透过滤</b> 对应成员名下的未完毕待办挂起件。
                        </p>
                      </div>

                      {selectedSubordinateFilterId && (
                        <button
                          onClick={() => setSelectedSubordinateFilterId(null)}
                          className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-transparent text-white font-black px-2.5 py-1 rounded-lg transition"
                        >
                          ↩ 取消下属过滤
                        </button>
                      )}
                    </div>

                    {subordinatesList.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subordinatesList.map(sub => {
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
                              className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none text-left flex flex-col justify-between relative overflow-hidden ${
                                isSelected
                                  ? 'bg-gradient-to-br from-indigo-50/60 to-slate-50 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                                  : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-350 shadow-3xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-xs shrink-0 ${sub.avatarBg}`}>
                                      {sub.avatarText}
                                    </div>
                                    <div className="leading-tight">
                                      <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                        <span>{sub.name}</span>
                                        {isSubOnVacation && (
                                          <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/50 px-1 py-0 rounded font-bold">🌴 假</span>
                                        )}
                                      </div>
                                      <div className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[120px]">{sub.role}</div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end shrink-0">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black ${
                                      subStats.total > 0
                                        ? 'bg-rose-50 text-rose-800 border-rose-200/40 border'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                      {subStats.total} 待办
                                    </span>
                                    {isSelected && (
                                      <span className="text-[8px] text-indigo-700 font-extrabold animate-pulse mt-0.5">穿透透视中 🔎</span>
                                    )}
                                  </div>
                                </div>

                                {/* Systems pending list tags */}
                                <div className="grid grid-cols-2 gap-2 mt-3.5">
                                  {corporateSystems.map(sys => {
                                    const c = subStats.bySystem[sys.id] || 0;
                                    const hasItems = c > 0;
                                    return (
                                      <div key={sys.id} className="flex items-center justify-between text-[10px] border border-slate-100 bg-slate-50/70 p-1 px-2 rounded-lg">
                                        <span className="text-slate-450 truncate max-w-[70px]">{sys.id.replace('系统', '')}</span>
                                        <span className={`font-mono font-bold ${hasItems ? 'text-rose-600 font-extrabold' : 'text-slate-400'}`}>
                                          {c}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
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
                                className="w-full mt-3 bg-slate-900 hover:bg-slate-800 border border-slate-950 text-white text-[10px] font-black py-1 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>🔔 一键智能督办此人</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
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
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-305/70 p-4.5 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs animate-fadeIn text-left">
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
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
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
              <div className={`p-4 bg-linear-to-r ${tTheme.bg.split(' ')[0]}/30 to-white border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${tTheme.bg} ${tTheme.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                      {sys.name}
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border uppercase ${tTheme.bg} ${tTheme.color}`}>
                        {sys.id === 'OA系统' ? 'SYS APPROVED' : sys.id === '监控系统' ? 'SIEM ALIGN' : sys.id === 'CRM系统' ? 'CRM PORTAL' : sys.id === '核心邮箱' ? 'SECURED MAIL' : 'DYNAMIC API SOURCE'}
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
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
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
                                'hover:bg-slate-600 hover:border-slate-600 text-slate-700'
                              }`}
                            >
                              <span>批阅</span>
                              <ExternalLink className="w-3 h-3" />
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
              activeDetailTask.sourceSystem === 'OA系统' ? 'bg-indigo-600' :
              activeDetailTask.sourceSystem === '监控系统' ? 'bg-emerald-500' :
              activeDetailTask.sourceSystem === 'CRM系统' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />

            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  activeDetailTask.sourceSystem === 'OA系统' ? 'bg-indigo-50 text-indigo-700' :
                  activeDetailTask.sourceSystem === '监控系统' ? 'bg-emerald-50 text-emerald-700' :
                  activeDetailTask.sourceSystem === 'CRM系统' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {activeDetailTask.sourceSystem === 'OA系统' ? <FileText className="w-6 h-6" /> :
                   activeDetailTask.sourceSystem === '监控系统' ? <Cpu className="w-6 h-6" /> :
                   activeDetailTask.sourceSystem === 'CRM系统' ? <Workflow className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                </div>

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
                  
                  {/* OA System Form Mock */}
                  {activeDetailTask.sourceSystem === 'OA系统' && (
                    <div className="space-y-2 text-slate-700">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-slate-400 font-bold">拟章主送：</span>
                        <span className="col-span-9 font-extrabold">集团管理中心 / 财务主管室公鉴</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-slate-400 font-bold">会签流程：</span>
                        <span className="col-span-9 text-slate-600">经办起草 → 运维评议 → [当前节点：财务总监初判定书] → 总裁签章</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-slate-400 font-bold">呈批细节：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* Monitor System Form Mock */}
                  {activeDetailTask.sourceSystem === '监控系统' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-emerald-600 font-bold">报警物理节点：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">Shenzhen-Cluster-IDC-Node3 (K8S POD CORE)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-emerald-600 font-bold">触发器条件：</span>
                        <span className="col-span-9 text-slate-600 font-sans">CPU_Load_Avg &gt; 90% 或 Memory_Ratio_Free &lt;= 2.0%</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-emerald-600 font-bold">故障快照内容：</span>
                        <span className="col-span-9 leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800 text-emerald-400 text-[11px] font-mono whitespace-pre-wrap">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* CRM Support Form Mock */}
                  {activeDetailTask.sourceSystem === 'CRM系统' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-amber-700 font-bold">维系客户账号：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">SG_VIP_Singapore_Client_04 (新加坡科技企业合伙大客)</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-amber-700 font-bold">工单处理时限：</span>
                        <span className="col-span-9 text-slate-600">SLA 4小时极速处理承诺</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-amber-700 font-bold">客诉问题陈述：</span>
                        <span className="col-span-9 leading-relaxed bg-white p-2.5 rounded border text-slate-800 font-sans">{activeDetailTask.description}</span>
                      </div>
                    </div>
                  )}

                  {/* Email Support Form Mock */}
                  {activeDetailTask.sourceSystem === '核心邮箱' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-rose-600 font-bold">发件源中继：</span>
                        <span className="col-span-9 font-extrabold text-slate-800">&lt;CISO-Group-Audit@corp.com&gt; 企业合规评测处</span>
                      </div>
                      <div className="grid grid-cols-12 border-b border-slate-200/80 pb-2">
                        <span className="col-span-3 text-rose-600 font-bold">加密状态：</span>
                        <span className="col-span-9 text-rose-700 font-bold bg-rose-50 px-2 py-0.2 rounded border border-rose-200 text-[9px] w-fit">已执行对称端到端国密SM4加密传输</span>
                      </div>
                      <div className="grid grid-cols-12 pb-1">
                        <span className="col-span-3 text-rose-600 font-bold">密函原文摘要：</span>
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

      {/* 6. Pure Slate Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 mt-auto">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>多系统统一代办资产中枢运营平台 © 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span>对接接口：REST API (SaaS Core)</span>
            <span>核心解析算法：分布式规则自愈匹配引擎 (Rule Matcher V3)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
