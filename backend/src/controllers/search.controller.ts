import { Request, Response } from "express";

import {
  handleSearchByCep,
  handleSearchByAddress
} from "../services/search.service";

import type {
  SearchByCepParams,
  SearchByAddressQuery
} from "../types/search.types";


export const searchByCep = async (
  req: Request<SearchByCepParams>,
  res: Response
) => {
  try {
    const { cep } = req.params;

    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return res.status(400).json({
        error: "CEP deve possuir 8 dígitos"
      });
    }

    const result = await handleSearchByCep(cleanCep);

    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao buscar CEP"
    });
  }
};


export const searchByAddress = async (
  req: Request<{}, {}, {}, SearchByAddressQuery>,
  res: Response
) => {
  try {
    const { rua, cidade, uf } = req.query;

    if (!rua || !cidade || !uf) {
      return res.status(400).json({
        error: "Rua, cidade e UF são obrigatórios"
      });
    }

    if (
      rua.trim().length < 3 ||
      cidade.trim().length < 3
    ) {
      return res.status(400).json({
        error: "Rua e cidade devem possuir pelo menos 3 caracteres"
      });
    }

    if (uf.trim().length !== 2) {
      return res.status(400).json({
        error: "UF deve possuir 2 caracteres"
      });
    }

    const result = await handleSearchByAddress(
      rua.trim(),
      cidade.trim(),
      uf.trim().toUpperCase()
    );

    return res.status(200).json(result);

  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Erro ao buscar endereço"
    });
  }
};