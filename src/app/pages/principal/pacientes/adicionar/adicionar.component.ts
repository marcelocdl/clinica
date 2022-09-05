import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/core/model/pessoa';
import { Tipo } from 'src/app/core/model/tipo';
import { PacienteService } from 'src/app/core/service/paciente.service';

interface Genero {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarPacienteComponent implements OnInit {

  msg: String = '';
  pes: Pessoa = new Pessoa();

  generos: Genero[] = [
    {value: 'M', tipo: 'Masculino'},
    {value: 'F', tipo: 'Feminino'},
    {value: 'O', tipo: 'Outro'},
  ];

  formPaciente = this.formBuilder.group(
    {
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control('', [Validators.required]),
      genero: this.formBuilder.control('', [Validators.required]),
      dt_nasc: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      contato: this.formBuilder.control('', [Validators.required]),
    }
  );

  inscricao: Subscription = new Subscription;
  formMudou: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacientesService: PacienteService
  ) { }

  ngOnInit(): void {
        
    /*this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.getClienteById(id);
      }
    ); */
  }

  cadastrar(): void{
    this.pes.nome = this.formPaciente.value.nome;
    this.pes.num_cpf = this.formPaciente.value.cpf;
    this.pes.genero = this.formPaciente.value.genero;
    this.pes.dt_nascimento = this.formPaciente.value.dt_nasc;
    this.pes.email = this.formPaciente.value.email;
    this.pes.tel_contato = this.formPaciente.value.contato;
    this.pes.tipo = new Tipo(3, "Paciente");

    if(this.formPaciente.valid){
      this.pacientesService.incluir(this.pes).subscribe(mensagem =>{
        alert(mensagem.nome + ' adicionado à lista de pacientes');
      });
         
      this.formPaciente.reset();
    }
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  cancelar(){
    this.router.navigate(['/principal/clientes'], { relativeTo: this.route });
  }

}
