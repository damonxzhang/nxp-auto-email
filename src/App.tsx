import React, { useState, useMemo, useEffect } from 'react';
import { 
  Workflow, 
  Search, 
  Filter, 
  ListRestart,
  CreditCard,
  Target,
  Bell,
  Cpu,
  Inbox,
  Box,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Video,
  ShieldCheck,
  Trash2,
  Calendar,
  Check,
  ChevronRight,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Task, UserProfile, Priority } from './types';
import { DEFAULT_PROFILES, CORPORATE_SYSTEMS, DEFAULT_TASKS, MESSAGE_TEMPLATES } from './constants';

import { Header } from './components/Header';
import { UserProfileDropdown } from './components/UserProfileDropdown';
import { Sandbox } from './components/Sandbox';
import { Dashboard } from './components/Dashboard';
import { TaskTable } from './components/TaskTable';
import { TaskDetailsModal } from './components/TaskDetailsModal';
import { EmailSummaryModal } from './components/EmailSummaryModal';

const COLOR_THEMES: Record<string, { bg: string; color: string; border: string }> = {
  indigo: { bg: 'bg-indigo-50', color: 'text-indigo-600', border: 'border-indigo-100' },
  emerald: { bg: 'bg-emerald-50', color: 'text-emerald-600', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', color: 'text-amber-600', border: 'border-amber-100' },
  rose: { bg: 'bg-rose-50', color: 'text-rose-600', border: 'border-rose-100' },
  purple: { bg: 'bg-indigo-50', color: 'text-indigo-600', border: 'border-indigo-100' },
  teal: { bg: 'bg-teal-50', color: 'text-teal-600', border: 'border-teal-100' },
  sky: { bg: 'bg-sky-50', color: 'text-sky-600', border: 'border-sky-100' },
};

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Cpu, Inbox, Box, RefreshCw, TrendingUp, AlertTriangle, HelpCircle, Video, ShieldCheck, Trash2, Workflow
  };
  return icons[iconName] || Workflow;
};

export default function App() {
  const [profiles, setProfiles] = useState<UserProfile[]>(DEFAULT_PROFILES);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_PROFILES[0]);
  const [userStatusMap, setUserStatusMap] = useState<Record<string, { isVacation: boolean }>>({
    kanghongyue: { isVacation: false },
    yanpeng: { isVacation: false },
    malei: { isVacation: false },
    sunzhibin: { isVacation: false }
  });

  const [corporateSystems, setCorporateSystems] = useState(CORPORATE_SYSTEMS);
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [activeView, setActiveView] = useState<'dashboard' | 'sandbox'>('dashboard');
  const [dashboardTab, setDashboardTab] = useState<'analytics' | 'hierarchy'>('analytics');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterSystem, setFilterSystem] = useState<string>('all');

  const [activeSimulatedSystemId, setActiveSimulatedSystemId] = useState(CORPORATE_SYSTEMS[0].id);
  const [simulatedTaskText, setSimulatedTaskText] = useState(MESSAGE_TEMPLATES.others_alert.text);
  const [simulationLogs, setSimulationLogs] = useState<{ time: string; message: string; type: string }[]>([]);

  const [newSysId, setNewSysId] = useState('');
  const [newSysName, setNewSysName] = useState('');
  const [newSysDesc, setNewSysDesc] = useState('');
  const [newSysIcon, setNewSysIcon] = useState('Workflow');
  const [newSysTheme, setNewSysTheme] = useState('indigo');

  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [selectedSubordinateFilterId, setSelectedSubordinateFilterId] = useState<string | null>(null);
  const [subViewMode, setSubViewMode] = useState<'card' | 'list'>('card');
  const [subHideEmptySystems, setSubHideEmptySystems] = useState(true);
  const [hideEmptySystems, setHideEmptySystems] = useState(true);
  const [activeSystemMenu, setActiveSystemMenu] = useState<{ userId: string; systemId: string } | null>(null);
  
  const [urgentRecipient, setUrgentRecipient] = useState<UserProfile | null>(null);
  const [redirectHint, setRedirectHint] = useState<{ show: boolean; taskTitle: string; systemName: string }>({ show: false, taskTitle: '', systemName: '' });

  const triggerToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => setToast(prev => prev?.id === id ? null : prev), 5000);
  };

  const handleTaskClick = (task: Task) => {
    setRedirectHint({ show: true, taskTitle: task.title, systemName: task.sourceSystem });
  };

  const subordinatesList = useMemo(() => {
    return profiles.filter(p => p.managerId === currentUser.id);
  }, [profiles, currentUser.id]);

  const filteredSubordinatesList = useMemo(() => {
    if (!subSearchQuery) return subordinatesList;
    const q = subSearchQuery.toLowerCase();
    return subordinatesList.filter(s => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q));
  }, [subordinatesList, subSearchQuery]);

  const profilesPendingStats = useMemo(() => {
    const stats: Record<string, { total: number; bySystem: Record<string, number> }> = {};
    profiles.forEach(p => {
      const pTasks = tasks.filter(t => t.status !== 'completed' && t.assignee === p.fullName);
      const bySystem: Record<string, number> = {};
      corporateSystems.forEach(s => {
        bySystem[s.id] = pTasks.filter(t => t.sourceSystem === s.id).length;
      });
      stats[p.id] = { total: pTasks.length, bySystem };
    });
    return stats;
  }, [profiles, tasks, corporateSystems]);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' ? true : t.priority === filterPriority;
      const matchesSystem = filterSystem === 'all' ? true : t.sourceSystem === filterSystem;
      
      const isTargetedUser = selectedSubordinateFilterId 
        ? profiles.find(p => p.id === selectedSubordinateFilterId)?.fullName === t.assignee
        : t.assignee === currentUser.fullName;

      return matchesSearch && matchesPriority && matchesSystem && isTargetedUser;
    });
    return result.sort((a, b) => {
      const pMap = { high: 0, medium: 1, low: 2 };
      return pMap[a.priority as Priority] - pMap[b.priority as Priority];
    });
  }, [tasks, searchQuery, filterPriority, filterSystem, currentUser, selectedSubordinateFilterId, profiles]);

  const handleSimulateWebhookPush = async () => {
    if (!simulatedTaskText.trim()) return;
    setSimulationLogs(prev => [{ time: new Date().toLocaleTimeString(), message: '发送 Webhook 请求到逻辑引擎...', type: 'info' }, ...prev]);
    
    try {
      const response = await fetch('/api/parse-unstructured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: simulatedTaskText, currentDate: '2026-06-11' })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const newTask: Task = {
        ...data,
        id: `task-sim-${Date.now()}`,
        status: 'pending',
        createdDate: '2026-06-11',
        assignee: currentUser.fullName,
        actionSteps: data.actionSteps.map((text: string, i: number) => ({ id: `step-${Date.now()}-${i}`, text, completed: false }))
      };

      setTasks(prev => [newTask, ...prev]);
      setSimulationLogs(prev => [{ time: new Date().toLocaleTimeString(), message: `解析成功: 【${data.title}】已路由至 ${data.sourceSystem}`, type: 'success' }, ...prev]);
      triggerToast(`✅ 实时同步成功：来自 ${data.sourceSystem} 的新任务已推送到您的工作流`);
    } catch (err: any) {
      setSimulationLogs(prev => [{ time: new Date().toLocaleTimeString(), message: `解析失败: ${err.message}`, type: 'error' }, ...prev]);
    }
  };

  const handleFillSpecificSystemPreset = () => {
    const presets: Record<string, string> = {
      '异常处理系统-Others': MESSAGE_TEMPLATES.others_alert.text,
      '异常物料处理系统': MESSAGE_TEMPLATES.abnormal_material_alert.text,
    };
    setSimulatedTaskText(presets[activeSimulatedSystemId] || MESSAGE_TEMPLATES.others_alert.text);
  };

  const handleOnboardSystem = () => {
    if (!newSysId || !newSysName) return;
    const sys = {
      id: newSysId,
      name: newSysName,
      icon: newSysIcon,
      theme: newSysTheme,
      description: newSysDesc || '自定义业务子系统专线'
    };
    setCorporateSystems(prev => [...prev, sys]);
    setNewSysId(''); setNewSysName(''); setNewSysDesc('');
    triggerToast(`🚀 子系统已成功 onboard：${newSysName} 专线已激活`);
  };

  const handleUpdateVacation = (userId: string, vacationInfo: {
    isVacation: boolean;
    startDate?: string;
    endDate?: string;
    substitutes: Record<string, string>;
  }) => {
    setProfiles(prev => prev.map(p => p.id === userId ? { ...p, vacationInfo } : p));
    setUserStatusMap(prev => ({
      ...prev,
      [userId]: { isVacation: vacationInfo.isVacation },
    }));
    triggerToast(`岗态已更新：${vacationInfo.isVacation ? '已激活请假模式' : '已恢复在岗'}`);
  };

  const toggleUserVacation = (userId: string) => {
    const user = profiles.find(p => p.id === userId);
    if (!user) return;
    
    const newIsVacation = !user.vacationInfo?.isVacation;
    
    handleUpdateVacation(userId, {
      ...user.vacationInfo,
      isVacation: newIsVacation,
      substitutes: user.vacationInfo?.substitutes || {}
    });
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    setSelectedTask(null);
    triggerToast('🎆 任务已闭环，该变更将自动回传同步至源应用系统，请在源系统刷新查看终态。');
  };

  const handleToggleStep = (taskId: string, stepId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      actionSteps: t.actionSteps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
    } : t));
  };

  const renderSystemPopover = (sub: UserProfile, sys: any, count: number) => {
    const subTasks = tasks.filter(t => t.assignee === sub.fullName && t.sourceSystem === sys.id && t.status !== 'completed');
    return (
      <>
        <div className="fixed inset-0 z-50 pointer-events-auto" onClick={() => setActiveSystemMenu(null)} />
        <div className="absolute left-0 top-full mt-1.5 w-64 bg-slate-900 text-white rounded-xl shadow-2xl p-3 z-50 animate-fadeIn border border-slate-700 text-left">
           <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sys.name}</span>
                <span className="text-[9px] text-indigo-400 font-bold">下属：{sub.name}</span>
              </div>
              <span className="bg-rose-500 text-white text-[9px] px-1 rounded-sm font-black">{count}</span>
           </div>
           <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {subTasks.map(t => (
                <div 
                  key={t.id} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSystemMenu(null);
                  }}
                  className="group text-[10.5px] leading-relaxed p-1.5 bg-slate-850 rounded border border-slate-800 hover:border-indigo-500 hover:bg-slate-800 cursor-pointer transition"
                >
                   <div className="font-bold text-slate-200 line-clamp-2 mb-1 group-hover:text-indigo-300">{t.title}</div>
                   <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                      <span>DUE: {t.dueDate.replace('2026-', '')}</span>
                      <span className={t.priority === 'high' ? 'text-rose-400 font-black' : 'text-slate-500'}>{t.priority.toUpperCase()}</span>
                   </div>
                </div>
              ))}
              {subTasks.length === 0 && <div className="text-[10px] text-slate-500 italic py-2 text-center">暂无卡点事项</div>}
           </div>
           <button
             onClick={(e) => {
               e.stopPropagation();
               setActiveSystemMenu(null);
               setRedirectHint({ show: true, taskTitle: `前往 ${sys.name} 系统处理待办事项`, systemName: sys.name });
             }}
             className="mt-2 w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-lg transition cursor-pointer"
           >
             跳转至该系统
           </button>
           <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[8px] text-slate-500 italic">
             💡 点击事项将跳转至对应系统处理页面
           </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header 
        currentUser={currentUser}
        userStatusMap={userStatusMap}
        isProfileOpen={isProfileOpen}
        onProfileClick={() => setIsProfileOpen(!isProfileOpen)}
      />

      <AnimatePresence>
        {isProfileOpen && (
            <UserProfileDropdown 
              currentUser={currentUser}
              profiles={profiles}
              userStatusMap={userStatusMap}
              tasks={tasks}
              corporateSystems={corporateSystems}
              onUserSwitch={setCurrentUser}
              onUpdateVacation={handleUpdateVacation}
              onClose={() => setIsProfileOpen(false)}
            />
        )}
      </AnimatePresence>

      <main className="flex flex-col min-h-[calc(100vh-80px)]">
        {activeView === 'sandbox' ? (
          <Sandbox 
            onBack={() => setActiveView('dashboard')}
            currentUser={currentUser}
            profiles={profiles}
            tasks={tasks}
            corporateSystems={corporateSystems}
            setCorporateSystems={setCorporateSystems}
            activeSimulatedSystemId={activeSimulatedSystemId}
            setActiveSimulatedSystemId={setActiveSimulatedSystemId}
            simulatedTaskText={simulatedTaskText}
            setSimulatedTaskText={setSimulatedTaskText}
            handleSimulateWebhookPush={handleSimulateWebhookPush}
            handleFillSpecificSystemPreset={handleFillSpecificSystemPreset}
            simulationLogs={simulationLogs}
            COLOR_THEMES={COLOR_THEMES}
            getIconComponent={getIconComponent}
            newSysId={newSysId}
            setNewSysId={setNewSysId}
            newSysName={newSysName}
            setNewSysName={setNewSysName}
            newSysDesc={newSysDesc}
            setNewSysDesc={setNewSysDesc}
            newSysIcon={newSysIcon}
            setNewSysIcon={setNewSysIcon}
            newSysTheme={newSysTheme}
            setNewSysTheme={setNewSysTheme}
            handleOnboardSystem={handleOnboardSystem}
            showOnboardForm={false}
            setShowOnboardForm={() => {}}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <Dashboard 
              currentUser={currentUser}
              profiles={profiles}
              tasks={tasks}
              dashboardTab={dashboardTab}
              setDashboardTab={setDashboardTab}
              userStatusMap={userStatusMap}
              corporateSystems={corporateSystems}
              profilesPendingStats={profilesPendingStats}
              subordinatesList={subordinatesList}
              filteredSubordinatesList={filteredSubordinatesList}
              selectedSubordinateFilterId={selectedSubordinateFilterId}
              setSelectedSubordinateFilterId={setSelectedSubordinateFilterId}
              subSearchQuery={subSearchQuery}
              setSubSearchQuery={setSubSearchQuery}
              subHideEmptySystems={subHideEmptySystems}
              setSubHideEmptySystems={setSubHideEmptySystems}
              subViewMode={subViewMode}
              setSubViewMode={setSubViewMode}
              hideEmptySystems={hideEmptySystems}
              setHideEmptySystems={setHideEmptySystems}
              activeSystemMenu={activeSystemMenu}
              setActiveSystemMenu={setActiveSystemMenu}
              renderSystemPopover={renderSystemPopover}
              toggleUserVacation={toggleUserVacation}
              triggerToast={triggerToast}
              onUrgentReminder={setUrgentRecipient}
            />

            <div id="central-todo-table" className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 pb-20 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-3xs">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-2.5 bg-slate-900 rounded-xl text-white">
                    <ListRestart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-2">
                      <span>{selectedSubordinateFilterId ? `查看下属【${profiles.find(p => p.id === selectedSubordinateFilterId)?.name}】的任务大屏` : '我的实时联通待办汇聚表'}</span>
                      <span className="bg-slate-100 text-slate-500 font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-200">
                        {filteredTasks.length} ITEMS
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="全文关键词检索..."
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold w-48 focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>
                  <select 
                    value={filterPriority}
                    onChange={e => setFilterPriority(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold cursor-pointer"
                  >
                    <option value="all">所有优先级</option>
                    <option value="high">特急</option>
                    <option value="medium">偏高</option>
                    <option value="low">一般</option>
                  </select>
                  <select 
                    value={filterSystem}
                    onChange={e => setFilterSystem(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold cursor-pointer max-w-[140px]"
                  >
                    <option value="all">全量系统</option>
                    {corporateSystems.map(s => <option key={s.id} value={s.id}>{s.name.split(' (')[0]}</option>)}
                  </select>
                </div>
              </div>

              <TaskTable 
                tasks={filteredTasks}
                onSelectTask={handleTaskClick}
                corporateSystems={corporateSystems}
              />
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailsModal 
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onToggleStep={handleToggleStep}
            onCompleteTask={handleCompleteTask}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {urgentRecipient && (
          <EmailSummaryModal 
            isOpen={!!urgentRecipient}
            onClose={() => setUrgentRecipient(null)}
            recipient={urgentRecipient}
            sender={profiles.find(p => p.id === urgentRecipient.managerId) || currentUser}
            tasks={tasks}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {redirectHint.show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setRedirectHint({ show: false, taskTitle: '', systemName: '' })}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-md w-full mx-4 text-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-indigo-50 rounded-xl shrink-0">
                  <ArrowRight className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-800 mb-2">即将跳转至外部系统</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    该任务将在 <span className="font-extrabold text-indigo-600">{redirectHint.systemName}</span> 的原系统处理页面中打开，请在对应系统中完成后续操作。
                  </p>
                  <div className="mt-3 bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-700 line-clamp-2">{redirectHint.taskTitle}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button 
                  onClick={() => setRedirectHint({ show: false, taskTitle: '', systemName: '' })}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition cursor-pointer"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3.5 text-sm font-black whitespace-nowrap"
          >
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
               <Check className="w-3.5 h-3.5" />
            </div>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
