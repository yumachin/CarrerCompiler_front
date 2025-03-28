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
  date: string | null;
  interviewType: string;
  selectionId: number;
  onlineUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};