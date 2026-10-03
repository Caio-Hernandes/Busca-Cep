import { useState } from "react";
import styled from "styled-components";

import type { Address } from "../types/search.types";

interface SearchResultsProps {
  results: Address[];
  onNewSearch: () => void;
}

interface PageButtonProps {
  $active: boolean;
}

const ITEMS_PER_PAGE = 10;

const SearchResults = ({
  results,
  onNewSearch
}: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Quantidade total de páginas
  const totalPages = Math.ceil(
    results.length / ITEMS_PER_PAGE
  );

  // Índice inicial da página atual
  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  // Índice final da página atual
  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  // Pega apenas os resultados da página atual
  const currentResults = results.slice(
    startIndex,
    endIndex
  );

  const handlePreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        RESULTADO DA CONSULTA
      </CardHeader>

      <Content>
        <ResultHeader>
          <ResultCount>
            Sua pesquisa retornou{" "}
            <strong>{results.length}</strong>{" "}
            {results.length === 1
              ? "resultado"
              : "resultados"}.
          </ResultCount>

          {results.length > ITEMS_PER_PAGE && (
            <ResultRange>
              Exibindo {startIndex + 1}–
              {Math.min(endIndex, results.length)}
            </ResultRange>
          )}
        </ResultHeader>

        <DesktopTable>
          <Table>
            <thead>
              <tr>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
              </tr>
            </thead>

            <tbody>
              {currentResults.map(
                (address, index) => (
                  <tr
                    key={`${address.cep}-${startIndex + index}`}
                  >
                    <td>{address.cep}</td>

                    <td>
                      {address.logradouro || "-"}
                    </td>

                    <td>
                      {address.bairro || "-"}
                    </td>

                    <td>
                      {address.localidade || "-"}
                    </td>

                    <td>{address.uf}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </DesktopTable>

        <MobileResults>
          {currentResults.map(
            (address, index) => (
              <MobileCard
                key={`${address.cep}-${startIndex + index}`}
              >
                <MobileRow>
                  <span>CEP</span>
                  <strong>{address.cep}</strong>
                </MobileRow>

                <MobileRow>
                  <span>Logradouro</span>
                  <strong>
                    {address.logradouro || "-"}
                  </strong>
                </MobileRow>

                <MobileRow>
                  <span>Bairro</span>
                  <strong>
                    {address.bairro || "-"}
                  </strong>
                </MobileRow>

                <MobileRow>
                  <span>Cidade</span>
                  <strong>
                    {address.localidade || "-"}
                  </strong>
                </MobileRow>

                <MobileRow>
                  <span>UF</span>
                  <strong>{address.uf}</strong>
                </MobileRow>
              </MobileCard>
            )
          )}
        </MobileResults>

        {totalPages > 1 && (
          <Pagination>
            <PaginationButton
              type="button"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              aria-label="Página anterior"
            >
              ‹
            </PaginationButton>

            <PageNumbers>
              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const page = index + 1;

                  return (
                    <PageButton
                      key={page}
                      type="button"
                      $active={
                        currentPage === page
                      }
                      onClick={() =>
                        handlePageChange(page)
                      }
                    >
                      {page}
                    </PageButton>
                  );
                }
              )}
            </PageNumbers>

            <PaginationButton
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={handleNextPage}
              aria-label="Próxima página"
            >
              ›
            </PaginationButton>
          </Pagination>
        )}
      </Content>

      <Footer>
        <FooterText>
          Consulta concluída
        </FooterText>

        <NewSearchButton
          type="button"
          onClick={onNewSearch}
        >
          Nova consulta
        </NewSearchButton>
      </Footer>
    </Card>
  );
};

const Card = styled.section`
  width: min(100%, 1000px);

  overflow: hidden;

  background: ${({ theme }) =>
    theme.colors.card};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  box-shadow:
    0 40px 60px rgba(0, 0, 0, 0.08),
    0 15px 25px rgba(0, 0, 0, 0.08);
`;

const CardHeader = styled.header`
  min-height: 52px;

  display: flex;
  align-items: center;

  padding: 0 24px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Content = styled.div`
  padding: 24px;

  @media (max-width: 600px) {
    padding: 18px;
  }
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  margin-bottom: 22px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

    gap: 5px;
  }
`;

const ResultCount = styled.p`
  color: ${({ theme }) =>
    theme.colors.textSecondary};

  font-size: 14px;

  strong {
    color: ${({ theme }) =>
      theme.colors.text};
  }
`;

const ResultRange = styled.span`
  color: ${({ theme }) =>
    theme.colors.textSecondary};

  font-size: 12px;
  font-weight: 600;
`;

const DesktopTable = styled.div`
  width: 100%;

  overflow-x: auto;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  text-align: left;

  th {
    padding: 12px;

    border-bottom: 1px solid
      ${({ theme }) => theme.colors.border};

    color: ${({ theme }) =>
      theme.colors.textSecondary};

    font-size: 11px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  td {
    padding: 14px 12px;

    border-bottom: 1px solid
      ${({ theme }) =>
        theme.colors.primarySoft};

    font-size: 13px;
  }

  tbody tr {
    transition:
      background-color 0.15s ease;
  }

  tbody tr:hover {
    background: ${({ theme }) =>
      theme.colors.primarySoft};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const MobileResults = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: grid;

    gap: 12px;
  }
`;

const MobileCard = styled.article`
  display: grid;

  gap: 10px;

  padding: 16px;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors.cardSecondary};
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 20px;

  font-size: 12px;

  span {
    color: ${({ theme }) =>
      theme.colors.textSecondary};
  }

  strong {
    max-width: 65%;

    text-align: right;

    color: ${({ theme }) =>
      theme.colors.text};
  }
`;

const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  margin-top: 24px;
`;

const PageNumbers = styled.div`
  display: flex;

  gap: 6px;
`;

const PaginationButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 7px;

  background: ${({ theme }) =>
    theme.colors.cardSecondary};

  color: ${({ theme }) =>
    theme.colors.text};

  font-size: 18px;

  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.primarySoft};

    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
`;

const PageButton = styled.button<PageButtonProps>`
  width: 36px;
  height: 36px;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 7px;

  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary
      : theme.colors.cardSecondary};

  color: ${({ $active, theme }) =>
    $active
      ? "#ffffff"
      : theme.colors.text};

  font-size: 12px;
  font-weight: 700;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Footer = styled.footer`
  min-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 12px 16px 12px 24px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.primarySoft};

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

const NewSearchButton = styled.button`
  min-width: 150px;
  height: 40px;

  padding: 0 20px;

  border: none;
  border-radius: 7px;

  background: ${({ theme }) =>
    theme.colors.primary};

  color: #ffffff;

  font-size: 13px;
  font-weight: 700;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors.primaryHover};

    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default SearchResults;