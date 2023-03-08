import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';

@Component({
  selector: 'app-recover-passw',
  templateUrl: './recover-passw.component.html',
  styleUrls: ['./recover-passw.component.scss'],
})
export class RecoverPasswComponent {
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private form: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorFirebase: FirebaseErrorService
  ) {
    this.recuperarUsuario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recuperar() {
    const email = this.recuperarUsuario.value.email;
    this.loading = true;

    if (this.recuperarUsuario.valid) {
      this.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.toastr.info(
            'Correo Enviado para reestablecer contraseña',
            'Confirmado'
          );
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.loading = false;
          this.toastr.error(this.errorFirebase.codeError(error.code), 'Error');
        });
    } else {
      this.loading = false;
      this.recuperarUsuario.markAllAsTouched();
    }
  }

  get emailField() {
    return this.recuperarUsuario.get('email');
  }

  get emailRequerido() {
    return this.emailField?.touched && this.emailField.hasError('required');
  }

  get emailInValid() {
    return this.emailField?.touched && this.emailField.hasError('email');
  }
}
