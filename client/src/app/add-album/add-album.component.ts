import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album.model';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
})
export class AddAlbumComponent implements OnInit {
  newAlbum = new Album();

  labels!: Label[];
  newLabelId!: number;
  newLabel!: Label;
  uploadedImage!: File;
  imagePath: any;

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    /* this.labels = this.albumService.labelsList(); */
    this.albumService.labelsList().subscribe((data) => {
      this.labels = data;
      console.log(data);
      console.log(this.newLabelId);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

  addAlbum() {
    this.albumService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newAlbum.image = img;
        this.newAlbum.label = this.labels.find(
          (label) => label.idLabel == this.newLabelId
        )!;
        this.albumService.addAlbum(this.newAlbum).subscribe(() => {
          this.router.navigate(['albums']);
        });
      });
  }
}
