import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../data/post.model';
import { PostService } from '../../data/post.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  photoCover: string = '';
  contentTitle: string = '';
  contentDescription: string = '';
  tags: string[] = [];
  private id: string | null = '0';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((value: ParamMap) => {
      this.id = value.get('id');
      this.setValuesToComponent(this.id);
    });
  }

  setValuesToComponent(id: string | null) {
    this.postService.getPostById(id).subscribe((result: Post | undefined) => {
      if (result) {
        this.contentTitle = result.title;
        this.contentDescription = result.description;
        this.photoCover = result.photoCover;
        this.tags = result.tags || [];
      }
    });
  }
}
