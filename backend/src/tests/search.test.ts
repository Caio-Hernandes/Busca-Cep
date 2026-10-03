import request from "supertest";
import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import app from "../app";

describe("GET /api/search/cep/:cep", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve retornar 400 quando o CEP for inválido", async () => {
    const response = await request(app)
      .get("/api/search/cep/123");

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      error: "CEP deve possuir 8 dígitos"
    });
  });

  it("deve retornar 404 quando o CEP não for encontrado", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(
      JSON.stringify({
        erro: "true"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  );

  const response = await request(app)
    .get("/api/search/cep/00000000");

  expect(response.status).toBe(404);

  expect(response.body).toEqual({
    error: "CEP não encontrado"
  });
});
it("deve retornar 502 quando o ViaCEP responder com erro", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(null, {
      status: 500
    })
  );

  const response = await request(app)
    .get("/api/search/cep/06642210");

  expect(response.status).toBe(502);

  expect(response.body).toEqual({
    error: "Erro ao consultar ViaCEP"
  });
});
it("deve retornar 502 quando ocorrer erro de conexão com o ViaCEP", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(
    new Error("Network error")
  );

  const response = await request(app)
    .get("/api/search/cep/06642210");

  expect(response.status).toBe(502);

  expect(response.body).toEqual({
    error: "Erro ao consultar ViaCEP"
  });
});

  it("deve retornar um endereço quando o CEP for válido", async () => {
    const viaCepResponse = {
      cep: "06642-210",
      logradouro: "Rua Ametista",
      complemento: "",
      unidade: "",
      bairro: "Nova Higienópolis",
      localidade: "Jandira",
      uf: "SP",
      estado: "São Paulo",
      regiao: "Sudeste",
      ibge: "3525003",
      gia: "",
      ddd: "11",
      siafi: ""
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify(viaCepResponse),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    );

    const response = await request(app)
      .get("/api/search/cep/06642210");

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      viaCepResponse
    );
  });

  it("não deve consultar o ViaCEP quando o CEP for inválido", async () => {
    const fetchMock = vi.spyOn(
      globalThis,
      "fetch"
    );

    await request(app)
      .get("/api/search/cep/123");

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("GET /api/search/address", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve retornar uma lista de endereços para uma pesquisa válida", async () => {
    const viaCepResponse = [
      {
        cep: "01310-100",
        logradouro: "Avenida Paulista",
        complemento: "até 610 - lado par",
        unidade: "",
        bairro: "Bela Vista",
        localidade: "São Paulo",
        uf: "SP",
        estado: "São Paulo",
        regiao: "Sudeste",
        ibge: "3550308",
        gia: "1004",
        ddd: "11",
        siafi: "7107"
      },
      {
        cep: "01310-200",
        logradouro: "Avenida Paulista",
        complemento: "de 612 a 1500 - lado par",
        unidade: "",
        bairro: "Bela Vista",
        localidade: "São Paulo",
        uf: "SP",
        estado: "São Paulo",
        regiao: "Sudeste",
        ibge: "3550308",
        gia: "1004",
        ddd: "11",
        siafi: "7107"
      }
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify(viaCepResponse),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    );

    const response = await request(app)
      .get("/api/search/address")
      .query({
        uf: "SP",
        cidade: "São Paulo",
        rua: "Avenida Paulista"
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(viaCepResponse);
    expect(response.body).toHaveLength(2);
  });
  it("deve retornar 404 quando nenhum endereço for encontrado", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(
      JSON.stringify([]),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  );

  const response = await request(app)
    .get("/api/search/address")
    .query({
      uf: "SP",
      cidade: "São Paulo",
      rua: "Rua Inexistente"
    });

  expect(response.status).toBe(404);

  expect(response.body).toEqual({
    error: "Nenhum endereço encontrado"
  });
});

  it("deve retornar 400 quando os parâmetros obrigatórios não forem informados", async () => {
    const response = await request(app)
      .get("/api/search/address");

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("error");
  });

  it("deve retornar 400 quando a cidade possuir menos de 3 caracteres", async () => {
    const response = await request(app)
      .get("/api/search/address")
      .query({
        uf: "SP",
        cidade: "SP",
        rua: "Paulista"
      });

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 quando o logradouro possuir menos de 3 caracteres", async () => {
    const response = await request(app)
      .get("/api/search/address")
      .query({
        uf: "SP",
        cidade: "São Paulo",
        rua: "Av"
      });

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 quando a UF não possuir 2 caracteres", async () => {
    const response = await request(app)
      .get("/api/search/address")
      .query({
        uf: "S",
        cidade: "São Paulo",
        rua: "Paulista"
      });

    expect(response.status).toBe(400);
  });

  it("não deve consultar o ViaCEP quando os parâmetros forem inválidos", async () => {
    const fetchMock = vi.spyOn(
      globalThis,
      "fetch"
    );

    await request(app)
      .get("/api/search/address")
      .query({
        uf: "SP",
        cidade: "SP",
        rua: "Av"
      });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});