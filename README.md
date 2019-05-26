# Codemodes Tycoon

## Usage

```
$ npm i jscodeshift -g
$ jscodeshift -t transform.js inputFile.js
```

## Codemodes

### blablaficator

Replacing all identifiers to 'bla'

### changeCreatePageObjectSignature

Changing of signature of method this.createPageObject Good example for creation of objects.

### reactToVue

An experimental codemode for transformation of functional React-components with jsx to Vue-components

### removeConsoleUsage

Simple exapmle of deleting ast-nodes

### replaceDeprecatedLodashMethod

An example of migration for new version library. In this case from lodash 4 to 5, where method sortBy were replaced by orderBy.

## License

The MIT License (MIT)

Copyright (c) 2019 Alexander Myshov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
