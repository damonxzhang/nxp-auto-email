export interface UserProfile {
  id: string;
  name: string;
  fullName: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  managerId?: string;
  vacationInfo?: {
    isVacation: boolean;
    startDate?: string;
    endDate?: string;
    substitutes: Record<string, string>; // systemId -> userId
  };
}

export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'processing' | 'completed';

export interface ActionStep {
  id: string;
  text: string;
  completed: boolean;
}

export interface WorkflowStep {
  index: number;
  name: string;
  handler: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., '审批', '工单', '告警', '通知', '邮件'
  status: TaskStatus;
  priority: Priority;
  sourceSystem: string; // e.g., 'OA系统', '监控系统', 'ERP平台', 'CRM平台', '核心邮箱'
  dueDate: string; // YYYY-MM-DD
  createdDate: string; // YYYY-MM-DD
  receivedDate?: string; // YYYY-MM-DD HH:mm
  urgencyExplanation?: string;
  actionSteps: ActionStep[];
  assignee: string;
  workflow?: {
    systemName: string;
    currentStepIndex: number;
    steps: WorkflowStep[];
  };
  urls?: string[];
  imageUrls?: string[];
  attachments?: { name: string; url: string }[];
  materialAbnormalDetail?: {
    lotNo: string;
    processName: string;
    machineNo: string;
    pkgType: string;
    pkgCode: string;
    substandardType: string;
    issueNo: string;
    discoveredBy: string;
    launchTime: string;
    fiveMOneE: string;
    filePath: string;
    historyFile: string;
    reason: string;
    anomalyCategory: string;
    initialActionDesc: string;
    initialActionBy: string;
    teamLeaderActionTime: string;
    step2?: {
      substandardTypes: string[];
      substandardQtys: string[];
      actionDesc: string;
    };
    step3?: {
      engineerOpinion: string;
      actionOpinion: string;
      engineerActionTime: string;
      isKeepSubstandard: string;
      keepInfo: string;
    };
    step4?: {
      isKeepSubstandard: string;
      keepInfo: string;
      remark: string;
      teamLeaderActionTime: string;
    };
    step5?: {
      isPublic: string;
      qualityRiskLevel: string;
      effortLevel: string;
      rewardCalc: string;
      actionTime: string;
    };
    step6?: {
      isModify: string;
      auditResult: string;
      auditTime: string;
      auditReward: string;
    };
    step6_appeal?: {
      isAppeal: string;
      appellant: string;
      appealTime: string;
      appealReward: string;
      appealReason: string;
    };
    step7?: {
      reAuditResult: string;
      reAuditTime: string;
      finalReward: string;
      finalAuditResult: string;
    };
  };
}

export interface IncomingMessage {
  id: string;
  title: string;
  sender: string;
  content: string;
  timestamp: string; // ISO or human readable
  type: 'email' | 'alert' | 'approval' | 'notice' | 'workorder';
  sourceSystem: string;
  status: 'unparsed' | 'parsing' | 'parsed' | 'ignored';
  associatedTaskId?: string;
}