import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from "../image/image.service";

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
})
export class ReadingComponent implements OnInit {

  filename: string;
  device: string;
  timestamp: string;
  imageUrl: string;

  constructor(private route: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit(): void {
    this.filename = this.route.snapshot.params["filename"];
    this.device = this.filename.split("-")[0];
    this.timestamp = this.filename.split("-")[1].split(".")[0];
    this.imageService.fetchImageUrl(this.filename).then(url => {
      this.imageUrl = url;
    })
  }

}
