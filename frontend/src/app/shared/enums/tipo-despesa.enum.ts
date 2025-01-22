export enum TipoTransacaoEnum {
  DESPESA_COMUM = "DESPESA_COMUM",
  DESPESA_FIXA = "DESPESA_FIXA",
  DEPOSITO = "DEPOSITO",
}

export class TipoTransacaoEnumUtil {

  static listarOpcoesEnum(): TipoTransacaoEnum[] {
    return [
      TipoTransacaoEnum.DESPESA_COMUM,
      TipoTransacaoEnum.DESPESA_FIXA,
      TipoTransacaoEnum.DEPOSITO,
    ]
  }

  static buscarLabelCategoria(categoria: TipoTransacaoEnum): string {
    if (categoria == null) {
      return null;
    }

    switch (categoria) {
      case TipoTransacaoEnum.DESPESA_COMUM:
        return "Despesa Comum";
      case TipoTransacaoEnum.DESPESA_FIXA:
        return "Despesa Fixa";
      case TipoTransacaoEnum.DEPOSITO:
        return "Depósito";
    }
  }
}
