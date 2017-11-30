import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgTerminalComponent, Disposible } from './ng-terminal.component';

describe('NgTerminalComponent', () => {
    let component: NgTerminalComponent;
    let fixture: ComponentFixture<NgTerminalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgTerminalComponent],
            imports: [
                BrowserAnimationsModule
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgTerminalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display userInput with handle()', () => {
        let terminalViewPort = fixture.debugElement.query(By.css('.terminal-view-port'));
        component.onNext.subscribe((disposible: Disposible) => {
            disposible.handle();
            if (disposible.event.key == '!') {
                fixture.detectChanges();
                let text = fixture.debugElement.query(By.css('.typing-unit > .text'));
                expect(text.nativeElement.innerHTML).toEqual('Hello!');
                component.onNext.complete();
            }
        });
        terminalViewPort.nativeElement.focus();
        fixture.detectChanges();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'H' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '!' }));
    });
    it('should display new prompt with prompt()', () => {
        let terminalViewPort = fixture.debugElement.query(By.css('.terminal-view-port'));
        component.onNext.subscribe((disposible: Disposible) => {
            if (disposible.event.key == 'Enter') {
                disposible.prompt('ng>');
                fixture.detectChanges();
                let prompt = fixture.debugElement.query(By.css('.typing-unit:last-child > .prompt'));
                expect(prompt.nativeElement.innerHTML).toEqual('ng&gt; ');
                component.onNext.complete();
            } else {
                disposible.handle();
            }

        });
        terminalViewPort.nativeElement.focus();
        fixture.detectChanges();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'H' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '!' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    it('should display text with print()', () => {
        let terminalViewPort = fixture.debugElement.query(By.css('.terminal-view-port'));
        component.onNext.subscribe((disposible: Disposible) => {
            if (disposible.event.key == '>') {
                disposible.print('test print()');
                fixture.detectChanges();
                let prompt = fixture.debugElement.query(By.css('.typing-unit:last-child > .text'));
                expect(prompt.nativeElement.innerHTML).toEqual('test print()');
                component.onNext.complete();
            }
        });
        terminalViewPort.nativeElement.focus();
        fixture.detectChanges();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '>' }));
    });

    it('should display text with println()', () => {
        let terminalViewPort = fixture.debugElement.query(By.css('.terminal-view-port'));
        component.onNext.subscribe((disposible: Disposible) => {
            if (disposible.event.key == '>') {
                disposible.println('test println()');
                fixture.detectChanges();
                let prompt = fixture.debugElement.query(By.css('.typing-unit:first-child > .text'));
                expect(prompt.nativeElement.innerHTML).toEqual('test println()');
                component.onNext.complete();
            }
        });
        terminalViewPort.nativeElement.focus();
        fixture.detectChanges();
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '>' }));
    });

    it('should display text with clearBuffer()', (done) => {
        let terminalViewPort = fixture.debugElement.query(By.css('.terminal-view-port'));
        terminalViewPort.nativeElement.focus();
        fixture.detectChanges();

        component.onNext.subscribe((disposible: Disposible) => {
            if (disposible.event.key == '>') {
                setTimeout(() => {
                    disposible.skip();
                }, 1000);
            } else if (disposible.event.key == 'c') {
                disposible.print('test clearBuffer()').clearEventBuffer().skip();
                window.dispatchEvent(new KeyboardEvent('keydown', { key: ';' }));
            } else {
                disposible.handle();
                fixture.detectChanges();
                if (disposible.event.key == ';') {
                    let prompt = fixture.debugElement.query(By.css('.typing-unit:first-child > .text'));
                    expect(prompt.nativeElement.innerHTML).toEqual('test clearBuffer();');
                    component.onNext.complete();
                    done();
                }
            }
        });

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '>' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'f' }));
    });


});
