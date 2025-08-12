export interface TaxModel {
  id: string;
  name: string;
  dob: string;
  licenseNumber: string;
  licenseIssue: string;
  licenseExpiry: string;
  status: 'active' | 'inactive';
  violations: number[];
  vehicles: string[];
}