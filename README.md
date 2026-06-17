# CardioTrack Frontend

Aplicacao cliente do **CardioTrack**, desenvolvida com **Ionic + Angular**.
Permite que o usuario se cadastre, faca login, registre medicoes, consulte o
historico e visualize um resumo agregado dos dados retornados pela API.


## Sumario

- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como executar](#como-executar)
- [Configuracao](#configuracao)
- [Rotas](#rotas)
- [Integracao com a API](#integracao-com-a-api)
- [Autenticacao](#autenticacao)
- [Testes](#testes)

## Tecnologias

- **Angular 20** com componentes standalone
- **Ionic 8** para componentes de interface
- **Angular Router** para navegacao
- **Angular HttpClient** para consumo da API
- **TypeScript 5**
- **RxJS 7**
- **Karma + Jasmine** para testes unitarios
- **ESLint** para analise estatica

## Arquitetura

O projeto segue uma organizacao modular por dominio, agrupando cada
funcionalidade principal em sua propria pasta. Em vez de concentrar tudo por
tipo tecnico, o front distribui **pages**, **services** e **models** por
contexto de negocio, o que facilita localizar telas, contratos e chamadas HTTP
relacionadas a uma mesma funcionalidade.

### Modularizacao

A modularizacao acontece em **dois eixos complementares**:

1. **Infraestrutura compartilhada.** O bootstrap da aplicacao, o roteamento, o
   interceptor HTTP e o guarda de autenticacao vivem em areas centrais
   reutilizadas por todo o app.

2. **Vertical por funcionalidade.** O codigo de **Usuarios**, **Medicoes** e
   **Relatorios** fica separado em pastas proprias, cada uma com suas paginas,
   servicos e modelos:

   ```
   src/app/
   ├── core/              # authGuard, authInterceptor
   ├── shared/            # componentes reutilizaveis
   ├── usuarios/          # pages / services / models
   ├── medicoes/          # pages / services / models
   ├── relatorios/        # pages / services / models
   └── sobre/             # paginas institucionais
   ```

### Padroes e decisoes de design

- **Bootstrap standalone.** A aplicacao e iniciada com
  `bootstrapApplication(...)`, sem `NgModule` raiz.
- **Rotas com lazy loading.** As paginas sao carregadas com `loadComponent(...)`
  sob demanda.
- **Protecao por guarda de rota.** As rotas autenticadas usam `authGuard` para
  redirecionar usuarios nao autenticados para `/login`.
- **Interceptor de autenticacao.** O `authInterceptor` injeta o cabecalho
  `Authorization: Bearer <token>` nas requisicoes quando existe um token valido.
- **Sessao com expiracao local.** O token salvo no `localStorage` e validado pelo
  proprio front; se estiver expirado, a sessao e removida.
- **Tratamento central de `401`.** Quando a API responde `401 Unauthorized`, o
  front faz logout e navega de volta para o login.

## Estrutura de pastas

```
front-es2/
├── android/                     # projeto Android gerado pelo Capacitor
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/         # authGuard
│   │   │   └── interceptors/   # authInterceptor
│   │   ├── shared/             # componentes compartilhados
│   │   ├── usuarios/           # login, cadastro, servico de autenticacao
│   │   ├── medicoes/           # formulario e historico de medicoes
│   │   ├── relatorios/         # dashboard e consumo de relatorios
│   │   └── sobre/              # paginas institucionais
│   ├── assets/                 # arquivos estaticos
│   ├── environments/           # configuracoes por ambiente
│   ├── theme/                  # variaveis globais do Ionic
│   └── main.ts                 # bootstrap da aplicacao
├── www/                        # saida do build Angular
├── angular.json                # configuracao de build e serve
├── capacitor.config.ts         # configuracao do app nativo
├── package.json                # scripts e dependencias
└── karma.conf.js               # configuracao de testes
```

## Como executar

### Pre-requisitos

- [Node.js](https://nodejs.org/)
- `npm`

### 1. Instalar dependencias

```bash
npm install
```

### 2. Rodar o servidor de desenvolvimento

```bash
npm start
```

O script `start` executa `ng serve`. O target `serve` do Angular usa a
configuracao `development` por padrao.

### 3. Gerar o build de producao

```bash
npm run build
```

O build gera os arquivos estaticos em:

```text
www/
```

Durante `ng build`, o Angular troca `environment.ts` por
`environment.prod.ts` via `fileReplacements`.

## Configuracao

As configuracoes por ambiente ficam em `src/environments/`.

| Arquivo | Descricao | Valor atual |
|--------|-----------|-------------|
| `environment.ts` | Ambiente de desenvolvimento | `https://localhost:5189/api` |
| `environment.prod.ts` | Ambiente de producao/build | `http://SEU_IP_LOCAL:5189/api` |

> **Atencao:** o arquivo `environment.prod.ts` contem um placeholder (`SEU_IP_LOCAL`)
> e precisa ser ajustado manualmente antes de gerar um build que dependa desse
> host.

## Rotas

As rotas definidas em `src/app/app.routes.ts` sao:

| Rota | Protegida | Descricao |
|------|:---:|-----------|
| `/login` | nao | Tela de autenticacao. |
| `/cadastro` | nao | Tela de criacao de conta. |
| `/integrantes` | nao | Tela institucional com integrantes. |
| `/dashboard` | sim | Resumo das medicoes do usuario autenticado. |
| `/historico` | sim | Lista/historico de medicoes. |
| `/medicao-form` | sim | Formulario de registro de medicao. |

A raiz `/` redireciona para `/login`.

## Integracao com a API

O front consome a API a partir de `environment.apiUrl` e distribui as chamadas
entre tres servicos principais:

| Servico | Base URL | Chamadas implementadas |
|--------|----------|------------------------|
| `UsuarioService` | `/usuarios` | `POST /usuarios`, `POST /usuarios/login` |
| `MedicaoService` | `/medicoes` | `POST /medicoes` |
| `RelatorioService` | `/relatorios` | `GET /relatorios/historico`, `GET /relatorios/resumo` |

### Fluxo por tela

#### Cadastro

- Tela: `usuarios/pages/cadastro`
- Chamada: `POST /api/usuarios`
- Comportamento: em sucesso, navega para `/login`

#### Login

- Tela: `usuarios/pages/login`
- Chamada: `POST /api/usuarios/login`
- Comportamento: salva o token e navega para `/dashboard`

#### Registro de medicao

- Tela: `medicoes/pages/medicao-form`
- Chamada: `POST /api/medicoes`
- Comportamento: em sucesso, navega para `/historico`

#### Historico

- Tela: `medicoes/pages/historico`
- Chamada: `GET /api/relatorios/historico`
- Comportamento: carrega a lista de medicoes e exibe os sintomas marcados

#### Dashboard

- Tela: `relatorios/pages/dashboard`
- Chamada: `GET /api/relatorios/resumo`
- Comportamento: carrega o resumo agregado e oferece acao de logout

## Autenticacao

1. O usuario faz login em `POST /api/usuarios/login`.
2. O token retornado e salvo no `localStorage` com a chave
   `cardiotrack_token`.
3. Antes de usar o token, o front decodifica o payload JWT e verifica a claim
   `exp`.
4. Se o token estiver expirado (ou for invalido), ele e removido.
5. As rotas protegidas dependem de `UsuarioService.estaAutenticado()`.
6. O interceptor injeta o token nas chamadas protegidas.
7. Qualquer `401 Unauthorized` recebido da API encerra a sessao e redireciona
   o usuario para `/login`.

## Testes

```bash
# Testes unitarios
npm test

# Lint
npm run lint
```

Os arquivos de teste presentes no projeto cobrem componentes, paginas e o
servico de usuario. Entre eles:

- `src/app/app.component.spec.ts`
- `src/app/shared/components/app-header/app-header.component.spec.ts`
- `src/app/usuarios/pages/login/login.page.spec.ts`
- `src/app/usuarios/pages/cadastro/cadastro.page.spec.ts`
- `src/app/usuarios/services/usuario.service.spec.ts`
