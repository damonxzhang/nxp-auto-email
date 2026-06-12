import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Layers, 
  Cpu, 
  Plus, 
  Bell, 
  Calendar, 
  Inbox, 
  FileText, 
  ShieldCheck, 
  Workflow
} from 'lucide-react';

export interface SandboxProps {
  onBack: () => void;
  corporateSystems: any[];
  setCorporateSystems: React.Dispatch<React.SetStateAction<any[]>>;
  activeSimulatedSystemId: string;
  setActiveSimulatedSystemId: (id: string) => void;
  simulatedTaskText: string;
  setSimulatedTaskText: (text: string) => void;
  handleSimulateWebhookPush: () => void;
  handleFillSpecificSystemPreset: () => void;
  simulationLogs: any[];
  COLOR_THEMES: any;
  getIconComponent: (icon: string) => any;
  newSysId: string;
  setNewSysId: (val: string) => void;
  newSysName: string;
  setNewSysName: (val: string) => void;
  newSysDesc: string;
  setNewSysDesc: (val: string) => void;
  newSysIcon: string;
  setNewSysIcon: (val: string) => void;
  newSysTheme: string;
  setNewSysTheme: (val: string) => void;
  handleOnboardSystem: () => void;
  showOnboardForm: boolean;
  setShowOnboardForm: (show: boolean) => void;
}

export const Sandbox: React.FC<SandboxProps> = (props) => {
  const {
    onBack,
    corporateSystems,
    activeSimulatedSystemId,
    setActiveSimulatedSystemId,
    simulatedTaskText,
    setSimulatedTaskText,
    handleSimulateWebhookPush,
    handleFillSpecificSystemPreset,
    simulationLogs,
    COLOR_THEMES,
    getIconComponent,
    newSysId,
    setNewSysId,
    newSysName,
    setNewSysName,
    newSysDesc,
    setNewSysDesc,
    newSysIcon,
    setNewSysIcon,
    newSysTheme,
    setNewSysTheme,
    handleOnboardSystem
  } = props;

  return (
    <section className="max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 animate-fadeIn pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-left">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-600 transition flex items-center justify-center cursor-pointer border border-slate-200/65"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-600 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-150 px-1.5 py-0.2 rounded">企业级流转中枢</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-150 font-mono font-bold">API ACTIVE v2</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">🔌 异构业务应用自助流转、注册与仿真沙盒中心</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-left">
            <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                已激活接入的异构子系统业务专线 ({corporateSystems.length})
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corporateSystems.map((sys) => {
                const IconComp = getIconComponent(sys.icon);
                const tTheme = COLOR_THEMES[sys.theme] || COLOR_THEMES.indigo;
                return (
                  <div 
                    key={sys.id}
                    className={`p-4 rounded-xl border transition-all hover:shadow-subtle relative overflow-hidden flex flex-col justify-between ${
                      activeSimulatedSystemId === sys.id 
                        ? 'bg-slate-50/50 border-slate-300 ring-2 ring-indigo-500/5' 
                        : 'bg-white border-slate-150/80 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${tTheme.bg} ${tTheme.color}`}>
                            <IconComp className="w-4.5 h-4.5" />
                          </div>
                          <span className="font-extrabold text-sm text-slate-800 truncate">{sys.name}</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-slate-100 border px-1.5 py-0.2 rounded">
                          {sys.id}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-2.5 line-clamp-2 leading-relaxed">
                        {sys.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span>连接在线</span>
                      </span>
                      <button
                        onClick={() => setActiveSimulatedSystemId(sys.id)}
                        className={`px-2.5 py-1 rounded-md border text-[10px] font-black transition cursor-pointer flex items-center gap-1 select-none ${
                          activeSimulatedSystemId === sys.id 
                            ? 'bg-indigo-600 text-indigo-50 border-indigo-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>选定调试</span>
                        {activeSimulatedSystemId === sys.id && <Check className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-left text-slate-100 relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                极速自助新异构应用连接配置中心
              </h4>
            </div>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">系统ID (纯大写英文ID)</label>
                  <input
                    type="text"
                    value={newSysId}
                    onChange={(e) => setNewSysId(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-700 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">展示名称</label>
                  <input
                    type="text"
                    value={newSysName}
                    onChange={(e) => setNewSysName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOnboardSystem}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-black transition text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>确认并上线 API 专线</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex-1 flex flex-col justify-between text-left">
            <div className="space-y-3.5">
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Cpu className="w-4.5 h-4.5 text-indigo-600" />
                  API Webhook 智能派发模拟器
                </span>
              </div>
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">第一步：选择用于派发的对接事件源系统</label>
                  <select
                    value={activeSimulatedSystemId}
                    onChange={(e) => setActiveSimulatedSystemId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none font-extrabold cursor-pointer text-xs"
                  >
                    {corporateSystems.map(sys => (
                      <option key={sys.id} value={sys.id}>🔌 {sys.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">第二步：报文内容</label>
                    <button onClick={handleFillSpecificSystemPreset} className="text-[10px] text-indigo-600 font-bold">⚡ 载入样例</button>
                  </div>
                  <textarea
                    value={simulatedTaskText}
                    onChange={(e) => setSimulatedTaskText(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-250 rounded-lg px-3 py-2 text-[11.5px] font-mono focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <button
                  onClick={handleSimulateWebhookPush}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>虚拟发送 Webhook 事件到 API 中枢</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4 bg-slate-950 rounded-xl p-3.5 font-mono text-[10px] text-slate-400 overflow-hidden border border-slate-800">
               <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-1.5">
                 <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                 <span className="text-slate-300 font-black">终端实时调试日志 (Real-time Stream)</span>
               </div>
               <div className="space-y-1 overflow-y-auto max-h-[160px] custom-scrollbar">
                  {simulationLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className={log.type === 'success' ? 'text-emerald-400' : 'text-sky-400'}>{log.message}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
