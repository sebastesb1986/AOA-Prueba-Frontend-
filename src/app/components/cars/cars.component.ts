import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  name: string = '';
  model: string = '';
  mark: string = '';
  department: string = '';

  cars: [] = [];
  depts: [] = [];
  car: Car;
  carId:number;

  constructor(private carService: CarService, private modal:NgbModal) { }

  //METODO QUE CARGA CUANDOP EL COMPONENTE ARRANCA
  ngOnInit(): void {
    this.getCars();
    this.getDepts();
  }

  getDepts(){
    this.carService.getDepts().subscribe((response:any)=>{
      this.depts = response;
    })
  }

  getCars(){
    this.carService.getCars().subscribe((response:any)=>{
      this.cars = response;
    })
  }


  open(content) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'});
     this.name=null;
     this.model=null;
     this.mark=null;
     this.department=null;
  }

  saveCar(){
    const car = new Car;
    car.name = this.name;
    car.model = this.model;
    car.mark = this.mark;
    car.department = this.department;
  
    //enviar datos al servicio
    this.carService.saveCar(car).subscribe((response:any)=>{
      this.getCars();
      Swal.fire(
        'Genial!',
        'Automovil agregado con exito',
        'success',
        
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.modal.dismissAll();
        }
      })
    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo va mal, vuelta a intentarlo!',
      })
    })

  }

  editCar(car, contentUp){
    this.modal.open(contentUp, {ariaLabelledBy: 'modal-basic-title'});
    //asigar el valor al input
    this.carId = car.id;
    this.name = car.name;
    this.model = car.model;
    this.mark = car.mark;
    this.department = car.department; 
  }

  updateCar(){
    const car = new Car;
    car.id = this.carId;
    car.name = this.name;
    car.model = this.model;
    car.mark = this.mark;
    car.department = this.department;
  
    this.carService.updateCar(car).subscribe((response:any)=>{
      this.getCars();
      Swal.fire(
        'Genial!',
        `Automovil ${car.name} editado con exito`,
        'success'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.modal.dismissAll();
        }
      })

    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo va mal, vuelta a intentarlo!',
      })
    })

   

  }

  deleteCar(car: Car){
    
    this.carService.deleteCar(car).subscribe((response:any)=>{
      
      this.getCars();

      Swal.fire(
        'Genial!',
        `Automovil eliminado con exito`,
        'success'
      )
      

    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo va mal, vuelta a intentarlo!',
      })
    })
  }
  

}
