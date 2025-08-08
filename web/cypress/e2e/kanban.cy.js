describe("Executar o video", () => {
  it("Deve mover uma tarefa de To Do para Done e atualizar o board", () => {
    // Login
    cy.EfetuarLogin("papito@webdojo.com", "katana123");

    // Acessa o Kanban
    cy.contains("Kanban").click();

    // Cria o objeto necessário para drag and drop
    const dataTransfer = new DataTransfer();

    // Dispara o dragstart na tarefa
    cy.contains("div[draggable=true]", "Documentar API").trigger("dragstart", {
      dataTransfer,
    });

    // Dispara o drop na coluna Done
    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");
    cy.get(".column-done")
      .and("include.text", "Documentar API")
      .and("include.text", "Criar documentação da API com Swagger");
  });
});
