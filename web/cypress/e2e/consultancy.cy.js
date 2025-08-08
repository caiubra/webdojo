describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.EfetuarLogin();
    cy.goTo("Formulários", "Consultoria");
    cy.fixture("consultancy").as("consultancyData");
  });

  it.only("Deve solicitar consultoria individual", () => {
    const consultancyForm = this.consultancyData.personal;

    cy.get("#name").type(consultancyForm.name);
    cy.get("#email").type(consultancyForm.email);
    cy.get("#phone").type(consultancyForm.phone);
    //.should("have.value", "(15) 99999-9999");
    cy.get(".flex-col > :nth-child(2) > .w-4").click();
    cy.get("#consultancyType").select(consultancyForm.consultancyType);

    if (consultancyForm.personType === "cpf") {
      cy.contains("label", "Pessoa Física").find("input").click();
      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("not.be.checked");
    }

    if (consultancyForm.personType === "cnpj") {
      cy.contains("label", "Pessoa Jurídica").find("input").click();
      cy.contains("label", "Pessoa Física")
        .find("input")
        .should("not.be.checked");
    }

    cy.contains("label", "CPF", { timeout: 10000 })
      .should("be.visible")
      .parent()
      .find("input")
      .type(consultancyForm.document);

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });
    /*
     * Aplicação não está subindo arquivos
     *
     * cy.get('input[type="file"]').selectFile(
     *   './cypress/fixtures/DocumentTest.pdf',
     *   { force: true }
     * );
     */

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(consultancyForm.description);
    consultancyForm.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");
      cy.contains("span", tech).should("be.visible");
    });

    if (consultancyForm.terms === true) {
      cy.contains("label", "termos de uso").find("input").click();
      cy.contains("button", "Enviar formulário").click();
      cy.get(".modal", { timeout: 70000 })
        .should("be.visible")
        .find(".modal-content")
        .should("be.visible")
        .and(
          "have.text",
          "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
        );
    }
    //cy.contains(
    // "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
    //).should("be.visible");
  });

  it("Deve solicitar consultoria In Company", () => {
    const consultancyForm = this.consultancyData.company;
  });

  cy.get("#name").type(consultancyForm.name);
  cy.get("#email").type(consultancyForm.email);
  cy.get("#phone").type(consultancyForm.phone);
  //.should("have.value", "(15) 99999-9999");
  cy.get(".flex-col > :nth-child(2) > .w-4").click();
  cy.get("#consultancyType").select(consultancyForm.consultancyType);

  if (consultancyForm.personType === "cpf") {
    cy.contains("label", "Pessoa Física").find("input").click();
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("not.be.checked");
  }

  if (consultancyForm.personType === "cnpj") {
    cy.contains("label", "Pessoa Jurídica").find("input").click();
    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("not.be.checked");
  }

  cy.contains("label", "CNPJ", { timeout: 10000 })
    .should("be.visible")
    .parent()
    .find("input")
    .type(consultancyForm.document);

  consultancyForm.discoveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });
  /*
   * Aplicação não está subindo arquivos
   *
   * cy.get('input[type="file"]').selectFile(
   *   './cypress/fixtures/DocumentTest.pdf',
   *   { force: true }
   * );
   */

  cy.get(
    'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
  ).type(consultancyForm.description);
  consultancyForm.techs.forEach((tech) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type("{enter}");
    cy.contains("span", tech).should("be.visible");
  });

  if (consultancyForm.terms === true) {
    cy.contains("label", "termos de uso").find("input").click();
    cy.contains("button", "Enviar formulário").click();
    cy.get(".modal", { timeout: 70000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
      );
  }
  //cy.contains(
  // "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
  //).should("be.visible");
});

it("Deve verificar os campos obrigatórios", () => {
  cy.contains("button", "Enviar formulário").click();
  cy.contains("label", "Nome Completo")
    .parent()
    .find("p")
    .should("be.visible")
    .should("have.text", "Campo obrigatório")
    .and("have.class", "text-red-400")
    .and("have.css", "color", "rgb(248, 113, 113)");
  cy.contains("label", "Email")
    .parent()
    .find("p")
    .should("be.visible")
    .should("have.text", "Campo obrigatório")
    .and("have.class", "text-red-400")
    .and("have.css", "color", "rgb(248, 113, 113)");
  cy.contains("label", "termos de uso")
    .parent()
    .find("p")
    .should("be.visible")
    .should("have.text", "Você precisa aceitar os termos de uso")
    .and("have.class", "text-red-400")
    .and("have.css", "color", "rgb(248, 113, 113)");
});
