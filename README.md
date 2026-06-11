# Klini Saúde — Landing Page

> **Site no ar →** https://klini-paulalarosa.github.io/

Site institucional e de conversão da **Klini Saúde** (ANS 42.202-9), plano de saúde com rede própria no Rio de Janeiro.

---

## Visão geral

Site **estático** (HTML/CSS/JS), sem framework e sem etapa de _build_, publicado pelo **GitHub Pages** direto da branch `main`. Os componentes visuais são próprios (custom), feitos à mão em CSS — a landing **não** usa PrimeNG (que é Angular); aproveita da família Prime apenas o **PrimeIcons** (fonte de ícone). Isso preserva as animações e interações próprias do site.

| Item | Detalhe |
|---|---|
| Tipo | Static HTML/CSS/JS — sem framework, sem build |
| Deploy | GitHub Pages (branch `main`) — publica automático no push |
| Ícones | PrimeIcons v7 (CDN jsDelivr) |
| Mapa da rede | Leaflet.js 1.9.4 (CDN unpkg) — em `rede-credenciada.html` |
| Tipografia | Objective (self-hosted em `assets/fonts/`, licença OFL) + Merriweather (Google Fonts) |
| Animação de entrada | `assets/reveal.js` — scroll reveal com IntersectionObserver |
| Estilos | `assets/klini.css` + blocos `<style>` por página |

---

## Estrutura de arquivos

```
klini-landing/
├── index.html                  # Home
├── sobre.html                  # A Klini (institucional + sede + Rede Casa)
├── planos.html                 # Planos (flyers + simulador de perfil)
├── teleconsulta.html           # Telemedicina
├── rede-credenciada.html       # Busca de rede + mapa Leaflet
├── desconto-farmacia.html      # Rede de farmácias parceiras
├── token-digital.html          # Token digital (2FA do app)
├── ouvidoria.html              # Ouvidoria
├── negocie-sua-divida.html     # Negociação de dívida
├── quero-me-credenciar.html    # Cadastro de prestador
├── transparencia.html          # Portal da transparência (ANS)
├── idss.html                   # Índice de Desempenho (IDSS)
├── codigo-de-conduta.html      # Código de conduta
├── politica-de-privacidade.html
├── termos-de-uso.html
└── assets/
    ├── klini.css               # Estilos globais + tokens
    ├── reveal.js               # Scroll reveal (IntersectionObserver)
    ├── logo-klini.webp, k-mark.svg
    ├── campanha/               # Fotos/vídeos da campanha (heroes, planos, LCA)
    ├── farmacias/ · parceiros/ · hospitais/ · token/   # Logos e imagens de seções
    └── flyer-*.png             # Pôsteres dos planos
```

> A estrutura é **flat** de propósito (padrão de site GitHub Pages). Mover páginas para subpastas quebraria os links internos.

---

## Design — tokens da marca

Alinhado às cores do **Klini DS** (o DS completo `@klini-saude/ds`, com prefixo `kln`, é Angular/PrimeNG e vive nos **portais** — aqui só reaproveitamos as cores).

```css
--teal:   #259591   /* primária */
--sea:    #6AA7AE   /* secundária */
--orange: #CD7925   /* CTA / destaque quente */
--coral:  #E05759   /* destaque */
```

**Assinatura visual:** o "K" da marca (SVG branco/teal) e arcos/semicírculos em SVG aparecem nos heroes e cards. Os heroes das páginas com beneficiário usam um **card flutuante com "balão de fala"** apontando para a pessoa.

---

## Informações institucionais

| Campo | Valor |
|---|---|
| Razão social | Klini Planos de Saúde Ltda. |
| CNPJ | 34.539.000/0001-86 |
| ANS | 42.202-9 |
| SAC 24h | 0800 021 0320 |
| Ouvidoria | 0800 021 0320 |
| WhatsApp | (21) 3055-0790 |
| Sede administrativa | Av. Estrada Francisco da Cruz Nunes, 5982 – Loja 204, Piratininga, Niterói – RJ |
| Atendimento presencial | Av. das Américas, 3200 – Sala 114, Barra da Tijuca, Rio de Janeiro – RJ |

---

## Desenvolvimento local

Não há build. Suba um servidor HTTP estático na raiz:

```bash
python -m http.server 8080     # Python
npx serve .                    # Node
```

Acesse `http://localhost:8080`.

---

## Deploy (GitHub Pages)

Publica automaticamente ao dar `push` na `main` de `klini-paulalarosa/klini-paulalarosa.github.io`. O Pages reconstrói em ~1–2 min.

```bash
git add <arquivos>             # adicionar por caminho (evita subir rascunho)
git commit -m "feat: ..."      # Conventional Commits em PT-BR
git push origin main
```

Site: **https://klini-paulalarosa.github.io/**

---

## Convenções

- **Commits:** Conventional Commits em PT-BR (`feat:`, `fix:`, `chore:`, `docs:`), agrupados por contexto. Sem commits de WIP.
- **Rascunhos:** arquivos `_*.html` e `_*.py` são ignorados pelo Git (`.gitignore`) — use o prefixo `_` para experimentos locais.
- **Componentes:** custom em CSS. Para consistência com a marca, alinhar pelos tokens acima — não migrar para PrimeNG (não roda em site estático).

---

## Pendências conhecidas

- [x] Fonte **Objective** hospedada no repo (`assets/fonts/`, licença OFL) — `@font-face` local
- [ ] Apontar os links de **IDSS** e **Transparência** para os documentos/PDFs oficiais da ANS (hoje vão para a homepage — ver comentários `TODO` no HTML)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] `sitemap.xml` e `robots.txt`

---

*Klini Saúde · 2026*
