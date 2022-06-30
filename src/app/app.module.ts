import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MovingPoiComponent } from './moving-poi/moving-poi.component';
import { CursorComponent } from './cursor/cursor.component';
import { PoiListComponent } from './poi-list/poi-list.component';
import { PoiDetailsComponent } from './poi-details/poi-details.component';
import { KmsPipe } from './kms.pipe';
import { TrailPointComponent } from './trail-point/trail-point.component';

@NgModule({
  declarations: [
    AppComponent,
    MovingPoiComponent,
    CursorComponent,
    PoiListComponent,
    PoiDetailsComponent,
    KmsPipe,
    TrailPointComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
