import { useState } from "react";
import styled from "styled-components";

import type {
  Address,
  SearchMode
} from "../types/search.types";

import {
  searchByCep,
  searchByAddress
} from "../services/search.service";

interface SearchFormProps {
  onSearchComplete: (results: Address[]) => void;
}

const SearchForm = ({
  onSearchComplete
}: SearchFormProps) => {
  const [searchMode, setSearchMode] =
    useState<SearchMode>("CEP");

  const [cep, setCep] = useState("");

  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCepChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 8);

    const formatted = value.replace(
      /^(\d{5})(\d{1,3})$/,
      "$1-$2"
    );

    setCep(formatted);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (searchMode === "CEP") {
        const cleanCep = cep.replace(/\D/g, "");

        if (cleanCep.length !== 8) {
          throw new Error(
            "Informe um CEP com 8 dígitos"
          );
        }

        const result = await searchByCep(cleanCep);

        onSearchComplete([result]);

        return;
      }

      if (!uf || !cidade.trim() || !rua.trim()) {
        throw new Error(
          "Preencha UF, cidade e logradouro"
        );
      }

      if (
        cidade.trim().length < 3 ||
        rua.trim().length < 3
      ) {
        throw new Error(
          "Cidade e logradouro devem possuir pelo menos 3 caracteres"
        );
      }

      const results = await searchByAddress({
        uf,
        cidade: cidade.trim(),
        rua: rua.trim()
      });

      onSearchComplete(results);

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao realizar consulta"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeSearchMode = (mode: SearchMode) => {
    setSearchMode(mode);
    setError("");
  };

  return (
    <Card>
      <CardHeader>
        CONSULTA DE ENDEREÇO
      </CardHeader>

      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>
            TIPO DE CONSULTA
          </SectionTitle>

          <ModeSelector>
            <ModeButton
              type="button"
              $active={searchMode === "CEP"}
              onClick={() => changeSearchMode("CEP")}
            >
              Por CEP
            </ModeButton>

            <ModeButton
              type="button"
              $active={searchMode === "ADDRESS"}
              onClick={() =>
                changeSearchMode("ADDRESS")
              }
            >
              Por endereço
            </ModeButton>
          </ModeSelector>
        </Section>

        <Divider />

        {searchMode === "CEP" ? (
          <Section>
            <FieldGroup>
              <Label htmlFor="cep">
                CEP
              </Label>

              <Input
                id="cep"
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={handleCepChange}
                inputMode="numeric"
                autoComplete="postal-code"
              />
            </FieldGroup>
          </Section>
        ) : (
          <Section>
            <AddressRow>
              <FieldGroup>
                <Label htmlFor="uf">
                  UF
                </Label>

                <Select
                  id="uf"
                  value={uf}
                  onChange={(event) =>
                    setUf(event.target.value)
                  }
                >
                  <option value="">
                    Selecione
                  </option>

                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="cidade">
                  Cidade
                </Label>

                <Input
                  id="cidade"
                  type="text"
                  placeholder="Digite uma Cidade"
                  value={cidade}
                  onChange={(event) =>
                    setCidade(event.target.value)
                  }
                />
              </FieldGroup>
            </AddressRow>

            <FieldGroup>
              <Label htmlFor="rua">
                Logradouro
              </Label>

              <Input
                id="rua"
                type="text"
                placeholder="Digite um Logradouro"
                value={rua}
                onChange={(event) =>
                  setRua(event.target.value)
                }
              />
            </FieldGroup>
          </Section>
        )}

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <Footer>
          <FooterText>
            Consulte endereços em todo o Brasil
          </FooterText>

          <SubmitButton
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Consultando..."
              : "Consultar"}
          </SubmitButton>
        </Footer>
      </Form>
    </Card>
  );
};

interface ModeButtonProps {
  $active: boolean;
}

const Card = styled.section`
  width: min(100%, 620px);

  overflow: hidden;

  background: ${({ theme }) => theme.colors.card};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;

  box-shadow:
    0 40px 60px rgba(0, 0, 0, 0.08),
    0 15px 25px rgba(0, 0, 0, 0.08);

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
`;

const CardHeader = styled.header`
  min-height: 52px;

  display: flex;
  align-items: center;

  padding: 0 24px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};

  color: ${({ theme }) => theme.colors.text};

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Form = styled.form``;

const Section = styled.div`
  display: grid;
  gap: 16px;

  padding: 24px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ModeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ModeButton = styled.button<ModeButtonProps>`
  height: 42px;

  border-radius: 7px;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary
      : theme.colors.cardSecondary};

  color: ${({ $active, theme }) =>
    $active ? "#ffffff" : theme.colors.text};

  font-size: 13px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Divider = styled.hr`
  height: 1px;

  border: none;

  background: ${({ theme }) => theme.colors.border};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 7px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  height: 42px;

  padding: 0 12px;

  border-radius: 7px;

  outline: none;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.cardSecondary};

  color: ${({ theme }) => theme.colors.text};

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.25s ease;

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors.primarySoft};
  }
`;

const Select = styled.select`
  width: 100%;
  height: 42px;

  padding: 0 10px;

  border-radius: 7px;

  outline: none;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.cardSecondary};

  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors.primarySoft};
  }
`;

const AddressRow = styled.div`
  display: grid;

  grid-template-columns: 140px 1fr;

  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorMessage = styled.p`
  margin: 0 24px 20px;

  font-size: 13px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.error};
`;

const Footer = styled.footer`
  min-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 12px 16px 12px 24px;

  background: ${({ theme }) =>
    theme.colors.primarySoft};

  border-top: 1px solid
    ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    flex-direction: column;

    align-items: stretch;

    padding: 16px;
  }
`;

const FooterText = styled.span`
  font-size: 12px;
  font-weight: 600;

  color: ${({ theme }) =>
    theme.colors.textSecondary};

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  min-width: 150px;
  height: 40px;

  padding: 0 20px;

  border: none;
  border-radius: 7px;

  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;

  font-size: 13px;
  font-weight: 700;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.primaryHover};

    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default SearchForm;