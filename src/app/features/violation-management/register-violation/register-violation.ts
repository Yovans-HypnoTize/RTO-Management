import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViolationService } from '../../../services/violation.service';
import { Router } from '@angular/router';
import { DriverService } from '../../../services/driver.service';
import { DriverModel } from '../../../models/driver.model';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleModel } from '../../../models/vehicle.model';

@Component({
  selector: 'app-register-violation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register-violation.html',
  styleUrl: './register-violation.css',
})
export class RegisterViolation implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private violationService: ViolationService,
    private router: Router
  ) {}

  driverService = inject(DriverService);
  vehicleService = inject(VehicleService);

  drivers!: DriverModel[];

  vehicles!: VehicleModel[];

  driverOptions: { id: string; value: string }[] = [];
  vehicleOptions: { id: string; value: string }[] = [];

  role: any = null;
  officerId: any = null;

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

  getVehicles = (driverId: any) => {
    this.vehicleService.getVehiclesByOwnerId(driverId).subscribe({
      next: (res: any) => {
        this.vehicles = res;
        this.vehicleOptions = res.map((v: any) => ({
          id: v.vehicleId,
          value: `${v.registrationNumber} - ${v.model}`,
        }));
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('role') || 'null');
    this.officerId = JSON.parse(localStorage.getItem('id') || 'null');

    this.getDrivers();

    // this.getVehicles();

    this.form = this.fb.group({
      driverId: ['', Validators.required],
      vehicleId: ['', [Validators.required]],
      violationType: ['', Validators.required],
      createdBy: [''],
      createdByOfficerId: [''],
    });

    this.form.get('driverId')?.valueChanges.subscribe((driverId) => {
      if (driverId) {
        this.getVehicles(Number(driverId));
      } else {
        this.vehicleOptions = [];
      }
    });
  }

  changePath() {
    this.router.navigate(['violations']);
  }

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
    console.log(this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      this.violationService
        .registerViolation({
          ...this.form.value,
          vehicleId: Number(this.form.value.vehicleId),
          driverId: Number(this.form.value.driverId),
          createdBy: this.role,
          createdByOfficerId: this.officerId,
        })
        .subscribe({
          next: (res) => (
            alert('Violation registered successfully.'),
            console.log('response', res)
          ),
          error: (err) => {
            alert(err.message);
            console.error(err);
          },
        });
    }
  }
}
