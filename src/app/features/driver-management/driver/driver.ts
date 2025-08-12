import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../../services/driver.service';
import { DriverModel } from '../../../models/driver.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver.html',
  styleUrl: './driver.css',
})
export class Driver implements OnInit {
  driverService = inject(DriverService);
  router = inject(Router);

  drivers: DriverModel[] = [];
  isShowingUnpaid = false;
  unpaidTaxDetails: any;
  officerId: any = null;
  loading = false;
  error: string | null = null;

  getDrivers = () => {
    this.loading = true;
    this.error = null;
    this.driverService.getDrivers().subscribe({
      next: (res: any) => {
        this.drivers = res || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load drivers';
        this.loading = false;
        console.error(err);
      },
    });
  };

  getUnpaidTax = () => {
    this.loading = true;
    this.error = null;
    this.driverService.getExpiredLicense(this.officerId).subscribe({
      next: (res: any) => {
        console.log('unpaid tax details', res);
        this.unpaidTaxDetails = res || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load expired licenses';
        this.loading = false;
        console.error(err);
      },
    });
  };

  toggleExpiredLicense = () => {
    if (this.isShowingUnpaid) {
      this.getDrivers();
    } else {
      this.loading = true;
      this.error = null;
      this.driverService.getExpiredLicense(this.officerId).subscribe({
        next: (res: any) => {
          console.log('Expired license details', res);
          this.drivers = (res || []).map((d: any, index: number) => ({
            driverId: d.driverId,
            name: d.name,
            dob: '-',
            licenseNumber: '-',
            licenseExpiryDate: d.expiryDate,
            licenseIssueDate: '-',
            createdBy: '-',
            createdByOfficerId: 0,
          }));
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load expired licenses';
          this.loading = false;
          console.error(err);
        },
      });
    }
    this.isShowingUnpaid = !this.isShowingUnpaid;
  };

  ngOnInit(): void {
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');
    this.getDrivers();
  }

  changePath() {
    this.router.navigate(['register-driver']);
  }

  handleDriverPath(id: number | string) {
    this.router.navigate(['driver', id]);
  }

  retry() {
    this.error = null;
    this.getDrivers();
  }
}
