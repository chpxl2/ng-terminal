import { Component, OnInit } from '@angular/core';
import { Disposable } from '../modules/ng-terminal/ng-terminal.component';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onInit(disposible: Disposable) {
        disposible.println('https://github.com/qwefgh90/ng-terminal').println('Welcome to NgTerminal!!').prompt('ng>');
    }

    onNext(disposible: Disposable) {
        if (disposible.event.key == 'Enter') {
            let newDisposible = disposible.println('').println('something is in progress...')
            setTimeout(() => { newDisposible.println('').print('').print('complete!').prompt('ng>'); }, 2000);
        } else
            disposible.handle();
    }
}
