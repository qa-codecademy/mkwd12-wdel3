import { Component, inject } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  registerForm = this.generateForm();

  generateForm() {
    return new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]),
      },
      this.confirmPasswordValidator,
    );
  }

  confirmPasswordValidator(formGroup: AbstractControl): null {
    const { password, confirmPassword } = formGroup.value;

    if (password !== confirmPassword)
      formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });

    return null;
  }

  onFormSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) return;

    //Call the auth service to register the user
    const { email, password, username } = this.registerForm.value;

    this.authService.registerUser({
      email,
      password,
      username,
    });
  }
}
