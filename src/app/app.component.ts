import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import * as application from "tns-core-modules/application";
import { Frame } from "tns-core-modules/ui/frame/frame";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

    public constructor() { }

    public ngOnChanges() {
        console.log("OnChanges");
    }

    public ngOnDestroy() {
        console.log("OnDestroy"); 
        application.android.off(application.AndroidApplication.activityBackPressedEvent);
    }

    public ngOnInit() {
        application.android.off(application.AndroidApplication.activityBackPressedEvent);
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            const page = Frame.topmost().currentPage;
            if (page.hasListeners(application.AndroidApplication.activityBackPressedEvent)) {
                args.cancel = true;
                page.notify({
                    eventName: application.AndroidApplication.activityBackPressedEvent,
                    object: page
                });
            }
        });
    }

}
