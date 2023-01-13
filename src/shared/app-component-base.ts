import { ChangeDetectorRef, ElementRef, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { AbpMultiTenancyService, FeatureCheckerService, LocalizationService, MessageService, NotifyService, PermissionCheckerService, SettingService } from 'abp-ng2-module';

import { BaseSeriveProxy } from './service-proxies/base-serive-proxy.service';

export abstract class AppComponentBase {
    localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

    localization: LocalizationService;
    permission: PermissionCheckerService;
    feature: FeatureCheckerService;
    notify: NotifyService;
    setting: SettingService;
    message: MessageService;
    multiTenancy: AbpMultiTenancyService;
    appSession: AppSessionService;
    elementRef: ElementRef;
    baseSeriveProxy: BaseSeriveProxy;
    changeDetectorRef: ChangeDetectorRef;

    constructor(injector: Injector) {
        this.localization = injector.get(LocalizationService);
        this.permission = injector.get(PermissionCheckerService);
        this.feature = injector.get(FeatureCheckerService);
        this.notify = injector.get(NotifyService);
        this.setting = injector.get(SettingService);
        this.message = injector.get(MessageService);
        this.multiTenancy = injector.get(AbpMultiTenancyService);
        this.appSession = injector.get(AppSessionService);
        this.elementRef = injector.get(ElementRef);
        this.baseSeriveProxy = injector.get(BaseSeriveProxy);
        this.changeDetectorRef = injector.get(ChangeDetectorRef);
    }

    l(key: string, ...args: any[]): string {
        let localizedText = this.localization.localize(key, this.localizationSourceName);

        if (!localizedText) {
            localizedText = key;
        }

        if (!args || !args.length) {
            return localizedText;
        }

        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    }

    isGranted(permissionName: string): boolean {
        return this.permission.isGranted(permissionName);
    }

    trackByIndex(index: number, el: any): number {
        if (el && el.id) {
            return el.id;
        }
        return index;
    }
}
