
 import { Component } from '@angular/core';
 import {BlogCardComponent} from "../../components/blog-card/blog-card.component";
 import {AsyncPipe, NgForOf} from "@angular/common";
 import {injectContentFiles} from "@analogjs/content";
 import {BlogPost} from "../../models/blog-post.model";


@Component({
  standalone: true,
  imports: [
    BlogCardComponent,
    AsyncPipe
  ],
  template: `
      <main class="pt-32 w-full">
          <div class="sm:flex sm:justify-center min-h-screen">
              <div class="max-w-screen-lg lg:max-w-screen-xl">
                  <h1 class="text-center text-6xl font-bold bg-gradient-to-tr from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                      The Community Blog
                  </h1>

                  <ul class="grid grid-cols-3 gap-8 p-16">
                      @for (blogPost of blogPosts;track $index) {
                          <app-blog-card
                                  [image]="blogPost.attributes.image"
                                  [imageAlt]="blogPost.attributes.imageAlt"
                                  [slug]="blogPost.attributes.slug"
                                  [title]="blogPost.attributes.title"
                                  [description]="blogPost.attributes.description"
                          />
                      }
                  </ul>
              </div>
          </div>
      </main>
  `,
})
export default class IndexPage {
  readonly blogPosts = injectContentFiles<BlogPost>();
}
