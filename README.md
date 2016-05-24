# simplest-i18n-js
The simplest way to provide a translation system for your web pages.

## How it works

To make it works simply add to your elements (*div/span/p* etc.) the class defined in classSelector.
By default the class to add is 'translate'.
And the element identifier name as value of the elemeIdentifier attribute.
By default something like:

    <div class="translate" trans-id="item1">default text</div>

The element structure in the json is something like:

```json
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
```

To change programmatically your web pages language you should call the ***change_lang*** function (the only one being exposed).
Like: <code>change_lang('ita');</code>
Just make sure to have the lang property also in the json translations file.


### @Author: Rocco Musolino

- website: hackerstribe.com
- twitter.com/roccomuso
- facebook.com/rocco.musolino
