import { Router } from "express";

import {
  searchByCep,
  searchByAddress
} from "../controllers/search.controller";

const router = Router();

/**
 * @swagger
 * /api/search/cep/{cep}:
 *   get:
 *     summary: Consulta um endereço pelo CEP
 *     description: Retorna o endereço correspondente ao CEP informado.
 *     tags:
 *       - Consultas
 *
 *     parameters:
 *       - in: path
 *         name: cep
 *         required: true
 *         schema:
 *           type: string
 *         example: "01310100"
 *         description: CEP com 8 dígitos
 *
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *
 *       400:
 *         description: CEP inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *       404:
 *         description: CEP não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/cep/:cep", searchByCep);

/**
 * @swagger
 * /api/search/address:
 *   get:
 *     summary: Consulta CEPs por endereço
 *     description: >
 *       Pesquisa CEPs utilizando UF, cidade e logradouro.
 *       Cidade e logradouro devem possuir pelo menos 3 caracteres.
 *     tags:
 *       - Consultas
 *
 *     parameters:
 *       - in: query
 *         name: uf
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *           maxLength: 2
 *         example: "SP"
 *         description: Unidade Federativa
 *
 *       - in: query
 *         name: cidade
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 3
 *         example: "São Paulo"
 *         description: Nome da cidade
 *
 *       - in: query
 *         name: rua
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 3
 *         example: "Avenida Paulista"
 *         description: Logradouro pesquisado
 *
 *     responses:
 *       200:
 *         description: Lista de endereços encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *       404:
 *         description: Nenhum endereço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/address", searchByAddress);

export default router;