import React from 'react';
import { Users, ShieldCheck, Mail, Workflow } from 'lucide-react';
import { UserProfile, Task } from '../types';

const SYSTEM_SHORT_NAMES: Record<string, string> = {
  '异常物料处理系统': '异常物料',
  '异常处理系统-Others': 'Others',
  '查询录像审批流程': '录像审批',
  '借还机申请': '借还机',
  'buyoff流程': 'Buyoff',
  '2代分析系统': '2代分析',
  '物料报废': '物料报废',
  '自由弹夹领用': '弹夹领用',
};

export interface DashboardProps {
  currentUser: UserProfile;
  profiles: UserProfile[];
  tasks: Task[];
  dashboardTab: 'analytics' | 'hierarchy';
  setDashboardTab: (tab: 'analytics' | 'hierarchy') => void;
  userStatusMap: Record<string, { isVacation: boolean }>;
  corporateSystems: any[];
  profilesPendingStats: Record<string, any>;
  subordinatesList: UserProfile[];
  filteredSubordinatesList: UserProfile[];
  selectedSubordinateFilterId: string | null;
  setSelectedSubordinateFilterId: (id: string | null) => void;
  subSearchQuery: string;
  setSubSearchQuery: (q: string) => void;
  subHideEmptySystems: boolean;
  setSubHideEmptySystems: (hide: boolean) => void;
  subViewMode: 'card' | 'list';
  setSubViewMode: (mode: 'card' | 'list') => void;
  hideEmptySystems: boolean;
  setHideEmptySystems: (hide: boolean) => void;
  activeSystemMenu: any;
  setActiveSystemMenu: (menu: any) => void;
  renderSystemPopover: (sub: UserProfile, sys: any, count: number) => React.ReactNode;
  toggleUserVacation: (userId: string) => void;
  triggerToast: (msg: string) => void;
  onUrgentReminder: (user: UserProfile) => void;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const {
    currentUser,
    profiles,
    tasks,
    dashboardTab,
    setDashboardTab,
    userStatusMap,
    corporateSystems,
    profilesPendingStats,
    subordinatesList,
    filteredSubordinatesList,
    selectedSubordinateFilterId,
    setSelectedSubordinateFilterId,
    subSearchQuery,
    setSubSearchQuery,
    subHideEmptySystems,
    setSubHideEmptySystems,
    subViewMode,
    setSubViewMode,
    hideEmptySystems,
    setHideEmptySystems,
    activeSystemMenu,
    setActiveSystemMenu,
    renderSystemPopover,
    toggleUserVacation,
    triggerToast,
    onUrgentReminder
  } = props;

  const chartData = React.useMemo(() => {
    const myTasks = tasks.filter(t => t.assignee === currentUser.fullName);
    const total = myTasks.length;
    const completed = myTasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const r = 60;
    const circ = 2 * Math.PI * r;
    return { total, completed, pending, pct, radius: r, circumference: circ };
  }, [tasks, currentUser.fullName]);

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 animate-fadeIn pb-16">
      <div className="bg-white border-b border-slate-200/80 py-5 px-4 sm:px-6 shadow-2xs rounded-2xl mb-4">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-inner">
             <button
               onClick={() => setDashboardTab('analytics')}
               className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
                 dashboardTab === 'analytics' ? 'bg-white text-indigo-950 shadow-sm' : 'text-slate-600 hover:text-slate-800'
               }`}
             >
               <Users className="w-3.5 h-3.5" />
               <span>📊 团队与个人大盘</span>
             </button>
          </div>
        </div>

        <div className={`mt-5 rounded-2xl border-2 p-6 transition-all duration-300 flex flex-col lg:flex-row items-stretch gap-6 text-left ${
          userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-50 border-amber-300' : 'bg-indigo-50/50 border-indigo-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
             <div className={`p-4 rounded-xl shrink-0 flex items-center justify-center ${userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                {userStatusMap[currentUser.id]?.isVacation ? <Mail className="text-amber-600" /> : <ShieldCheck className="text-emerald-600" />}
             </div>
             <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase">岗态防漏判定中枢</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black text-white ${userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                    {userStatusMap[currentUser.id]?.isVacation ? '🌴 请假离岗' : '💼 正常在岗'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {userStatusMap[currentUser.id]?.isVacation 
                    ? '📬 【已开启 SMTP 邮箱代发双保障机制】：系统判定当前负责人处于请假模式，所有急件同步投递到账户邮箱并短信提醒。'
                    : '🎉 【厂内现场静音免打扰】：系统已向所有关联系统发出免打扰指令，仅在看板同步，拦截外界一切打扰。'}
                </p>
             </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0 w-full lg:w-[300px] justify-center border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-4 lg:pt-0 lg:pl-6">
             <button
               onClick={() => toggleUserVacation(currentUser.id)}
               className={`w-full py-2.5 rounded-xl font-black text-xs transition cursor-pointer border ${
                 userStatusMap[currentUser.id]?.isVacation ? 'bg-amber-500 text-white border-amber-600' : 'bg-emerald-600 text-white border-emerald-700'
               }`}
             >
               {userStatusMap[currentUser.id]?.isVacation ? '💼 设为在岗' : '🌴 设为请假'}
             </button>
          </div>
        </div>
      </div>

      {dashboardTab === 'analytics' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
          {/* 完成率饼图 */}
          <div className="xl:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl text-left">
                  <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">任务完成率 (COMPLETION)</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600">{chartData.total} ITEMS</span>
                  </div>
                  <div className="flex flex-col items-center py-4">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                        {/* 背景圆环 */}
                        <circle cx="70" cy="70" r={chartData.radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
                        {/* 进度圆环 */}
                        <circle cx="70" cy="70" r={chartData.radius} fill="none" stroke="#6366f1" strokeWidth="12"
                          strokeDasharray={chartData.circumference} strokeDashoffset={chartData.circumference * (1 - chartData.pct / 100)}
                          strokeLinecap="round" className="transition-all duration-700" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-800">{chartData.pct}%</span>
                        <span className="text-[10px] text-slate-400 font-bold mt-0.5">已完成</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <span className="font-bold text-slate-700">已完成 {chartData.completed}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                        <span className="font-bold text-slate-500">待处理 {chartData.pending}</span>
                      </div>
                    </div>
                  </div>
          </div>

          <div className="xl:col-span-8 bg-white border border-slate-200 p-6 rounded-2xl text-left">
            {/* 团队待办监控 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">团队待办监控 (TEAM MONITOR)</h4>
                <div className="flex gap-2">
                   <input 
                     value={subSearchQuery}
                     onChange={e => setSubSearchQuery(e.target.value)}
                     className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] w-32"
                     placeholder="搜索姓名..."
                   />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[currentUser, ...filteredSubordinatesList]
                  .filter(sub => (profilesPendingStats[sub.id]?.total || 0) > 0)
                  .map(sub => {
                   const stats = profilesPendingStats[sub.id] || { total: 0 };
                   const isSelected = selectedSubordinateFilterId === sub.id;
                   const isMe = sub.id === currentUser.id;
                   return (
                     <div 
                       key={sub.id}
                       onClick={() => setSelectedSubordinateFilterId(isSelected ? null : sub.id)}
                       className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                         isSelected ? 'border-indigo-500 bg-indigo-50/30 shadow-subtle' : isMe ? 'border-indigo-200 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-300'
                       }`}
                     >
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                             <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shadow-sm ${sub.avatarBg}`}>{sub.avatarText}</div>
                             <div className="text-left leading-tight">
                               <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">{sub.name}{isMe && <span className="text-[9px] text-indigo-500 font-black">(我)</span>}</div>
                               <div className="text-[10px] text-slate-400 font-medium">{sub.role.split(' - ')[0]}</div>
                             </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded-full inline-block">{stats.total} 待办</div>
                            {userStatusMap[sub.id]?.isVacation && <div className="text-[9px] text-amber-600 font-black mt-1">🌴 离岗中</div>}
                          </div>
                       </div>

                       {/* 系统待办分布：二级目录触发器 */}
                       <div className="grid grid-cols-4 gap-2 mb-4">
                          {corporateSystems.map(sys => {
                             const count = stats.bySystem?.[sys.id] || 0;
                             const shortName = SYSTEM_SHORT_NAMES[sys.id] || sys.id;
                             const isMenuOpen = activeSystemMenu?.userId === sub.id && activeSystemMenu?.systemId === sys.id;
                             
                             if (subHideEmptySystems && count === 0) return null;

                             return (
                               <div key={sys.id} className="relative">
                                 <button
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     setActiveSystemMenu(isMenuOpen ? null : { userId: sub.id, systemId: sys.id });
                                   }}
                                   className={`w-full flex flex-col items-center gap-1 p-2 rounded-xl border transition-all group ${
                                     count > 0 
                                       ? isMenuOpen 
                                         ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-105' 
                                         : 'bg-white border-slate-150 hover:bg-slate-50 hover:border-slate-300 text-slate-600'
                                       : 'bg-slate-50/50 border-transparent text-slate-300 opacity-40 grayscale pointer-events-none'
                                   }`}
                                 >
                                   <span className="text-[9px] font-black leading-tight text-center px-0.5">{shortName}</span>
                                   <span className={`text-[10px] font-black font-mono transition-colors ${count > 0 && !isMenuOpen ? (sys.theme === 'rose' || sys.theme === 'amber' ? 'text-rose-600' : 'text-slate-900') : ''}`}>
                                     {count}
                                   </span>
                                 </button>

                                 {isMenuOpen && renderSystemPopover(sub, sys, count)}
                                </div>
                              );
                           })}
                        </div>
                        {!isMe && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onUrgentReminder(sub);
                          }}
                          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-black rounded-xl border border-slate-200 transition cursor-pointer"
                        >
                          一键督办此人
                        </button>
                        )}
                      </div>
                    );
                })}
             </div>
          </div>
        </div>
        </div>
      )}

      {dashboardTab === 'hierarchy' && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl text-left animate-fadeIn">
           <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b pb-3 mb-6">汇报关系治理与组织架构</h4>
           <div className="flex flex-col gap-6 max-w-2xl mx-auto">
              {profiles.filter(p => !p.managerId).map(root => (
                <div key={root.id} className="space-y-4">
                   <div className="inline-flex items-center gap-3 bg-indigo-600 text-white p-3 rounded-xl shadow-md">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${root.avatarBg}`}>{root.avatarText}</div>
                      <span className="font-black text-sm">{root.name} (负责人)</span>
                   </div>
                   <div className="ml-8 border-l-2 border-indigo-100 pl-8 space-y-4">
                      {profiles.filter(p => p.managerId === root.id).map(sub => (
                        <div key={sub.id} className="relative">
                           <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-indigo-100"></div>
                           <div className="inline-flex items-center gap-3 bg-white border border-slate-200 p-2.5 rounded-lg">
                              <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${sub.avatarBg}`}>{sub.avatarText}</div>
                              <span className="text-xs font-bold text-slate-700">{sub.name} ({sub.role.slice(0, 10)}...)</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </section>
  );
};
