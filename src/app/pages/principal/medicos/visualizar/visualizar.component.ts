import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medico } from 'src/app/core/model/medico';
import { MedicoService } from 'src/app/core/service/medico.service';

interface Genero {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarMedicoComponent implements OnInit {

  medico: Medico = new Medico();
  medicos: Medico[] = [];
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
    private medicoService: MedicoService,
    private modalService: BsModalService
    
  ) { }

  ngOnInit(): void {
    this.getMedicos();
  }

  getMedicos(){
    this.medicoService.buscarMedicos().subscribe( medico => {
      this.medicos = medico;
    })
  }



  modalEditar(template: TemplateRef<Medico>, id: number): void {
    for (let m of this.medicos) {
       if (m.id_pessoa == id) {
          this.medico = m;
       }
    }

    this.form = this.fb.group({
       id_pessoa: [this.medico.id_pessoa, [Validators.required]],
       nome: [this.medico.nome, [Validators.required]],
       num_cpf: [this.medico.num_cpf, [Validators.required]],
       genero: [this.medico.genero],
       dt_nascimento: [this.medico.dt_nascimento, [Validators.required]],
       email: [this.medico.email],
       tel_contato: [this.medico.tel_contato, [Validators.required]],
       num_crm: [this.medico.num_crm, [Validators.required]],
       especialidade: [this.medico.especialidade, [Validators.required]],
    });

    this.medico.nome = this.form.value.nome;
    this.medico.num_cpf = this.form.value.cpf;
    this.medico.genero = this.form.value.genero;
    this.medico.dt_nascimento = this.form.value.dt_nasc;
    this.medico.email = this.form.value.email;
    this.medico.tel_contato = this.form.value.contato;
    this.medico.num_crm = this.form.value.num_crm;
    this.medico.especialidade = this.form.value.especialidade;

    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' })
    );
  }

  editarMedico(){
    if (this.form.valid) {
      this.medicoService.atualizar(this.medico.id_pessoa, this.form.value).subscribe(retorno => {
         alert(retorno.nome + ' atualizado!');
         this.getMedicos();
      }); 
      this.modalRef?.hide();
      this.ngOnInit();
   }
  }

  modalRemover(template: TemplateRef<Medico>, id: number): void {
    for (let m of this.medicos) {
       if (m.id_pessoa == id) {
          this.medico = m;
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

  removerMedico(id?: number){
    this.medicoService.deletar(this.medico.id_pessoa).subscribe(retorno => {
      this.getMedicos();
   });
   console.log(this.medico);
   this.modalRef?.hide();
  }

}
