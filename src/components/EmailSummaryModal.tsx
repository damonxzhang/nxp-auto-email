import React from 'react';
import { motion } from 'motion/react';
import { X, Mail, Send, User, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Task, UserProfile } from '../types';

interface EmailSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: UserProfile;
  sender: UserProfile | null;
  tasks: Task[];
}

export const EmailSummaryModal: React.FC<EmailSummaryModalProps> = ({
  isOpen,
  onClose,
  recipient,
  sender,
  tasks
}) => {
  if (!isOpen) return null;

  // Filter tasks for this recipient
  const pendingTasks = tasks.filter(t => t.assignee === recipient.fullName && t.status !== 'completed');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg tracking-tight">SMTP 邮件推送预览</h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Email Summary Push Notification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 custom-scrollbar text-left">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            {/* Meta Info */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <span className="w-16 text-[11px] font-black text-slate-400 uppercase mt-1">发件人:</span>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${sender?.avatarBg || 'bg-slate-800 text-white'}`}>
                    {sender?.avatarText || 'L'}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{sender?.fullName || '系统管理员'}</span>
                  <span className="text-xs text-slate-400">{`<${sender?.id || 'admin'}@fab3.corp.com>`}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-16 text-[11px] font-black text-slate-400 uppercase mt-1">收件人:</span>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${recipient.avatarBg}`}>
                    {recipient.avatarText}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{recipient.fullName}</span>
                  <span className="text-xs text-slate-400">{`<${recipient.id}@fab3.corp.com>`}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-16 text-[11px] font-black text-slate-400 uppercase mt-1">主题:</span>
                <span className="text-sm font-black text-rose-600">【紧急督办】半导体 Fab 业务系统待办事项汇总 - 需立即处理</span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-5 py-2">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <p className="text-sm font-bold text-rose-800 leading-relaxed mb-2">
                  {recipient.name}，你好：
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  我是你的主管 <span className="font-bold text-slate-900">{sender?.name || '部门经理'}</span>。目前系统监测到你有部分高优先级任务处于停滞状态，这可能会影响到产线的正常稼动和良率释放。
                </p>
                <p className="text-sm font-bold text-rose-700 mt-3 flex items-center gap-1.5 uppercase italic">
                  <AlertCircle className="w-4 h-4" />
                  这是你的当前待办清单汇总，请务必于今日下班前完成处理。
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  待办任务清单 ({pendingTasks.length} 项)
                </h4>
                
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-200 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                            task.priority === 'high' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {task.priority === 'high' ? 'High' : task.priority.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">{task.sourceSystem}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">DUE: {task.dueDate}</span>
                      </div>
                      <h5 className="text-sm font-black text-slate-800 mb-1">{task.title}</h5>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>
                      
                      <div className="mt-3 flex items-center gap-2">
                        <button className="flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-lg hover:bg-indigo-700 transition">
                          立即处理
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-black rounded-lg hover:bg-slate-50 transition">
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {pendingTasks.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
                      <CheckCircle2 className="w-10 h-10 mb-2 opacity-20" />
                      <p className="text-sm font-bold">目前暂无待办事项需要处理</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 italic">
                  本邮件由 Fab 业务自动流转系统 (Fab Operations Hub) 依据主管授权自动派发，请勿直接回复。
                </p>
                <div className="mt-4 flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-[10px]">
                    <div className="font-black text-slate-700">Fab 数字资产管理中心</div>
                    <div className="text-slate-400">系统自动通知服务</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-5 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-black hover:bg-slate-100 transition"
          >
            关闭预览
          </button>
          <button
            onClick={() => {
              // Simulate sending
              onClose();
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-lg shadow-indigo-200"
          >
            <Send className="w-4 h-4" />
            <span>执行邮件投递任务</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
