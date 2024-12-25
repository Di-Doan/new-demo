import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [CommonModule]
})
export class SpinnerComponent implements OnInit {

  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
