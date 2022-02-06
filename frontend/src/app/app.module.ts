import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadPageComponent } from './download-page/download-page.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DownloadPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	};
};
