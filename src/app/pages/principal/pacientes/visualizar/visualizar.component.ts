import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Pessoa } from 'src/app/core/model/pessoa'
import { PacienteService } from 'src/app/core/service/paciente.service';

interface Genero {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarPacientesComponent implements OnInit {

  paciente: Pessoa = new Pessoa();
  pacientes: Pessoa[] = [];
  modalRef?: BsModalRef;
  form!: FormGroup;

  generos: Genero[] = [
    {value: 'M', tipo: 'Masculino'},
    {value: 'F', tipo: 'Feminino'},
    {value: 'O', tipo: 'Outro'},
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
    private modalService: BsModalService
    
  ) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(){
    this.pacienteService.buscarPacientes().subscribe( paciente => {
      this.pacientes = paciente;
    })
  }



  modalEditar(template: TemplateRef<Pessoa>, id: number): void {
    for (let p of this.pacientes) {
       if (p.id_pessoa == id) {
          this.paciente = p;
       }
    }

    this.form = this.fb.group({
       id_pessoa: [this.paciente.id_pessoa, [Validators.required]],
       nome: [this.paciente.nome, [Validators.required]],
       num_cpf: [this.paciente.num_cpf, [Validators.required]],
       genero: [this.paciente.genero],
       dt_nascimento: [this.paciente.dt_nascimento, [Validators.required]],
       email: [this.paciente.email],
       tel_contato: [this.paciente.tel_contato, [Validators.required]],
    });

    this.paciente.nome = this.form.value.nome;
    this.paciente.num_cpf = this.form.value.cpf;
    this.paciente.genero = this.form.value.genero;
    this.paciente.dt_nascimento = this.form.value.dt_nasc;
    this.paciente.email = this.form.value.email;
    this.paciente.tel_contato = this.form.value.contato;

    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' })
    );
  }

  editarPaciente(){
    if (this.form.valid) {
      this.pacienteService.atualizar(this.paciente.id_pessoa, this.form.value).subscribe(retorno => {
         alert(retorno.nome + ' atualizado!');
         this.getPacientes();
      }); 
      this.modalRef?.hide();
      this.ngOnInit();
   }
  }

  modalRemover(template: TemplateRef<Pessoa>, id: number): void {
    for (let p of this.pacientes) {
       if (p.id_pessoa == id) {
          this.paciente = p;
       }
    }

    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-md' })
    );
  }

  hideModal() {
    this.modalRef?.hide();
    this.ngOnInit();
  }

  removerPaciente(id?: number){
    this.pacienteService.deletar(this.paciente.id_pessoa).subscribe(retorno => {
      this.getPacientes();
   });
   console.log(this.paciente);
   this.modalRef?.hide();
  }

}
