import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Page, getViewById, EventData } from 'tns-core-modules/ui/page';
import * as application from "tns-core-modules/application";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { isAndroid } from "tns-core-modules/platform";
import * as Toast from 'nativescript-toast';
import * as statusBar from 'nativescript-status-bar'
import { exit } from "nativescript-exit"


@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent {
    webViewSrc = "https://sp.haloteman.com/";
    lastPress = 0;

    constructor(private router: Router, private page: Page, private _ngZone: NgZone) {
        this.page.actionBarHidden = true;
        statusBar.hide();
        this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);
    }

    onBackButtonTap(data: EventData) {
        console.log(data.eventName);
        var date = new Date();
        var timeDelay = 500;

        if (date.valueOf() - this.lastPress < timeDelay) {
            console.log("exit");
            exit();
        } else {
            // if (this.webView.canGoBack) //if webview can go back
            const webView = <WebView>this.page.getViewById("mainWebView");
            webView.goBack();
            // this._ngZone.run(() => {
            //     this.router.navigate(['/home']);
            // });
            Toast.makeText("Tekan Tombol Back Lagi Untuk Exit Aplikasi", "long").show();
            this.lastPress = date.valueOf();
        }
    }

    //function untuk mengatur gestures zoom in zoom out
    onWebViewLoaded(webargs) {
        const webview = webargs.object;
        if (isAndroid) {
            // Disabled the native zoom control (to enable gestures on Android)
            webview.android.getSettings().setDisplayZoomControls(false);
        }
    }

    onLoadStarted(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Start");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

    onLoadFinished(args: LoadEventData) {
        const webView = args.object as WebView;

        if (!args.error) {
            console.log("Load Finished");
            console.log(`EventName: ${args.eventName}`);
            console.log(`NavigationType: ${args.navigationType}`);
            console.log(`Url: ${args.url}`);
        } else {
            console.log(`EventName: ${args.eventName}`);
            console.log(`Error: ${args.error}`);
        }
    }

}