# CardioTrack Frontend

Frontend do sistema **CardioTrack**, desenvolvido com **Ionic + Angular**, para acompanhamento de saúde cardíaca. O aplicativo permite autenticação de usuários, cadastro de medições, visualização de histórico e consulta de resumo com indicadores consolidados.

## Tecnologias usadas

- Angular 20
- Ionic 8
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
- Capacitor
- Karma/Jasmine para testes

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js 20 ou superior
- npm 10 ou superior
- Angular CLI 20
- Ionic CLI

Instalação opcional das CLIs globais:

```bash
npm install -g @angular/cli @ionic/cli
```

## Instalação das dependências

No diretório do projeto, execute:

```bash
npm install
```

## Como rodar o frontend

Para iniciar o frontend em ambiente de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

Depois disso, acesse no navegador:

```text
http://localhost:4200
```

## Como rodar junto com o backend local

O frontend está configurado, em desenvolvimento, para consumir a API em:

```text
http://localhost:5189/api
```

Passos recomendados:

1. Inicie primeiro o backend local na porta `5189`.
2. Confirme que os endpoints da API estão disponíveis.
3. Em outro terminal, inicie o frontend com `npm start`.
4. Acesse `http://localhost:4200`.

Se o backend estiver rodando em outra porta ou outro host, atualize a propriedade `apiUrl` nos arquivos de ambiente.

## URL da API configurada

As URLs atualmente configuradas são:

- Desenvolvimento: [src/environments/environment.ts](C:/Users/llben/Desktop/ES2/front-es2/src/environments/environment.ts)
  - `http://localhost:5189/api`
- Produção: [src/environments/environment.prod.ts](C:/Users/llben/Desktop/ES2/front-es2/src/environments/environment.prod.ts)
  - `http://192.168.1.15:5189/api`

Observação importante:

- No APK, não deve ser usado `localhost`, porque o celular não acessa a máquina de desenvolvimento por esse endereço.
- Para testes em dispositivo Android na mesma rede local, configure `environment.prod.ts` com o **IP da máquina na rede local**, por exemplo `http://192.168.x.x:5189/api`.

## Build de produção

Para gerar o build de produção:

```bash
npm run build
```

O Angular substituirá `environment.ts` por `environment.prod.ts` durante o processo de build.

## Estrutura de pastas

A organização principal do projeto está em `src/app`:

- `pages`
  - Telas da aplicação, organizadas por funcionalidade.
  - Exemplos: login, cadastro, dashboard, histórico, formulário de medição, integrantes.
- `services`
  - Responsáveis pelas chamadas HTTP e regras de acesso aos dados da API.
  - Exemplos: autenticação de usuário, cadastro de medição, consulta de relatórios.
- `models`
  - Interfaces e tipos usados para representar requisições e respostas da API.
- `core`
  - Infraestrutura compartilhada da aplicação.
  - Contém itens como `guards` de rota e `interceptors` HTTP.
- `shared`
  - Componentes reutilizáveis entre telas.
  - Exemplo: cabeçalho compartilhado da aplicação.

Organização atual por domínio:

- `src/app/usuarios`
  - `pages`, `services`, `models`
- `src/app/medicoes`
  - `pages`, `services`, `models`
- `src/app/relatorios`
  - `pages`, `services`, `models`
- `src/app/sobre`
  - páginas institucionais, como a tela de integrantes
- `src/app/core`
  - `guards` e `interceptors`
- `src/app/shared`
  - componentes compartilhados

## Funcionalidades implementadas

- Login de usuário
- Cadastro de usuário
- Proteção de rotas autenticadas com `authGuard`
- Armazenamento local do token de autenticação
- Interceptor HTTP para envio automático do header `Authorization`
- Dashboard com resumo das medições
- Visualização de estatísticas gerais de saúde cardíaca
- Registro de nova medição
- Histórico de medições registradas
- Exibição de sintomas informados nas medições
- Tela de integrantes do projeto
- Navegação entre telas com Angular Router

## Fluxo geral de uso

1. O usuário acessa a tela de login.
2. Pode se cadastrar caso ainda não tenha conta.
3. Após autenticação, acessa o dashboard.
4. No dashboard, pode:
   - registrar uma nova medição
   - consultar o histórico
   - acessar a tela de integrantes
   - sair da aplicação

## Scripts úteis

- `npm start`
  - inicia o servidor de desenvolvimento
- `npm run build`
  - gera o build de produção
- `npm test`
  - executa os testes
- `npm run lint`
  - executa a análise estática com ESLint

## Observação para apresentação e APK

Como o trabalho exige demonstração em celular Android e integração com o backend, o APK deve apontar para a API usando o IP da máquina host na rede local. Exemplo:

```text
http://192.168.1.15:5189/api
```

Antes de gerar o APK, confirme:

- se o backend está acessível pela rede local
- se a porta `5189` está liberada
- se o celular e a máquina estão na mesma rede
- se `environment.prod.ts` foi atualizado com o IP correto
