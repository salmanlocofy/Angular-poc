import { Routes } from '@angular/router';
import { Screen1Component } from './screens/screen1/screen1.component';
import { Screen2Component } from './screens/screen2/screen2.component';

export const routes: Routes = [
  { path: 'screen1', component: Screen1Component },
  { path: 'screen2', component: Screen2Component },
  { path: '', redirectTo: '/screen1', pathMatch: 'full' }, // Default route
];
