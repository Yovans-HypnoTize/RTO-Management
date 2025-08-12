import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../../services/driver.service';
import { DriverModel } from '../../../models/driver.model';

@Component({
  selector: 'app-register-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register-vehicle.html',
  styleUrl: './register-vehicle.css',
})
export class RegisterVehicle implements OnInit {
  form!: FormGroup;
  fb = inject(FormBuilder);
  vehicleService = inject(VehicleService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  driverService = inject(DriverService);

  driverOptions: { id: string; value: string }[] = [];
  drivers!: DriverModel[];

  getDrivers = () => {
    this.driverService.getDrivers().subscribe({
      next: (res: any) => {
        this.drivers = [];
        this.driverOptions = res.map((d: any) => ({
          id: d.driverId,
          value: `${d.name} (${d.licenseNumber})`,
        }));
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  role: any = null;
  officerId: any = null;

  ngOnInit() {
    this.getDrivers();
    this.role = JSON.parse(localStorage.getItem('role') || 'null');
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');
    console.log('Driver ID:', this.role);
    this.form = this.fb.group({
      registrationNumber: ['', Validators.required],
      model: ['', Validators.required],
      manufacturer: ['', Validators.required],
      ownerId: ['', Validators.required],
      createdBy: [''],
      createdByOfficerId: [0],
    });
  }

  changePath = () => {
    this.router.navigate(['vehicles']);
  };

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }
    return '';
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  submit() {
    console.log(this.form.valid);
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      this.vehicleService
        .registerVehicle({
          ...this.form.value,
          ownerId: Number(this.form.value.ownerId),
          createdBy: this.role,
          createdByOfficerId: this.officerId,
        })
        .subscribe({
          next: (res) => {
            this.form.reset();
            console.log('response', res);
            alert('Vehicle registered successfully.');
            this.router.navigate(['vehicles'])
          },
          error: (err) => console.error(err),
        });
    }
  }
}
