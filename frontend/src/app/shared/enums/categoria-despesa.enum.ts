export enum CategoriaDespesaEnum {
  ALIMENTACAO = "ALIMENTACAO",
  MORADIA = "MORADIA",
  CONTA_DOMESTICA = "CONTA_DOMESTICA",
  COMBUSTIVEL = "COMBUSTIVEL",
  MANUTENCAO_VEICULO = "MANUTENCAO_VEICULO",
  TRANSPORTE_PUBLICO = "TRANSPORTE_PUBLICO",
  PLANO_SAUDE = "PLANO_SAUDE",
  MEDICACAO = "MEDICACAO",
  CONSULTA_MEDICA = "CONSULTA_MEDICA",
  EXAME_MEDICO = "EXAME_MEDICO",
  MENSALIDADE_REDE_ENSINO = "MENSALIDADE_REDE_ENSINO",
  CURSO = "CURSO",
  LIVRO = "LIVRO",
  MATERIAL_ESTUDO = "MATERIAL_ESTUDO",
  VIAGEM = "VIAGEM",
  EVENTO_ENTRETENIMENTO = "EVENTO_ENTRETENIMENTO",
  ASSINATURA_STREAMING = "ASSINATURA_STREAMING",
  JURO_MULTA = "JURO_MULTA",
  EMPRESTIMO = "EMPRESTIMO",
  FINANCIAMENTO = "FINANCIAMENTO",
  INVESTIMENTO = "INVESTIMENTO",
  VESTUARIO = "VESTUARIO",
  ELETRODOMESTICO = "ELETRODOMESTICO",
  ELETRONICO = "ELETRONICO",
  PRESENTE = "PRESENTE",
  DOACAO = "DOACAO",
  DESPESA_ANIMAL_ESTIMACAO = "DESPESA_ANIMAL_ESTIMACAO",
  REFORMA = "REFORMA",
  REPARO_DOMESTICO = "REPARO_DOMESTICO",
  TAXA_BANCARIA = "TAXA_BANCARIA",
  SEM_CATEGORIA = "SEM_CATEGORIA"
}

export class CategoriaDespesaEnumUtil {

  static listarOpcoesEnum(): CategoriaDespesaEnum[] {
    return [
      CategoriaDespesaEnum.SEM_CATEGORIA,
      CategoriaDespesaEnum.ALIMENTACAO,
      CategoriaDespesaEnum.MORADIA,
      CategoriaDespesaEnum.CONTA_DOMESTICA,
      CategoriaDespesaEnum.COMBUSTIVEL,
      CategoriaDespesaEnum.MANUTENCAO_VEICULO,
      CategoriaDespesaEnum.TRANSPORTE_PUBLICO,
      CategoriaDespesaEnum.PLANO_SAUDE,
      CategoriaDespesaEnum.MEDICACAO,
      CategoriaDespesaEnum.CONSULTA_MEDICA,
      CategoriaDespesaEnum.EXAME_MEDICO,
      CategoriaDespesaEnum.MENSALIDADE_REDE_ENSINO,
      CategoriaDespesaEnum.CURSO,
      CategoriaDespesaEnum.LIVRO,
      CategoriaDespesaEnum.MATERIAL_ESTUDO,
      CategoriaDespesaEnum.VIAGEM,
      CategoriaDespesaEnum.EVENTO_ENTRETENIMENTO,
      CategoriaDespesaEnum.ASSINATURA_STREAMING,
      CategoriaDespesaEnum.JURO_MULTA,
      CategoriaDespesaEnum.EMPRESTIMO,
      CategoriaDespesaEnum.FINANCIAMENTO,
      CategoriaDespesaEnum.INVESTIMENTO,
      CategoriaDespesaEnum.VESTUARIO,
      CategoriaDespesaEnum.ELETRODOMESTICO,
      CategoriaDespesaEnum.ELETRONICO,
      CategoriaDespesaEnum.PRESENTE,
      CategoriaDespesaEnum.DOACAO,
      CategoriaDespesaEnum.DESPESA_ANIMAL_ESTIMACAO,
      CategoriaDespesaEnum.REFORMA,
      CategoriaDespesaEnum.REPARO_DOMESTICO,
      CategoriaDespesaEnum.TAXA_BANCARIA
    ]
  }

  static buscarLabelCategoria(categoria: CategoriaDespesaEnum): string {
    if (categoria == null) {
      return null;
    }

    switch (categoria) {
      case CategoriaDespesaEnum.ALIMENTACAO:
        return "Alimentação";
      case CategoriaDespesaEnum.MORADIA:
        return "Moradia";
      case CategoriaDespesaEnum.CONTA_DOMESTICA:
        return "Conta Doméstica";
      case CategoriaDespesaEnum.COMBUSTIVEL:
        return "Combustível";
      case CategoriaDespesaEnum.MANUTENCAO_VEICULO:
        return "Manutenção de Veículo";
      case CategoriaDespesaEnum.TRANSPORTE_PUBLICO:
        return "Transporte Público";
      case CategoriaDespesaEnum.PLANO_SAUDE:
        return "Plano de Saúde";
      case CategoriaDespesaEnum.MEDICACAO:
        return "Medicamento";
      case CategoriaDespesaEnum.CONSULTA_MEDICA:
        return "Consulta Médica";
      case CategoriaDespesaEnum.EXAME_MEDICO:
        return "Exame Médico";
      case CategoriaDespesaEnum.MENSALIDADE_REDE_ENSINO:
        return "Mensalidade em Rede de Ensino";
      case CategoriaDespesaEnum.CURSO:
        return "Curso";
      case CategoriaDespesaEnum.LIVRO:
        return "Livro";
      case CategoriaDespesaEnum.MATERIAL_ESTUDO:
        return "Material de Estudo";
      case CategoriaDespesaEnum.VIAGEM:
        return "Viagem";
      case CategoriaDespesaEnum.EVENTO_ENTRETENIMENTO:
        return "Evento de Entretenimento";
      case CategoriaDespesaEnum.ASSINATURA_STREAMING:
        return "Assinatura de Streaming";
      case CategoriaDespesaEnum.JURO_MULTA:
        return "Juro ou Multa";
      case CategoriaDespesaEnum.EMPRESTIMO:
        return "Empréstimo";
      case CategoriaDespesaEnum.FINANCIAMENTO:
        return "Financiamento";
      case CategoriaDespesaEnum.INVESTIMENTO:
        return "Investimento";
      case CategoriaDespesaEnum.VESTUARIO:
        return "Vestuário";
      case CategoriaDespesaEnum.ELETRODOMESTICO:
        return "Eletrodoméstico";
      case CategoriaDespesaEnum.ELETRONICO:
        return "Eletrônico";
      case CategoriaDespesaEnum.PRESENTE:
        return "Presente";
      case CategoriaDespesaEnum.DOACAO:
        return "Doação";
      case CategoriaDespesaEnum.DESPESA_ANIMAL_ESTIMACAO:
        return "Despesa com Animal de Estimação";
      case CategoriaDespesaEnum.REFORMA:
        return "Reforma";
      case CategoriaDespesaEnum.REPARO_DOMESTICO:
        return "Reparo Doméstico";
      case CategoriaDespesaEnum.TAXA_BANCARIA:
        return "Taxa Bancária";
      
      default: return "";
    }
  }
}
