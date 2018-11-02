import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../services/auth.service";
import { UserLogin } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "pa-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    const emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {}

  public onLogin(): void {
    const cred: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      token: 'eXmT85eHM3sFCkwSJs5H8a142tk8Svwdd943rLnj1xfEmrEQBGf93qPPwvUnbU3nkbvpTWhW60ypGNr6ddkD6A4mrWGUFOzNRe3j'
    }

    this.loginService.login(cred).subscribe(response => {
      if(response.status === true) {
        localStorage.setItem("u", JSON.stringify(response.user));

        this.router.navigateByUrl('dashboard')
      }
    });
   
  }
}
