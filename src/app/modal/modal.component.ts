import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {

  @Input() show: Boolean = false;

  @Output() hide: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

  public closeModal(): void {
    this.hide.emit(false);
  }
}
