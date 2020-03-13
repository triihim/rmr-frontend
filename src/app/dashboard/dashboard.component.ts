import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image/image.service';

interface DeviceImage {
  deviceName: string;
  timestamp: string;
  filename: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  deviceImages: Array<DeviceImage> = [];

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
            deviceName: deviceName,
            timestamp: timestamp,
            filename: imgFilename
          }
        });
        this.deviceImages.sort((img1, img2) => +img2.timestamp - +img1.timestamp);
      })
      .catch(() => {
        console.log("Error fetching images");
      })
  }

}
