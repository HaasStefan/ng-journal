import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
      <main class="h-screen w-full flex flex-col gap-4 justify-center items-center">
          <h2 class="text-6xl md:text-7xl lg:text-9xl font-bold bg-gradient-to-tr from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
              NG Journal</h2>
          <h3 class="text-2xl lg:text-5xl font-normal">A Community Blog for Angular</h3>

          <div class="mt-2 md:mt-6 lg:mt-8 flex flex-col md:flex-row gap-6">
              <a href="/blog">
                  <div class="p-1 text-xl font-medium rounded-md bg-gradient-to-tr from-rose-500 to-fuchsia-500">

                      <div class="bg-white rounded-sm p-2 px-8 flex justify-center">
                          <span class=" bg-gradient-to-tr from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">Blog</span>

                      </div>
                  </div>
              </a>

              <a href="https://github.com/HaasStefan/ng-journal">
                  <div class="p-1 text-xl font-medium rounded-md bg-neutral-700">

                      <div class="bg-white rounded-sm p-2 px-8 text-neutral-700 flex gap-2 justify-center items-center">
                          <img src="/github.svg" class="h-6 w-6" alt="github logo">
                          <span>Contribute</span>
                      </div>
                  </div>
              </a>
          </div>
      </main>

  `,
  imports: [
    RouterOutlet
  ]
})
export default class HomeComponent {
}
