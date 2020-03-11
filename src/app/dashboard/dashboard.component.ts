import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image/image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  deviceImages: Array<object> = [
    {
      device: "RMR0123456789",
      timestamp: "1583945550781",
      filename: "RMR0123456789/1583945550781.jpg"
    },
    {
      device: "RMR0123456789",
      timestamp: "1583942450781",
      filename: "RMR0123456789/1583942450781.jpg"
    }
];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.imageService.fetchUserImageNames()
      .then(images => {
        this.deviceImages = images.map(imgFilename => {
          const deviceName = imgFilename.split("/")[0];
          const timestamp = imgFilename.split("/")[1].split(".")[0];
          return {
            device: deviceName,
            timestamp: timestamp,
            filename: imgFilename
          }
        });
      })
      .catch(() => {
        console.log("Error fetching images");
      })
  }

}
