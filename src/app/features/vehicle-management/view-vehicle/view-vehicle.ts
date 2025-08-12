import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle.service';
import { SpecificVehicleModel } from '../../../models/vehicle.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-vehicle.html',
  styleUrl: './view-vehicle.css',
})
export class ViewVehicle implements OnInit {
  vehicleService = inject(VehicleService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  id: any = null;
  officerId: any = null;
  role: any = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');
    this.role = JSON.parse(localStorage.getItem('role') || 'null');
    console.log('Driver ID:', this.id);
    this.getVehicle();
  }

  vehicle?: SpecificVehicleModel;

  getVehicle = () => {
    this.vehicleService.getVehicleById(this.id, this.officerId).subscribe({
      next: (res: any) => {
        this.vehicle = undefined;
        this.vehicle = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  changePath() {
    this.router.navigate(['vehicles']);
  }

  renewTax(id:any) {
    const confirmed = confirm('Are you sure you want to renew the tax?');
    if (confirmed) {
      this.vehicleService
        .renewTax({
          vehicleId: Number(id),
          amount:1,
          createdBy: this.role,
        })
        .subscribe({
          next: (res) => {
            console.log('response', res);
          },
          error: (err) => console.error(err),
        });
      
      alert('Tax renewed successfully!');
    }
  }
}
