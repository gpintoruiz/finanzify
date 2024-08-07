import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private http: HttpClient) { }

  urlTipo = "http://localhost:8080/tipo";
  urlIngreso = "http://localhost:8080/ingresos";

  getTiposIngreso(){
    return this.http.get(this.urlTipo+"/ingreso");
  }

  registroIngreso(ingreso: any){

    return this.http.post(this.urlIngreso+"/registro", ingreso);
    
  }

  getIngresosThisMonthEveryDay(usuario: any){
    return this.http.get(this.urlIngreso+"/thisMonth/everyDay/"+usuario.correo);
  }

  getIngresosThisMonthEveryDayType(usuario: any){
    return this.http.get(this.urlIngreso+"/thisMonth/everyDay/type/"+usuario.correo);
  }
}
