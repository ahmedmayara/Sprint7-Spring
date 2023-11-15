import { Injectable } from '@angular/core';
import { Album } from '../model/album.model';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  apiURL: string = 'http://localhost:8222/ALBUMS-SERVICE/albums/api';

  albums: Album[];
  album!: Album;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.albums = [];
  }

  albumsList(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiURL + '/allAlbums');
  }

  addAlbum(al: Album): Observable<Album> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.post<Album>(this.apiURL + '/addAlbum', al, {
      headers: headers,
    });
  }

  deleteAlbum(id: number) {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.delete(this.apiURL + '/deleteAlbum/' + id, {
      headers: headers,
    });
  }

  getAlbumById(id: number): Observable<Album> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.get<Album>(this.apiURL + '/album/' + id, {
      headers: headers,
    });
  }

  updateAlbum(al: Album): Observable<Album> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.put<Album>(this.apiURL + '/updateAlbum', al, {
      headers: headers,
    });
  }

  labelsList(): Observable<Label[]> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.get<Label[]>(this.apiURL + '/labels/allLabels', {
      headers: headers,
    });
  }

  rechrcheParLabel(idLabel: number): Observable<Album[]> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.get<Album[]>(this.apiURL + '/label/' + idLabel, {
      headers: headers,
    });
  }

  addLabel(lab: Label): Observable<Label> {
    let token = this.authService.getToken();
    token = 'Bearer ' + token;
    let headers = new HttpHeaders({ Authorization: token });
    return this.http.post<Label>(this.apiURL + '/labels/addLabel', lab, {
      headers: headers,
    });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
}
