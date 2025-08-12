export interface DashboardModel {
  role: string;
  pendingDrivers: number;
  pendingVehicles: number;
  totalViolations: number;
  unpaidViolations: number;
  expiredLicenses: number;
  nonCompliantVehicles: number;
  totalFineCollected: number | null;
  totalTaxCollected: number | null;
}
