import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  private readonly BASE_URL = " http://127.0.0.1:5000";

  constructor(
    private httpClient: HttpClient
  ) {}

  public register(
    credentials: {
      nome: string,
      email: string,
      senha: string
    },
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    const URL = `${this.BASE_URL}/register`;

    const httpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    })

    this.httpClient.post(URL, credentials, {
      headers: httpHeaders
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }
  
}
