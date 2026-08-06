# Status da Migração do Converx

Última atualização: **2026-08-06**
Estado: **Etapa 2 implementada, validada e registrada em commits locais; publicação pendente**

## 1. Estado Git

| Item | Resultado |
|---|---|
| Branch atual | `feature/nextjs-foundation` |
| Branch de origem | `dev` |
| `dev` local e remoto | Alinhadas em `5319cc3` após o merge autorizado do PR #1 |
| Working tree | Limpo após os dois commits locais autorizados |
| Commits da Etapa 2 | `927bc5f feat(app): migrate converter to next app router` e este commit documental |
| Push, PR ou merge da Etapa 2 | Nenhum |

O baseline seguro foi integrado em `dev` pelo PR #1 usando rebase merge, após autorização explícita. A branch atual foi criada a partir dessa `dev` atualizada.

## 2. Implementação local da Etapa 2

- Vite e a SPA em JavaScript foram substituídos pelo Next.js 16.3 com App Router.
- React e React DOM foram atualizados para 19.2.
- TypeScript 6 está com `strict: true`, sem `allowJs` e com alias `@/*` para `src/*`.
- Tailwind CSS 4 usa o plugin PostCSS oficial e configuração CSS-first.
- ESLint 9 usa flat config com as regras Core Web Vitals e TypeScript do Next.js.
- Vitest fornece os scripts e testes unitários iniciais.
- A página principal permanece um Server Component; somente o conversor interativo usa `"use client"`.
- A aplicação possui estados explícitos `idle`, `loading`, `success` e `error`, retry, troca de moedas, cancelamento com `AbortController` e proteção contra respostas obsoletas.
- Valores monetários são normalizados com regras de entrada brasileira e formatados com `Intl`.
- A rota `GET /api/exchange` valida parâmetros, rejeita parâmetros extras, usa allowlist de moedas do provedor e retorna erros pequenos e não sensíveis.
- O provedor externo é acessado apenas por `provider.server.ts` com `fetch`, timeout e cache diário da lista de moedas.
- Foram adicionados headers conservadores de segurança, skip link, feedback acessível e uma 404 real.
- O `<body>` usa `suppressHydrationWarning` somente no nível raiz para tolerar atributos injetados por extensões antes da hidratação, sem suprimir divergências nos componentes internos.
- O analytics legado não foi transportado.
- O rewrite SPA, Axios, React Router, ícones genéricos e toda a toolchain Vite foram removidos.
- Favicons, ícone Apple, imagens Android e o manifesto público existente foram preservados.
- O projeto declara Node `24.x`, alinhado à configuração atual da Vercel.

Alguns requisitos planejados para etapas posteriores foram antecipados porque eram necessários para manter a fundação funcional sem recriar uma fronteira insegura no cliente. As etapas seguintes continuam responsáveis pelo endurecimento, cobertura de integração, conteúdo completo, SEO e quality gates E2E.

## 3. Segurança e ambiente

- O conteúdo do `.env` local não foi aberto, impresso ou copiado.
- A única credencial aceita pela aplicação é `EXCHANGE_RATE_API_KEY`, lida em módulo server-only e nunca prefixada com `NEXT_PUBLIC_`.
- A ausência da nova variável produz uma indisponibilidade segura e compreensível, sem stack trace ou URL do provedor.
- Busca textual em `.next/static` não encontrou `EXCHANGE_RATE_API_KEY` nem nomes `VITE_*` no bundle público.
- Busca no código novo não encontrou Axios, React Router, `VITE_*` ou o serviço legado com nome incorreto.
- `.env` permanece local, ignorado e fora do índice do Git.
- A credencial legada ainda deve ser considerada comprometida e precisa ser revogada; nenhuma reescrita de histórico foi executada.
- `npm audit --omit=dev` e `npm audit` reportam **0 vulnerabilidades** após atualizações transitivas direcionadas de `immutable`, `picomatch` e `brace-expansion`.

## 4. Validações executadas

| Comando ou inspeção | Resultado |
|---|---|
| `npm run lint` | Passou com 0 erros e 0 warnings após corrigir dois achados reais e excluir artefatos gerados do escopo |
| `npm run typecheck` | Passou com TypeScript strict |
| `npm run test` | Passou: 3 arquivos e 24 testes |
| `npm run build` | Passou com Next.js 16.3/Turbopack; rotas `/`, `/_not-found` e `/api/exchange` geradas |
| `npm audit --omit=dev` | Passou: 0 vulnerabilidades de produção |
| `npm audit` | Passou: 0 vulnerabilidades no conjunto completo |
| `git diff --check` | Passou antes da atualização documental final |
| Inspeção no navegador | Página inicial, estado sem configuração, 404, console e viewport móvel validados |
| Busca no bundle público | Nenhum nome de variável privada ou legado encontrado em `.next/static` |

Após um navegador externo injetar `cz-shortcut-listen="true"` no `<body>`, a supressão de hidratação foi aplicada somente nesse elemento. Lint, typecheck, 24 testes e build foram reexecutados com sucesso.

Na validação móvel em 390 px, o documento apresentou largura de conteúdo igual à viewport e nenhum overflow horizontal. O DOM continha um único H1. O console do navegador não registrou warnings nem erros.

## 5. Decisões técnicas

- O endpoint interno expõe somente o contrato normalizado de conversão; respostas brutas do provedor não atravessam a fronteira do servidor.
- A página é dinâmica para que o build não dependa de credencial ou rede externa.
- A lista de moedas usa revalidação diária; a conversão ainda usa o endpoint do provedor que inclui o valor solicitado.
- Controles nativos `<select>` foram preferidos a um combobox customizado nesta fase para preservar acessibilidade de teclado e leitor de tela.
- Não foi criado um rate limiter em memória, pois ele seria enganoso em ambiente serverless sem armazenamento durável.
- O modo claro é o único tema declarado; dark mode não será anunciado até existir implementação completa.
- Node `24.x` foi registrado em `package.json` e `.nvmrc` para reproduzir o runtime aprovado na Vercel.

## 6. Riscos e lacunas restantes

1. O fluxo positivo contra o provedor real não foi exercitado porque a nova variável server-only não está configurada localmente. Nenhum valor será obtido do `.env` legado.
2. A Etapa 3 deve trocar a chamada dependente do valor por cache de taxa reutilizável, evitando nova consulta quando apenas a quantidade mudar.
3. Testes de componente, integração da Route Handler, falhas do provedor e E2E ainda serão adicionados.
4. Metadata canônica, Open Graph, Twitter, `robots.ts`, `sitemap.ts` e `manifest.ts` permanecem para a etapa de SEO.
5. FAQ, conteúdo explicativo completo e auditorias Lighthouse permanecem pendentes.
6. O runtime local é Node 22.12 e emite aviso porque uma dependência de lint exige 22.13 ou 24; os gates passaram. O runtime-alvo e a Vercel estão em Node 24.

## 7. Próximo checkpoint Git

Antes de qualquer commit adicional serão apresentados:

1. `git status`;
2. `git diff --stat`;
3. diff staged de cada escopo;
4. arquivos staged;
5. mensagem Conventional Commit proposta;
6. resultado final dos gates após todas as alterações.

Nenhum commit adicional, push ou PR desta etapa deve ocorrer sem a validação do usuário no checkpoint correspondente.

## 8. Histórico já integrado em `dev`

```text
3354dcc chore(repo): secure local environment files
3f6dbf4 docs(repo): add migration workflow guidelines
09f7f5d docs(migration): record migration baseline
5319cc3 docs(migration): mark baseline phase complete
```
