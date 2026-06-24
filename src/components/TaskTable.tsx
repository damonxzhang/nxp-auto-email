import React from 'react';
import { 
  ChevronRight, 
  ListRestart
} from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskTableProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  corporateSystems: any[];
}

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

export const TaskTable: React.FC<TaskTableProps> = ({ 
  tasks, 
  onSelectTask, 
  corporateSystems
}) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-200/80 p-12 rounded-3xl text-center space-y-4 shadow-3xs flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <ListRestart className="w-8 h-8" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-800">当前筛选条件下暂无待办</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">所有的自愈系统运行正常，没有堆积需要人工会签或介入处理的任务项。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-3xs overflow-hidden text-left">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[200px]">💼 工制与业务描述</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">🔌 源系统</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">🏷️ 分类</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">🕐 接收时间</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">⏱️ 时限</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">⚡ 研判</th>
              <th className="px-5 py-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.map((task) => {
              const sys = corporateSystems.find(s => s.id === task.sourceSystem) || corporateSystems[0];
              const shortName = SYSTEM_SHORT_NAMES[task.sourceSystem] || task.sourceSystem;
              const isHigh = task.priority === 'high';
              const isCompleted = task.status === 'completed';

              return (
                <tr 
                  key={task.id} 
                  onClick={() => onSelectTask(task)}
                  className={`group cursor-pointer transition-all duration-200 ${
                    isCompleted ? 'opacity-60 grayscale-[0.3]' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 px-2 py-1 rounded-lg shrink-0 text-[9px] font-black tracking-tight whitespace-nowrap ${isHigh ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                        {shortName}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-black tracking-tight truncate max-w-[280px] lg:max-w-md ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900 group-hover:text-indigo-600 transition-colors'}`}>
                            {task.title}
                          </span>
                          {isHigh && !isCompleted && (
                            <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded animate-pulse shrink-0">HOT RUN</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic font-medium leading-relaxed">
                          {task.description}
                        </p>
                        {task.workflow && !isCompleted && (
                          <div className="mt-2 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="flex items-center gap-1 bg-indigo-50/70 border border-indigo-100 rounded-md px-1.5 py-0.5 text-[9px] font-black text-indigo-600 tracking-tight shrink-0">
                                <span>当前节点:</span>
                                <span className="font-extrabold text-slate-700">
                                  {task.workflow.steps.find(s => s.index === task.workflow?.currentStepIndex)?.name}
                                </span>
                                <span className="font-mono text-indigo-400">({task.workflow.currentStepIndex}/{task.workflow.steps.length})</span>
                              </span>
                              {task.sourceSystem === '异常物料处理系统' && (
                                <span className="bg-rose-50 text-rose-600 border border-rose-150 px-1 py-0.5 rounded text-[8px] font-black tracking-tight uppercase">
                                  异常物料处理专线
                                </span>
                              )}
                            </div>
                            
                            {/* Horizontal Process Steps Visualizer */}
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-1 overflow-x-auto max-w-full">
                              {task.workflow.steps.map((st, i) => {
                                const isCurrent = st.index === task.workflow?.currentStepIndex;
                                const isPast = (task.workflow?.currentStepIndex || 0) > st.index;
                                return (
                                  <React.Fragment key={st.index}>
                                    {i > 0 && <span className="text-slate-300 text-[8px] font-mono select-none">→</span>}
                                    <div className="flex items-center gap-1">
                                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black transition-all ${
                                        isCurrent 
                                          ? 'bg-rose-500 text-white shadow-xs scale-102 ring-2 ring-rose-500/10' 
                                          : isPast 
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                            : 'bg-slate-50 text-slate-400 border border-slate-100'
                                      }`}>
                                        {st.index}. {st.name}
                                      </span>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded whitespace-nowrap ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                        {shortName}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-600 whitespace-nowrap">{task.sourceSystem}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-black text-slate-500 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg whitespace-nowrap">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center whitespace-nowrap">
                    {task.receivedDate ? (
                      <div className="inline-flex flex-col items-center">
                        <span className="text-[11px] font-mono font-bold text-slate-700">{task.receivedDate.split(' ')[1]}</span>
                        <span className="text-[9px] text-slate-400 font-bold tracking-tight">{task.receivedDate.split(' ')[0].replace('2026-', '')}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-300 font-mono">—</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex flex-col items-center">
                       <span className={`text-[11px] font-mono font-black ${isHigh ? 'text-rose-600' : 'text-slate-700'}`}>
                         {task.dueDate.split('-').slice(1).join('/')}
                       </span>
                       <span className="text-[9px] text-slate-400 font-bold tracking-tight uppercase">BEFORE 24:00</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black ${
                      task.priority === 'high' 
                        ? 'bg-rose-50 text-rose-800 border-rose-200 shadow-3xs shadow-rose-100' 
                        : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-3xs shadow-amber-100'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {task.priority === 'high' ? '特急' : task.priority === 'medium' ? '偏高' : '一般'}
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
