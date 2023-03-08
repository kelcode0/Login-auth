import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{FirebaseErrorService }from '../../services/firebase-error.service'
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;
  registroExitoso: boolean = false;

  constructor(
    private form: FormBuilder,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorFirebase : FirebaseErrorService
  ) {
    this.formulario = this.form.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rptaPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  registrar() {
    const email = this.formulario.value.email;
    const password = this.formulario.value.password;
    const rptaPassword = this.formulario.value.rptaPassword;

    if (password !== rptaPassword) {
      this.toastr.error('Contraseña  Diferentes', 'Error');
      return;
    }
    if (this.keyField?.hasError('minlength')){
      this.toastr.error('Contraseña debe tener 8 caracteres', 'Error');
      return;

    }

    this.registroExitoso = true
    if(this.formulario.valid){
      this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.verificarUsuario();


      })
      .catch((error) => {
        this.registroExitoso =false
        this.toastr.error(this.errorFirebase.codeError(error.code), 'Error');
      });
    } else {
      this.registroExitoso =false
      this.formulario.markAllAsTouched();
    }


  }

  verificarUsuario(){
    this.auth.currentUser
    .then((user) =>{
      user?.sendEmailVerification()
    })
    .then(()=>{
       this.toastr.info('Le enviamos Correo Electrónico para verificar Correo', 'Registro Exitoso');
        this.router.navigate(['/login'])
    })

  }

  get emailField(){
    return this.formulario.get('email')
  }
  get keyField(){
    return this.formulario.get('password')
  }
  get keyFieldRe(){
    return this.formulario.get('rptaPassword')
  }

  get emailRequerido(){
    return this.emailField?.touched && this.emailField.hasError('required')
  }

  get emailInValid(){
    return this.emailField?.touched && this.emailField.hasError('email')
  }
  get keyRequerido(){
    return this.keyField?.touched && this.keyField.hasError('required')
  }

  get keyRequeridoRe(){
    return this.keyFieldRe?.touched && this.keyFieldRe.hasError('required')
  }


}
