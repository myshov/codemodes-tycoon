// vim: ai ts=2 sts=2 et sw=2
export const parser = "tsx";

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      const importLiteral = path.value.source.value;
      if (importLiteral.endsWith(".css")) {
        path.value.source.value = importLiteral.replace(".css", ".module.css");
      }
    })
    .toSource();
}
