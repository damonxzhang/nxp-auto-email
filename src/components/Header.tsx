import React from 'react';
import { Workflow, ChevronDown } from 'lucide-react';
import { UserProfile, Task } from '../types';

interface HeaderProps {
  currentUser: UserProfile;
  userStatusMap: Record<string, { isVacation: boolean }>;
  isProfileOpen: boolean;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  userStatusMap,
  isProfileOpen,
  onProfileClick
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-200">
            <Workflow className="w-5.5 h-5.5 text-indigo-50" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">多系统极简统一待办中枢</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">已同步联通</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">将您在芯片厂异构系统中沉淀的代办自愈聚合在同一干净表格视图中</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1 shadow-2xs text-[11px] text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>数据大盘即时互联</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-750 font-mono font-bold">2026-06-11 UTC</span>
          </div>
          
          <div className="relative">
            <button
              id="btn-profile-center"
              onClick={onProfileClick}
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
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
