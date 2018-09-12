import {
    Component,
    OnInit,
    OnChanges,
    Input,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
    Output,
    EventEmitter,
    HostListener, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

export interface SvgCircle {
    cx: number;
    cy: number;
    id: string;
}

@Component({
    selector: 'app-svg-editor',
    templateUrl: './svg-editor.component.html',
    styleUrls: ['./svg-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgEditorComponent implements OnInit, OnChanges {
    @ViewChild('wrapper') wrapper: ElementRef;
    @Input() svg: string;
    mode = 'dots';
    @Input() scale: number;
    stroke_color = 'black';
    @Output() svgChange = new EventEmitter<string>();
    private path;
    private delay;
    private stop: boolean;
    private cursor = {'x': 0, 'y': 0};
    private delta = {'x': 0, 'y': 0};

    private strokeWidth = 1;

    isChecked = true;
    svgSafe: SafeHtml;
    activeElement: HTMLElement;
    details: string;

    array: SvgCircle[] = [];

    constructor(private sanitizer: DomSanitizer,  private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
        const svgChanges = changes['svg'];
        const scaleChanges = changes['scale'];
        if (svgChanges && svgChanges.currentValue) {
            this.svgSafe = this.sanitizer.bypassSecurityTrustHtml(this.svg);
        } else if (scaleChanges && scaleChanges.currentValue) {
            this.scaleSVG(this.scale);
        }
        this.ref.markForCheck();
    }

    action(event) {
        if (this.mode === 'dots') {
            this.activeElement = event.target;
            this.details = event.target.id;
            const states = event.target.closest('.states');

            if (states) {
                states.parentElement.removeChild(states);
                const ind = this.array.findIndex((c: SvgCircle) => {
                    const cx = states.getElementsByTagName('circle')[0].cx.baseVal.value;
                    const cy = states.getElementsByTagName('circle')[0].cy.baseVal.value;
                    return c.cx === cx && c.cy === cy;
                });
                this.array.splice(ind, 1);
            } else if (this.isChecked) {
                this.addCircles(event);
                // this.isChecked = false;
            }
            console.log('Array', this.array);
        }
    }

    addCircles(event) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('states');
        if (event.target && event.target.id) {
            g.classList.add(event.target.id);
        }
        console.log(event.target.id);
        const svg = this.wrapper.nativeElement.querySelector('svg');
        const viewBox = svg.getAttribute('viewBox').split(' ');
        const offset = svg.getBoundingClientRect();
        const xRatio = (viewBox[2]) / offset.width;
        const yRatio = (viewBox[3]) / offset.height;
        const x = Math.floor((event.pageX - offset.x) * xRatio + -viewBox[0]);
        const y = Math.floor((event.pageY - offset.y) * yRatio + -viewBox[1]);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        if (event.target.id === 'a1') {
            circle.setAttribute('fill', 'green');
        } else if (event.target.id === 'b1') {
            circle.setAttribute('fill', 'red');
        } else if (event.target.id === 'c1') {
            circle.setAttribute('fill', 'blue');
        } else {
            circle.setAttribute('fill', 'grey');
        }

        circle.setAttribute('cx', String(x + 2 * viewBox[0]));
        circle.setAttribute('cy', String(y + 2 * viewBox[1]));
        circle.setAttribute('r', String(3));

        g.appendChild(circle);
        svg.appendChild(g);
        this.array.push({id: event.target.id, cx: circle.cx.baseVal.value, cy: circle.cy.baseVal.value});
        this.svgChange.emit(this.wrapper.nativeElement.innerHTML);

    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event) {
        if (this.mode === 'draw') {
            const svg = this.wrapper.nativeElement.querySelector('svg');
            const offset = svg.getBoundingClientRect();
            const viewBox = svg.getAttribute('viewBox').split(' ');
            const xRatio = (viewBox[2]) / offset.width;
            const yRatio = (viewBox[3]) / offset.height;
            this.delta.x = (event.pageX - offset.left) * xRatio - this.cursor.x;
            this.delta.y = (event.pageY - offset.top) * yRatio - this.cursor.y;
            this.cursor.x += this.delta.x;
            this.cursor.y += this.delta.y;
            this.draw();
        }
    }

    @HostListener('document:mousedown', ['$event'])
    onMouseDown(event) {
        if (this.mode === 'draw') {
            const svg = this.wrapper.nativeElement.querySelector('svg');
            this.stop = false;
            this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.path.setAttribute('fill-opacity', '0');
            this.path.setAttribute('class', 'drawings');
            this.path.setAttribute('stroke', this.stroke_color);
            this.path.setAttribute('stroke-width', this.strokeWidth.toString());
            this.path.setAttribute('d', 'M' + this.cursor.x + ' ' + this.cursor.y);
            svg.appendChild(this.path);
            this.draw();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e) {
        if (this.mode === 'draw') {
            this.stop = true;
        }
    }

    draw() {
        if (!this.stop && this.mode === 'draw') {
            if (this.path) {
                let d = this.path.getAttribute('d');
                d += ' L' + this.cursor.x + ' ' + this.cursor.y;
                this.path.setAttribute('d', d);
            }
        }
    }

    onModeChanged(event) {
        this.mode = event.target.value;
    }
    onStrokeColorChange(event) {
        this.stroke_color = event.target.value;
    }
    onStrokeWidthChange(event) {
        this.strokeWidth = event.target.value;
    }
    onClearAll() {
        if (this.mode === 'dots') {
            const svg = this.wrapper.nativeElement.querySelector('svg');
            const states = svg.getElementsByClassName('states');
            if (states) {
                while (states.length > 0) {
                    states[0].parentNode.removeChild(states[0]);
                }
            }
        } else if (this.mode === 'draw') {
            const svg = this.wrapper.nativeElement.querySelector('svg');
            const drawings = svg.getElementsByClassName('drawings');
            if (drawings) {
                while (drawings.length > 0) {
                    drawings[0].parentNode.removeChild(drawings[0]);
                }
            }
        }
    }

    scaleSVG(zoom: number) {
        // get all SVG objects in the DOM
        const svg = this.wrapper.nativeElement.querySelector('svg');
        // set viewable area based on value above
        svg.setAttribute('transform', 'scale(' + zoom + ')');
    }
}
