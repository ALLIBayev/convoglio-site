# ConVoglio ONLUS — sito

Sito statico in [Astro](https://astro.build), ospitato su GitHub Pages, con editor [Pages CMS](https://pagescms.org) per i testi.

## Pagine

| Percorso | Contenuto |
|---|---|
| `/` | Home: chi siamo, progetti, eventi, sostienici, network |
| `/progetti/` e `/progetti/<nome>/` | Tutti i progetti e una pagina per ciascuno |
| `/progetti/uspr-cirillico/` · `.../ru/` · `.../en/` | USPR Cirillico in italiano, russo e inglese (`/cirillico/` rimanda qui) |
| `/organizzazione/` · `/contatti/` · `/sostienici/` · `/iscrizioni/` · `/documenti/` | Pagine con gli stessi indirizzi del vecchio Google Site |
| `/eventi/` e `/eventi/<nome>/` | Archivio eventi |
| `/privacy/` | Informativa privacy (nessun cookie) |

I vecchi indirizzi `/home` e `/progetti/asd-san-paolo-torino/...` sono reindirizzati (vedi `redirects` in `astro.config.mjs`).

## Dove sono i testi

Tutto il contenuto è fuori dal codice, così si modifica dall'editor:

- `src/content/settings/site.json`: contatti, codice fiscale, IBAN / Satispay / PayPal, domanda di ammissione, documenti
- `src/content/settings/home.json`: testi della home
- `src/content/settings/network.json`: partner e loghi
- `src/content/projects/*.md`: un file per progetto
- `src/content/events/*.md`: un file per evento
- `src/content/cirillico/{it,ru,en}.json`: pagina Cirillico
- `public/uploads/`: foto e loghi caricati dall'editor (meglio caricare JPG/WebP sotto 500 KB, lato lungo ~1600 px)
- `public/brand/`: logo ConVoglio (autobus) ritagliato e ottimizzato

Se un campo è vuoto (foto, IBAN, PayPal…), il sito non mostra un buco: mette un riquadro con il logo o nasconde il pulsante.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Pubblicazione

1. Repository nell'organizzazione GitHub di ConVoglio → **Settings → Pages → Source: GitHub Actions**.
2. Ogni push su `main` pubblica il sito (`.github/workflows/deploy.yml`).
3. Senza variabili il sito si pubblica come anteprima su `https://<account>.github.io/<repo>/` (non indicizzata da Google).
4. Variabili del repository per il lancio (**Settings → Secrets and variables → Actions → Variables**):
   - `SITE_URL` = `https://www.associazioneconvoglio.it` (per canonical, sitemap, anteprime link)
   - `BASE_PATH` = vuoto con il dominio proprio; `/<nome-repo>/` solo per un'anteprima su `*.github.io/<nome-repo>/`.

### Dominio su Aruba

1. GitHub: **Settings → Pages → Custom domain** → `www.associazioneconvoglio.it`. Poi aggiungere `public/CNAME` con lo stesso valore.
2. Aruba → Gestione DNS:
   - eliminare i record di Google Sites (`www` → `ghs.googlehosted.com` e gli A di Google);
   - A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
   - CNAME `www` → `<organizzazione>.github.io`;
   - **non toccare i record MX** (email).
3. Dopo il certificato: **Enforce HTTPS**.
4. Google Search Console: verificare il dominio e inviare `sitemap-index.xml`.

Per tornare a Google Sites basta rimettere i vecchi record su Aruba e ricollegare il dominio dal Google Site.

## Monitoraggio errori

Sentry (progetto `saldr/convoglio-site`, dati in UE) riceve gli errori JavaScript dei visitatori. È attivo solo nei build con `PUBLIC_SENTRY_DSN` (il workflow lo imposta). Niente IP, niente cookie, niente tracing.

## Editor (Pages CMS)

1. Andare su [app.pagescms.org](https://app.pagescms.org) e accedere con GitHub.
2. Scegliere il repository: compaiono le sezioni Progetti, Eventi, Home page, Contatti e donazioni, Network, Cirillico.
3. Modificare, salvare: il sito si aggiorna da solo in circa un minuto.

La configurazione è in `.pages.yml`.
