import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get(`vehicle/list`);
  }

  getUnpaidTax(officerId:any) {
    return this.http.get(`vehicle/unpaid-tax?officerId=${officerId}`);
  }

  getVehiclesByOwnerId(officerId:any) {
    return this.http.get(`vehicle/owner/${officerId}`);
  }

  getVehicleById(id: any, officerId: any) {
    return this.http.get(`vehicle/${id}`, {
      params: {
        officerId: officerId.toString(),
      },
    });
  }

  registerVehicle(newVehicle: VehicleModel): Observable<any> {
    return this.http.post(`vehicle`, newVehicle);
  }

  renewTax(taxDetail: any): Observable<any> {
    return this.http.post(`roadtax/renew`, taxDetail);
  }
}
