import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { EgresoService } from '../../services/egreso/egreso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distribucion-gastos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './distribucion-gastos.component.html',
  // styleUrls: ['./distribucion-gastos.component.css']
})
export class DistribucionGastosComponent implements OnInit {
  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Gastos por categoría' }
    ]
  };

  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private egresoService: EgresoService
  ) {}

  ngOnInit() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    if (this.usuarioService.isLogueado()) {
      this.loading = false;
      this.usuarioService.getUsuario().subscribe(usuario => {
        this.egresoService.getEgresosThisMonthEveryDayType(usuario).subscribe(egresosPorTipo => {
          const labels = (egresosPorTipo as any[]).map(egreso => egreso.tipo);
          const datos = (egresosPorTipo as any[]).map(egreso => egreso.cantidad);

          this.data.labels = labels;
          this.data.datasets[0].data = datos;
          this.loading = true;
        });
      });
    }
  }
}
