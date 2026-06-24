# Klini Landing — Handoff para Dev

Protótipo estático (HTML/CSS/JS) do site institucional Klini, hospedado no GitHub Pages.
Destino: **reconstrução em React + Klini DS** (`@klini-saude/ds-react`, React 18 + Shadcn/UI + Tailwind).

Este doc descreve o que já existe, os padrões fechados e o mapeamento pro stack React, pra que a remontagem comece adiantada.

---

## 1. Como rodar

Site 100% estático, sem build. Qualquer servidor de arquivos serve:

```bash
# na raiz do repositório
python -m http.server 3456
# abre http://localhost:3456/index.html
```

Deploy: push na `main` → GitHub Pages (`klini-paulalarosa.github.io`).

---

## 2. Estrutura de arquivos

```
/                         raiz = páginas
  index.html              home (estilos inline próprios; NÃO linka klini.css)
  planos.html             ┐
  teleconsulta.html       │
  desconto-farmacia.html  │ páginas com header em U (page-hero--split)
  sobre.html              │ — linkam assets/klini.css + <style> local
  token-digital.html      │
  espaco-corretor.html    ┘
  ouvidoria.html          ┐
  rede-credenciada.html   │
  portal-prestador.html   │ páginas de conteúdo/legais
  quero-me-credenciar.html│ — header transparente sobre hero teal (page-hero base)
  negocie-sua-divida.html │
  transparencia.html      │
  idss.html / termos-de-uso.html / politica-de-privacidade.html /
  codigo-de-conduta.html  ┘
assets/
  klini.css               design system do protótipo (tokens, header, hero, botões, cards)
  reveal.js               scroll-reveal (IntersectionObserver) das seções
  campanha/*.webp         fotos dos heroes e cards de plano
  fotos headers/*.webp    fotos dos heroes (NÃO commitar o vídeo-fonte; só webp)
  fonts/                  Objective (UI) + Newsreader (serif de acento) self-hosted
```

> **Importante:** `index.html` é auto-contido (estilos no próprio `<style>`); as demais páginas dependem de `assets/klini.css`. Ao migrar, tratar `klini.css` como a fonte de verdade do DS do protótipo.

---

## 3. Design tokens (`:root` em klini.css) → Tailwind / DS

Mapear estes para o theme do Tailwind / tokens publicados do Klini DS. **Nunca usar hex solto no React — usar o token do DS.**

| Token CSS | Valor | Papel | Equivalente DS |
|---|---|---|---|
| `--teal` | `#259591` | primária da marca; texto e ícones | `teal-500` |
| `--sea` | `#6AA7AE` | secundária / info | `sea` |
| `--orange` | `#CD7925` | warning / CTA quente | `orange` |
| `--coral` | `#E05759` | erro/negado — **só como fundo + texto branco** (ver §8) | `coral-500` |
| `--ink` / `--ink2` | `#111` / `#1C1C1E` | neutros escuros | `ink` |
| `--text` / `--muted` | `#333` / `#666` | corpo / secundário | `text` / `muted` |
| `--off` | `#F5F9FF` | fundo de seção alternado | `surface` |
| `--bd-l` | `rgba(4,42,38,.08)` | borda clara | `border` |
| `--r` / `--r-s` | `16px` / `10px` | raio padrão / pequeno | `radius-lg` / `radius-md` |
| `--grad-cool` | `135deg #259591→#6AA7AE` | hero teal | gradiente da marca |
| `--grad-warm` | `135deg #CD7925→#E05759` | CTA `.btn-teal` (sim, é warm) | gradiente CTA |
| `--grad-brand` | `90deg teal→sea→orange→coral` | acento de marca (linha removida do header) | — |

**Tipografia:** `Objective` (corpo, UI, títulos — pesos 400/500/700/800) + `Newsreader` (serif, só acento de header/editorial). Inter **não** se aplica aqui (é só do Figma). Ícones: PrimeIcons (`pi pi-*`) no protótipo — no React, trocar pelos ícones do DS.

**Escala de título:** `.h1` 800, clamp(2.2–3.6rem); `.h2` 400 com `strong` 800 colorido; `.eyebrow` .72rem 700 uppercase, tracking .18em.

**Breakpoints usados:** `1024px` (grids 3→2 col), `860px` (hero --split empilha), `760px` (ajustes de seção), `600px` (mobile 1 col).

---

## 4. Padrões compartilhados (viram componentes no React)

| Bloco | Classe(s) | Vira no DS React |
|---|---|---|
| Container | `.wrap` (max 1200, pad 24) | layout `Container` |
| Seção | `.sec`, `.sec--off` (fundo pontilhado) | `Section` / wrapper com prop `muted` |
| Header fixo | `.bar` + `.bar.solid` | `Navbar` (ver §6) |
| Eyebrow | `.eyebrow` | `Eyebrow`/`Overline` (cor = cor do `<strong>` do título da seção) |
| Botão CTA | `.btn .btn-teal` (gradiente warm), `.btn-ghost`, `.btn-outline` | `Button` (variants `primary`/`ghost`/`outline`) |
| Card | `.canal` (branco, borda, hover teal) | `Card` (hover eleva + borda teal) |
| Hero em U | `.page-hero--split` | `PageHero` (ver §5) |
| Reveal on scroll | `js/reveal.js` + `.gs` | hook `useReveal` / `framer-motion` whileInView |

---

## 5. Hero em U (`page-hero--split`) — padrão fechado

Header das 6 páginas de produto. Estrutura:

```html
<section class="page-hero page-hero--split">
  <div class="phs-media"><img class="ph-photo" src="…" alt="…"></div>
  <div class="wrap">
    <div class="phs-text">
      <span class="eyebrow">…</span>
      <h1 class="h1">… <strong>…</strong></h1>
      <p>…</p>
      <a class="ph-cta" href="#…">… <i class="pi pi-arrow-right"></i></a>
    </div>
  </div>
</section>
```

Geometria do painel da foto (`.phs-media`), decidida com a Paula — **preservar no React**:

- Ancorado no canto **superior-direito**, sangra até a borda direita (`right:0`).
- **Topo, direita, base e lado esquerdo retos**; arredondado **só no canto inferior esquerdo**: `border-radius: 0 0 0 clamp(150px,18vw,240px)`.
- Largura `clamp(520px,50vw,720px)`; altura do hero `min-height: clamp(440px,46vw,560px)`.
- A **foto** começa em `top:56px` no desktop (`height: calc(100% - 56px)`) pra não ficar atrás do header fixo e cortar as cabeças. No mobile (≤860px) reseta pra `top:0`, painel empilha abaixo do texto.
- `padding-right` do `.wrap` reserva espaço pro painel: `clamp(460px,58vw,740px)`.

**Enquadramento da foto por página** (`object-position` — cada foto tem o sujeito numa posição diferente; manter ao trocar a imagem):

| Página | Imagem | `object-position` |
|---|---|---|
| planos | `campanha/hero-ouvidoria.webp` | `96% 30%` |
| teleconsulta | `fotos headers/GettyImages-1390197865.webp` | `10% 35%` |
| desconto-farmacia | `fotos headers/GettyImages-1479999063.webp` | `30% 35%` |
| sobre | `campanha/hero-sobre.webp` | `50% 35%` |
| token-digital | `fotos headers/hero-token.webp` | `48% 35%` |
| espaco-corretor | `fotos headers/GettyImages-1481859667.webp` | `50% 35%` |

> No React, isso vira um `<PageHero variant="split" image=… focalPoint="96% 30%" eyebrow title cta />`.

---

## 6. Header / menu (`.bar`)

- `.bar` = fixo, transparente, logo branco (`filter:invert`), links brancos. Usado sobre **hero teal escuro** (páginas de conteúdo/legais) — vira sólido no scroll via `bar.classList.toggle('solid', scrollY>50)`.
- `.bar.solid` = fundo branco, logo/links escuros, sombra.
- Páginas com hero em U (fundo claro) carregam `class="bar solid"` **fixo** (sempre branco) e **não** têm o toggle de scroll — senão ficariam transparentes/invisíveis sobre o fundo branco.
- A linha de 3px com gradiente da marca no topo do header foi **removida** (gerava um “verde no canto”).

> No React: `Navbar` com prop `mode="solid" | "transparent-until-scroll"`. Páginas de fundo claro → `solid`. Páginas com hero teal → `transparent-until-scroll`.

---

## 7. Componentes/blocos → mapeamento Klini DS React

| Bloco do protótipo | Componente DS React sugerido | Observações |
|---|---|---|
| `.btn-teal` / `.ph-cta` | `Button variant="primary"` | gradiente warm + lift no hover |
| `.btn-outline` | `Button variant="outline"` | texto teal |
| `.canal` (canais de atendimento) | `Card` | branco; hover = borda teal + sombra + leve wash teal (`::after`) |
| Accordion de planos (`.plans-acc`) | `Accordion`/`Tabs` horizontal | expande via `flex-grow`; foto entra com fade |
| Pills de status (planos: “Ambulatorial+Hospitalar”) | `Badge`/`StatusPill` | teal=ok, coral=negado, amber=pendente, slate=em-processo |
| Footer | `Footer` | colunas Institucional / Atendimento / Transparência |
| WhatsApp flutuante (`.wa-btn`) | `FloatingAction` | `aria-label` já presente |

Tokens de cor: consumir a **library publicada do DS** (não recriar hex). Status: em-análise/auditoria = **slate**, sucesso = teal, warning = orange, info = sea.

---

## 8. Acessibilidade & semântica — estado e pendências

Já OK:
- `lang="pt-BR"` em todas as 17 páginas.
- Imagens de hero com `alt` descritivo.
- Botões só-ícone com `aria-label` (hambúrguer, WhatsApp).
- Contraste do corpo: `--text` #333 (12.6:1) e `--muted` #666 (5.7:1) sobre branco — passam AA.

Pendências pro dev resolver na remontagem:
1. **Coral como texto falha contraste.** `--coral #E05759` sobre branco = **3.62:1** — passa só para texto grande (≥24px), **reprova** para texto pequeno (eyebrows coral em `#canais-atendimento` e farmácia). Regra do DS: coral só como **fundo + texto branco**. → Para eyebrows/realces pequenos, usar um coral mais escuro (coral-700/800) ou voltar ao teal. Os `<strong>` grandes de `<h2>` em coral passam (são grandes), mas confirmar caso a caso.
2. **Ícones decorativos** (`<i class="pi …">` dentro de botões/títulos) devem receber `aria-hidden="true"` — hoje não têm.
3. **Hierarquia de headings:** garantir um único `<h1>` por página (o do hero) e não pular níveis nas seções.
4. **Foco visível:** o hero em U tem `:focus-visible`; estender o padrão de anel de foco a todos os interativos no React.
5. **`prefers-reduced-motion`:** o `reveal.js` e o scroll-smooth devem respeitar (desativar animação) — adicionar no React.

---

## 9. Convenções

- Cores **sempre** via token do DS (nunca hex solto). Coral nunca como texto sobre branco (§8).
- Logo Klini: clonar, nunca reinstanciar do zero.
- Voz de copy: direta e afirmativa, frases curtas. Evitar travessões decorativos, tri-paralelos e jargão de pitch.
- Não commitar vídeos-fonte (`assets/fotos headers/*.mp4`, `campanha/GettyImages-*.mp4`) nem `header.mp4` (94MB) — só versões webp/comprimidas.
- Fontes self-hosted por LGPD (sem CDN do Google Fonts — não vazar IP de visitante).
