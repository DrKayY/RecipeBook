import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, FirebaseAuthRes } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode = true;
  loading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      let authObservable: Observable<FirebaseAuthRes>;

      this.loading = true;
      this.error = null;

      if (this.loginMode) {
        authObservable = this.authService.signIn(form.value.email, form.value.password);
      } else {
        authObservable = this.authService.signUp(form.value.email, form.value.password);
        }

      authObservable.subscribe(
        authRes => {
          console.log(authRes);
          this.loading = false;
          this.router.navigate(['/recipes']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.loading = false;
        }
        );
    }

    form.reset();
  }

}
