---
title: "Hur och varför jag skapat datanist"
pubDate: 2023-09-03T10:30:00.000Z
description: "En motivering och genomgång av mjuk- och hårdvaran som driver denna site."
author: "Martin"
tags: ["astro", "blogg", "data", "teknik"]
layout: "../../layouts/BaseLayout.astro"
---

# Hur och varför jag skapat datanist

Publicerad: 2023-09-03 av Martin

---

När jag började spåna på att skapa en så kallad "personlig hemsida" så hade jag ett antal krav och önskemål. Jag inspirerades mycket av Samuel Skånbergs inlägg om [jakten på den fria bloggen](https://samuels.bitar.se/jakten-pa-bloggen/) som talar mycket om vikten av att äga sina egna plattformar, bland annat.

Kortfattat kan jag säga att jag ville ha en plattform fri från reklam och hålla kostnaderna nere. Loopia tar 189 kr om året för en *.se-domän. 89 kr första året. Allt annat som behövdes var min Raspberry för hosting och en dator att jobba på för att utveckla själva sidan, men de sakerna hade jag redan. Annars är en Raspberry Pi  ett bra val (som inte kostar hutlöst mycket) för enklare hosting då de inte heller är dyra att ha igång. 

Mina krav/önskemål annars löd, i korthet:

1. Enkelhet. Webben idag är långsam och omständig. Det är dåligt. Hemsidor laddar ner stora mängder script för att kunna visa lite text och bilder, vilket (i regel) ger dålig prestanda och gör livet surt för de som inte vill ha onödig kod körandes i sina webbläsare. Jag ville ha en hemsida som var enkel att bygga, utöka, och underhålla, men framförallt att <strong>använda</strong>.

2. "Self-hosted". Jag vill kunna drifta min egen sida utan några större ståhej. Därför valde jag en statisk sida fri från JavaScript. Åtminstone på klientsidan :) Allt som behövs då är i princip lite filutrymme på en enhet med internetåtkomst och en webbserver (t. ex. [nginx](https://www.nginx.com/)).

3. RSS-kompabilitet. Trots att tanken inte är att primärt driva en "blogg", så är det hövligt (och praktiskt) att stödja detta. Det gör det också möjligt att (kanske på sikt) integrera med tjänster såsom Mastodon för att enklare dela med sig av innehåll som skrivs här.

4. Markdown-stöd. Att skapa nytt innehåll ska vara lätt och inte kräva en CMS eller en WYSIWYG-editor. Med markdown är allt som behövs en texteditor. Inlägget du läser nu är skrivet i 100% markdown-syntax.

5. Stöd för flera språk. Detta var kanske inte ett krav. Mer en s.k. "nice to have". Nåväl!

## Mjukvara

Med dessa krav i åtanke funderade jag lite. Har använt SvelteKit mycket innan för att utveckla s.k. "webb-appar" men det jag hade i åtanke nu var inte så mycket en "app" som det var en traditionell "hemsida". Trots att **SvelteKit är ett fantastiskt verktyg** för många ändamål (och kan med fördel användas för statiska hemsidor också) så beslöt jag mig ändå för att kolla vidare.

Ett annat alternativ jag jobbat med tidigare är Pythonramverket Django men även det kändes för stort för vad jag ville åstadkomma.

Hade hört talas om [Astro](https://astro.build/) innan i sammanhang då det talats om statiska sidor som var "content focused".

### Astro (och Node)

Enligt Astros egen hemsida hävdar de, att det primärt **inte** används för att utveckla "applikationer" och att en i sådana fall ska använda något som exempelvis Next eller Sveltekit. Fokus är innehållsfokuserade, snabba hemsidor med noll Javascript som standard. Detta lät lovande. Efter att ha undersökt deras [Build a blog](https://docs.astro.build/en/tutorial/0-introduction/)-guide och konstaterat att det verkar uppfylla de krav jag hade fastställt så bestämde jag mig för att testa. Med detta sagt hade jag redan Node installerat och klart på min arbetsdator så inga extra steg behövde göras heller.

_Bonus: För eventuella Node-utvecklare rekommenderar jag **starkt** att ni använder er utav Node Version Manager 
([Linux](https://github.com/nvm-sh/nvm)/[Windows](https://github.com/coreybutler/nvm-windows)). Det underlättar hanteringen av att ha flera versioner av Node installerat **oerhört** mycket._

### Nginx

Nginx fick bli valet för webbserver. Då jag redan använde den som reverse proxy för mitt hemnätverk för lite andra grejer föll det sig ganska naturligt. Hade inga egentliga krav på denna bit. Men nginx är populär och lätt att konfigurera.

Så mycket mer än så behövs faktiskt inte.

### Hårdvara

Då jag redan hade en Raspberry Pi snurrandes här hemma för lite andra ändamål bestämde jag mig för att använda denna som host, dvs där hemsidan bor. Så mycket mer än så krävdes inte. Utöver en skärmförsedd dator att utföra själva arbetet (utvecklandet) på. Datorn för utvecklingen kör Windows och Pi'n kör Debian Linux.

### Domän

Jag hade redan domänen "datanist.se" registrerad. Det behövs inte nödvändigtvis en egen domän för att selfhosta men det underlättar. Jag använder [Loopia](https://www.loopia.se/) som leverantör men har hört gott om [Njalla](https://njal.la/)  också.

## Själva processen

Jag kommer inte gå in i detalj så mycket på hur man startar eller kodar ett Astroprojekt. Deras hemsida har gott om material för detta och det är inte vad detta inlägg handlar om. Men efter att jag var någorlunda nöjd med "version 1" av min hemsida så körde jag helt enkelt, i min kära terminal, scriptet för att bygga min hemsida:

`npm run build`

Vips så hade jag mappen `dist` som innehöll mappar och html-filer. Även en statisk "favicon" hängde med från Astros håll (som jag ska uppdatera när jag designat en egen logotyp :) 

![Mappstruktur](/images/dist_01.png)

Såhär fint blev det! Svårare än så behöver det inte vara. Nästa steg var att konfigurera `nginx` för att kunna servera filerna till mina användare. Denna körde då på min Pi, med Debian Linux. För er som inte är bekanta med nginx eller debian sedan innan så kan det installeras direkt med det enkla kommandot `apt-get install nginx`. 

**OBS: Notera att ni troligen kommer behöva eleverad användarstatus (root) när ni redigerar dessa mappar. I dessa fall kan man behöva prefixa kommandon med `sudo`**

När installationen är slutförd kommer du ha en mapp under sökvägen `/etc/nginx`. Här bor dina konfigurationsfiler, bland annat. De relevanta mapparna här är `sites-available` samt `sites-enabled` (skillnaden mellan dem kommer senare).

**Det kan vara så att det finns lite "default"-konfigurationer här att spana på om du har en färsk install!**

Jag skapar min konfiguration `datanist` i mappen `sites-available` som en textfil via kommandot `nano datanist`. Detta ger mig en tom konfiguration. 

Såhär kan en simpel nginx-konfiguration se ut.

```
server {
        listen 80;
        root                            /var/www/html; # här lägger dina filer

        location / {
                try_files $uri $uri/ =404;
        }
}
```

**Notera att detta är OKRYPTERAD HTTP och alla kan läsa trafiken. Det är bara är en "starting point". Ska du exponera din hemsida utåt bör du använda SSL/HTTPS.**

[En bra guide för hur du använder Certbot för SSL i nginx och debian hittar du här](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

Jag tror att på en färsk nginx-installationen ska mappen `/var/www/html` existera och innehålla någon simpel `index.html`-fil. Notera att du inte MÅSTE ha din hemsida här. Men väljer du att ha den någon annanstans, kom ihåg att ändra din nginx-konfiguration.

## Deployment

**Notera att detta steg kan skippas om ni inte hostar på en annan maskin!**

Så nu har vi väl allt som behövs. En httpserver (nginx) och en hemsida som ligger i din `dist`-mapp. Men något saknas ju, nämligen hur vi får dit filerna. Jag bestämde mig för att skapa en särskild användare i mitt system, ansvarig för detta. Detta gjorde jag med kommandot `sudo adduser deployment_user`. Detta skapar användaren `deployment_user`. Den kan egentligen heta mer eller mindre vad som helst. Detta kommando startar en liten "wizard" där du får ange lösenord och lite annat. Ange ett bra lösenord. Resten behövs inte. Sedan kör du 

```
sudo chown deployment_user:deployment_user /var/www/html
sudo chmod 700 /var/www/html
```

Detta gör så att mappen ägs av den nyskapade användaren. Vill man vara extra försiktig kan man skapa ännu striktare begränsningar för sin `deployment_user`. Men det är lite överkurs nu :)

### Varför skapa en ny användare?

Detta steg är kanske inte "strikt" nödvändigt. Men maskinen (i mitt fall min windows-maskin) som ska sköta deployen kommer behöva ha åtkomst till lösenordet för kontot för att kunna överföra filerna. Så då tyckte jag det kändes trevligare att begränsa det till en användare som har begränsad åtkomst, i fall av en lösenordsläcka. 

### Överföra filer

Det finns flera sätt att göra detta på. Ett alternativ är helt enkelt att kopiera över filerna med en grafisk FTP-klient såsom FileZilla. Men hag ville ha en (ganska) automatiserad process, så jag valde att använda mig utav `lftp` som är en command line tool för filöverföring med stöd för bl. a. FTP. Detta är smidigt eftersom man då kan skripta hela processen. Detta steg kräver dock att du har Windows Subsystem for Linux installerat (eller kör någon linuxvariant på din deployment-maskin).

*Har du inte tillgång till WSL får du antingen göra det manuellt eller hitta en annan lösning.*

Om du inte har `lftp` installerat så gör det. Då min WSL kör Debian så kunde jag helt enkelt använda `apt-get install lftp`. Men jag tror `lftp` finns i de flesta större distributionerna, så att använda din Linuxvariants pakethanterare för att installera det borde inte vara något problem.

När detta steg är klart, kör då kommandot `export LFTP_PASSWORD="password"`. Ersätt `password` med lösenordet du valde för din `deployment_user`.

**Notera att detta lösenord lagras i klartext för din specifika användare. Använder du en maskin som flera har tillgång till kan du behöva se över säkerheten kring ditt lösenord, men i mitt fall är det "good enough".**

För att sedan flytta över filerna till maskinen där det hostas, kör kommandot `lftp --env-password sftp://deployment_user@ip_adress/var/www/html -e "mirror -R; bye"`. Steg för steg vad skriptet gör:

- `lftp --env-password`: hämtar din miljövariabel LFTP_PASSWORD som parameter till att köra lftp.
- `sftp://deployment_user@ip_adress/var/www/html`: connectar med user `deployment_user` till ip_adressen angedd och landar dig direkt i mappen `/var/www/html`
- `-e "mirror -R; bye"`: Flaggan -e säger åt lftp att exekvera skriptet `mirror -R` först. Detta "speglar" allt innehåll från din nuvarande mapp (skriptet kör i `dist` där dina byggfiler bor) till din "source"-mapp angiven i IP-adressen tidigare. `bye` avslutar lftp när det kört klart.

Byt ut `ip_adress` mot den faktiska adressen, t. ex. `192.168.0.122`. IP-adressen ska peka på maskinen där du konfigurerade `nginx` och skapade din html-mapp.

När kommandot kört klart borde du kunna se innehållet från mappen `dist` i din mapp `/var/www/html`.

### Automatisera

Om allt funkar kan vi nu skapa ett skript som gör att vi slipper göra det manuellt varje gång. Det vi behöver göra i skriptet är:

1. Köra `npm run build` i projektets katalog
2. Byta till katalogen `dist`
3. Skicka iväg filerna till vår host-maskin med `lftp`

Jag gjorde detta med ett bashscript. *För detta krävs också WSL*. Skapa mappen `scripts` i projektkatalogen. Skapa sedan en fil som heter `deploy.sh` eller dylikt. Jag har en specifik för Windows som jag valt att kalla `deploy_windows.sh`. Detta är nödvändigt för att jag skapat projektet i Windows och då kan jag inte köra `npm run build` rakt av via WSL-terminalen. Skriptet ser ut såhär:

```
#!/bin/bash

# Byt från katalog scripts till rootkatalogen
cd ..

# Kompilera applikationen via npm build
powershell.exe npm run build // ta bort "powershell.exe" från denna rad om du kör linux.

# Byt till dist-katalogen
cd dist/

# Kör lftp-kommandot för att ladda upp till webhservern
lftp --env-password sftp://deployment_user@192.168.0.100/var/www/html -e "mirror -R; bye"
```

I katalogen `scripts` kör du sedan `chmod +x deploy.sh` eller vad du nu döpte ditt skript till. Det gör ditt skript exekverbart. Nu borde du kunna deploya genom att skriva `./deploy`

## Sådär ja

Nu borde allt vara uppe och snurra. Några tankar:

- Jag valde som sagt Astro för detta projekt. Detta gör att jag kan skriva nya inlägg i markdownsyntax och publicera dem med en deploy. Detta är kanske inte helt optimalt, då jag måste "bygga" min hemsida varje gång jag väljer att publicera ett inlägg. Fördelen är att jag slipper använda en extern editor. Kan ändå vara värt att se över en alternativ lösning. Men med den ringa storleken på hemsidan nu så ser jag inte det som ett vidare problem.

- Jag valde att utveckla på en Windows/WSL-maskin och deploya på en Debian-maskin. Jag hade likväl kunnat välja att utveckla och hosta allt på samma maskin, vilket nog hade underlättat eftersom jag sluppit hela FTP-lösningen. Men då hade jag inte lärt mig lika mycket :)

Jag hoppas att det varit roligt och lärorikt att läsa detta, om du klarat dig såhär långt. Under [kontakt](/contact) finns det olika kommunikationskanaler jag huserar, där jag gärna pratar DIY-lösningar för hosting eller annat intressant.