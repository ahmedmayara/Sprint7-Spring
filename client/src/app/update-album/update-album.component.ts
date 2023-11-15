import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.css'],
})
export class UpdateAlbumComponent implements OnInit {
  currentAlbum = new Album();
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  labels!: Label[];
  updatedLabelId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* this.labels = this.albumService.labelsList(); */
    this.albumService.labelsList().subscribe((labs) => {
      this.labels = labs;
      console.log(labs);
    });

    this.albumService
      .getAlbumById(this.activatedRoute.snapshot.params['id'])
      .subscribe((album) => {
        this.currentAlbum = album;
        this.updatedLabelId = album.label.idLabel;
        this.albumService
          .loadImage(this.currentAlbum.image.idImage)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
  }

  updateAlbum() {
    this.currentAlbum.label = this.labels.find(
      (label) => label.idLabel == this.updatedLabelId
    )!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.albumService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentAlbum.image = img;
          this.albumService
            .updateAlbum(this.currentAlbum)
            .subscribe((album) => {
              this.router.navigate(['albums']);
            });
        });
    } else {
      this.albumService.updateAlbum(this.currentAlbum).subscribe((album) => {
        this.router.navigate(['albums']);
      });
    }
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
