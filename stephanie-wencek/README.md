# Stephanie Wencek – Website-Relaunch (Entwurf)

Neues, modernes One-Page-Design für stephaniewencek.com. Statisches HTML/CSS/JS ohne Framework und ohne Build-Schritt. Läuft auf jedem Webspace.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite: Hero, Haltung, Leistungen, Portfolio, Über mich, Netzwerk, Kontakt |
| `impressum.html` | Impressum und Datenschutzerklärung |
| `assets/css/style.css` | Gesamtes Design (Farben und Schriften als Variablen in `:root`) |
| `assets/js/main.js` | Slideshow, Portfolio-Filter, Lightbox, DE/EN-Umschaltung, Kontaktformular |
| `assets/js/projects.js` | Alle 66 Projekte mit 369 Bildern und Credits, aus der alten Seite übernommen |
| `assets/fonts/` | Bodoni Moda und Hanken Grotesk, lokal eingebunden (kein Google-Fonts-Abruf, DSGVO) |

## Lokal ansehen

```bash
cd stephanie-wencek
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Vor dem Livegang

1. **Bilder umziehen:** Die Bilder werden zurzeit direkt von `https://www.stephaniewencek.com/` geladen.
   Kopieren Sie die Ordner `images/` und `items/` vom alten Server in diesen Ordner.
   Tragen Sie dann in `assets/js/main.js` bei `MEDIA_BASE` den Wert `''` ein.
   In `index.html` ersetzen Sie `https://www.stephaniewencek.com/` durch relative Pfade.
2. **Höher aufgelöste Vorschaubilder:** Die alten Thumbnails sind nur 350 px breit.
   Für scharfe Darstellung auf Retina-Displays sind Vorschaubilder mit etwa 800 px Breite empfehlenswert.
3. **Portfolio-PDF** (`SW_Portfolio.pdf`) mit umziehen.
4. **Rechtstexte prüfen lassen.** Sie wurden auf DDG und MStV aktualisiert, ersetzen aber keine Rechtsberatung.

## Inhalte pflegen

Ein neues Projekt fügen Sie in `assets/js/projects.js` als Eintrag hinzu:

```js
{"t":"Titel","c":"fashion","dir":"items/fashion/17/","th":"17-thumb.jpg","im":["01.jpg","02.jpg"],"cr":[["photo","Name"]]}
```

Für `c` (Kategorie) sind diese Werte möglich: `advertising`, `fashion`, `beauty`, `people`, `projects`.
