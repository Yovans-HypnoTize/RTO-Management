export interface VehicleModel {
  vehicleId: string;
  ownerId: number;
  registrationNumber: string;
  model: string;
  manufacturer: string;
  createdBy: string;
  createdByOfficerId: number;
}
  

export interface Violation {
  type: string;
  dueDate: string;  
  isPaid: boolean;
  paid: boolean;
}

export interface SpecificVehicleModel {
  id: number;
  registrationNumber: string;
  model: string;
  manufacturer: string;
  taxExpiryDate: string;     
  taxAmount: number;
  inspectionDueDate: string; 
  highViolationFlag: boolean;
  ownerName: string;
  totalViolations: number;
  cargoInfo: string;
  violations: Violation[];
  expired: boolean;
  taxCompliant: boolean;
  commercial: boolean;
}
