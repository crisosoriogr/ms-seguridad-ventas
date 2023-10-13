/* eslint-disable @typescript-eslint/no-unused-vars */
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';
import {Credenciales} from '../models/credenciales.model';
import {Usuario} from '../models';
const generator = require('generate-password');
const md5 = require("crypto-js/md5");





@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(
    @repository(UsuarioRepository)
    public repositorioUsuario: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */


  /**
   * Crear una clave aleatoria
   * @returns cadena aletoria de n caracteres
   *
   */



  crearTextoAleatorio(n:number):string{

    const clave = generator.generate({
      length: 10,
      numbers: true
    });

    return clave;



  }

  /**
   * Cifrar una cadena de texto con metodo md5
   * @param cadena texto a cifrar
   * @returns cadena cifrada con md5
   */

  cifrarTexto(cadena: string):string{
    const cadenaCifrada=md5(cadena).toString();

    return cadenaCifrada;

}

/**
 * Se busca un usuario por sus credenciales de acceso
 * @param credenciales credenciales del usuario
 * @returns usuario encontrado o null
 */

async identificarUsuario(credenciales:Credenciales):Promise <Usuario | null>{
  const usuario=await this.repositorioUsuario.findOne(
    {

      where:{
        correo:credenciales.correo,
        clave:credenciales.clave
      }


    }
  );

  return usuario as Usuario;




}





}

