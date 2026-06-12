export interface UserProfile {
  id: string;
  name: string;
  fullName: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  managerId?: string;
}

export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'processing' | 'completed';

export interface ActionStep {
  id: string;
  text: string;
  completed: boolean;
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
  urgencyExplanation?: string;
  actionSteps: ActionStep[];
  assignee: string;
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