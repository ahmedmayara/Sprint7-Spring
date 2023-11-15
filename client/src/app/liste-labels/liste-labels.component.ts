import { Component, OnInit } from '@angular/core';
import { Label } from '../model/label.model';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-liste-labels',
  templateUrl: './liste-labels.component.html',
  styleUrls: ['./liste-labels.component.css'],
})
export class ListeLabelsComponent implements OnInit {
  labels!: Label[];

  updatedLab: Label = {
    idLabel: 0,
    labelName: '',
    labelFounder: '',
    labelCountry: '',
  };

  ajout: boolean = true;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.labelsList().subscribe((data) => {
      this.labels = data;
    });
  }

  loadLabels() {
    this.albumService.labelsList().subscribe((data) => {
      this.labels = data;
    });
  }

  labelUpdated(label: Label) {
    console.log('Lab Updated event received', label);
    this.albumService.addLabel(label).subscribe(() => {
      this.loadLabels();
    });
  }

  updateLab(lab: Label) {
    this.updatedLab = lab;
    this.ajout = false;
  }
}
