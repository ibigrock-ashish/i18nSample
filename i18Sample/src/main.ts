import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { CookieStorageService } from 'src/app/shared/services/cookie-storage.service';
import { CookieKey } from './app/config/config';
if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

declare var fetch;
declare var cookiestorage;

/* Directionary to the right for locales */

const directionary: any = {
  // English
  'en-AU': 'en-US', // English - Australia
  'en-BZ': 'en-US', // English - Belize
  'bg-BG': 'en-US', // English - Bulgaria
  'en-CA': 'en-US', // English - Canada
  // 'en-CB': 'en-US', // English - Caribbean
  'en-US': 'en-US', // English - United States
  'en-GB': 'en-US', // English - Great Britain
  'en-IN': 'en-US', // English - India
  'in-ID': 'en-US', // English - Indonesia
  'en-IE': 'en-US', // English - Ireland
  'en-JM': 'en-US', // English - Jamaica
  'en-NZ': 'en-US', // English - New Zealand
  'en-PH': 'en-US', // English - Phillippines
  'en-ZA': 'en-US', // English - Southern Africa
  'en-TT': 'en-US', // English - Trinidad
  'en-MT': 'en-US', // English - Malta
  'si-LK': 'en-US', // English - Sri Lanka

  // // DUTCH
  'nl-NL': 'nl-NL', // Dutch - Netherlands
  // 'nl-BE': 'nl-NL', // Dutch - Belgium

  // // FRENCH
  'fr-BE': 'fr-FR', // French - Belgium
  'fr-FR': 'fr-FR', // French - France
  'fr-LU': 'fr-FR', // French - Luxembourg
  'fr-MA': 'fr-FR', // French - Morocco
  'fr-CH': 'fr-FR', // French - Switzerland

  // // GERMAN
  'de-AT': 'de-AT', // German - Austria
  'de-DE': 'de-AT', // German - Germany
  'de-LI': 'de-AT', // German - Liechtenstein
  'de-LU': 'de-AT', // German - Luxembourg
  'de-CH': 'de-AT', // German - Switzerland

  // // // POLISH
  // 'pl-PL': 'pl-PL',

  // // CHINESE
  'zh-ZH': 'zh-CN', // Chinese - China
  // 'zh-HK': 'zh-CN', // Chinese - Hong Kong
  // 'zh-MO': 'zh-CN', // Chinese - Macau
  // 'zh-SG': 'zh-CN', // Chinese - Singapore

  // Spanish
  'es-ES': 'es-ES', // Spanish - Spain
  'es-AR': 'es-ES', // Spanish - Argentina
  'es-CL': 'es-ES', // Spanish - Chile
  'es-MX': 'es-ES', // Spanish - Mexico

  // Greek
  'el-EL': 'el-EL',

  // Danish
  'da-DK': 'da-DK', // Dannish - Denmark
  // 'da-DA': 'da-DK', // Dannish - Denmark


  // Portuguese
  'pt-PT': 'pt-PT', // Portuguese - Portugal
  // 'pt-BR': 'pt-PT', // Portuguese - Brazil


  // Italian
  'it-IT': 'it-IT', // Italian - Italy
  // 'it-CH': 'it-IT', // Italian - Switzerland


  // Swedish
  'sv-SE': 'sv-SE',  // Swedish - Sweden
  // 'sv-FI': 'sv-SE',  // Swedish - Finland

};

function getCookie(): any {
  const defaultcookie = 'en-US';
  let cookie;
  try {
    cookie = getCookieFromCookies(CookieKey.LOCALE) || defaultcookie;
    cookie = cookie.replace(new RegExp('"', 'g'), '');
  } catch (ex) {
    cookie = defaultcookie;
  }
  return new Promise<void>((resolve, reject) => {
    if (!directionary[cookie]) {
      cookie = defaultcookie;
    }
    if (directionary[cookie] === defaultcookie) { return resolve(); }

    fetch(`assets/locale/messages.${directionary[cookie]}.xlf`).then((res: any) => {
      if (res.status === 200) {
        return res.text().then(resolve).catch(() => resolve());
      }
      return resolve();

    }).catch((ex) => {
      resolve(null);
    });

    // Multilaugual json format
    // fetch(`assets/i18n/i18n.${directionary[cookie]}.json`).then((res: any) => {
    //   if(res.status === 200){
    //     return res.text().then(resolve).catch(() => resolve());
    //   }
    //   return resolve();

    // }).catch((ex) => {
    //   resolve(null);
    // })

  });
}





function getCookieFromCookies(property) {
  const cookiePrefix = environment.COOKIE_PREFIX;
  const name = `${cookiePrefix}${property}` + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

getCookie().then(boot).catch(boot);

function boot(translationSource) {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      { provide: TRANSLATIONS, useValue: translationSource },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
    ]
  });

  // Multi laugual json format
  // platformBrowserDynamic().bootstrapModule(AppModule, {
  //   providers: [
  //    { provide: TRANSLATIONS, useValue: translationSource },
  //     { provide: TRANSLATIONS_FORMAT, useValue: 'json' }
  //   ]
  // });
}
