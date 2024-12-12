import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SyntaxTransformService } from './services/syntax-transform.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-transformer';

  oldSyntax = '';
  newSyntax = '';
  copyButtonText = 'Copiar';

  syntaxTransformService = inject(SyntaxTransformService);

  copyNewSyntax() {
    if (this.newSyntax) {
      navigator.clipboard.writeText(this.newSyntax).then(
        () => {
          this.copyButtonText = 'Copiado!';
          setTimeout(() => {
            this.copyButtonText = 'Copiar';
          }, 2000);
        },
        (err) => {
          console.error('Error al copiar el texto: ', err);
        }
      );
    }
  }

  convertSyntax() {
    this.newSyntax = this.syntaxTransformService.convertNgForToAtFor(
      this.oldSyntax
    );
  }
}
