import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Import Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { DocsPage } from '../pages/docs/docs';
import { ImageModalPage } from '../pages/image-modal/image-modal';
import { ShowImageModalPage } from '../pages/show-image-modal/show-image-modal';

// Import Providers
import { AuthData } from '../providers/auth-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    DocsPage,
    ImageModalPage,
    ShowImageModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    DocsPage,
    ImageModalPage,
    ShowImageModalPage
  ],
  providers: [
    AuthData
  ]
})
export class AppModule {}
