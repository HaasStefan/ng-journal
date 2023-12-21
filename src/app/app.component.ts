import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
      <app-header class="mb-12"/>

      <div class="absolute w-full z-10">
          <router-outlet></router-outlet>

          <app-footer/>
      </div>
  `,
  styles: [
  ],
})
export class AppComponent {}
