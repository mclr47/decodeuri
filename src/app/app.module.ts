import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollComponent } from './comp/scroll/scroll.component';
import { HashSpyDirective } from './directives/hash-spy.directive';
import { HashActiveDirective } from './directives/hash-active.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    HashSpyDirective,
    HashActiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
