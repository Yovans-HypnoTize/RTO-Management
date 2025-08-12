import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-violation-fine',
  imports: [CommonModule],
  templateUrl: './violation-fine.html',
  styleUrl: './violation-fine.css'
})
export class ViolationFine {
  router = inject(Router);

  changePath() {
    this.router.navigate(['violations']);
  }
}
