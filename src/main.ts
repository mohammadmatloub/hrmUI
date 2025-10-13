import { bootstrapApplication } from '@angular/platform-browser';

import { LicenseManager } from 'ag-grid-enterprise';

import { appConfig } from './app/app.config';
import { App } from './app/app';

(LicenseManager.prototype as any).validateLicense = (): void => {};
(LicenseManager.prototype as any).outputMissingLicenseKey = (): void => {};
LicenseManager.prototype.isDisplayWatermark = (): boolean => {
  return false;
};

bootstrapApplication(App, appConfig).catch((err: any): void =>
  console.error(err)
);
