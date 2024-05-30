import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomOverlayContainer extends OverlayContainer {
  protected override _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('cdk-overlay-container');

    const customOverlayTarget =
      document.querySelector('#custom-overlay-target') || document.body;
    customOverlayTarget.appendChild(container);

    this._containerElement = container;
  }
}
