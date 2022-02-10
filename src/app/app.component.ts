import { Component } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { WindowService } from './window.service';
import { environment } from '../environments/environment';





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  windowRef: any;
  prefix: any;
  line: any;
  verifCode: string;



  constructor(public windowService: WindowService) { }

  ngOnInit() {


  }

  ngAfterViewInit() {

    firebase.initializeApp(environment.firebaseConfig);

    console.log("hhhhhhh");
    this.windowRef = this.windowService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    console.log(this.windowRef.recaptchaVerifier);

    this.windowRef.recaptchaVerifier.render()
  }



  //Initiate windowRef from WindowService
  ionViewWillEnter() {
  }




  sendLoginCode() {
    //Make sure phone number in e164 format

    console.log(this.prefix)
    const num = this.prefix.toString() + this.line.toString();
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      }).catch(err => console.log('err1', err))
  }
  verifyCode() {

    console.log(this.verifCode)

    this.windowRef.confirmationResult.confirm(this.verifCode.toString())
      .then(async result => {
        console.log(result);
        //If the result is successful...
      })
      .catch(err => {
        console.log('err2', err)

      });
  }
}
