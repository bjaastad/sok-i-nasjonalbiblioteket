/**
 * browserAction onClicked handler
 * 
 * Åpnar www.nb.no i ei ny fane, utan noko søk.
 */
browser.browserAction.onClicked.addListener(function(tab) 
{
    browser.tabs.create( { url: "http://www.nb.no" } );
});

/**
 * OnClick handler 
 * 
 * Utfører eit nytt søk på nb.no, enten i den eksisterande fana (hvis ctrl ikkje er holdt nede), eller 
 * i ei ny fane (hvis ctrl er holdt nede).
 */
searchNbNo = function(onClickData, tab) {
    // Markert tekst
    var markertTekst = onClickData.selectionText;

    // Sjekk kontrolltastar
    var ctrlHoldtNede = onClickData.modifiers.includes("Ctrl");  // ctrl holdt nede
    var shiftHoldtNede = onClickData.modifiers.includes("Shift"); // shift holdt nede

    // Søk med eller utan hermeteikn
    var hermeteiknkarakter = "\""; // med hermeteikn
    if (shiftHoldtNede) {
        hermeteiknkarakter = ""; // utan hermeteikn
    }

    // Utfør søk
    if (ctrlHoldtNede) {
        // Utfør søk i eksisterende fane
        browser.tabs.update({url: "https://www.nb.no/search?q=" + hermeteiknkarakter + markertTekst + hermeteiknkarakter});    
    } else {
        // Utfør søk i ny fane
        browser.tabs.create({url: "https://www.nb.no/search?q=" + hermeteiknkarakter + markertTekst + hermeteiknkarakter});
    }
};

// Legg til nytt kontekstemeny-valg
browser.contextMenus.create({
    title: "Søk i Nasjonalbiblioteket etter \"%s\"",  // tittel, der %s er markert tekst i nettlesarvinduet
    contexts:["selection"],                           // vis høgreklikksvalg berre dersom tekst er markert
    onclick: searchNbNo                               // onclick handler-funksjon satt til searchNbNo
});