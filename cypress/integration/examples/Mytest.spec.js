/// <reference types="Cypress" />

describe("Tester", ()=>{

    it("sign in Sendsay",()=>{

        cy.visit("https://app.sendsay.ru/signin") // Переходим по ссылке с авторизацией

        // Эти переменые следует изменить на свои значения !!!!
        let login,password;

            login = "Your login";
            password = "Your password";

        cy.get("input[name=login]")
            .type(login,{delay: 50})
            .should("have.value", login)

        cy.get("input[name=password]")
            .type(password,{delay: 50})

        cy.get(".Button[type=submit]").click()
    })
    it("Create Sends", ()=>{

    // Эти переменые следует изменить на свои значения !!!!
        let Name,Mail,text;

            Name = "YourName";
            Mail = "YourMailgmail.com";
            text = "Текст для рассылки"

        cy.get('a[href="/campaigns"]').click() // Переходим по ссылке

        cy.get('.action-button__wrapper').click() // Нажимаем кнопку "Создать Рассылку"
        cy.get(".ChannelMenuItem-wrapper").eq(0).click() // Выбираем тип выпуска .eq(0) - email, .eq(1) - web push, .eq(2) - sms
    
        // Выбираем аудиторию //

            cy.get(":nth-child(1) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper").click()
                cy.get('.SelectButton > .Button > .Button-wrapper').click()
                    cy.get('.MenuItem-label > .Text > .Text-start').click()
                        cy.get('.WizardStepSubmitAndCloseButtons-submitButton > .Button > .Button-wrapper').click()
                        cy.wait(100) // Небольшая зажержка для обновления DOM 


        // Выбираем отправителя//

            cy.get(":nth-child(2) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper").click()
                cy.get('.Select-target > .TextArea > .TextArea-input')
                .type(Name)
                .should('have.value', Name)

                cy.get('.SelectButton > .Button > .Button-wrapper').click()
                    cy.get('.Menu-footer > .MenuItem').click()
                        cy.get('textarea[name=name]')
                            .type(Name, {delay: 50})
                        cy.get('.TextInput',{delay: 50})
                            .type(Mail,{delay: 50})
                        cy.get('.dialog__action-button > .Button > .Button-wrapper').click()
                        cy.wait(500) // Небольшая зажержка для обновления DOM 
                        cy.get('.dialog__action-button > .Button > .Button-wrapper').click()

                cy.get('textarea[name=subject]')
                    .type(text,{delay: 50}) 

                cy.get('.WizardStepSubmitAndCloseButtons-submitButton > .Button > .Button-wrapper').click()

        // Выбираем письмо//

            cy.get(':nth-child(3) > .WizardStep > .WizardStep-wrapper > .WizardStep-header > .WizardStep-panel > .Button > .Button-wrapper').click()
                cy.get(':nth-child(2) > .GalleryCards-content > :nth-child(2) > .GalleryCard-preview > .GalleryCard-previewContent > .GalleryCard-shadow').click()
                   cy.wait(500) // При первоначальном запуске теста, при плохой прогрузке ругается на следующий элемент, ожидание исправляет это 
                        cy.get(':nth-child(5) > .ui-button').click()


        // отправляем рассылку

            cy.get(':nth-child(3) > .CampaignSendOption > .CampaignSendOption-sendButton > .ControlGroup > :nth-child(1) > .Button > .Button-wrapper').click()
            cy.get('.dialog__action-button > .Button > .Button-wrapper').click()

     })
})