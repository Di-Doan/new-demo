import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [RouterModule]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
