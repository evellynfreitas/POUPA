import { CategoriaDespesaEnum } from "../enums/categoria-despesa.enum";
import { TipoTransacaoEnum } from "../enums/tipo-despesa.enum";

export class TransacaoDTO {
  id?: number;
  descricao: string;
  valor: number;
  tipoTransacao: TipoTransacaoEnum;
  categoria: CategoriaDespesaEnum;
  isDespesaFixa: boolean;
  criadoEm?: string;
  idUsuario?: number;
}