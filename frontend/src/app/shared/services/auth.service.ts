import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private TOKEN_KEY = 'auth_token';
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

    this.httpClient.post(URL, credentials, {
      headers: this.getHeaders()
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }

  public login(
    credentials: {
      email: string,
      senha: string
    },
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    const URL = `${this.BASE_URL}/login`;

    this.httpClient.post(URL, credentials, {
      headers: this.getHeaders()
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }

  public logout(
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    const URL = `${this.BASE_URL}/logout`;

    this.httpClient.post(URL, null, {
      headers: this.getHeaders({
        "Authorization": `Bearer ${this.getToken()}`
      })
    }).subscribe({
      next: successCallback,
      error: errorCallback
    });
  }

  public verify(
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    const URL = `${this.BASE_URL}/verify`;

    this.httpClient.get(URL, {
      headers: this.getHeaders({
        "Authorization": `Bearer ${this.getToken()}`
      })
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

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}
