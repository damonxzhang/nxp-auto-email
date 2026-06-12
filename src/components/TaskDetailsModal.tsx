import React from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Printer, 
  ShieldCheck, 
  History, 
  Check, 
  Target, 
  Filter, 
  Cpu, 
  Settings2, 
  ExternalLink,
  ChevronRight,
  FileText,
  Workflow
} from 'lucide-react';
import { Task } from '../types';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onToggleStep: (taskId: string, stepId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  onClose,
  onToggleStep,
  onCompleteTask
}) => {
  const isCompleted = task.status === 'completed';
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-scaleIn flex flex-col max-h-[90vh]">
        <div className="p-5 sm:p-7 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
               <Settings2 className="w-5 h-5" />
             </div>
             <div className="text-left">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{task.sourceSystem}</span>
                 <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {task.id}</span>
               </div>
               <h3 className="text-base font-black text-slate-900 mt-1 leading-tight">{task.title}</h3>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8 text-left">
           <div className="flex flex-wrap gap-6 items-center border-b border-slate-50 pb-6">
              <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-slate-400" />
                 <div className="leading-none text-left">
                    <div className="text-[9px] font-black underline underline-offset-2 text-slate-400 uppercase tracking-widest">截止时限</div>
                    <div className="text-xs font-black text-slate-800 mt-1">{task.dueDate}</div>
                 </div>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
                 <Target className="w-4 h-4 text-slate-400" />
                 <div className="leading-none text-left">
                    <div className="text-[9px] font-black underline underline-offset-2 text-slate-400 uppercase tracking-widest">紧急度</div>
                    <div className="text-xs font-black text-slate-800 mt-1 flex items-center gap-1.5">
                       <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                       {task.priority === 'high' ? '特急' : task.priority === 'medium' ? '偏高' : '一般'}
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <div className="leading-none text-left">
                    <div className="text-[9px] font-black underline underline-offset-2 text-slate-400 uppercase tracking-widest">状态</div>
                    <div className="text-xs font-black text-emerald-700 mt-1">{task.status === 'completed' ? '已闭环' : '进行中'}</div>
                 </div>
              </div>
           </div>

           <div className="space-y-3">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 <FileText className="w-4 h-4" /> 背景与研判摘要
              </h4>
             <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Cpu className="w-12 h-12 text-slate-900" />
               </div>
               <p className="text-xs leading-relaxed text-slate-700 relative z-10 white-space-pre-wrap">{task.description}</p>
               {task.urgencyExplanation && (
                 <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-start gap-3">
                    <div className="p-1 bg-amber-50 rounded text-amber-600 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[10px] font-bold text-amber-705 leading-relaxed">{task.urgencyExplanation}</p>
                 </div>
               )}
             </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 <Workflow className="w-4 h-4" /> 推荐自愈与手动执行步骤
              </h4>
              <div className="space-y-2.5">
                 {task.actionSteps.map((step) => (
                   <button
                     key={step.id}
                     disabled={isCompleted}
                     onClick={() => onToggleStep(task.id, step.id)}
                     className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                       step.completed 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                        : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 text-slate-700'
                     }`}
                   >
                     <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                       step.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'
                     }`}>
                       {step.completed && <Check className="w-3.5 h-3.5" />}
                     </div>
                     <span className={`text-xs font-bold flex-1 ${step.completed ? 'line-through opacity-70' : ''}`}>
                       {step.text}
                     </span>
                     {!step.completed && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="p-5 sm:p-7 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 w-full">
            <button
               onClick={() => onCompleteTask(task.id)}
               disabled={isCompleted}
               className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs transition shadow-sm cursor-pointer ${
                 isCompleted
                  ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-700'
               }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isCompleted ? '任务已在生产线闭环' : '判定全部合规并关单'}</span>
            </button>
            <div className="flex gap-2 shrink-0">
               <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition cursor-pointer">
                 <Share2 className="w-4 h-4" />
               </button>
               <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition cursor-pointer">
                 <Printer className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
