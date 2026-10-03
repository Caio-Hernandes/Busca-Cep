import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Busca CEP API",
      version: "1.0.0",
      description:
        "API REST para consulta de CEPs e endereços utilizando dados do ViaCEP."
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],

    components: {
      schemas: {
        Address: {
          type: "object",

          properties: {
            cep: {
              type: "string",
              example: "01310-100"
            },

            logradouro: {
              type: "string",
              example: "Avenida Paulista"
            },

            complemento: {
              type: "string",
              example: "até 610 - lado par"
            },

            unidade: {
              type: "string",
              example: ""
            },

            bairro: {
              type: "string",
              example: "Bela Vista"
            },

            localidade: {
              type: "string",
              example: "São Paulo"
            },

            uf: {
              type: "string",
              example: "SP"
            },

            estado: {
              type: "string",
              example: "São Paulo"
            },

            regiao: {
              type: "string",
              example: "Sudeste"
            },

            ibge: {
              type: "string",
              example: "3550308"
            },

            gia: {
              type: "string",
              example: "1004"
            },

            ddd: {
              type: "string",
              example: "11"
            },

            siafi: {
              type: "string",
              example: "7107"
            }
          }
        },

        Error: {
          type: "object",

          properties: {
            error: {
              type: "string",
              example: "CEP não encontrado"
            }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.ts"]
};

export const swaggerSpec =
  swaggerJsdoc(swaggerOptions);