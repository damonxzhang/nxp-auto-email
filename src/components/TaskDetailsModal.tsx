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
  const [activeDetailTab, setActiveDetailTab] = React.useState<'base' | 'steps' | 'email'>(task.materialAbnormalDetail ? 'base' : 'email');
  
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

  const renderMaterialDetailForm = () => {
    const detail = task.materialAbnormalDetail;
    if (!detail) return null;

    if (activeDetailTab === 'base') {
      return (
        <div className="bg-slate-50 rounded-2xl p-4 border border-indigo-100 relative overflow-hidden text-xs text-slate-700 space-y-4 animate-fadeIn">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
            <h4 className="font-extrabold text-[11px] text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex justify-between">
              <span>一. 基础发起明细 (样例数据)</span>
              <span className="text-indigo-600 font-black">处理人: {detail.initialActionBy}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-[11px]">
              <div>
                <span className="text-slate-400 font-bold block text-[10px]">批号:</span>
                <span className="font-mono font-bold text-slate-800">{detail.lotNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">工序:</span>
                <span className="font-bold text-slate-800">{detail.processName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">机台:</span>
                <span className="font-mono font-bold text-slate-800">{detail.machineNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">pkgType:</span>
                <span className="font-bold text-slate-800">{detail.pkgType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">pkgCode:</span>
                <span className="font-mono text-slate-800">{detail.pkgCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">潜在次品类型:</span>
                <span className="font-bold text-rose-600">{detail.substandardType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">问题条:</span>
                <span className="font-mono text-slate-800">{detail.issueNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">发现人:</span>
                <span className="font-bold text-slate-800">{detail.discoveredBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">发起时间:</span>
                <span className="font-mono text-slate-850">{detail.launchTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">5M1E:</span>
                <span className="bg-slate-100 px-1 py-0.5 rounded text-[10px] text-slate-700 font-bold">{detail.fiveMOneE}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-left space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">原因:</span>
                <p className="font-bold text-slate-800 leading-relaxed">{detail.reason}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">异常现象分类:</span>
                <span className="bg-rose-50 text-rose-700 border border-rose-100 px-1.5 py-0.5 rounded text-[10px] font-black">{detail.anomalyCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">文件路径:</span>
                <p className="font-mono text-[9px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-150 break-all select-all">{detail.filePath}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">历史照片档案:</span>
                <span className="text-indigo-600 font-mono font-bold hover:underline inline-flex items-center gap-1 cursor-pointer">
                  <ImageIcon className="w-3.5 h-3.5" />
                  {detail.historyFile}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/40 rounded-xl border border-indigo-100 p-4 text-left">
            <h5 className="font-extrabold text-[11px] text-indigo-700 uppercase tracking-widest border-b border-indigo-100/50 pb-1 mb-2 flex justify-between">
              <span>初步处置记录</span>
              <span className="font-mono">时间: {detail.teamLeaderActionTime}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500 font-bold block text-[10px]">处理人:</span>
                <span className="font-bold text-slate-800">{detail.initialActionBy}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px]">初步处理描述:</span>
                <span className="font-bold text-slate-800">{detail.initialActionDesc}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fadeIn">
        {/* Step 2: 按照需求检查物料 */}
        {detail.step2 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 text-xs shadow-2xs text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-black text-slate-800 text-[11px]">2. 按照需求检查物料 (已完成)</span>
              <span className="text-slate-500 text-[10px] font-mono">时间: {detail.teamLeaderActionTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">初步次品种类 1:</span>
                <span className="font-bold text-slate-800">{detail.step2.substandardTypes[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">初步次品数量 1:</span>
                <span className="font-bold text-slate-800">{detail.step2.substandardQtys[0]}</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block mb-1">处理描述:</span>
              <p className="bg-slate-50 p-2.5 rounded border border-slate-150 text-[11px] text-slate-700 leading-relaxed font-bold">
                {detail.step2.actionDesc}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: 工程师给出处理意见 */}
        {detail.step3 && (
          <div className={`rounded-xl p-4 border text-xs shadow-2xs text-left ${task.workflow?.currentStepIndex === 3 ? 'bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-500/15' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b border-indigo-150 pb-1.5">
              <span className="font-black text-indigo-800 text-[11px]">3. 工程师给出处理意见 {task.workflow?.currentStepIndex === 3 ? '(待您处理中)' : '(已完成)'}</span>
              <span className="text-slate-500 text-[10px] font-mono">时限: 2026-03-09 10:44:58</span>
            </div>
            <div className="space-y-2.5 mt-2">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px]">工程师处理意见:</span>
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded inline-block mt-0.5">{detail.step3.engineerOpinion}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">是否保留次品:</span>
                  <span className="font-bold text-slate-800 inline-block mt-1">{detail.step3.isKeepSubstandard}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] mb-1">处理意见明细:</span>
                <p className="bg-white border border-slate-200 p-2.5 rounded text-[11px] font-bold text-slate-700 leading-relaxed">
                  {detail.step3.actionOpinion}
                </p>
              </div>
              {detail.step3.keepInfo && (
                <div>
                  <span className="text-slate-500 block text-[10px]">保留物料流向:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded inline-block mt-0.5">{detail.step3.keepInfo}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: 带班按需处理物料 */}
        {detail.step4 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs shadow-2xs text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-black text-slate-800 text-[11px]">4. 带班按需处理物料</span>
              <span className="text-slate-500 text-[10px] font-mono">时间: {detail.step4.teamLeaderActionTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">是否保留次品:</span>
                <span className="font-bold text-slate-800">{detail.step4.isKeepSubstandard}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">保留信息:</span>
                <span className="font-bold text-slate-800">{detail.step4.keepInfo || 'N/A'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">备注:</span>
                <span className="text-slate-600 font-bold">{detail.step4.remark || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: 工程师发放奖励 */}
        {detail.step5 && (
          <div className={`rounded-xl p-4 border text-xs shadow-2xs text-left ${task.workflow?.currentStepIndex === 5 ? 'bg-rose-50/50 border-rose-200 ring-2 ring-rose-500/15 animate-pulse' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b border-rose-150 pb-1.5">
              <span className="font-black text-rose-800 text-[11px]">5. 工程师发放奖励结算 {task.workflow?.currentStepIndex === 5 ? '(待您处理中)' : '(已完成)'}</span>
              <span className="text-slate-500 text-[10px] font-mono">时间: {detail.step5.actionTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-2 leading-relaxed">
              <div>
                <span className="text-slate-500 block text-[10px]">是否公示:</span>
                <span className="font-bold text-slate-800">{detail.step5.isPublic}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">质量风险评估:</span>
                <span className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded font-bold">{detail.step5.qualityRiskLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">努力/履职程度:</span>
                <span className="font-bold text-slate-800">{detail.step5.effortLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">设定提请奖励:</span>
                <span className="bg-rose-100 text-rose-800 font-extrabold px-1.5 py-0.5 rounded inline-block">{detail.step5.rewardCalc}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: 奖励审批 */}
        {detail.step6 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs shadow-2xs text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-black text-slate-800 text-[11px]">6. 负责人奖励会签审批 (康红月)</span>
              <span className="text-slate-500 text-[10px] font-mono">核准时间: {detail.step6.auditTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">是否修改:</span>
                <span className="font-bold text-slate-800">{detail.step6.isModify}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">审核结果结论:</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-1.5 py-0.5 rounded font-bold">{detail.step6.auditResult}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">批复奖励发放数额:</span>
                <span className="text-rose-600 font-extrabold text-sm">{detail.step6.auditReward}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 6 Appeal: 奖励申诉 */}
        {detail.step6_appeal && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 text-xs shadow-2xs text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-black text-slate-800 text-[11px]">6. 申诉及奖励校对环节</span>
              <span className="text-slate-500 text-[10px] font-mono">时间: {detail.step6_appeal.appealTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">是否发起申诉:</span>
                <span className={`${detail.step6_appeal.isAppeal === '是' ? 'text-amber-600 font-black' : 'text-slate-500'} font-bold`}>{detail.step6_appeal.isAppeal}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">申诉提请者:</span>
                <span className="font-bold text-slate-800">{detail.step6_appeal.appellant}</span>
              </div>
              {detail.step6_appeal.isAppeal === '是' && (
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">申诉期望奖励等级:</span>
                  <span className="text-rose-600 font-black bg-rose-50 px-1.5 py-0.5 rounded mt-1 inline-block">{detail.step6_appeal.appealReward}</span>
                </div>
              )}
            </div>
            {detail.step6_appeal.appealReason && (
              <div>
                <span className="text-slate-400 text-[10px] block mb-1">申诉详细理由:</span>
                <p className="bg-amber-50/50 p-2.5 rounded border border-amber-100 text-[11px] text-amber-900 leading-relaxed font-bold">
                  {detail.step6_appeal.appealReason}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 7: 再次审批奖励 */}
        {detail.step7 && (
          <div className="bg-emerald-50/20 rounded-xl border border-emerald-250 p-4 space-y-2 text-xs shadow-2xs text-left">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-1.5">
              <span className="font-black text-emerald-800 text-[11px]">7. 高管终审最终结果定案</span>
              <span className="text-slate-500 text-[10px] font-mono">定案时间: {detail.step7.reAuditTime}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
              <div>
                <span className="text-slate-500 block text-[10px]">定案审核状态:</span>
                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black inline-block mt-0.5">{detail.step7.reAuditResult}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">最终核准奖励额度:</span>
                <span className="text-rose-600 font-extrabold bg-rose-50 px-1.5 py-0.5 rounded inline-block mt-0.5">{detail.step7.finalReward}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px]">综合结论:</span>
                <span className="font-black text-slate-800 block mt-1">✅ 终审审批通过，成功保障工艺大闸 & 奖励机制闭环流转。</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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

           {task.materialAbnormalDetail ? (
             <div className="space-y-4 text-left">
               <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl w-full">
                 <button 
                   type="button"
                   onClick={() => setActiveDetailTab('base')}
                   className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${activeDetailTab === 'base' ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                 >
                   📄 样例基础表详单 (PDF数据)
                 </button>
                 <button 
                   type="button"
                   onClick={() => setActiveDetailTab('steps')}
                   className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${activeDetailTab === 'steps' ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                 >
                   🛠️ 全流转节点卡 (步骤1-7)
                 </button>
                 <button 
                   type="button"
                   onClick={() => setActiveDetailTab('email')}
                   className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${activeDetailTab === 'email' ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                 >
                   ✉️ 关联原始邮件
                 </button>
               </div>

               {activeDetailTab === 'email' ? (
                 <div className="space-y-3 animate-fadeIn">
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
                   </div>
                 </div>
               ) : (
                 renderMaterialDetailForm()
               )}
             </div>
           ) : (
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
           )}

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
