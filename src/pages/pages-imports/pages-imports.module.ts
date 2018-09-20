import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesImportsPage } from './pages-imports';

@NgModule({
  declarations: [
    PagesImportsPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesImportsPage),
  ],
})
export class PagesImportsPageModule {}
