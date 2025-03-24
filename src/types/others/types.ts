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
  favorite:     boolean;
  other:        string;
};