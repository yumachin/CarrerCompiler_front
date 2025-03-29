export type CompanyType = {
  id:            number;
  userId:        number;
  name:          string;
  industry:      number;
  employees:     number;
  website:       string;
  address:       string;
  income:        number;
  holidays:      number;
  workingHours:  string;
  selectionFlow: string;
  other:         string;
  favorite:      boolean;
};

export type InterviewType = {
  id: number;
  userId: number;
  companyId: number;
  companyName: string;
  date: string | null;
  interviewType: string;
  selectionId: number;
  onlineUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MeetingType = {
  id: number;
  userId: number;
  companyId: number;
  companyName: string;
  date: string | null;
  meetingType: string;
  onlineUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SubmissionType = {
  id: number
  userId: number;
  companyId: number;
  companyName: string;
  deadline: string | null;
  submissionType: number;
  status: boolean;
  contactMedia: string;
  submissionUrl: string;
  iconId: number;
  createdAt: string;
  updatedAt: string;
};