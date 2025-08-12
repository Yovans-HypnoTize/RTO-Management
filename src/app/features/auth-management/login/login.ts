import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  form!: FormGroup;

  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
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

 storeObjectInLocalStorage(obj:any) {
  if (typeof obj !== 'object' || obj === null) {
    console.error('Invalid object provided');
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    // Store as string
    localStorage.setItem(key, JSON.stringify(value));
  });

  console.log('All keys and values stored in localStorage separately.');
}

  submit() {
    // localStorage.setItem("token", "sdfsdfdsfdsfsdfds")
   
    if (this.form.valid) {
      this.loginService.login({ ...this.form.value }).subscribe({
        next: (res) => {
          this.form.reset();
          console.log(res);
          this.storeObjectInLocalStorage(res)
          this.router.navigate([""])
          alert('LoggedIn successfully.');
        },
        error: (err) => console.error(err),
      });
    }
  }

  handleRegisterClick() {
    this.router.navigate(["register-officer"])
  }
}
