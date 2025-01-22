import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransacaoDTO } from "../models/transacao-dto";

@Injectable({ providedIn: "root" })
export class TransacaoService {

  private readonly BASE_URL = " http://127.0.0.1:5000";

  constructor(
    private httpClient: HttpClient
  ) {}

  public getListaTransacoes(
    idUsuario: number,
    configuracaoPeriodoAnalise: any,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    let URL = `${this.BASE_URL}/transactions?id_usuario=${idUsuario}`;

    if (configuracaoPeriodoAnalise != null) {
      URL += `&data_inicial=${configuracaoPeriodoAnalise.dataInicialString}`;
      URL += `&data_final=${configuracaoPeriodoAnalise.dataFinalString}`;
    }

    this.httpClient.get(URL, {
      headers: this.getHeaders()
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }

  public registraTransacao(
    dados: TransacaoDTO,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    const URL = `${this.BASE_URL}/transaction`;

    this.httpClient.post(URL, dados, {
      headers: this.getHeaders()
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }

  private getHeaders(headers: {} = {}): HttpHeaders {
    return new HttpHeaders({
      ...headers,
      "Access-Control-Allow-Origin": "*"
    });
  }
    
}
