import type {
  Address,
  SearchByAddressParams
} from "../types/search.types";

const API_URL = import.meta.env.VITE_API_URL;  //url do backend

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

export const searchByAddress = async (  //função do frontend que busca o endereço pelo backend
  params: SearchByAddressParams
): Promise<Address[]> => { //retorna um array de endereços
  const query = new URLSearchParams({ //montando objeto usando os parâmetros da request pra enviar para o backend
    uf: params.uf,
    cidade: params.cidade,
    rua: params.rua
  });

  const response = await fetch( //passando o retorno do fetch para a variável response, que é uma promise
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