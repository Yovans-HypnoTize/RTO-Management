import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleModel } from '../../../models/vehicle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.css',
})
export class Vehicle implements OnInit {
  vehicleService = inject(VehicleService);
  router = inject(Router);

  vehicles: VehicleModel[] = [];
  officerId: any = null;
  unpaidTaxDetails: any = [];
  isShowingUnpaid = false;
  loading = false;
  error: string | null = null;

  getVehicles = () => {
    this.loading = true;
    this.error = null;
    this.vehicleService.getVehicles().subscribe({
      next: (res: any) => {
        this.vehicles = res || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load vehicles';
        this.loading = false;
        console.error(err);
      },
    });
  };

  getUnpaidTax = () => {
    this.loading = true;
    this.error = null;
    this.vehicleService.getUnpaidTax(this.officerId).subscribe({
      next: (res: any) => {
        console.log("API raw unpaid tax details", res);
        // Map fields to match template
        this.unpaidTaxDetails = (res || []).map((item: any) => ({
          registrationNumber: item.registration_number,
          taxExpiryDate: item.tax_expiry_date,
          monthsOverdue: item.months_overdue,
          originalAmount: item.original_amount,
          lateFee: item.late_fee,
          hasViolations: item.has_violations,
          ownerName: item.owner_name
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load unpaid tax details';
        this.loading = false;
        console.error(err);
      },
    });
  };

  toggleUnpaidTax = () => {
    if (this.isShowingUnpaid) {
      this.getVehicles();
    } else {
      this.getUnpaidTax();
    }
    this.isShowingUnpaid = !this.isShowingUnpaid;
  };

  ngOnInit(): void {
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');
    this.getVehicles();
  }

  changePath() {
    this.router.navigate(['register-vehicle']);
  }

  handleView(id: any) {
    this.router.navigate(['vehicle', id]);
  }

  retry() {
    this.error = null;
    if (this.isShowingUnpaid) {
      this.getUnpaidTax();
    } else {
      this.getVehicles();
    }
  }
}
