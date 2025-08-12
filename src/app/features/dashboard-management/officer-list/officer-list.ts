import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OfficerService } from '../../../services/officer.service';
import { Router } from '@angular/router';
import { OfficerModel } from '../../../models/officer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './officer-list.html',
  styleUrl: './officer-list.css',
})
export class OfficerList implements OnInit {
  officerService = inject(OfficerService);
  router = inject(Router);

  officers: OfficerModel[] = [];

  getOfficer = (): void => {
    this.officerService.getOfficer().subscribe({
      next: (res: any) => {
        this.officers = [];
        this.officers = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  };

  ngOnInit(): void {
    this.getOfficer();
  }

  changePath = async () => {
    await this.router.navigate(['register-officer']);
  };
}
