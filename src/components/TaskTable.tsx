import React from 'react';
import { 
  AlertTriangle, 
  Search, 
  ExternalLink, 
  Activity, 
  Clock, 
  Filter, 
  ChevronRight, 
  ListRestart,
  CreditCard,
  Target
} from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskTableProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  getIconComponent: (icon: string) => any;
  corporateSystems: any[];
}

export const TaskTable: React.FC<TaskTableProps> = ({ 
  tasks, 
  onSelectTask, 
  getIconComponent,
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
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">⏱️ 时限</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">⚡ 研判</th>
              <th className="px-5 py-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.map((task) => {
              const sys = corporateSystems.find(s => s.id === task.sourceSystem) || corporateSystems[0];
              const IconComp = getIconComponent(sys.icon);
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
                      <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${isHigh ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                        {isHigh ? <AlertTriangle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
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
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-500 shadow-3xs shadow-indigo-100'}`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-600 whitespace-nowrap">{task.sourceSystem}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-black text-slate-500 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg whitespace-nowrap">
                      {task.category}
                    </span>
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
