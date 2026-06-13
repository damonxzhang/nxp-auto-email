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
  Workflow,
  Mail,
  Link,
  Image as ImageIcon,
  Paperclip
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
  
  const renderDescriptionWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-500 underline underline-offset-4 inline-flex items-center gap-0.5 font-bold mx-1"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return part;
    });
  };

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
                 <Clock className="w-4 h-4 text-slate-400" />
                 <div className="leading-none text-left">
                    <div className="text-[9px] font-black underline underline-offset-2 text-slate-400 uppercase tracking-widest">接收时间</div>
                    <div className="text-xs font-black text-slate-800 mt-1">{task.receivedDate || '2026-06-12 18:30'}</div>
                 </div>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
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
                 <Mail className="w-4 h-4" /> 邮件详情
              </h4>
             <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Cpu className="w-12 h-12 text-slate-900" />
               </div>
               <p className="text-xs leading-relaxed text-slate-700 relative z-10 white-space-pre-wrap">
                 {renderDescriptionWithLinks(task.description)}
               </p>
               {task.urgencyExplanation && (
                 <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-start gap-3">
                    <div className="p-1 bg-amber-50 rounded text-amber-600 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[10px] font-bold text-amber-700 leading-relaxed">{task.urgencyExplanation}</p>
                 </div>
               )}
               <div className="mt-4 flex flex-col gap-2">
                  {(task.urls || ["https://example.com/doc1", "https://example.com/doc2"]).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-indigo-600 hover:underline">
                      <Link className="w-3 h-3" /> {url}
                    </a>
                  ))}
                  {(task.imageUrls || ["https://placehold.co/400x200"]).map((url, i) => (
                    <img key={i} src={url} alt="email content" className="w-full rounded-md border border-slate-200" />
                  ))}
                  {(task.attachments || [{name: 'report.pdf', url: '#'}, {name: 'data.xlsx', url: '#'}]).map((att, i) => (
                     <a key={i} href={att.url} className="flex items-center gap-2 text-[10px] text-slate-600 hover:underline">
                       <Paperclip className="w-3 h-3" /> {att.name}
                     </a>
                  ))}
               </div>
             </div>
           </div>

           {task.workflow && (
             <div className="space-y-4">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4" /> {task.workflow.systemName} - 节点轨迹与处理状态
               </h4>
               <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
                 <div className="relative">
                   <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-100 z-0" />
                   <div className="space-y-6 relative z-10">
                     {task.workflow.steps.map((step) => {
                       const isCurrent = step.index === task.workflow?.currentStepIndex;
                       const isPast = (task.workflow?.currentStepIndex || 0) > step.index;
                       
                       return (
                         <div key={step.index} className="flex gap-4">
                           <div className="shrink-0 flex flex-col items-center">
                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                               isCurrent 
                                 ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 scale-110' 
                                 : isPast 
                                   ? 'bg-emerald-500 border-emerald-500 text-white' 
                                   : 'bg-white border-slate-200 text-slate-400'
                             }`}>
                               {isPast ? <Check className="w-3 h-3" /> : step.index}
                             </div>
                           </div>
                           
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between gap-2">
                               <span className={`text-[11px] font-black truncate ${
                                 isCurrent ? 'text-indigo-600' : isPast ? 'text-emerald-700' : 'text-slate-500'
                               }`}>
                                 {step.name}
                               </span>
                               {isCurrent && (
                                 <span className="shrink-0 bg-indigo-50 text-indigo-600 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">当前节点</span>
                               )}
                             </div>
                             <div className="flex items-center gap-1.5 mt-0.5">
                               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">处理人:</span>
                               <span className={`text-[10px] font-black ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                                 {step.handler}
                               </span>
                             </div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               </div>
             </div>
           )}

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
