import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Author} from "../../models/blog-post.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {
  @Input({required: true}) author!: Author;
}
