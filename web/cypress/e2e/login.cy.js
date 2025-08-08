describe("Testes de Login", () => {
  it("Deve logar com sucesso", () => {
    cy.EfetuarLogin("papito@webdojo.com", "katana123");
    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");
    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes."
      );
  });

  it("Não Deve logar com senha incorreta", () => {
    cy.EfetuarLogin("papito@webdojo.com", "caiolindo");
    cy.contains("Acesso negado").should("be.visible");
  });

  it("Não Deve logar com e-mail não cadastrado", () => {
    cy.EfetuarLogin("caiolindo@testando.com", "katana123");
    cy.contains("Acesso negado").should("be.visible");
  });
});
