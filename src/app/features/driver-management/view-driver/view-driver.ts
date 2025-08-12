import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../../services/driver.service';
import { DriverModel, SpecificDriverModel } from '../../../models/driver.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-driver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-driver.html',
  styleUrl: './view-driver.css',
})
export class ViewDriver implements OnInit {
  driverService = inject(DriverService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  id:any = null 
  officerId:any = null

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');
    console.log('Driver ID:', this.id);
    this.getDriver();
  }

   driver?: SpecificDriverModel;
  
    getDriver = () => {
      this.driverService.getDriversById(this.id, this.officerId).subscribe({
        next: (res: any) => {
          this.driver = undefined;
          this.driver = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    };

  // mockDriver = {
  //   name: 'Yogesh Kumar',
  //   maskedLicenseNumber: 'KA*****456',
  //   licenseExpiryDate: '2030-05-15',
  //   licenseExpiringSoon: false,
  //   highRisk: false,
  //   vehicles: [
  //     {
  //       registrationNumber: 'KA01AB1234',
  //       model: 'Swift Dzire',
  //       manufacturer: 'Maruti Suzuki',
  //     },
  //     {
  //       registrationNumber: 'KA05XY9876',
  //       model: 'Activa 6G',
  //       manufacturer: 'Honda',
  //     },
  //   ],
  //   violations: [
  //     {
  //       type: 'Over Speeding',
  //       isPaid: false,
  //       dueDate: '2025-09-01',
  //       paid: false,
  //     },
  //     {
  //       type: 'Signal Jump',
  //       isPaid: true,
  //       dueDate: '2025-07-20',
  //       paid: true,
  //     },
  //   ],
  // };

  changePath(id:any) {
    this.router.navigate(['payment', id]);
  }

  goBack() {
    this.router.navigate(['drivers']);
  }
}
