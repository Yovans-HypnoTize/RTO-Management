import { Component, inject, OnInit } from '@angular/core';
import { ViolationService } from '../../../services/violation.service';
import { Router } from '@angular/router';
import { ViolationModel } from '../../../models/violation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-violation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './violation.html',
  styleUrl: './violation.css'
})
export class Violation implements OnInit {
  violationService = inject(ViolationService);
  router = inject(Router);

  violations!: ViolationModel[];

  getViolations = () => {
    this.violationService.getViolations().subscribe({
      next: (res: ViolationModel[]) => {
        this.violations = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  ngOnInit(): void {
    this.getViolations();
  }

  changePath() {
    this.router.navigate(['register-violation']);
  }

  handleViolationPath(id: string) {
    this.router.navigate(['violation', id]);
  }
}
