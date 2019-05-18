import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showMessages: any = {error: false, success: false};
  errors: string[] = [];
  messages: string[] = [];
  user: any = {email:'', password: ''};
  submitted: boolean;
  rememberMe: boolean;

  constructor(private  authService:  AuthService) { }
  ngOnInit() {}


  // protected service: NbAuthService;
  // protected options: {};
  // protected cd: ChangeDetectorRef;
  // protected router: Router;
  // redirectDelay: number;



  async login() {
    let result = await this.authService.login(this.user.email, this.user.password);
    if(result.error) {
      this.user.password = '';
      this.setError(result.error);
    }
  }

  protected setError(err:string) {
    this.showMessages.error = true;
    this.errors = [err];
  }
}
