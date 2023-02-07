/// <reference types="cypress" />
describe('Тестируем игры в пары', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })
  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', () => {
    cy.contains('Начать игру').click()
  })
  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.contains('Начать игру').click()
    cy.contains('CARD').click()
  })
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
    cy.contains('Начать игру').click()
    let text1;
    let text2;
    let i = 2;
    function cardClick() {
      cy.get('#1')
        .click()
        .then(e => {
          text1 = e.text();
        });
      cy.get(`#${i}`)
        .click()
        .then(e => {
          text2 = e.text();
          if (text1 !== text2) {
            i++;
            cardClick()
          } else {
            cy.get('#1').should('have.class', 'sucsses');
            cy.get(`#${i}`).should('have.class', 'sucsses');
            expect(text1).to.equal(text2);
          }
        });
    }
    cardClick()
  })
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.', () => {
    cy.contains('Начать игру').click()
    let text1;
    let text2;
    let i = 1;
    function cardClick() {
      cy.get(`#${i}`)
        .click()
        .then(e => {
          text1 = e.text();
        });
      cy.get(`#${i+1}`)
        .click()
        .then(e => {
          text2 = e.text();
          if (text1 !== text2) {
            cy.get(`#${i}`).should('not.have.class', 'sucsses')
            cy.get(`#${i+1}`).should('not.have.class', 'sucsses')
          return
          } else {
            i++;
            i++;
            cardClick()
          }
        });
    }
    cardClick()
  })
})
