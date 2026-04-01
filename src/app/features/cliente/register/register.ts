import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { form, required, FormField } from '@angular/forms/signals';

type User = {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  password: string;
  telefono: string;
};
@Component({
  selector: 'app-register',
  imports: [FormField, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  INITIALSTATE: User = {
    nombre: '',
    apellido: '',
    username: "",
    email: '',
    password: '',
    telefono: '',
  };

  public registerModel = signal<User>(this.INITIALSTATE);
  loading = signal(false);

  userForm = form(this.registerModel, (path) => {
    required(path.nombre, { message: 'Nombre es requerido' });
    required(path.apellido, { message: 'Apellido es requerido' });
    required(path.username, { message: 'Username es requerido' });
    required(path.email, { message: 'Email es requerido' });
    required(path.password, { message: 'Password es requerido' });
    required(path.telefono, { message: 'Telefono es requerido' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(false);
    console.log('Registro enviado');
    this.loading.set(true);
  }

  ifFieldInvalid(fieldName: keyof User) {
    const fieldSignal = this.userForm[fieldName];
    if (!fieldSignal) return false;
    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }
}
