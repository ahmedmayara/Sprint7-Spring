import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../model/label.model';

@Component({
  selector: 'app-update-label',
  templateUrl: './update-label.component.html',
  styleUrls: ['./update-label.component.css'],
})
export class UpdateLabelComponent implements OnInit {
  @Input()
  label!: Label;

  @Input()
  ajout!: boolean;

  @Output()
  labelUpdated = new EventEmitter<Label>();

  constructor() {}

  ngOnInit(): void {
    console.log('NgOnInit UpdateLabelComponent', this.label);
  }

  saveLabel() {
    this.labelUpdated.emit(this.label);
  }
}
