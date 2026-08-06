# Status da Migração do Converx

Última atualização: **2026-08-06**
Estado: **Etapa 1 — baseline seguro concluído localmente, aguardando integração autorizada**

## 1. Escopo executado nesta etapa

- Leitura integral de `AGENTS.md`.
- Inspeção da estrutura completa do repositório, excluindo conteúdo de `.git`, `node_modules` e `dist`.
- Leitura dos arquivos de aplicação e configuração definidos no `AGENTS.md`.
- Inspeção segura do estado do `.env` apenas por metadados do Git; seu conteúdo não foi aberto.
- Execução dos comandos Git solicitados.
- Consulta somente leitura ao `origin` para confirmar a ausência de `dev`.
- Execução do lint e do build legados.
- Criação de `MIGRATION_PLAN.md` e `MIGRATION_STATUS.md`.

Durante o diagnóstico inicial, não foram criadas branches, commits, merges, tags ou releases. Nenhum arquivo de aplicação foi alterado.

Após a aprovação do plano, as referências foram atualizadas e as branches locais `dev` e `chore/migration-baseline` foram criadas. Os commits locais foram criados após revisão; nenhuma branch foi publicada no remoto.

## 2. Estado Git e branches

### Snapshot anterior à aprovação

| Item | Resultado |
|---|---|
| Branch atual | `main` |
| Relação com remoto | `main` alinhada com `origin/main` em `7aa2e22` |
| Alterações rastreadas | Nenhuma |
| Arquivos não rastreados | `AGENTS.md` |
| Branch `dev` local | Não existe |
| Referência `origin/dev` local | Não existe |
| Branch `dev` no origin | Não existe; `git ls-remote --heads origin refs/heads/dev` retornou vazio com sucesso |
| Remote | `origin` aponta para `https://github.com/pedrogles/converx.git` |

Após a criação dos documentos, ficaram não rastreados: `AGENTS.md`, `MIGRATION_PLAN.md` e `MIGRATION_STATUS.md`.

### Estado atual após aprovação

| Item | Resultado |
|---|---|
| Branch atual | `chore/migration-baseline` |
| Base da branch | `dev` local em `7aa2e22` |
| Branch `dev` local | Criada a partir de `main` após `git fetch --prune` |
| Branch `dev` no origin | Continua inexistente |
| Commits locais | Criados com Conventional Commits após autorização |
| Push ou merge | Não executados |

## 3. Diagnóstico de segurança

- `.env` estava rastreado pelo Git no baseline inicial.
- `.env` não estava coberto pelas regras iniciais do `.gitignore`.
- O código usa uma variável `VITE_*` na aplicação cliente para compor a URL do provedor.
- Uma credencial incluída nessa URL deve ser considerada exposta se a aplicação já foi publicada ou se o arquivo foi enviado ao repositório.
- O conteúdo e o valor do `.env` não foram lidos, impressos ou copiados.
- Na branch atual, `.env` foi removido somente do índice e permanece presente localmente.
- `.env`, `.env.local` e `.env.*.local` agora possuem regras explícitas no `.gitignore`.
- Remover o arquivo do índice não remove o segredo do histórico. A ação imediata recomendada ao usuário é revogar a credencial legada e criar outra para uso server-only.
- Nenhuma reescrita de histórico está proposta sem autorização explícita.
- A branch de baseline cria `.env.example` apenas com nomes de variáveis e placeholders seguros.

## 4. Arquitetura legada confirmada

- React 18 + Vite + JavaScript/JSX.
- React Router com página principal e wildcard que reutiliza a mesma página.
- React Context busca códigos de moedas no cliente.
- Axios chama o provedor externo diretamente do navegador.
- React Hook Form valida apenas presença e um padrão numérico básico.
- Tailwind CSS 3 e componentes utilitários próprios.
- Google Analytics carregado diretamente em `index.html`.
- Rewrite SPA global em `vercel.json`.
- Não existem scripts atuais para typecheck, testes unitários ou E2E.

## 5. Riscos funcionais confirmados no código

- `value.match(/\(([^)]+)\)/)[1]` pode lançar exceção para texto fora do `datalist`.
- Quantidade com vírgula é aceita, mas não é normalizada antes da chamada externa.
- Erros da conversão não geram feedback visual.
- O resultado anterior pode permanecer visível depois de uma tentativa inválida ou falha.
- Não há estado explícito de idle, loading, success e error.
- Envios concorrentes podem produzir resposta obsoleta.
- A lista de moedas não possui estado de erro ou retry.
- O resultado vazio é renderizado antes da primeira conversão.
- O fallback de `Suspense` não cobre o carregamento real do contexto.
- A rota wildcard impede uma 404 real.
- A SPA oferece pouco HTML inicial para SEO.
- O analytics legado não possui estratégia explícita de privacidade/consentimento.
- `src/services/exchageAPI.js` contém erro de grafia no nome.

## 6. Validações executadas

### `npm run lint`

Resultado: **falhou**.

- 41 erros e 0 warnings.
- Principais categorias: props sem validação, `displayName` ausente em componentes com `forwardRef` e quatro ponto-e-vírgulas excedentes.
- Nenhuma correção automática foi executada.
- Reexecutado em `chore/migration-baseline` com o mesmo resultado legado.

### `npm run build`

Resultado: **passou**.

- Vite 5.1.4 transformou 108 módulos.
- JavaScript gerado: 224,64 kB; 76,50 kB gzip.
- CSS gerado: 8,59 kB; 2,44 kB gzip.
- Aviso de sintaxe CSS: ponto-e-vírgula inesperado proveniente de `src/index.css`.
- Aviso de base Browserslist/caniuse-lite desatualizada.
- Reexecutado em `chore/migration-baseline` e concluído com sucesso.

### Verificações do ambiente

- `git ls-files -- .env` não retorna o arquivo no estado novo do índice.
- `git check-ignore -v --no-index .env` confirma a regra explícita de `.gitignore`.
- O arquivo `.env` permanece presente localmente.
- `.env.example` contém somente `EXCHANGE_RATE_API_KEY` com placeholder e a URL pública canônica esperada.

### Quality gates ausentes

- `npm run typecheck`: script inexistente.
- `npm run test`: script inexistente.
- `npm run test:e2e`: script inexistente.

## 7. Decisões técnicas registradas

- Next.js App Router será a única aplicação final; Vite não será mantido permanentemente.
- A página será Server Component por padrão e o limite cliente ficará restrito ao conversor interativo.
- A integração do provedor será server-only, via Route Handler e `fetch` nativo.
- A fundação Next incluirá uma fronteira mínima de servidor para não criar uma etapa intermediária que exponha credenciais.
- Zod validará entradas no servidor e será compartilhado com o cliente apenas quando o módulo não depender de código server-only.
- Analytics será removido durante a migração e só retornará com estratégia de privacidade aprovada.
- Testes serão adicionados ao longo das fases; a branch final de quality gates fechará lacunas e E2E.
- Rollback será feito por branch/PR ou `git revert`, nunca por reescrita destrutiva de histórico sem autorização.

## 8. Trabalho pendente

1. Obter autorização separada antes de publicar `dev` ou a branch de trabalho em `origin`.
2. Abrir e integrar o PR do baseline em `dev` somente após autorização.
3. Criar `feature/nextjs-foundation` a partir de `dev` integrada e atualizada.
4. Executar as demais fases e os PRs descritos no plano.
5. Revogar a credencial legada pelo usuário.
6. Configurar futuramente `EXCHANGE_RATE_API_KEY` e `NEXT_PUBLIC_SITE_URL` na Vercel, somente com autorização.

## 9. Bloqueios e aprovações atuais

- A credencial legada deve ser revogada externamente; essa ação não será realizada sem autorização e acesso apropriados.
- Push, merge, tag e release continuam sem autorização.
- O avanço para a próxima branch depende da integração autorizada do baseline em `dev`.

## 10. Commits locais da etapa

```text
c908158 chore(repo): secure local environment files
f4bb23d docs(repo): add migration workflow guidelines
191d173 docs(migration): record migration baseline
```

Uma atualização documental final registra a conclusão local da etapa sem alterar a aplicação.
