import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SyntaxTransformService {
  constructor() {}

  convertNgForToAtFor(html: string): string {
    // Reemplazar *ngFor simple
    html = html.replace(
      /<li \*ngFor="let ([\w]+) of ([\w\.]+)">\s*{{ ([\w\.]+) }}\s*<\/li>/g,
      '@for($1 of $2; track $index){\n<li>{{ $3 }}</li>\n}'
    );

    // Reemplazar *ngFor con index
    html = html.replace(
      /<li \*ngFor="let ([\w]+) of ([\w\.]+); let ([\w]+) = index">\s*((.|\n)*?)\s*<\/li>/g,
      '@for(let $1 of $2; track $1; let $3 = $index) {\n<li>$4</li>\n}'
    );

    // Reemplazar *ngFor con first y last
    html = html.replace(
      /<li \*ngFor="let ([\w]+) of ([\w\.]+); let ([\w]+) = first; let ([\w]+) = last"((.|\n)*?)>\s*((.|\n)*?)\s*<\/li>/g,
      '@for(let $1 of $2; track $1; let $3 = $first; let $4 = $last) {\n<li$5>$6</li>\n}'
    );

    // Reemplazar *ngFor con keyvalue
    html = html.replace(
      /<li \*ngFor="let ([\w]+) of ([\w\.]+) \| keyvalue">\s*((.|\n)*?)\s*<\/li>/g,
      '@for(let [clave, valor] of $2 | keyvalue; track clave) {\n<li>$3</li>\n}'
    );

    // Reemplazar *ngFor anidados
    html = html.replace(
      /<tr \*ngFor="let ([\w]+) of ([\w\.]+)">\s*((.|\n)*?)\s*<\/tr>/g,
      '<tr>\n@for(let $1 of $2; track $1) {\n$3\n}\n</tr>'
    );
    html = html.replace(
      /<td \*ngFor="let ([\w]+) of ([\w\.]+)">\s*((.|\n)*?)\s*<\/td>/g,
      '<td>\n@for(let $1 of $2; track $1) {\n$3\n}\n</td>'
    );

    html = html.replace(
      /<li \*ngFor="let ([\w]+) of ([\w\.]+); let ([\w]+) = index"((.|\n)*?)>\s*((.|\n)*?)\s*<\/li>/g,
      '@for(let $1 of $2; track $1; let $3 = $index) {\n<li$4>$5</li>\n}'
    );

    html = html.replace(
      /<div \*ngFor="let ([\w]+) of ([\w\.]+)"((.|\n)*?)>\s*((.|\n)*?)\s*<\/div>/g,
      '@for($1 of $2; track $index) {\n<div$3>$4</div>\n}'
    );

    return html;
  }
}
