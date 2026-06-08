# Klini Saúde — Landing Page

> **Preview ao vivo →** https://klini-paulalarosa.github.io/

Landing page institucional e de conversão para a **Klini Saúde** (ANS 42.202-9), plano de saúde com rede própria no Rio de Janeiro.

---

## Visão Geral

Site estático de alta performance, sem dependências de servidor, deployado via **GitHub Pages**. Todo o stack é carregado por CDN para garantir disponibilidade e velocidade.

| Item | Detalhe |
|---|---|
| Tipo | Static HTML/CSS/JS — sem framework |
| Deploy | GitHub Pages (branch `main`) |
| Fontes | Objective (CDN Klini) + Merriweather (Google Fonts) |
| Animações | GSAP 3.12.5 + ScrollTrigger |
| Partículas hero | Three.js 0.165.0 (ES module) |
| Mapa de unidades | Leaflet.js 1.9.4 |
| Ícones | PrimeIcons v7 |

---

## Estrutura de Arquivos

```
klini-landing/
├── index.html               # Landing page principal
├── unidades.html            # Mapa interativo das 19 unidades Klini no RJ
├── sobre.html               # Página institucional
├── planos.html              # Detalhamento dos 6 planos
├── teleconsulta.html        # Página da telemedicina
├── rede-credenciada.html    # Rede de prestadores
├── ouvidoria.html           # Canal de ouvidoria
├── transparencia.html       # Documentos regulatórios ANS
└── politica-de-privacidade.html
```

---

## Seções da Landing Page (`index.html`)

| # | Seção | ID | Descrição |
|---|---|---|---|
| 1 | Nav | — | Barra fixa com logo, telefone e WhatsApp |
| 2 | Hero | `#hero` | Headline + CTA card + partículas Three.js |
| 3 | Trust Strip | — | 4 contadores animados (unidades, planos, telemedicina, farmácias) |
| 4 | Como Funciona | `#como-funciona` | 3 passos da jornada |
| 5 | Planos | `#planos` | 4 cards de plano com features |
| 6 | Diferenciais | `#diferenciais` | 6 cards de diferencial competitivo |
| 7 | Rede Casa | `#rede-casa` | Carrossel de 9 hospitais HC com endereços |
| 8 | Por Que Klini | `#por-que-klini` | Tabela comparativa vs. planos convencionais |
| 9 | Teleconsulta | `#teleconsulta` | Mockup de celular com animação de zoom |
| 10 | Farmácia | `#farmacia` | 7 redes de farmácias credenciadas com logos e links |
| 11 | Linhas de Cuidado | `#linhas-cuidado` | 4 programas: Crônicos, Gestantes, Puericultura, Oncologia |
| 12 | CTA Final | `#cta` | Botão de conversão para simulador de planos |
| 13 | Footer | — | Links, contatos, ANS, CNPJ |

---

## Design System

Segue os tokens do **@klini-saude/ds v2.0.0** (prefixo `kln`):

```css
--teal:   #259591   /* verde-azulado primário */
--sea:    #6AA7AE   /* verde-azulado secundário */
--orange: #CD7925   /* laranja CTA */
--coral:  #E05759   /* coral destaque */
--ink:    #06090F   /* fundo escuro profundo */
--ink2:   #0C1422   /* fundo escuro secundário */
--off:    #F5F9FF   /* fundo claro */
```

**Arcos de marca** — SVG semicírculos tipo "C" (`stroke-linecap: round`, `stroke-width: 22–42px`) em coral/teal/sea, presentes nas seções hero, diferenciais, rede-casa e CTA.

---

## Informações Institucionais

| Campo | Valor |
|---|---|
| Razão Social | Klini Planos de Saúde Ltda. |
| CNPJ | 34.539.000/0001-86 |
| ANS | 42.202-9 |
| SAC 24h | 0800 021 0320 |
| Ouvidoria | 0800 021 0320 |
| WhatsApp | (21) 3055-0790 |
| Sede | Av. das Américas, 3200 — Sala 114, Barra da Tijuca, RJ |
| Simulador | https://site-dev.klinisaude.com.br/planos/#cotacao |

---

## Desenvolvimento Local

Não há processo de build. Basta abrir `index.html` num servidor HTTP local:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Acesse em `http://localhost:8080`.

---

## Deploy (GitHub Pages)

O site é deployado automaticamente ao fazer push na branch `main` do repositório `klini-paulalarosa/klini-paulalarosa.github.io`.

```bash
git add .
git commit -m "feat: descrição da mudança"
git push origin main
```

O GitHub Pages publica na raiz do domínio pessoal: **https://klini-paulalarosa.github.io/**

---

## Status do Projeto

- [x] Landing page com todas as seções
- [x] Mapa interativo de unidades (Leaflet.js)
- [x] Carrossel de hospitais da Rede Casa
- [x] Animações GSAP com ScrollTrigger
- [x] Seção Linhas de Cuidado (Crônicos · Gestantes · Puericultura · Oncologia)
- [x] Logos de farmácias com links externos
- [x] Mockup de teleconsulta com animação de zoom
- [x] Páginas satélite: planos, teleconsulta, rede, ouvidoria, transparência, privacidade
- [ ] Integração com CMS para atualização de conteúdo
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Sitemap.xml e robots.txt

---

*Desenvolvido para Klini Saúde · © 2026*
