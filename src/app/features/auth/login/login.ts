import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.buildForm();
    this.registerFormListeners();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) =>
          (this.errorMessage =
            err?.error?.message || 'Login failed. Please try again.'),
      });
    }
  }

  private buildForm(): void {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(passwordPattern),
        ],
      ],
    });
  }

  private registerFormListeners(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
      if (this.errorMessage) this.errorMessage = null;
    });
  }
}
