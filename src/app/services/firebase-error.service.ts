import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorService {
  constructor() {}

  codeError(code: string) {
    switch (code) {
      //correo ya existe
      case 'auth/email-already-in-use':
        return 'Usario ya registrado';
      //contrasena debil
      case 'auth/weak-password':
        return 'Contraseña debil';
      //correo invalido
      case 'auth/invalid-email':
        return 'Correo Invalido';

      case 'auth/wrong-password':
        return 'Contraseña Incorrecta';
      case 'auth/user-not-found':
        return 'Usuario No Existe';
      case 'auth/invalid-email':
        return 'Correo No Registrado'
      default:
        return 'Error desconocido';
    }
  }
}
