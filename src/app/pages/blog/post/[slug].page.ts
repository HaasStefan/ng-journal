 import {AfterViewInit, Component} from '@angular/core';
 import {injectContent, MarkdownComponent} from "@analogjs/content";
 import {BlogPost} from "../../../models/blog-post.model";
 import {AsyncPipe, DatePipe} from "@angular/common";
 import {AuthorComponent} from "../../../components/author/author.component";

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MarkdownComponent,
    AuthorComponent
  ],
  template: `
      @if (post$ | async;as post) {
          <div class="text-black flex justify-center" id="content">
              <article class="p-4 pt-28 md:basis-2/3 lg:basis-1/2 text-xl selection:bg-black selection:text-white">

                  <div class="mb-16 md:mb-28">
                      <div class="flex justify-center">
                          <img [src]="post.attributes.image" class="rounded-lg"
                               [alt]="post.attributes.imageAlt">
                      </div>

                      <div class="flex-grow 2xl:flex-grow-0 flex flex-col justify-end items-center  pb-8 gap-4">
                          <h2 class="px-4 text-center font-bold text-4xl md:text-5xl xl:text-6xl">{{ post.attributes.title }}</h2>

                          <div class="text-center text-xl">
                              {{ post.attributes.date | date: 'mediumDate' }}
                          </div>

                          <app-author [author]="post.attributes.author" class="pt-4 w-full "/>

                      </div>
                  </div>

                  <analog-markdown [content]="post.content"/>


                  <div id="giscus" class="block">
                  </div>
              </article>
          </div>
      }
  `,
  styles: [
    `
        ::ng-deep h1 {
            @apply text-4xl;
            @apply font-bold;
            @apply mb-4;
        }

        ::ng-deep h2 {
            @apply text-3xl;
            @apply font-bold;
            @apply mb-1;
            @apply mt-10;
        }

        /* md */
        @media (min-width: 768px) {
            ::ng-deep h1 {
                @apply text-5xl;
            }

            ::ng-deep h2 {
                @apply text-3xl;
            }

            ::ng-deep p {
                @apply leading-8;
            }

            ::ng-deep pre {
                @apply text-base;
                max-width: 50vw;
            }
        }

        ::ng-deep p {
            @apply py-2;
            @apply leading-10;
        }

        ::ng-deep p > a {
            @apply text-blue-500;
            @apply font-semibold;
        }

        ::ng-deep p > a:hover {
            @apply underline;
            @apply text-blue-600;
        }

        ::ng-deep p > code {
            @apply bg-gray-200;
            @apply rounded-md;
            @apply px-2;
            @apply py-1;
            @apply text-base;
        }

        ::ng-deep pre {
            @apply rounded-lg;
            @apply text-sm;
            overflow-x: scroll;
            max-width: 91vw;
        }
    `
  ]
})
export default class SlugPage implements AfterViewInit {
  readonly post$ = injectContent<BlogPost>();

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createGiscus();
    }, 1000);
  }

  scrollToContent(): void {
    document.getElementById("content")!.scrollIntoView({ behavior: "smooth" });
  }

  createGiscus() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'HaasStefan/giscus-monorepox');
    script.setAttribute('data-repo-id', 'R_kgDOKoEQqw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOKoEQq84CanZ1');
    script.setAttribute('data-mapping', 'url');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', '');
    document.getElementById('giscus')!.appendChild(script);
  }

}
