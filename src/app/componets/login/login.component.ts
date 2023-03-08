import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FirebaseErrorService } from '../../services/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;
  loading: boolean = false;

  constructor(
    private form: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorFirebase: FirebaseErrorService
  ) {
    this.login = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  log() {
    const email = this.login.value.email;
    const password = this.login.value.password;

    this.loading = true;

    if (this.login.valid) {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((usuario) => {
          if (usuario.user?.emailVerified) {
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate(['/verify']);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.toastr.error(this.errorFirebase.codeError(error.code), 'Error');
        });
    } else {
      this.loading = false;
      this.login.markAllAsTouched();
    }
  }

  get emailField() {
    return this.login.get('email');
  }
  get keyField() {
    return this.login.get('password');
  }

  get emailRequerido() {
    return this.emailField?.touched && this.emailField.hasError('required');
  }

  get emailInValid() {
    return this.emailField?.touched && this.emailField.hasError('email');
  }
  get keyRequerido() {
    return this.keyField?.touched && this.keyField.hasError('required');
  }
}
