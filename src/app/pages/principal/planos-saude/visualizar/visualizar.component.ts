import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlanoSaude } from 'src/app/core/model/planoSaude';
import { PlanoSaudeService } from 'src/app/core/service/planoSaude.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarPlanoSaudeComponent implements OnInit {

  plano: PlanoSaude = new PlanoSaude();
  planos: PlanoSaude[] = [];
  modalRef?: BsModalRef;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private planoSaudeService: PlanoSaudeService,
    private modalService: BsModalService
    
  ) { }

  ngOnInit(): void {
    this.getPlanos();
  }

  getPlanos(){
    this.planoSaudeService.buscarPlanos().subscribe( plano => {
      this.planos = plano;
    })
  }

  modalEditar(template: TemplateRef<PlanoSaude>, id: number): void {
    for (let p of this.planos) {
       if (p.id_plano_saude == id) {
          this.plano = p;
       }
    }

    this.form = this.fb.group({
       id_plano_saude: [this.plano.id_plano_saude, [Validators.required]],
       nome: [this.plano.nome, [Validators.required]],
       valor_consulta: [this.plano.valor_consulta, [Validators.required]]
    });

    this.plano.nome = this.form.value.nome;
    this.plano.valor_consulta = this.form.value.valor_consulta;

    this.modalRef = this.modalService.show(template,
       Object.assign({}, { class: 'modal-lg' })
    );
  }

  editarPlanoSaude(){
    if (this.form.valid) {
      this.planoSaudeService.atualizar(this.plano.id_plano_saude, this.form.value).subscribe(retorno => {
         alert(retorno.nome + ' atualizado!');
         this.getPlanos();
      }); 
      this.modalRef?.hide();
      this.ngOnInit();
   }
  }

  modalRemover(template: TemplateRef<PlanoSaude>, id: number): void {
    for (let p of this.planos) {
       if (p.id_plano_saude == id) {
          this.plano = p;
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

  removerPlanoSaude(id?: number){
    this.planoSaudeService.deletar(this.plano.id_plano_saude).subscribe(retorno => {
      this.getPlanos();
   });
   console.log(this.plano);
   this.modalRef?.hide();
  }

}
