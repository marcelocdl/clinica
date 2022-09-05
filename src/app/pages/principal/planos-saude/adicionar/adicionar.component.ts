import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanoSaude } from 'src/app/core/model/planoSaude';
import { PlanoSaudeService } from 'src/app/core/service/planoSaude.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarPlanoSaudeComponent implements OnInit {

  msg: String = '';
  plano: PlanoSaude = new PlanoSaude();

  formPlanoSaude = this.formBuilder.group(
    {
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      valor_consulta: this.formBuilder.control('', [Validators.required]),
    }
  );

  inscricao: Subscription = new Subscription;
  formMudou: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private planoSaudeService: PlanoSaudeService
  ) { }

  ngOnInit(): void {
        
  }

  cadastrar(): void{
    this.plano.nome = this.formPlanoSaude.value.nome;
    this.plano.valor_consulta = this.formPlanoSaude.value.valor_consulta;

    if(this.formPlanoSaude.valid){
      this.planoSaudeService.incluir(this.plano).subscribe(mensagem =>{
        alert(mensagem.nome + ' adicionado!');
      });
         
      this.formPlanoSaude.reset();
      this.router.navigate(['/principal'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  cancelar(){
    this.router.navigate(['/principal'], { relativeTo: this.route });
  }

  gerar(){
    this.router.navigate(['/planoSaude/gerar'], { relativeTo: this.route })
  }

}
