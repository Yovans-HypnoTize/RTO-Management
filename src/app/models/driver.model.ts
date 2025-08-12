export interface DriverModel {
  driverId: string;
  name: string;
  dob: string;
  licenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  createdBy: string;
  createdByOfficerId: number;
}

export interface Vehicle {
  registrationNumber: string;
  model: string;
  manufacturer: string;
}

export interface Violation {
  id: number;
  type: string;
  isPaid: boolean;
  dueDate: string;
  paid: boolean;
}

export interface SpecificDriverModel {
  name: string;
  maskedLicenseNumber: string;
  licenseExpiryDate: string;
  licenseExpiringSoon: boolean;
  highRisk: boolean;
  vehicles: Vehicle[];
  violations: Violation[];
}
