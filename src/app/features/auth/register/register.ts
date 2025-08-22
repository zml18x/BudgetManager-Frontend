import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit(): void {
    this.buildForm();
    this.registerFormListeners();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) =>
          (this.errorMessage =
            err?.error?.message || 'Login failed. Please try again.'),
      });
    }
  }

  private buildForm(): void {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    this.registerForm = this.fb.group({
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
    this.registerForm.valueChanges.subscribe(() => {
      this.submitted = false;
      if (this.errorMessage) this.errorMessage = null;
    });
  }
}
