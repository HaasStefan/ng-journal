import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  @Input({ required: true }) image!: string;
  @Input({ required: true }) imageAlt!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) slug!: string;
}
