export type CompanyType = {
  id:           number;
  name:         string;
  industry:     number;
  employees:    number | undefined;
  website:      string | undefined;
  address:      string;
  income:       string;
  holidays:     string;
  workingHours: string;
  selectionFlow: string[];
  other:        string;
  favorite:     boolean;
};