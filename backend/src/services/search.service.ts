import type {
  ViaCepAddress,
  ViaCepError
} from "../types/search.types";

export const handleSearchByCep = async (
  cep: string
): Promise<ViaCepAddress> => {
  const cleanCep = cep.replace(/\D/g, "");

  const response = await fetch(
    `https://viacep.com.br/ws/${cleanCep}/json/`
  );

  if (!response.ok) {
    throw new Error("Erro ao consultar ViaCEP");
  }

  const data = await response.json() as ViaCepAddress | ViaCepError;

  if ("erro" in data) {
    throw new Error("CEP não encontrado");
  }

  return data;
};

export const handleSearchByAddress = async (
  rua: string,
  cidade: string,
  uf: string
): Promise<ViaCepAddress[]> => {
  const response = await fetch(
    `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(rua)}/json/`
  );

  if (!response.ok) {
    throw new Error("Erro ao consultar ViaCEP");
  }

  const data = await response.json() as ViaCepAddress[];

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Nenhum endereço encontrado");
  }

  return data;
};