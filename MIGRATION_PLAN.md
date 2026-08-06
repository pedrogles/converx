# Plano de Migração do Converx

Status: **aprovado; Etapa 1 integrada em `dev` e Etapa 2 validada e commitada localmente**
Data do diagnóstico: **2026-08-06**

Este documento descreve a migração do Converx de React/Vite/JavaScript para Next.js App Router, TypeScript estrito e uma integração segura com o provedor de câmbio. Nenhuma fase de implementação deve começar antes da aprovação do plano e da criação autorizada da branch `dev`.

## 1. Princípios e limites

- Preservar o repositório e o diretório `.git` existentes.
- Usar obrigatoriamente o fluxo `feature/* -> dev -> main`.
- Criar toda branch de trabalho a partir de `dev` atualizada.
- Nunca fazer commit direto em `dev` ou `main`.
- Não executar push, merge, tag, release ou reescrita de histórico sem autorização explícita.
- Manter cada branch curta, com escopo coerente e aplicação compilável ao final.
- Usar Conventional Commits em inglês e commits atômicos.
- Não abrir, copiar ou registrar valores do `.env` legado.
- Não transportar Google Analytics automaticamente para a aplicação nova.
- Não manter Vite e Next.js permanentemente no mesmo repositório.

## 2. Pré-condição de branch

O diagnóstico confirmou que `dev` não existia localmente nem em `origin`. Em 2026-08-06, após aprovação explícita, `dev` foi criada a partir de `main`, publicada, recebeu o baseline seguro pelo PR #1 e foi atualizada localmente por fast-forward.

Estado atual:

1. As referências foram atualizadas com `git fetch --prune`.
2. `main` foi confirmada sem divergência em relação a `origin/main` no início do fluxo.
3. `dev` existe localmente e no origin em `5319cc3`.
4. `feature/nextjs-foundation` é a branch de trabalho atual e foi criada a partir da `dev` integrada.
5. A implementação da Etapa 2 está no commit local `927bc5f`, sem publicação.
6. Todo commit, push, PR ou merge continua dependendo do checkpoint e da autorização do usuário.

Nenhum commit foi criado durante a preparação das branches.

## 3. Fluxo de integração proposto

```text
main
  └── dev
       ├── chore/migration-baseline -> PR para dev
       ├── feature/nextjs-foundation -> PR para dev
       ├── feature/secure-exchange-api -> PR para dev
       ├── feature/currency-converter -> PR para dev
       ├── feature/ux-accessibility -> PR para dev
       ├── feature/seo-privacy -> PR para dev
       ├── test/converter-quality-gates -> PR para dev
       └── docs/readme-architecture -> PR para dev

dev validada -> PR separado para main
```

Cada branch seguinte será criada somente depois que a anterior estiver integrada e `dev` tiver sido atualizada por fast-forward. Pushes e abertura/merge de PRs continuarão dependendo de autorização explícita.

## 4. Fases, branches e pull requests

### Etapa 1 — Baseline seguro do repositório

**Branch:** `chore/migration-baseline`
**Objetivo:** registrar o baseline, impedir novos commits de arquivos de ambiente e preparar um contrato seguro de configuração sem iniciar a migração da aplicação.

**Arquivos previstos:**

- Alterar `.gitignore`.
- Criar `.env.example` apenas com nomes e placeholders seguros.
- Atualizar `MIGRATION_PLAN.md` e `MIGRATION_STATUS.md`.
- Remover `.env` somente do índice do Git, preservando o arquivo local, após confirmação do escopo.
- Incluir `AGENTS.md` no commit somente se o usuário confirmar que ele deve fazer parte do repositório.

**Riscos:**

- Ignorar `.env` não remove o arquivo já rastreado; será necessário removê-lo do índice sem apagar a cópia local.
- A credencial histórica continuará presente no histórico. Não haverá reescrita de histórico sem autorização explícita.
- A credencial deve ser considerada comprometida e revogada fora deste fluxo de código.

**Critérios de aceite:**

- `.env`, `.env.local` e `.env.*.local` estão ignorados.
- `.env` não está mais rastreado no estado novo da branch.
- `.env.example` não contém segredo real.
- O build legado continua executável.
- A falha de lint legada está documentada, sem alegação de sucesso.
- Nenhum arquivo de aplicação foi alterado.

**Validações:**

```text
git status
git diff --check
git ls-files -- .env
git check-ignore -v .env
npm run lint
npm run build
```

**Commits esperados:**

```text
chore(repo): secure local environment files
docs(migration): record legacy baseline
```

### Etapa 2 — Fundação Next.js com continuidade funcional

**Branch:** `feature/nextjs-foundation`
**Objetivo:** substituir a fundação Vite pela App Router do Next.js, habilitar TypeScript estrito e preservar um fluxo mínimo de conversão sem expor a credencial ao navegador.

Esta etapa incluirá uma fronteira mínima de servidor porque portar o cliente antes da proteção do segredo criaria um estado intermediário inseguro. O endurecimento completo do provedor continuará na etapa seguinte.

**Arquivos previstos:**

- Alterar `package.json` e `package-lock.json`.
- Criar `next.config.*`, `tsconfig.json`, `next-env.d.ts` e configuração ESLint compatível.
- Ajustar `postcss.config.*` e `tailwind.config.*`.
- Criar `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` e uma rota de API mínima.
- Criar o menor Client Component necessário para manter o conversor utilizável.
- Preservar os favicons e o manifesto relevantes em `public/`.
- Remover, somente quando a substituição estiver validada, `vite.config.js`, `index.html`, entradas Vite, roteamento SPA e o rewrite de `vercel.json`.
- Remover dependências Vite, Axios e React Router quando não forem mais usadas.

**Riscos:**

- Grande alteração no sistema de build e no lockfile.
- Incompatibilidade entre versões de Next.js, React, Tailwind e ferramentas de lint.
- Regressão temporária de layout ou comportamento durante o porte.
- Configuração local ausente para a nova variável `EXCHANGE_RATE_API_KEY`.

**Critérios de aceite:**

- A aplicação usa Next.js App Router e inicia sem Vite.
- `strict: true` está habilitado.
- `@/*` resolve para `src/*`.
- A página inicial é renderizada pelo servidor e mantém identidade, favicons e conteúdo essencial do Converx.
- O navegador não recebe a credencial do provedor.
- Não existe importação de módulo server-only por Client Component.
- O fluxo mínimo BRL/USD funciona com configuração válida e falha com mensagem segura quando a configuração está ausente.
- Lint, typecheck e build passam.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run build
git diff --check
```

**Commits esperados:**

```text
build(next): initialize app router foundation
refactor(api): move provider access behind server route
refactor(converter): port legacy flow to next
build(vite): remove legacy spa tooling
```

### Etapa 3 — Integração segura e resiliente com o provedor

**Branch:** `feature/secure-exchange-api`
**Objetivo:** consolidar a fronteira server-only, validar entradas, normalizar respostas, aplicar timeout e cache coerente.

**Arquivos previstos:**

- `src/lib/env.server.ts`.
- `src/lib/exchange-rate/provider.server.ts`.
- `src/lib/exchange-rate/schemas.ts`.
- `src/lib/exchange-rate/types.ts`.
- `src/lib/exchange-rate/normalize.ts`.
- `src/app/api/exchange/route.ts`.
- Testes unitários e de integração desses módulos.

**Riscos:**

- Contrato real do provedor diferir das suposições do código legado.
- Cache incorreto produzir cotações antigas ou chamadas excessivas.
- Exceções ou logs vazarem URL interna ou detalhes do provedor.
- Limites de quantidade excessivamente baixos ou altos prejudicarem uso e segurança.

**Critérios de aceite:**

- Códigos seguem `^[A-Z]{3}$`, pertencem à allowlist e são diferentes.
- Quantidade é finita, maior que zero e respeita limite documentado.
- Parâmetros extras são rejeitados.
- Timeout e erros retornam contrato pequeno e não sensível.
- Respostas do provedor são normalizadas para o contrato interno.
- Lista de moedas e taxas usam cache/revalidação documentados.
- Alterar somente a quantidade não força nova consulta de taxa válida.
- Nenhum segredo aparece no código cliente, respostas ou logs de teste.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run build
git diff --check
```

**Commits esperados:**

```text
feat(api): validate exchange requests on the server
refactor(api): normalize provider responses
perf(rates): cache supported codes and exchange rates
test(api): cover provider validation and failures
```

### Etapa 4 — Conversor tipado e modelo de estados

**Branch:** `feature/currency-converter`
**Objetivo:** implementar o formulário definitivo com React Hook Form, Zod, valores estruturados e estados explícitos de idle, loading, success e error.

**Arquivos previstos:**

- `src/components/currency-converter/currency-converter.tsx`.
- `src/components/currency-converter/currency-form.tsx`.
- `src/components/currency-converter/currency-select.tsx`.
- `src/components/currency-converter/conversion-result.tsx`.
- `src/components/currency-converter/conversion-feedback.tsx`.
- `src/lib/currency/parse.ts`.
- `src/lib/currency/format.ts`.
- `src/lib/currency/constants.ts`.
- Schemas e tipos compartilháveis sem cruzar a fronteira server-only.
- Testes de unidade e componentes relacionados.

**Riscos:**

- Corridas entre requisições manterem resultado obsoleto.
- Entrada decimal brasileira ser normalizada incorretamente.
- Combobox customizado introduzir problemas de teclado e leitor de tela.
- Formatação de moeda apresentar símbolo ambíguo.

**Critérios de aceite:**

- Moedas são armazenadas por código, sem regex sobre texto de exibição.
- Valores com vírgula e ponto têm regras documentadas e testadas.
- Pares iguais, moedas inexistentes, zero, negativos, infinito e excesso de limite são rejeitados.
- Envio duplicado é bloqueado durante loading.
- `AbortController` cancela requisições obsoletas e resposta antiga não sobrescreve a nova.
- Erros recuperáveis preservam o formulário e oferecem nova tentativa.
- Troca de moedas funciona.
- Quantias, taxas e datas usam `Intl`.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run build
git diff --check
```

**Commits esperados:**

```text
feat(converter): add validated conversion state model
fix(form): normalize Brazilian decimal input
feat(converter): prevent stale conversion responses
test(converter): cover form and request states
```

### Etapa 5 — UX responsiva e acessibilidade

**Branch:** `feature/ux-accessibility`
**Objetivo:** modernizar a interface, manter a identidade navy do Converx e atingir os requisitos práticos de WCAG 2.2 AA.

**Arquivos previstos:**

- Componentes do conversor e estilos globais.
- Layout, header, hero, conteúdo explicativo, FAQ, disclaimer e footer.
- Componentes SVG locais estritamente necessários.
- Testes de interação por teclado e feedback acessível.

**Riscos:**

- Contraste insuficiente ou foco pouco visível.
- Excesso de abstrações de UI.
- Regressão em telas pequenas.
- Combobox inacessível; nesse caso será preferido um controle nativo ou primitivo comprovado.

**Critérios de aceite:**

- Existe um único H1 descritivo e landmarks semânticos.
- Skip link, `focus-visible`, labels, `aria-invalid`, `aria-describedby`, alertas e região de resultado ao vivo funcionam.
- Todos os controles são operáveis por teclado e possuem alvos de toque adequados.
- Estados não dependem somente de cor.
- Layout é validado em mobile e desktop, sem overflow indevido.
- Movimento reduzido é respeitado e não há animação gratuita.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

**Commits esperados:**

```text
feat(ui): modernize the converter experience
feat(a11y): improve keyboard and screen reader feedback
test(a11y): cover accessible converter interactions
```

### Etapa 6 — SEO, rotas e privacidade

**Branch:** `feature/seo-privacy`
**Objetivo:** adicionar metadados e arquivos de descoberta, uma 404 real e remover analytics legado até existir estratégia aprovada.

**Arquivos previstos:**

- `src/app/layout.tsx` e metadata compartilhada.
- `src/app/not-found.tsx`.
- `src/app/robots.ts`.
- `src/app/sitemap.ts`.
- `src/app/manifest.ts`.
- `src/app/error.tsx` e `src/app/loading.tsx`, se ainda não existirem.
- Configuração segura de `NEXT_PUBLIC_SITE_URL`.
- Remoção definitiva do Google Analytics legado.

**Riscos:**

- URL canônica incorreta em preview ou produção.
- Metadata depender de variável pública inválida.
- Afirmações indevidas sobre precisão financeira ou conformidade legal.

**Critérios de aceite:**

- Title, description, canonical, Open Graph e Twitter metadata são coerentes.
- `robots`, sitemap, manifest e 404 respondem corretamente.
- HTML inicial contém conteúdo significativo em `pt-BR`.
- Não existem páginas finas para combinações de moedas.
- Analytics não é carregado.
- Limitações financeiras e situação de privacidade são descritas sem alegar conformidade legal.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

**Commits esperados:**

```text
feat(seo): add metadata and discovery routes
feat(routing): add application error and not found states
refactor(privacy): remove legacy analytics
test(seo): cover metadata and public routes
```

### Etapa 7 — Quality gates e E2E

**Branch:** `test/converter-quality-gates`
**Objetivo:** fechar lacunas de testes, adicionar E2E de alto valor e verificar que o segredo não aparece na superfície do navegador.

**Arquivos previstos:**

- Configuração do runner unitário e de componentes, se ainda necessária.
- Configuração E2E.
- Testes em `src/test/`, `test/` ou `e2e/`, conforme a ferramenta escolhida.
- Scripts de validação no `package.json`.

**Riscos:**

- Testes frágeis dependentes do provedor externo.
- Aumento desnecessário de dependências e tempo de CI.
- Falso positivo na verificação de segredo.

**Critérios de aceite:**

- Testes externos usam mocks ou fixtures seguros e determinísticos.
- Fluxos BRL/USD, erro do provedor, retry, mobile e 404 estão cobertos.
- Teste confirma ausência de credencial em HTML, JavaScript e resposta pública sem registrar a credencial.
- Todos os scripts obrigatórios existem e passam.
- Auditorias de Lighthouse só serão relatadas se realmente executadas.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

**Commits esperados:**

```text
test(converter): add end to end conversion coverage
test(security): verify provider credentials stay server only
chore(quality): finalize validation scripts
```

### Etapa 8 — Documentação final

**Branch:** `docs/readme-architecture`
**Objetivo:** atualizar a documentação pública e consolidar decisões, limitações, setup e operação.

**Arquivos previstos:**

- `README.md`.
- `MIGRATION_STATUS.md`.
- Eventual ADR somente se uma decisão arquitetural exigir mais contexto.

**Riscos:**

- Documentação divergir do comportamento real.
- Inclusão acidental de segredo ou URL interna.
- Declarar metas de desempenho como atingidas sem medição.

**Critérios de aceite:**

- README cobre propósito, arquitetura, recursos, segurança, ambiente, execução, validações, deploy, privacidade e limitações.
- Diagrama Mermaid descreve apenas a arquitetura implementada.
- Nenhum valor real de ambiente aparece na documentação.
- O status final contém resultados exatos dos quality gates e pendências do usuário.

**Validações:**

```text
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
git diff --check
```

**Commits esperados:**

```text
docs(readme): document architecture and local setup
docs(migration): finalize migration status
```

## 5. Estratégia de rollback

- Antes de merge: manter a recuperação isolada à branch; não modificar `dev` ou `main` para desfazer trabalho experimental.
- Depois de merge autorizado: preferir `git revert` por PR ou commit coerente, preservando histórico; nunca usar reset destrutivo ou force push sem autorização específica.
- Dependências: manter mudanças de `package.json` e lockfile no mesmo PR para reversão atômica.
- Migração de ambiente: remover `.env` somente do índice e nunca apagar a cópia local automaticamente.
- Troca Vite/Next: remover arquivos legados apenas depois que lint, typecheck, testes e build do Next passarem na branch.
- Provedor: manter contrato interno estável para permitir trocar ou reverter a implementação server-only sem alterar o formulário.

## 6. Promoção para produção

Quando todas as branches estiverem integradas em `dev`:

1. Atualizar `dev` por fast-forward.
2. Executar lint, typecheck, testes, E2E e build.
3. Revisar preview deployment, somente após autorização para a escrita externa necessária.
4. Preparar PR separado `dev -> main`.
5. Solicitar autorização antes do merge.
6. Não criar tag ou release sem solicitação explícita.

## 7. Aprovações e ações externas

1. Plano e divisão de PRs: aprovado.
2. Criação local de `dev`: aprovada e concluída.
3. Versionamento de `AGENTS.md`: aprovado e concluído localmente.
4. Publicação de `dev` e `chore/migration-baseline`: autorizada e concluída.
5. Abertura e merge do PR #1 em `dev`: autorizados e concluídos.
6. Commits locais da Etapa 2: autorizados e concluídos neste checkpoint; push, PR ou merge continuam não executados.
7. Revogar a credencial legada e preparar uma nova chave para `EXCHANGE_RATE_API_KEY`, sem compartilhá-la em conversa ou commit.
