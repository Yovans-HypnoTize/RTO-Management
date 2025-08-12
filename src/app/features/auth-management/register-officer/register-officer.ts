import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfficerService } from '../../../services/officer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-officer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register-officer.html',
  styleUrl: './register-officer.css',
})
export class RegisterOfficer implements OnInit {
  form!: FormGroup;

  fb = inject(FormBuilder);
  officerService = inject(OfficerService);
  router = inject(Router);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      badgeNumber: ['', [Validators.required]],
      joiningDate: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  goToLogin = async (): Promise<void> => {
    await this.router.navigate(['login']);
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.officerService.registerOfficer(this.form.value).subscribe({
      next: (res) => {
        this.form.reset();
        console.log(res);
        alert('Officer registered successfully.');
        this.goToLogin();
      },
      error: (err) => console.error(err),
    });
  }
}
