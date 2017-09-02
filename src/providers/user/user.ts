import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';



@Injectable()
export class UserProvider {

  user: Observable<firebase.User>;

  constructor(
    private platform: Platform,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;
  }

  googleSignIn(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({
        'webClientId':'340279576545-a6a44103erdp6k8re3nkqulch08c1j21.apps.googleusercontent.com',
        'offline': true
        })
        .then(res => {
          return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        })
        .catch(err => {
          console.log('err in google-plus', err);
          throw err;
        })
    } else if (this.platform.is('mobileweb')) {
      return <Promise<any>>firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  facebookSignIn(): Promise<any> {
    console.log('called');
    if (this.platform.is('cordova')) {
      this.fb.getLoginStatus().then(res => console.log('logged', res));
      this.fb.logout().then(() => { }).catch(() => { });

      return this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          console.log('face res', res);
          return firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken))
        })
        .catch(err => {
          console.log('err in facebook', err);
          throw err;
        })
    } else if (this.platform.is('mobileweb')) {
      return <Promise<any>>firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
