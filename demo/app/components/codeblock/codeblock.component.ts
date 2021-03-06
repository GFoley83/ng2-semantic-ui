import {Component, AfterViewInit, Input, ChangeDetectorRef} from '@angular/core';

@Component({
    selector: "demo-codeblock",
    template: `
<pre [ngClass]="languageClass" [innerHTML]="html"></pre>
`
})
export class CodeblockComponent implements AfterViewInit{
    @Input()
    public language:string;

    @Input()
    public src:string;

    private html:string;

    private languageClass:any = {};

    constructor(private changeDetectorRef:ChangeDetectorRef) {}

    ngAfterViewInit(): any {
        if (this.src[0] == "\n") {
            this.src = this.src.replace("\n", "");
        }
        this.languageClass[`language-${this.language}`] = true;
        this.html = Prism.highlight(this.src || "", Prism.languages[this.language]);
        this.changeDetectorRef.detectChanges();
    }
}
