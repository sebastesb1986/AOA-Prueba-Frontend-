import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  getCars(){
    //string literal
    return this.http.get(`${environment.url}car`);
  }

  getDepts(){
    //string literal
    return this.http.get(`${environment.carSelect}`);
  }

  saveCar(data:Car){
    //string literal
    return this.http.post(`${environment.url}car/store`, data);
  }

  updateCar(data:Car){
    //string literal
    console.log(data);

    return this.http.put(`${environment.url}car/${data.id}/update`,data);
  }

  deleteCar(data:Car){
    //string literal
    console.log(data);
    return this.http.delete(`${environment.url}car/${data}/delete`);
  }


}
