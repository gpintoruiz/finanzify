import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { IngresoService } from '../../services/ingreso/ingreso.service';
import { EgresoService } from '../../services/egreso/egreso.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distribucion-ano',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './distribucion-ano.component.html',
  styleUrls: ['./distribucion-ano.component.css']
})
export class DistribucionAnoComponent implements OnInit {
  data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { data: [], label: 'Ingresos' },
      { data: [], label: 'Gastos' }
    ]
  };

  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private ingresoService: IngresoService,
    private egresoService: EgresoService
  ) {}

  ngOnInit() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    if (this.usuarioService.isLogueado()) {
      this.loading = false;
      this.usuarioService.getUsuario().subscribe(usuario => {
        console.log('Usuario:', usuario); // Verificar el usuario recibido
        forkJoin([
          this.ingresoService.getIngresosThisMonthEveryDay(usuario),
          this.egresoService.getEgresosThisMonthEveryDay(usuario)
        ]).subscribe(([ingresos, egresos]) => {

          this.data.datasets[0].data = this.getIngresos();
          this.data.datasets[1].data = this.getGastos();
          this.loading = true;
        });
      });
    }
  }

  getIngresos() {
    return [35000, 22000, 18000, 28000, 1500, 4000, 5000, 8000, 3000, 32000, 20000, 28000];
  }
  
  getGastos() {
    return [32000, 21000, 17000, 31000, 2500, 3500, 4500, 7000, 2200, 28000, 19000, 26000];
  }
}
