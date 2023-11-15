import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album.model';
import { Label } from '../model/label.model';
import { AlbumService } from '../services/album.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-by-label',
  templateUrl: './search-by-label.component.html',
  styleUrls: ['./search-by-label.component.css'],
})
export class SearchByLabelComponent implements OnInit {
  albums: Album[] = [];
  idLabel!: number;
  labels: Label[] = [];
  album!: Album;
  constructor(
    private albumService: AlbumService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.albumService.labelsList().subscribe((labs) => {
      this.labels = labs;
      console.log(this.labels);
      this.albumService.albumsList().subscribe((albs) => {
        this.albums = albs;
      });
    });
  }

  onChange() {
    console.log(this.idLabel);
    this.albumService.rechrcheParLabel(this.idLabel).subscribe((albs) => {
      console.log(albs);
      this.albums = albs;
      console.log(this.albums);
    });
  }
}
