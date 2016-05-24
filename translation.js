/*
Simplest js lib to provide a translation system for your web pages.

@Author Rocco Musolino - website: hackerstribe.com
twitter.com/roccomuso
facebook.com/rocco.musolino

To make it works simply add to your elements (div/span/p etc.) the class defined in classSelector.
By default the class to add is 'translate'.
And the element identifier name as value of the elemeIdentifier attribute.
By default something like: <div class="translate" trans-id="item1">default text</div>

The element structure in the json is something like:
{
  "item1": {
      "desc": "this is the title in the homepage",
      "ita": "Titolo",
      "eng": "Title",
      "fra": "Titre",
      ...
  },
  ...
}

To change programmatically your web pages language you should call the change_lang function (the only one being exposed).
Like: change_lang('ita');
Just make sure to have the lang property also in the json translations file.

*/

;(function(){
  // default names
var default_selected = 'eng'; //default language
var classSelector = 'translate';
var elemIdentifier = 'trans-id';


/* DO NOT EDIT STARTING FROM HERE, YOU CAN MESS EVERYTHING :-) */
var translations;
window.onload = function() {
    if (!window.jQuery) {
        // Path to jquery.js file
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.min.js').then(function() {
            loadSettings();
        }).catch(function() {
            throw Error('Error loading jquery. Check the Path or your connection.');
        });
    } else { // jquery already exists
        loadSettings();
    }

};

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function loadSettings() {
    // load in memory translation file.
    jQuery.getJSON("translation.json", function(trans) {
        translations = trans;
        if (typeof Storage !== 'undefined') { // browser support local Storage
            var choosen_lang = localStorage.lang;
            if (choosen_lang) change_lang(choosen_lang);
        }
    });
}

function change_lang(lan) {
    // JS script that handles the translation process
    console.log('Choosen lang:', lan);
    // save user choice
    localStorage.lang = lan;
    if (default_selected != lan) {
        default_selected = lan;
        applyTranslations(lan);
    }
}


function applyTranslations(lan) {
    $('.'+classSelector).each(function() {
        var p = $(this);
        var id_traduzione = p.attr(elemIdentifier);
        if (translations.hasOwnProperty(id_traduzione)) p.hide().html(translations[id_traduzione][lan]).fadeIn(2000); // scriviamo la traduzione corrispondente con l'effetto dissolvenza in entrata
    });
}

// exposing just this function
window.change_lang = change_lang;

})(window);
