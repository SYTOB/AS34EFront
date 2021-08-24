import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InfoVideoService {

  private readonly API = `${environment.API}infovideo`;
  // private readonly API: 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  //visivel curso é um NUMBER onde o  '0' é {false} e o '1' é {true}

  getAllAula(id_curso: number, email_usuario: string){


    return this.http.post('@api/infovideo/videos',{id_curso, email_usuario});
  }

  getAula(id_video: number){
    return this.http.get(`@api/infovideo/video/${id_video}`);
  }

  insertNovaAula(nome_video: string, url_video: string, id_etapa: number, id_curso:number){

    return this.http.post('@api/infovideo',{ nome_video, url_video, id_etapa, id_curso});

  }

  deleteAula(id_video: number){
    return this.http.post('@api/infovideo/delete',{ id_video });
  }

  deleteCat(id_etapa: number){
    console.log("Id Etapa: ",id_etapa);
    return this.http.post('@api/etapas/delete',{ id_etapa });
  }


  attAula(id_video: number, nome_curso: string, url_video: string, id_etapa: string){

    console.log("ID VIDEO: ",id_video,"NOME CURSO: ",nome_curso,"URL: ",url_video,"ID ETAPA: ",id_etapa)

    return this.http.post('@api/infovideo/update',{ id_video, nome_curso, url_video, id_etapa });
  }

  getAllInfoEtapas(id_curso: number){
    return this.http.get(`@api/etapas/${id_curso}`);
  }

  getAllEtapas(id_curso: number){
    return this.http.get(`@api/etapas/nomes/${id_curso}`);
  }

  insertNovaEtapa(id_curso: number, nome_etapa: string){

    return this.http.post('@api/etapas',{ id_curso, nome_etapa});

  }

  visualizaVideo(id_video: number, email_usuario: number){

    console.log("Visualiza!");
    console.log("ID_VIDEO: ",id_video);
    console.log("EMAIL: ",email_usuario);
    return this.http.post('@api/videousuario/adicionarvideo/',{ id_video, email_usuario});

  }

  attEtapa(nome_etapa: string, id_etapa: number){
    console.log("nome_etapa: ",nome_etapa);
    console.log("id_etapa: ",id_etapa);

    return this.http.post('@api/etapas/update',{ nome_etapa, id_etapa });
  }


}
