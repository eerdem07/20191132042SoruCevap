import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { KayitOlComponent } from './components/kayit-ol/kayit-ol.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SoruListeComponent } from './components/soru-liste/soru-liste.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { SoruDetayComponent } from './components/soru-detay/soru-detay.component';
import { SoruComponent } from './components/soru/soru.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SafeHTMLPipe } from './pipes/safeHTML.pipe';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { JoditAngularModule } from 'jodit-angular';
import { CevapDialogComponent } from './components/dialogs/cevap-dialog/cevap-dialog.component';

@NgModule({
  declarations: [
    // Main Components
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    KategoriComponent,
    SoruComponent,
    SoruDetayComponent,
    SoruListeComponent,
    ProfilComponent,
    KayitOlComponent,
    ProfileUpdateComponent,

    //Dialoglar Components
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    CevapDialogComponent,
    SoruDialogComponent,
    UyeDialogComponent,

    //Admin Components
    AdminKategoriComponent,
    AdminUyeComponent,
    AdminSoruComponent,

    // Pipes
    SafeHTMLPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JoditAngularModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    UyeDialogComponent,
  ],
  providers: [
    MyAlertService,
    ApiService,
    SafeHTMLPipe,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
