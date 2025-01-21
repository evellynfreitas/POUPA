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
    mesAnoConfig: any,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    let URL = `${this.BASE_URL}/transactions?id_usuario=${idUsuario}`;

    if (mesAnoConfig != null) {
      URL += `&dia_inicio=${mesAnoConfig.diaInicio}`;
      URL += `&mes_inicio=${mesAnoConfig.mesInicio + 1}`;
      URL += `&ano_inicio=${mesAnoConfig.anoInicio}`;
      URL += `&dia_fim=${mesAnoConfig.diaFim}`;
      URL += `&mes_fim=${mesAnoConfig.mesFim + 1}`;
      URL += `&ano_fim=${mesAnoConfig.anoFim}`;
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
