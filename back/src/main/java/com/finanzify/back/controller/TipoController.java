package com.finanzify.back.controller;

import com.finanzify.back.dto.TipoDTO;
import com.finanzify.back.mappers.TipoMapper;
import com.finanzify.back.model.tipo_egreso;
import com.finanzify.back.model.tipo_ingreso;
import com.finanzify.back.model.tipo_inversion;
import com.finanzify.back.service.tipo_egresoService;
import com.finanzify.back.service.tipo_ingresoService;
import com.finanzify.back.service.tipo_inversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tipo")
public class TipoController {

    @Autowired
    private tipo_egresoService tipoEgresoService;

    @Autowired
    private tipo_ingresoService tipoIngresoService;

    @Autowired
    private tipo_inversionService tipoInversionService;

    @GetMapping("/egreso")
    public ResponseEntity<List<tipo_egreso>> getTipoEgreso() {
        var tipoEgresos = this.tipoEgresoService.getAll();
        //var tipos = tipoEgresos.stream().map(p->TipoMapper.INSTANCE.tipoEgresoToTipoDto(p)).collect(Collectors.toList());

        return ResponseEntity.ok(tipoEgresos);
    }

    @GetMapping("/ingreso")
    public ResponseEntity<List<tipo_ingreso>> getTipoIngreso() {
        var tipoIngresos = this.tipoIngresoService.getAll();
        //var tipos = tipoIngresos.stream().map(p->TipoMapper.INSTANCE.tipoIngresoToTipoDto(p)).collect(Collectors.toList());

        return ResponseEntity.ok(tipoIngresos);
    }

    @GetMapping("/inversion")
    public ResponseEntity<List<tipo_inversion>> getTipoInversion() {
        var tipoInversiones = this.tipoInversionService.getAll();
        //var tipos = tipoIngresos.stream().map(p->TipoMapper.INSTANCE.tipoIngresoToTipoDto(p)).collect(Collectors.toList());

        return ResponseEntity.ok(tipoInversiones);
    }
}
