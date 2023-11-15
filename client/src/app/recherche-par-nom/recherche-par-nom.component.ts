import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album.model';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css'],
})
export class RechercheParNomComponent implements OnInit {
  albums!: Album[];
  allAlbums!: Album[];
  searchTerm!: string;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.albumsList().subscribe((data) => {
      this.allAlbums = data;
    });
  }

  onKeyUp(filterText: string) {
    this.albums = this.allAlbums.filter((album) =>
      album.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
