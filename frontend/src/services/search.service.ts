import type {
  Address,
  SearchByAddressParams
} from "../types/search.types";

const API_URL = "http://localhost:3000/api";

export const searchByCep = async (
  cep: string
): Promise<Address> => {
  const cleanCep = cep.replace(/\D/g, "");

  const response = await fetch(
    `${API_URL}/search/cep/${cleanCep}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Erro ao consultar CEP"
    );
  }

  return data;
};

export const searchByAddress = async (
  params: SearchByAddressParams
): Promise<Address[]> => {
  const query = new URLSearchParams({
    uf: params.uf,
    cidade: params.cidade,
    rua: params.rua
  });

  const response = await fetch(
    `${API_URL}/search/address?${query.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Erro ao consultar endereço"
    );
  }

  return data;
};