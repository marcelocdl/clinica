import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Pessoa } from 'src/app/core/model/pessoa';
import { Tipo } from 'src/app/core/model/tipo';
import { Usuario } from 'src/app/core/model/usuario';
import { SecretariaService } from 'src/app/core/service/secretaria.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

interface Genero {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarSecretariaComponent implements OnInit {

  msg: String = '';
  retorno: number = 1;
  pes: Pessoa = new Pessoa();

  generos: Genero[] = [
    {value: 'M', tipo: 'Masculino'},
    {value: 'F', tipo: 'Feminino'},
    {value: 'O', tipo: 'Outro'},
  ];

  usuario:  Usuario = {
    username: '',
    password: '',
    token: '',
    permission: "SECRETARIA",
  }

  data = {
    senha: '',
    confirma_senha: '',
  };

  formSecretaria = this.formBuilder.group(
    {
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control('', [Validators.required]),
      genero: this.formBuilder.control('', [Validators.required]),
      dt_nasc: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      contato: this.formBuilder.control('', [Validators.required]),
      usuario: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required]),
      confirma_senha: this.formBuilder.control('', [Validators.required])
    }
  );

  inscricao: Subscription = new Subscription;
  formMudou: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private secretariaService: SecretariaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.retorno = 1;
  }

  cadastrar(): void{
    this.pes.nome = this.formSecretaria.value.nome;
    this.pes.num_cpf = this.formSecretaria.value.cpf;
    this.pes.genero = this.formSecretaria.value.genero;
    this.pes.dt_nascimento = this.formSecretaria.value.dt_nasc;
    this.pes.email = this.formSecretaria.value.email;
    this.pes.tel_contato = this.formSecretaria.value.contato;
    this.pes.tipo = new Tipo(2, "Secretaria");

    this.usuario.username = this.formSecretaria.value.usuario;
    this.usuario.password = this.formSecretaria.value.senha;
    this.usuario.permission = 'SECRETARIA';

    if(this.formSecretaria.valid){
      this.secretariaService.incluir(this.pes).subscribe({
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

          if(this.retorno == 0){
            this.usuarioService.incluir(this.usuario).subscribe(mensagem => {
              console.log('Cadastrou');
            })
          }
          
        },
        error: (e) => 'Erro ao cadastrar'
      })
         
      this.formSecretaria.reset();
      this.router.navigate(['/principal'], { relativeTo: this.route });     
    }
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  cancelar(){
    this.router.dispose();
  }

}
