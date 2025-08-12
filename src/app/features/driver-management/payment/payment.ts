import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../../services/driver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  private router = inject(Router);
  private driverService = inject(DriverService);
  private route = inject(ActivatedRoute);
  
  selectedTab: string = 'card';
  id: any = null;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  handleCancel() {
    this.router.navigate(['driver']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.id);
  }

  payFine() {
    this.driverService.payFine(this.id).subscribe({
      next: (res) => {
        alert('Fine payment successfull.');
        console.log('response', res);
        const navigateId = this.id;
        this.router.navigate(['driver', navigateId]);
      },
      error: (err) => console.error(err),
    });
  }
}
