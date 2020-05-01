import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/api/spotify.service';
import { Platform, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  private titlePage: string;
  private code: string;
  private token: string;
  private clientId: string;
  private clientSecret: string;
  private validDataCode: boolean;
  private validDataToken: boolean;

  constructor(private activatedRoute: ActivatedRoute, 
              private spotify: SpotifyService,
              private platform: Platform,
              private toastController: ToastController,
              private httpClient: HttpClient) { 


                console.log(sessionStorage.getItem("code"));
      if ( sessionStorage.getItem("code") != null ) {
        this.clientId     = JSON.parse(sessionStorage.getItem("code")).cod;
      }
      if ( sessionStorage.getItem("scr") != null ) {
        this.clientSecret = JSON.parse(sessionStorage.getItem("scr")).cod;
      }  
      this.onChangeButtons(null);
  }

  ngOnInit() {
    this.titlePage = "Authorization";

    this.code = this.platform.getQueryParam('code');
    
    if ( this.code != null ) {
      this.presentToast('Authorization code recovered');
      document.getElementById("rowCode").style.display = "";
    } 

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  onChangeButtons(e) {
    this.onChangeCode(e);
    this.onChangeToken(e);
  }

  onChangeCode(e) {
    if ( this.clientId  != null && this.clientId.length > 0 ) {
      this.validDataCode = true;
    } else {
      this.validDataCode = false;
    }
  }

  onChangeToken(e) {
    if ( 
      (this.clientId     != null && this.clientId.length     > 0 ) &&
      (this.clientSecret != null && this.clientSecret.length > 0) 
      ) {
      this.validDataToken = true;
    } else {
      this.validDataToken = false;
    }
  }

  ngOnDestroy () {
    console.log("Clean");
    this.code = "";
  }

  getAuthorizationCode() {
    let url = 'https://accounts.spotify.com/authorize';
    let my_client_id = this.clientId;
    let  redirect_uri = 'http://localhost:8100/authorization';
    let scope = 'user-read-private user-read-email';

    let completeUrl =  url 
      + '?response_type=code' 
      + '&client_id=' + my_client_id 
      + '&scope=' + encodeURIComponent(scope)
      + '&redirect_uri=' + encodeURIComponent(redirect_uri);

    window.location.href = completeUrl;
    sessionStorage.setItem('code', JSON.stringify({ cod: this.clientId }));
  }

  getToken() {
    sessionStorage.setItem('scr', JSON.stringify({ cod: this.clientSecret }));
    this.postToken().subscribe(result => {
      console.log(result);
      this.token = result.access_token;
      if ( this.token != null ) {
        this.presentToast('Token successfully recovered');
      }
      document.getElementById("rowToken").style.display = "";
    });

  }

  postToken(): Observable<any> {
    let url = 'https://accounts.spotify.com/api/token';
    let my_client_id = this.clientId;
    let  redirect_uri = 'http://localhost:8100/authorization';

    let body  = new HttpParams()
      .set('code', this.code)
      .set('redirect_uri', redirect_uri)
      .set('grant_type', 'authorization_code')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)

    return this.httpClient.post(url,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
       
  }

}
