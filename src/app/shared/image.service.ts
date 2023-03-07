import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
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
      },
      (error) => console.error('Error uploading file:', error)
    );
  }

  public image: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public getImage(fileIndex: number): Observable<string | null> {
    const url = `http://localhost:3000/image?fileIndex=${fileIndex}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (next: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(next);
        reader.onloadend = () => {
          this.image.next(reader.result as string);
        };
      },
      (error: any) => {
        this.image.next(null);
      }
    );
    return this.image.asObservable();
  }

}
