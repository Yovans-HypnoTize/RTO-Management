import { Injectable } from '@angular/core';
import { DriverModel } from '../models/driver.model';
// import { from, Observable, of } from 'rxjs';
// import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DriverService {
  // private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // private drivers: DriverModel[] = [
  //   {
  //     id: 'D001',
  //     name: 'Yogesh',
  //     dob: '1995-01-01',
  //     licenseNumber: 'KA123456',
  //     licenseIssueDate: '2022-01-01',
  //     licenseExpiryDate: '2032-01-01',
  //     createdBy: '',
  //     createdByOfficerId: 0,
  //   },
  // ];

  // getDrivers(): Observable<DriverModel[]> {
  //   return this.http.get<DriverModel[]>(`${this.baseUrl}/driver`);
  // }

  // getDriverById(id: number, officerId: number): Observable<DriverModel> {
  //   return this.http.get<DriverModel>(`${this.baseUrl}/driver/${id}`, {
  //     params: { officerId: officerId.toString() },
  //   });
  // }

  // getExpiredLicenses(id: number, officerId: number): Observable<DriverModel> {
  //   return this.http.get<DriverModel>(`${this.baseUrl}/driver/${id}`, {
  //     params: { officerId: officerId.toString() },
  //   });
  // }

  // registerDriver(driver: DriverModel): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/driver`, driver);
  // }

  getDrivers() {
    return this.http.get(`driver/list`);
  }
 getExpiredLicense(officerId:any) {
    return this.http.get(`driver/expired-licenses?officerId=${officerId}`);
  }
  getDriversById(id:any, officerId:any) {
    return this.http.get(`driver/${id}`, {
    params: {
      officerId: officerId.toString()
    }
  });
  }

  registerDriver(driver: DriverModel) {
    return this.http.post(`driver`, driver);
  }

  payFine(id: any) {
    return this.http.post(`violation/pay/${id}`, {amount:1000});
  }

  // getDrivers(): Observable<DriverModel[]> {
  //   return of(this.drivers);
  // }

  // registerDriver(driver: DriverModel) {
  //   this.drivers.push({
  //     ...driver,
  //     id: crypto.randomUUID(),
  //     createdBy: '',
  //     createdByOfficerId: 0,
  //   });
  //   return of({ success: true });
  // }
}
