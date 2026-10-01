export interface SearchByCepParams {
  cep: string;
}

export interface SearchByAddressQuery {
  uf: string;
  cidade: string;
  rua: string;
}

export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface ViaCepError {
  erro: true;
}