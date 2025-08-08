describe("Executar o video", () => {
  it("Deve poder tocar o video de exemplo", () => {
    cy.EfetuarLogin("papito@webdojo.com", "katana123");
    cy.contains("Video").click();
    cy.get('iframe[title="Video Player"]')
      .should("exist")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .as("iFramePlayer");

    cy.get("@iFramePlayer").find(".play-button").click();

    cy.get("@iFramePlayer").find(".pause-button").should("be.visible");
  });
});
