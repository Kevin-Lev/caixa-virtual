# vCaixa.dev - o seu Caixa Virtual

O vCaixa.dev é um website desenvolvido pela *Virtual Box Company*, com o objetivo de facilitar a administração de caixas dos mais diversos estabelecimentos. As suas principais **features** incluem:

-	**Cadastro e autenticação de usuário**: o dono do estabelecimento faz o seu cadastro e em seguida, o sistema já cria um caixa para ele no banco de dados.

- **Adição de movimentações**:  o dono pode inserir valores de entrada e saída no seu caixa, além de poder adicionar uma descrição e uma categoria para cada movimentação.

- **Listagem de movimentações**:  O usuário pode visualizar a qualquer momento o saldo total do seu caixa, assim como todas as movimentações realizadas no dia.

- **Adição de categorias**:  Para uma melhor organização do seu caixa, o dono pode inserir diversar categorias para atribuir para as várias entradas e saídas que acontecem no mesmo.

## Desenvolvimento

### FrontEnd

-   React
-   React-Bootstrap
-   Next.js;

### BackEnd

-   Node.js
-   Mongoose;
-   Next.js

### Banco de Dados Não Relacional

-   **MongoDB**:  Foram criados dois bancos de dados, um para desenvolvimento e  outro para produção. 

	-   Os dois bancos foram (vCaixa e vCaixadev) encontram-se em um cluster criado no **MongoDB Atlas**.

	-  **Mongoose** foi utilizado para a criação dos schemas.

### Outras Dependências

-   **prettier** e **eslint** para embelezar e padronizar a formatação do código.

-   **js-cookie** e **jsonwebtoken** para auxiliar na autenticação de usuários.

-   **bcrypt** para a criptografia de senhas de usuários no momento de cadastro.

-   **isomorphic-unfetch** para realizar os fetches nos endpoints definidos na API.

## Instalação

```bash
# Entrar no diretório raiz do projeto
$ cd caixa-virtual/

# instalar as dependências
$ yarn install

# executar em modo Dev
$ yarn dev

# Realizar build para produção
$ yarn build

#iniciar o modo produção
$ yarn start

```
## Deploy

Foi feito o deploy desse projeto para o website [Vercel](https://vercel.com/kevinlevroner/caixa-virtual). Você pode visualizá-lo clicando [aqui](https://caixa-virtual-six.vercel.app/).

## Tutorial de uso

1. Execute o projeto em modo Dev e em seguida, digite 'localhost:3000' na barra de endereços. Alternativamente, acesse o projeto diretamente pelo seu [site](https://caixa-virtual-six.vercel.app/).

2. Caso não possua uma conta no sistema, clique no botão 'Quero me cadastrar'.

	![Alt text](/public/tela_inicial.png?raw=true "Tela Inicial")

3. Digite o seu e-mail e uma senha. Se as suas credenciais estiverem corretas, aparecerá uma mensagem avisando do sucesso no cadastro.

	![Alt text](/public/cadastro.png?raw=true "cadastro")

4. Volte para a tela de login e digite novamente as suas credencias. Clique no botão Login e aguarde até que você seja redirecionado.

	![Alt text](/public/login.png?raw=true "login")

5.  Agora você poderá clicar em um dos 3 botões abaixo. Alternativamente, você pode selecionar as mesmas opções no botão **opções do usuário**, localizado no canto direito da NavBar.

	-  *Adicionar uma  movimentação*: Permite adicionar uma nova movimentação para o  seu caixa.

	- *Ver a lista de movimentações*:  Retorna uma tabela contendo o saldo do caixa do usuário e todas as suas movimentações realizadas no dia até o momento.

	-  *Adicionar categoria*:  Permite adicionar categorias no banco de dados, para que o usuário consiga  selecionar uma delas no momento de criação de uma nova movimentação.

	![Alt text](/public/bemvindo_usuario.png?raw=true "bemvindo")
	
6. Primeiramente, selecione **Adicionar categoria** e aguarde para ser redirecionado. Em seguida, digite o nome desejado para a sua nova categoria e clique em **Cadastrar Categoria**. Uma mensagem de sucesso no cadastro aparecerá.

	![Alt text](/public/cadastro_categoria.png?raw=true "cadastroCat")

7. Clique em **opções do usuário** e selecione *Adicionar movimentação*. Após ser redirecionado, preencha os dados do formulário e clique em **Cadastrar Movimentação**. Uma mensagem de sucesso deve aparecer se os dados inseridos estiverem corretos.

	![Alt text](/public/novaMovimentação.png?raw=true "novaMovi")

8. Clique em **opções do usuário** e selecione *Lista de registros* para ver a movimentação que você acabou de inserir.. **Obs:** Lembre-se que só serão retornadas as movimentações cadastradas no dia em que a tabela é emitida.

	![Alt text](/public/lista_movimentacoes.png?raw=true "listaMovi")

9. Repita o **passo 6** para adicionar novas categorias para o seu caixa e o **passo 7** se quiser adicionar uma nova movimentação. Caso deseje sair da sessão, clique em **opções do usuário**, selecione *Sair* e aguarde o retorno para a página de Login.

10. Se você desejar ver o .json contendo o saldo total e as movimentações da caixa do usuário autenticado sendo retornado diretamente, digite na barra de endereços:

	```bash
	#Se estiver executando local em modo Dev
		'https://localhost:3000/api/caixa/_id_da_caixa'

	#Se estiver no site
		'https://caixa-virtual-six.vercel.app/api/caixa/_id_da_caixa''
	```
	
	![Alt text](/public/json_api.png?raw=true "jsonApi")


## Todo list

- [x] Retornar saldo total e movimentações da caixa de um usuário.
- [x] Autenticação de usuário.
- [x] Deploy do projeto no Vercel.com.
- [x] Documentação de instalação e tutorial de uso do sistema.
- [ ] Testes Unitários.
- [ ] Uso de Docker.
- [ ] Melhorar a segurança da API e da autenticação de usuários.


