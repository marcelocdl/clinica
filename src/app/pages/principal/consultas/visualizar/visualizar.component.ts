import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Consulta } from 'src/app/core/model/consulta';
import { Medico } from 'src/app/core/model/medico';
import { Pessoa } from 'src/app/core/model/pessoa';
import { ConsultaService } from 'src/app/core/service/consulta.service';
import { MedicoService } from 'src/app/core/service/medico.service';
import { PacienteService } from 'src/app/core/service/paciente.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarConsultaComponent implements OnInit {

  msg: String = '';
  retorno: number = 1;

  consulta: Consulta = new Consulta();
  consultas: Consulta[] = [];

  paciente: Pessoa = new Pessoa();
  pacientes: Pessoa[] = [];

  medico: Medico = new Medico();
  medicos: Medico[] = [];


  inscricao: Subscription = new Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private consultaService: ConsultaService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas(){
    this.consultaService.buscarConsultas().subscribe( consulta => {
      this.consultas = consulta;
    })
  }

  getAtestadoPdf(id_consulta: number){
    this.consultaService.gerarPdf(id_consulta).subscribe( (response) => {
      let downloadURL = window.URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href=downloadURL;
      link.download="atestado.pdf";
      link.click();
    })
  }

}
