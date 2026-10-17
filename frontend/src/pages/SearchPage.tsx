import { useState } from "react";
import styled from "styled-components";

import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

import type { Address } from "../types/search.types";

type PageState = "FORM" | "RESULTS";

const SearchPage = () => { //função que renderiza a página de busca, com o formulário e os resultados
  const [pageState, setPageState] =
    useState<PageState>("FORM");

  const [results, setResults] = //função que armazena os resultados da busca
    useState<Address[]>([]);

  const handleSearchComplete = ( //função que atualiza o estado da página para exibir os resultados da busca
    searchResults: Address[] //array de objetos do tipo Address
  ) => {
    setResults(searchResults);
    setPageState("RESULTS");
  };

  const handleNewSearch = () => { //função que limpa os resultados e volta para a página de formulário
    setResults([]);
    setPageState("FORM");
  };

  return (
    <Page>
      <Hero>
        <Title>Busca CEP</Title>

        <Subtitle>
          Consulte CEPs e endereços de forma rápida
          e simples.
        </Subtitle>
      </Hero>

      //passando a função handleSearchComplete como prop para o componente SearchForm, que será chamada quando a busca for concluída

      {pageState === "FORM" && (
        <SearchForm onSearchComplete={handleSearchComplete}  // os {} servem pra passar js dentro do jsx
        />
      )}
      //passando a variável results e a função handleNewSearch como props para o componente SearchResults, que será chamada quando outra busca for iniciada

      {pageState === "RESULTS" && (
        <SearchResults
          results={results}
          onNewSearch={handleNewSearch}
        />
      )}
    </Page>
  );
};

const Page = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 24px 60px;

  @media (max-width: 600px) {
    padding: 70px 16px 40px;
  }
`;

const Hero = styled.header`
  margin-bottom: 32px;

  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 8px;

  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;

  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  color: ${({ theme }) =>
    theme.colors.textSecondary};

  font-size: 14px;
`;

export default SearchPage;