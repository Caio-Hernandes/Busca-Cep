import type {
  ViaCepAddress,
  ViaCepError
} from "../types/search.types";

import { AppError } from "../errors/app-error";


export const handleSearchByCep = async (
  cep: string
): Promise<ViaCepAddress> => {
  const cleanCep = cep.replace(/\D/g, "");

  let response: Response;

  try {
    response = await fetch(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );
  } catch {
    throw new AppError(
      "Erro ao consultar ViaCEP",
      502
    );
  }

  if (!response.ok) {
    throw new AppError(
      "Erro ao consultar ViaCEP",
      502
    );
  }

  const data =
    await response.json() as ViaCepAddress | ViaCepError;

  if ("erro" in data) {
    throw new AppError(
      "CEP não encontrado",
      404
    );
  }

  return data;
};


export const handleSearchByAddress = async (
  rua: string,
  cidade: string,
  uf: string
): Promise<ViaCepAddress[]> => {
  let response: Response;

  try {
    response = await fetch(
      `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(rua)}/json/`
    );
  } catch {
    throw new AppError(
      "Erro ao consultar ViaCEP",
      502
    );
  }

  if (!response.ok) {
    throw new AppError(
      "Erro ao consultar ViaCEP",
      502
    );
  }

  const data =
    await response.json() as ViaCepAddress[];

  if (!Array.isArray(data) || data.length === 0) {
    throw new AppError(
      "Nenhum endereço encontrado",
      404
    );
  }

  return data;
};