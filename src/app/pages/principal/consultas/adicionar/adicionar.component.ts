import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Consulta } from 'src/app/core/model/consulta';
import { Medico } from 'src/app/core/model/medico';
import { Pessoa } from 'src/app/core/model/pessoa';
import { ConsultaService } from 'src/app/core/service/consulta.service';
import { MedicoService } from 'src/app/core/service/medico.service';
import { PacienteService } from 'src/app/core/service/paciente.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarConsultaComponent implements OnInit {

  msg: String = '';
  retorno: number = 1;
  consulta: Consulta = new Consulta();

  paciente: Pessoa = new Pessoa();
  selectedPac: Pessoa = new Pessoa();
  pacientes: Pessoa[] = [];

  medico: Medico = new Medico();
  medicos: Medico[] = [];


  formConsulta = this.formBuilder.group(
    {
      dt_consulta: this.formBuilder.control('', [Validators.required]),
      id_paciente: this.formBuilder.control('', [Validators.required]),
      id_medico: this.formBuilder.control('', [Validators.required]),
    }
  );


  inscricao: Subscription = new Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private consultaService: ConsultaService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getPacientes();
    this.getMedicos();
  }

  getPacientes(){
    this.pacienteService.buscarPacientes().subscribe( paciente => {
      this.pacientes = paciente;
    })
  }

  getMedicos(){
    this.medicoService.buscarMedicos().subscribe( medico => {
      this.medicos = medico;
    })
  }

  getMedicoById(id: number): Medico {
    this.medicoService.buscarMedico(id).subscribe( resp => {
      this.medico = resp;
    })

    return this.medico;
  }

  getPacienteById(id: number): Pessoa {
    this.pacienteService.buscarPaciente(id).subscribe( resp => {
      this.paciente = resp;
    });

    return this.paciente;
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  cadastrar(): void{
    this.consulta.dt_consulta = this.formConsulta.value.dt_consulta;
    this.consulta.paciente = this.formConsulta.value.id_paciente;
    this.consulta.medico = this.formConsulta.value.id_medico;

    if(this.formConsulta.valid){

      console.log(this.consulta.medico);

      this.consultaService.incluir(this.consulta).subscribe({
        next: (res) => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            color: '#ffffff',
            background: '#4BCF0E',
            timer: 5000,
            timerProgressBar: true,
          })

          Toast.fire({
            icon: 'success',
            title: 'Cadastrado com sucesso!'
          })

          this.retorno = 0;

          console.log(this.retorno);

          
        },
        error: (e) => 'Erro ao cadastrar'
      })
         
      this.formConsulta.reset();
      this.router.navigate(['/principal'], { relativeTo: this.route });
    }
  }

  cancelar(){
    this.router.navigate(['/principal'], { relativeTo: this.route });
  }
  

}
