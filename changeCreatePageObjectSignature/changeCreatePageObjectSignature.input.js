// vim: ai ts=2 sts=2 et sw=2
this.createPageObject('pageObject');
this.createPageObject(pageObject);
this.createPageObject(pageObject, this.browser);
this.createPageObject(pageObject, someParent);
this.createPageObject(pageObject, 'someParent');
this.createPageObject(pageObject, this.browser, someRoot);
this.createPageObject(pageObject, parent, 'someRoot');
this.createPageObject(pageObject, someParent, `some${val}Root`);
this.createPageObject(pageObject, this.browser, `[data-type="${type}"]`);
this.createPageObject(Box, '[data-text*="Some caption"]');
