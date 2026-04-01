import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

interface LoginData {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  INITIALSTATE : LoginData=  {
    email: '',
    password: '',
  }
  loginModel = signal<LoginData>(this.INITIALSTATE);

  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email address' });
    required(path.password, { message: 'Password is required' });
    minLength(path.password, 5, { message: 'Password must be at least 5 characters' });
    //validame que la contraseña no tenga espacios vacios
    validate(path.password, ({ value }) => {
      if (value().trim().length < 5) {
        return {
          message: 'Password cannot be empty',
          kind: 'error',
        };
      }
      return null;
    });
  });

  ifFieldInvalid(fieldName: keyof LoginData) {
    const fieldSignal = this.loginForm[fieldName]; //este fila estamos
    if (!fieldSignal) return false;
    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true)
    submit(this.loginForm, async () => {
      console.log('Formulario enviado');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.onReset();
      this.loading.set(false)
    });
  }

  async onReset() {
    this.loginForm().reset(this.INITIALSTATE);
  }

  loading = signal(false);
}
