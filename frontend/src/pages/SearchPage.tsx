import { useState } from "react";
import styled from "styled-components";

import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

import type { Address } from "../types/search.types";

type PageState = "FORM" | "RESULTS";

const SearchPage = () => {
  const [pageState, setPageState] =
    useState<PageState>("FORM");

  const [results, setResults] =
    useState<Address[]>([]);

  const handleSearchComplete = (
    searchResults: Address[]
  ) => {
    setResults(searchResults);
    setPageState("RESULTS");
  };

  const handleNewSearch = () => {
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

      {pageState === "FORM" && (
        <SearchForm
          onSearchComplete={handleSearchComplete}
        />
      )}

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