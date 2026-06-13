import React from 'react';
import { UserProfile, Task } from '../types';
import { EmailPreviewModal } from './EmailPreviewModal';

interface UserProfileDropdownProps {
  currentUser: UserProfile;
  profiles: UserProfile[];
  userStatusMap: Record<string, { isVacation: boolean }>;
  tasks: Task[];
  corporateSystems: { id: string; name: string }[];
  onUserSwitch: (profile: UserProfile) => void;
  onUpdateVacation: (userId: string, vacationInfo: {
    isVacation: boolean;
    startDate?: string;
    endDate?: string;
    substitutes: Record<string, string>;
  }) => void;
  onClose: () => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  currentUser,
  profiles,
  userStatusMap,
  tasks,
  corporateSystems,
  onUserSwitch,
  onUpdateVacation,
  onClose
}) => {
  const [isVacation, setIsVacation] = React.useState(currentUser.vacationInfo?.isVacation || false);
  const [startDate, setStartDate] = React.useState(currentUser.vacationInfo?.startDate || '');
  const [endDate, setEndDate] = React.useState(currentUser.vacationInfo?.endDate || '');
  const [substitutes, setSubstitutes] = React.useState<Record<string, string>>(currentUser.vacationInfo?.substitutes || {});
  const [showEmailPreview, setShowEmailPreview] = React.useState(false);
  
  const handleSave = () => {
    onUpdateVacation(currentUser.id, { isVacation, startDate, endDate, substitutes });
    onClose();
  };
  
  return (
    <>
      {showEmailPreview && <EmailPreviewModal tasks={tasks} profiles={profiles} onClose={() => setShowEmailPreview(false)} />}
      <div className="fixed inset-0 z-40 cursor-default" onClick={onClose} />
      <div className="absolute right-0 mt-2.5 w-[320px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 animate-fadeIn text-left">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-md ${currentUser.avatarBg}`}>
            {currentUser.avatarText}
          </div>
          <div className="leading-tight flex-1">
            <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>{currentUser.name}</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-black leading-none ${
                isVacation ? 'bg-amber-100 text-amber-800 border border-amber-200/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-250/30'
              }`}>
                {isVacation ? '🌴 请假离岗' : '💼 正常在岗'}
              </span>
            </div>
            <div className="text-[10px] text-slate-450 mt-0.5">{currentUser.role}</div>
          </div>
        </div>

        <div className="py-2.5">
          <div className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase mb-2 text-left">切换身份单点登录：</div>
          <div className="space-y-1.5 overflow-hidden">
            {profiles.map((p) => {
              const matches = p.id === currentUser.id;
              const count = tasks.filter(t => t.status !== 'completed' && t.assignee === p.fullName).length;
              const isVacant = userStatusMap[p.id]?.isVacation || false;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    onUserSwitch(p);
                    onClose();
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
                      {isVacant && <span className="text-[10px] text-amber-600 shrink-0 ml-1">🌴</span>}
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

        <div className="py-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">管理我的状态</span>
            <button
                onClick={() => setIsVacation(!isVacation)}
                className={`text-[10px] font-black px-2.5 py-1 rounded-lg border transition shadow-2xs whitespace-nowrap cursor-pointer ${
                  isVacation
                    ? 'bg-amber-500 hover:bg-amber-400 text-white border-amber-600'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700'
                }`}
              >
                {isVacation ? '🌴 已在假' : '💼 已在岗'}
              </button>
          </div>
          {isVacation && (
            <div className="space-y-2 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <label className="text-[9px] font-bold text-slate-500">设置离岗时间范围：</label>
              <div className="flex gap-1">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 p-1 border rounded text-[9px]" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 p-1 border rounded text-[9px]" />
              </div>
              <label className="text-[9px] font-bold text-slate-500">各系统交接人设置：</label>
              <div className="space-y-1">
                {corporateSystems.map(sys => (
                  <div key={sys.id} className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-600 truncate flex-1">{sys.name.split('-')[0]}</span>
                    <select 
                      className="p-1 border rounded text-[9px] w-24"
                      value={substitutes[sys.id] || ''}
                      onChange={e => setSubstitutes(prev => ({ ...prev, [sys.id]: e.target.value }))}
                    >
                      <option value="">请选择</option>
                      {profiles.filter(p=>p.id !== currentUser.id).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="w-full bg-indigo-600 text-white text-[10px] font-black py-1.5 rounded-lg hover:bg-indigo-700">保存设置</button>
              <button onClick={() => setShowEmailPreview(true)} className="w-full bg-slate-100 text-slate-800 text-[10px] font-black py-1.5 rounded-lg hover:bg-slate-200">请假首日汇总邮件展示</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
