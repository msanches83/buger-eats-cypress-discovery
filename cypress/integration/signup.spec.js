import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'


//Suite de teste
describe('Signup', function () {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

    //Ganchos para serem usados antes ou depois de cada caso de teste

    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')      
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')      
    // })

    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')      
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')      
    // })

    //Cenário de teste
    it('User should be a deliver', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorret document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141AA'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Incorret email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'email.com.pt'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {


        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })


    // it('Required fields', function () {
    //     signupPage.go()
    //     signupPage.submit()
    //     signupPage.alertMessageShouldBe('É necessário informar o nome')
    //     signupPage.alertMessageShouldBe('É necessário informar o CPF')
    //     signupPage.alertMessageShouldBe('É necessário informar o email')
    //     signupPage.alertMessageShouldBe('É necessário informar o CEP')
    //     signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //     signupPage.alertMessageShouldBe('Selecione o método de entrega')
    //     signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    //})
})