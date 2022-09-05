import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/core/model/medico';
import { Tipo } from 'src/app/core/model/tipo';
import { Usuario } from 'src/app/core/model/usuario';
import { MedicoService } from 'src/app/core/service/medico.service';
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
export class AdicionarMedicoComponent implements OnInit {

  msg: String = '';
  retorno: number = 1;
  med: Medico = new Medico();  

  formMedico = this.formBuilder.group(
    {
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control('', [Validators.required]),
      genero: this.formBuilder.control('', [Validators.required]),
      dt_nasc: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      contato: this.formBuilder.control('', [Validators.required]),
      num_crm: this.formBuilder.control('', [Validators.required]),
      especialidade: this.formBuilder.control('', [Validators.required]),
      usuario: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required]),
      confirma_senha: this.formBuilder.control('', [Validators.required])
    }
  );

  generos: Genero[] = [
    {value: 'M', tipo: 'Masculino'},
    {value: 'F', tipo: 'Feminino'},
    {value: 'O', tipo: 'Outro'},
  ];

  usuario:  Usuario = {
    username: '',
    password: '',
    token: '',
    permission: "ADMIN",
  }

  data = {
    senha: '',
    confirma_senha: '',
  };

  inscricao: Subscription = new Subscription;
  formMudou: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService,
    private usuarioService: UsuarioService
    
  ) { }

  ngOnInit(): void {
    this.retorno = 1;      
  }

  cadastrar(): void{
    this.med.nome = this.formMedico.value.nome;
    this.med.num_cpf = this.formMedico.value.cpf;
    this.med.genero = this.formMedico.value.genero;
    this.med.dt_nascimento = this.formMedico.value.dt_nasc;
    this.med.email = this.formMedico.value.email;
    this.med.tel_contato = this.formMedico.value.contato;
    this.med.tipo = new Tipo(1, "Médico");
    this.med.num_crm = this.formMedico.value.num_crm;
    this.med.especialidade = this.formMedico.value.especialidade;

    this.usuario.username = this.formMedico.value.usuario;
    this.usuario.password = this.formMedico.value.senha;
    this.usuario.permission = "ADMIN";

    if(this.formMedico.valid){

      this.medicoService.incluir(this.med).subscribe({
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
         
      this.formMedico.reset();
      this.router.navigate(['/principal'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  cancelar(){
    this.router.navigate(['/principal'], { relativeTo: this.route });
  }

}
