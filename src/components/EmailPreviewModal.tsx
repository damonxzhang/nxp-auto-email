import React from 'react';
import { X, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { Task, UserProfile } from '../types';

interface EmailPreviewModalProps {
  tasks: Task[];
  profiles: UserProfile[];
  onClose: () => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({ tasks, profiles, onClose }) => {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  
  const groupedTasks = pendingTasks.reduce((acc, task) => {
    if (!acc[task.sourceSystem]) acc[task.sourceSystem] = [];
    acc[task.sourceSystem].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-black text-slate-800">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span>请假首日汇总邮件预览</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-left">
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
            <strong>主题:</strong> 关于本人请假期间工作交接的相关事项告知<br/>
            <strong>致:</strong> 相关业务部门负责人
          </div>
          
          <p className="text-xs text-slate-700">您好，您于今日开始请假，但是有尚未完成的任务，请做好交接工作，具体清单如下：</p>
          
          {Object.entries<Task[]>(groupedTasks).map(([system, systemTasks]) => (
            <div key={system} className="border border-slate-100 rounded-xl p-3">
              <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-wider mb-2">{system}</h4>
              <ul className="space-y-1.5">
                {systemTasks.map(task => (
                  <li key={task.id} className="flex items-center gap-2 text-[10px] text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-slate-400" />
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <button onClick={onClose} className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-slate-800">关闭预览</button>
      </div>
    </div>
  );
};
