import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../../services/driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-driver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register-driver.html',
  styleUrls: ['./register-driver.css'],
})
export class RegisterDriver implements OnInit {
  form!: FormGroup;

  fb = inject(FormBuilder);
  driverService = inject(DriverService);
  router = inject(Router);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      licenseIssueDate: ['', [Validators.required]],
      licenseExpiryDate: ['', [Validators.required]],
    });
  }

  changeRoute = () => {
    this.router.navigate(['drivers']);
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
    console.log(this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const createdBy = JSON.parse(localStorage.getItem('name') || '""');
    const createdByOfficerId = JSON.parse(localStorage.getItem('id') || '0');

    this.driverService
      .registerDriver({ ...this.form.value, createdBy, createdByOfficerId })
      .subscribe({
        next: (res) => {
          this.form.reset();
          console.log(res);
          alert('Officer registered successfully.');
          this.router.navigate(['drivers']);
        },
        error: (err) => console.error(err),
      });
  }
}
