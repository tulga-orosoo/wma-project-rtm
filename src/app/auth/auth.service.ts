import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from  'firebase';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn:  'root'
})
export class AuthService {
  user: User;
  _user: any;
  userSub: any;


  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private db: AngularFireDatabase,) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user);
        this.userSub = this.db.object('data/users/'+user.uid).valueChanges().subscribe(data => {
          this.userSub.unsubscribe();
          this._user = data;
          console.log(this._user);
        });

        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }


  isAuthenticated():boolean {
    return false;
  }

  async login(email:  string, password:  string) {

    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.router.navigate(['/']);
    } catch (e) {
        return {error: e.message};
    }
    }

    async logout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}
}
