import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {EMPTY, map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public $latestImage = new Observable<Blob | null>()

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }


  public uploadImage(dataUrl: string, afterUploadNavigationUrl?: string): void {
    // dataUrl in ein Blob-Objekt umwandeln
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });

    // FormData mit Blob-Objekt erstellen
    const formData = new FormData();
    formData.append('image', blob, 'mein-dateiname.jpg');

    // HTTP-POST-Anfrage an Server senden
    this.http.post('http://localhost:3000/upload', formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('File uploaded successfully.')
        if (afterUploadNavigationUrl) this.router.navigate([afterUploadNavigationUrl])
      },
      (error) => console.error('Error uploading file:', error)
    );
  }

  public getImage(): void {
    this.$latestImage = this.http.get('http://localhost:3000/image', { responseType: 'blob' })
  }
}
