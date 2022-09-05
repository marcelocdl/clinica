import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/core/model/pessoa';
import { SecretariaService } from 'src/app/core/service/secretaria.service';

interface Genero {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarSecretariasComponent implements OnInit {

  secretaria: Pessoa = new Pessoa();
  secretarias: Pessoa[] = [];
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
    private secretariaService: SecretariaService,
    private modalService: BsModalService
    
  ) { }

  ngOnInit(): void {
    this.getSecretarias();
  }

  getSecretarias(){
    this.secretariaService.buscarSecretarias().subscribe( secretaria => {
      this.secretarias = secretaria;
    })
  }



  modalEditar(template: TemplateRef<Pessoa>, id: number): void {
    for (let s of this.secretarias) {
       if (s.id_pessoa == id) {
          this.secretaria = s;
       }
    }

    this.form = this.fb.group({
       id_pessoa: [this.secretaria.id_pessoa, [Validators.required]],
       nome: [this.secretaria.nome, [Validators.required]],
       num_cpf: [this.secretaria.num_cpf, [Validators.required]],
       genero: [this.secretaria.genero],
       dt_nascimento: [this.secretaria.dt_nascimento, [Validators.required]],
       email: [this.secretaria.email],
       tel_contato: [this.secretaria.tel_contato, [Validators.required]],
    });

    this.secretaria.nome = this.form.value.nome;
    this.secretaria.num_cpf = this.form.value.cpf;
    this.secretaria.genero = this.form.value.genero;
    this.secretaria.dt_nascimento = this.form.value.dt_nasc;
    this.secretaria.email = this.form.value.email;
    this.secretaria.tel_contato = this.form.value.contato;

    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' })
    );
  }

  editarSecretaria(){
    if (this.form.valid) {
      this.secretariaService.atualizar(this.secretaria.id_pessoa, this.form.value).subscribe(retorno => {
         alert(retorno.nome + ' atualizado!');
         this.getSecretarias();
      }); 
      this.modalRef?.hide();
      this.ngOnInit();
   }
  }

  modalRemover(template: TemplateRef<Pessoa>, id: number): void {
    for (let s of this.secretarias) {
       if (s.id_pessoa == id) {
          this.secretaria = s;
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

  removerSecretaria(id?: number){
    this.secretariaService.deletar(this.secretaria.id_pessoa).subscribe(retorno => {
      this.getSecretarias();
   });
   console.log(this.secretaria);
   this.modalRef?.hide();
  }

}
