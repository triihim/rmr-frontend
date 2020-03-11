import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchUserImageNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated().then(isAuthenticated => {
        if(isAuthenticated) {
          this.http.get("http://localhost:3000/api/images",
            {headers: {"authorization": "Bearer " + this.authService.token}}
          )
          .subscribe((devices: object[]) => {
            const names: string[] = [];
            devices.map(d => {
              const deviceName = d["device"];
              d["images"].map(image => {
                names.push(deviceName + "/" + image);
              })
            });

            resolve(names);

          });
        } else {
          reject();
        }
      })
    })
  }

  fetchImageUrl(filename): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated().then(isAuthenticated => {
        if(isAuthenticated) {
          this.http.get("http://localhost:3000/api/images/" + filename, {
            headers: new HttpHeaders({
              "authorization": "Bearer " + this.authService.token,
              "content-type": "text/plain"
            }),
            responseType: "text"
          })
          .subscribe((url: string) => {
            resolve(url);
          }, error => {
            reject();
          })
        } else {
          reject();
        }
      });
    })
  }

}
