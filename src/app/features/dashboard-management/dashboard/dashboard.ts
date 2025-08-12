import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardModel } from '../../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  dashboardData?: DashboardModel;
  officerId: number | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.officerId = Number(localStorage.getItem('id'));
    if (this.officerId) {
      this.getDashboardData();
    } else {
      this.error = 'Officer ID not found in storage';
      this.loading = false;
    }
  }

  private getDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardDetails(this.officerId!).subscribe({
      next: (res: DashboardModel) => { 
        this.dashboardData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard fetch error', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }
}
