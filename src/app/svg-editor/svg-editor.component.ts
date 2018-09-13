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
    HostListener, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const xmlns = 'http://www.w3.org/2000/svg';

@Component({
    selector: 'app-svg-editor',
    templateUrl: './svg-editor.component.html',
    styleUrls: ['./svg-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgEditorComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('mainSvg') mainSvg: ElementRef;
    @Input() svgTemplateLayerString: string;
    @Input() svgDrawingLayerString: {svg: string};
    @Input() scale: number;
    @Output() svgChange = new EventEmitter<string>();
    svgDrawingLayer: SVGElement;
    svgSafe: SafeHtml;
    private default_stroke_color = 'black';
    private draw_mode = 'dots';
    private path;
    private stop: boolean;
    private cursor = {'x': 0, 'y': 0};
    private delta = {'x': 0, 'y': 0};
    private default_strokeWidth = 1;
    private default_circle_radius = 5;

    constructor(private sanitizer: DomSanitizer, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
        const svgTemplateChanges = changes['svgTemplateLayerString'];
        const svgDrawChanges = changes['svgDrawingLayerString'];
        const scaleChanges = changes['scale'];
        if (svgTemplateChanges && svgTemplateChanges.currentValue) {
            this.svgSafe = this.sanitizer.bypassSecurityTrustHtml(this.svgTemplateLayerString);
        } else if (scaleChanges && scaleChanges.currentValue) {
            this.scaleSVG(this.scale);
        } else if (svgDrawChanges && svgDrawChanges.currentValue) {
            const new_svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            new_svg.outerHTML = this.svgDrawingLayerString.svg;
            this.syncZoom();
        }
        this.ref.markForCheck();
    }

    setDotsAction(event) {
        if (this.draw_mode === 'dots') {
            const states = event.target.closest('.states');
            if (states) {
                states.parentElement.removeChild(states);
            } else {
                this.addCircles(event);
            }
        }
    }

    addCircles(event) {
        const g = document.createElementNS(xmlns, 'g');
        g.classList.add('states');
        if (event.target && event.target.id) {
            g.classList.add(event.target.id);
        }
        console.log(event.target.id);
        const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
        const viewBox = svg.getAttribute('viewBox').split(' ');
        const offset = svg.getBoundingClientRect();
        const xRatio = (viewBox[2]) / offset.width;
        const yRatio = (viewBox[3]) / offset.height;
        const x = Math.floor((event.pageX - offset.x) * xRatio + -viewBox[0]);
        const y = Math.floor((event.pageY - offset.y) * yRatio + -viewBox[1]);

        const circle = document.createElementNS(xmlns, 'circle');
        circle.setAttribute('fill-opacity', '1');
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
        circle.setAttribute('r', String(this.default_circle_radius));

        g.appendChild(circle);
        svg.appendChild(g);
        this.svgChange.emit(this.mainSvg.nativeElement.innerHTML);

    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event) {
        if (this.draw_mode === 'draw') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
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
        if (this.draw_mode === 'draw') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            const offset = svg.getBoundingClientRect();
            if (offset.x <= event.x  && event.x <= offset.x + offset.width &&
                offset.y <= event.y && event.y <= offset.y + offset.height) {
                this.stop = false;
                const g = document.createElementNS(xmlns, 'g');
                g.classList.add('draw-path');
                this.path = document.createElementNS(xmlns, 'path');
                this.path.setAttribute('fill-opacity', '0');
                this.path.setAttribute('stroke', this.default_stroke_color);
                this.path.setAttribute('stroke-width', this.default_strokeWidth.toString());
                this.path.setAttribute('d', 'M' + this.cursor.x + ' ' + this.cursor.y);
                g.appendChild(this.path);
                svg.appendChild(g);
                this.draw();
            }
        }
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e) {
        if (this.draw_mode === 'draw') {
            this.stop = true;
        }
    }

    draw() {
        if (!this.stop && this.draw_mode === 'draw') {
            if (this.path) {
                let d = this.path.getAttribute('d');
                d += ' L' + this.cursor.x + ' ' + this.cursor.y;
                this.path.setAttribute('d', d);
            }
        }
    }

    onModeChanged(event) {
        this.draw_mode = event.target.value;
    }

    onStrokeColorChange(event) {
        this.default_stroke_color = event.target.value;
    }

    onStrokeWidthChange(event) {
        this.default_strokeWidth = event.target.value;
    }

    onUndo() {
        if (this.draw_mode === 'dots') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            const states = svg.getElementsByClassName('states');
            if (states  && states.length > 0) {
                states[states.length - 1].parentNode.removeChild(states[states.length - 1]);
            }

        } else if (this.draw_mode === 'draw') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            const paths = svg.getElementsByClassName('draw-path');
            if (paths && paths.length > 0) {
                paths[paths.length - 1].parentNode.removeChild(paths[paths.length - 1]);
            }
        }
    }

    onClearAll() {
        if (this.draw_mode === 'dots') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            const states = svg.getElementsByClassName('states');
            if (states) {
                while (states.length > 0) {
                    states[0].parentNode.removeChild(states[0]);
                }
            }
        } else if (this.draw_mode === 'draw') {
            const svg = this.mainSvg.nativeElement.querySelector('#new-svg');
            const paths = svg.getElementsByClassName('draw-path');
            if (paths) {
                while (paths.length > 0) {
                    paths[0].parentNode.removeChild(paths[0]);
                }
            }
        }
    }

    scaleSVG(zoom: number) {
        // get all SVG objects in the DOM
        const svg = this.mainSvg.nativeElement.querySelector('svg');
        // set viewable area based on value above
        svg.setAttribute('transform', 'scale(' + zoom + ')');
        const new_svg = this.mainSvg.nativeElement.querySelector('#new-svg');
        // set viewable area based on value above
        new_svg.setAttribute('transform', 'scale(' + zoom + ')');
    }

    ngAfterViewInit(): void {
        this.createDrawingLayer();
    }

    private syncZoom() {
        const svg = this.mainSvg.nativeElement.querySelector('svg');
        const drawSvg = this.mainSvg.nativeElement.querySelector('#new-svg');
        const transform = svg.getAttribute('transform');
        drawSvg.setAttribute('transform', transform);
    }

    private createDrawingLayer() {
        const svg = this.mainSvg.nativeElement.querySelector('svg');
        const viewBox = svg.getAttribute('viewBox');
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        this.svgDrawingLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgDrawingLayer.setAttribute('x', '0');
        this.svgDrawingLayer.setAttribute('y', '0');
        this.svgDrawingLayer.setAttribute('width', width);
        this.svgDrawingLayer.setAttribute('height', height);
        this.svgDrawingLayer.setAttribute('viewBox', viewBox);
        this.svgDrawingLayer.setAttribute('class', 'new-svg');
        this.svgDrawingLayer.setAttribute('id', 'new-svg');
        this.svgDrawingLayer.style.setProperty('fill-opacity', '0.0', '');
        this.mainSvg.nativeElement.appendChild( this.svgDrawingLayer);
    }
}
