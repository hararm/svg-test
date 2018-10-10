import {Component, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('svg') svg: ElementRef;

    originalTemplateSvg: string;
    svgFromStorage: {svg: string};
    scale = 1;

   drwSvg = '<svg x="0" y="0"  viewBox="0 0 570.000000 472.000000" class="new-svg" id="new-svg" style="fill-opacity: 0;"><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M56.276036511388156 72.0584794992681 L56.276036511388156 72.0584794992681 L57.77603639092404 72.0584794992681 L60.77603614999581 72.8084918891569 L65.27603578860347 76.55855383860091 L69.02603548744318 79.55860339815612 L75.02603500558672 84.80869012737774 L81.02603452373027 92.30881402626578 L84.77603422256998 96.0588759757098 L87.77603398164176 100.55895031504262 L90.77603374071353 104.30901226448664 L91.52603368048146 107.30906182404185 L93.7760334997853 113.30916094315228 L95.27603337932118 116.30921050270749 L95.27603337932118 117.0592228925963 L96.02603331908912 117.0592228925963 L96.02603331908912 114.05917333304107 L95.27603337932118 111.80913616337467 L95.27603337932118 109.55909899370826 L93.7760334997853 106.55904943415304 L90.77603374071353 96.8088883655986 L90.02603380094558 93.05882641615459 L90.02603380094558 90.80878924648817 L90.02603380094558 91.55880163637698 L90.02603380094558 95.308863585821 L90.02603380094558 101.30896270493142 L90.77603374071353 106.55904943415304 L91.52603368048146 108.80908660381945 L91.52603368048146 111.80913616337467 L91.52603368048146 114.05917333304107 L91.52603368048146 113.30916094315228 L88.52603392140969 109.55909899370826 L85.52603416233792 105.80903704426424 L82.52603440326615 101.30896270493142 L79.52603464419438 99.80893792515381 L78.77603470442644 98.30891314537621"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M276.0260188633954 60.808293650936044 L276.0260188633954 60.808293650936044 L276.0260188633954 61.55830604082485 L276.0260188633954 63.80834321049126 L274.5260189838595 66.80839277004647 L270.7760192850198 73.5585042790457 L265.5260197066442 86.30871490715536 L260.2760201282686 96.8088883655986 L258.7760202487327 102.05897509482023 L256.52602042942885 109.55909899370826 L255.026020549893 117.0592228925963 L253.5260206703571 121.55929723192911 L252.77602073058915 123.80933440159552 L252.77602073058915 128.30940874092835 L252.0260207908212 129.80943352070594 L252.0260207908212 132.05947069037236 L251.2760208510533 134.30950786003876 L250.52602091128534 137.30955741959397 L250.52602091128534 138.8095821993716 L250.52602091128534 141.8096317589268 L250.52602091128534 143.30965653870442 L250.52602091128534 144.809681318482 L250.52602091128534 146.30970609825962 L250.52602091128534 147.80973087803721 L250.52602091128534 149.30975565781483 L249.7760209715174 151.55979282748123 L249.7760209715174 153.05981760725885 L249.02602103174945 154.55984238703644 L249.02602103174945 159.80992911625808 L249.02602103174945 162.80997867581328 L249.02602103174945 166.5600406252573 L248.2760210919815 169.5600901848125 L248.2760210919815 171.06011496459013 L248.2760210919815 174.81017691403414 L247.52602115221356 177.81022647358935 L247.52602115221356 181.56028842303337 L246.02602127267767 183.81032559269977 L246.02602127267767 186.0603627623662 L246.02602127267767 188.3103999320326 L246.02602127267767 189.0604123219214 L246.02602127267767 185.3103503724774 L246.02602127267767 183.81032559269977 L246.02602127267767 181.56028842303337 L245.27602133290972 166.5600406252573 L243.77602145337386 153.80982999714766 L242.27602157383797 147.05971848814843 L242.27602157383797 144.0596689285932 L242.27602157383797 141.8096317589268 L242.27602157383797 141.059619369038 L242.27602157383797 143.30965653870442 L242.27602157383797 145.55969370837082 L242.27602157383797 149.30975565781483 L243.77602145337386 160.55994150614688 L243.77602145337386 166.5600406252573 L243.77602145337386 173.31015213425653 L243.77602145337386 174.81017691403414 L243.77602145337386 176.31020169381173 L243.77602145337386 177.06021408370054 L245.27602133290972 176.31020169381173 L249.02602103174945 171.81012735447894 L252.77602073058915 168.81007779492373 L261.02602006803653 159.05991672636927 L277.5260187429313 140.30960697914918 L281.276018441771 133.55949547014995 L281.276018441771 132.80948308026115"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M540.0259976617112 72.8084918891569 L540.0259976617112 72.8084918891569 L528.7759985651921 80.30861578804493 L518.275999408441 87.05872729704416 L507.7760002516897 92.30881402626578 L501.0260007937782 95.308863585821 L497.2760010949385 98.30891314537621 L495.77600121540263 99.05892553526502 L492.77600145633085 99.80893792515381 L489.77600169725906 99.80893792515381 L486.02600199841936 100.55895031504262 L484.52600211888347 101.30896270493142 L483.0260022393476 101.30896270493142 L483.0260022393476 102.05897509482023 L481.5260023598117 104.30901226448664 L477.02600272120407 109.55909899370826 L475.5260028416682 111.05912377348587 L475.5260028416682 108.80908660381945 L475.5260028416682 107.30906182404185 L476.2760027814361 104.30901226448664 L477.02600272120407 102.80898748470904 L478.52600260073996 96.8088883655986 L480.02600248027585 93.8088388060434 L480.02600248027585 90.80878924648817 L480.02600248027585 87.80873968693297 L480.02600248027585 86.30871490715536 L480.02600248027585 87.80873968693297 L480.02600248027585 89.30876446671057 L478.52600260073996 95.308863585821 L477.02600272120407 102.05897509482023 L477.02600272120407 106.55904943415304 L476.2760027814361 109.55909899370826 L476.2760027814361 110.30911138359706 L477.02600272120407 110.30911138359706 L488.27600181772317 114.05917333304107 L510.0260000709935 118.5592476723739 L529.5259985049601 123.05932201170671 L544.5259973003189 124.55934679148433 L552.7759966377663 126.05937157126193 L553.5259965775342 126.05937157126193 L552.7759966377663 126.80938396115073"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M360.7760120571729 264.0616513108017 L360.7760120571729 264.0616513108017 L360.7760120571729 265.56167609057934 L357.0260123583332 269.31173804002333 L348.02601308111787 279.0618991085778 L336.0260140448308 289.56207256702106 L323.2760150687758 303.0622955850195 L309.7760161529528 318.0625433827956 L307.526016333649 321.81260533223957 L306.0260164541131 324.062642501906 L307.526016333649 323.3126301120172"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M363.7760118162447 264.0616513108017 L363.7760118162447 264.0616513108017 L363.02601187647673 264.0616513108017 L358.5260122378691 264.81166370069053 L345.77601326181406 267.81171326024577 L333.776014225527 270.81176281980095 L322.5260151290078 273.8118123793562 L322.5260151290078 274.561824769245 L323.2760150687758 274.561824769245 L327.0260147676155 273.0617999894674 L342.02601356297436 269.31173804002333"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M367.5260115150844 263.3116389209129 L367.5260115150844 263.3116389209129"></path></g><g class="draw-path"><path fill-opacity="0" stroke="#00ff00" stroke-width="2" d="M363.02601187647673 264.81166370069053 L363.02601187647673 264.81166370069053 L363.02601187647673 267.81171326024577 L363.02601187647673 270.81176281980095 L360.7760120571729 282.061948668133 L360.026012117405 291.0620973467986 L360.026012117405 296.3121840760203 L360.026012117405 297.81220885579785 L360.026012117405 298.56222124568666"></path></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="144" cy="33" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="165" cy="33" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="394" cy="36" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="430" cy="36" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="114" cy="273" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="198" cy="273" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="367" cy="266" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="456" cy="263" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="469" cy="111" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="243" cy="189" r="5"></circle></g><g class="states new-svg"><circle fill-opacity="1" fill="grey" cx="103" cy="117" r="5"></circle></g></svg>';

    constructor(private el: ElementRef, private ref: ChangeDetectorRef) {
        this.originalTemplateSvg = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n' +
            'viewBox="0 0 570.000000 472.000000"\n' +
            ' preserveAspectRatio="xMidYMid meet">\n' +
            '<metadata>\n' +
            'Created by potrace 1.15, written by Peter Selinger 2001-2017\n' +
            '</metadata>\n' +
            '<g transform="translate(0.000000,472.000000) scale(0.100000,-0.100000)"\n' +
            'fill="#000000" stroke="none">\n' +
            '<path class="body" id="a1" d="M1492 4711 c-44 -12 -105 -53 -136 -94 -47 -62 -58 -102 -63 -246 -5\n' +
            '-168 -7 -175 -43 -213 -17 -17 -30 -34 -30 -38 0 -4 14 -13 30 -20 17 -7 30\n' +
            '-18 30 -25 0 -19 66 -38 106 -31 25 5 34 3 34 -7 0 -35 -127 -113 -215 -132\n' +
            '-85 -18 -108 -29 -139 -65 -45 -54 -56 -84 -75 -212 -16 -102 -27 -139 -64\n' +
            '-218 -24 -52 -53 -126 -63 -163 -9 -38 -30 -86 -45 -107 -44 -60 -63 -105\n' +
            '-118 -274 -75 -228 -121 -309 -197 -341 -17 -7 -51 -37 -73 -67 -23 -29 -55\n' +
            '-70 -71 -90 -30 -37 -30 -37 -9 -48 11 -6 27 -9 35 -6 18 7 18 -6 -1 -51 -21\n' +
            '-49 -20 -123 1 -123 8 0 22 17 30 38 27 69 47 112 50 110 1 -2 -4 -28 -12 -58\n' +
            '-26 -100 -13 -149 29 -112 15 14 17 13 17 -1 0 -19 21 -22 37 -6 6 6 22 16 34\n' +
            '23 17 8 28 29 42 76 10 36 26 92 37 125 10 33 27 92 36 130 14 57 28 84 76\n' +
            '145 121 155 258 380 258 424 0 9 24 77 54 149 29 73 61 157 70 187 52 165 85\n' +
            '226 50 92 -17 -68 -17 -70 4 -143 44 -151 54 -315 23 -356 -11 -13 -25 -50\n' +
            '-32 -81 -6 -31 -15 -62 -20 -68 -5 -7 -14 -47 -19 -91 -6 -54 -23 -115 -52\n' +
            '-189 l-43 -109 0 -255 c0 -140 2 -372 5 -515 l5 -260 -39 -90 c-64 -150 -69\n' +
            '-184 -60 -390 14 -321 13 -340 -26 -423 -31 -68 -33 -76 -21 -108 18 -51 7\n' +
            '-92 -40 -149 -23 -28 -48 -64 -55 -82 -8 -17 -18 -35 -24 -38 -15 -9 7 -35 29\n' +
            '-35 9 0 33 -9 54 -20 27 -14 43 -18 55 -11 11 6 24 6 34 0 23 -13 62 -2 85 23\n' +
            '12 14 18 37 19 78 1 31 9 81 19 110 12 35 15 67 11 97 -5 35 -2 50 14 71 18\n' +
            '24 19 32 9 82 -10 48 -9 65 10 133 12 43 44 127 71 187 l50 109 0 143 c0 137\n' +
            '2 149 41 283 22 77 50 169 63 205 13 36 35 131 50 212 15 80 38 195 52 255 14\n' +
            '59 30 131 36 158 l11 50 51 0 52 0 37 -160 c20 -88 49 -225 63 -305 14 -80 37\n' +
            '-174 50 -210 13 -36 42 -130 64 -208 41 -141 41 -147 39 -280 l-3 -137 56\n' +
            '-120 c71 -154 94 -246 78 -317 -10 -47 -9 -55 10 -80 16 -21 19 -36 14 -71 -4\n' +
            '-30 -1 -62 11 -96 9 -29 17 -77 16 -107 0 -43 5 -59 23 -81 21 -24 30 -27 87\n' +
            '-26 38 0 76 7 94 17 17 9 37 16 46 16 22 0 44 26 29 35 -6 3 -16 21 -24 38 -7\n' +
            '18 -30 52 -51 77 -20 24 -41 55 -46 68 -12 31 -11 79 1 87 17 11 11 40 -22\n' +
            '111 -33 69 -33 70 -29 194 3 69 5 202 5 295 l1 170 -50 120 c-58 140 -54 78\n' +
            '-41 705 l8 415 -27 70 c-52 137 -75 216 -75 263 0 26 -6 59 -14 74 -8 15 -20\n' +
            '52 -26 82 -6 30 -20 66 -31 79 -13 17 -19 41 -19 74 0 81 20 213 42 286 23 70\n' +
            '22 79 -18 227 -14 50 40 -80 62 -149 14 -47 47 -137 73 -200 26 -64 53 -138\n' +
            '60 -165 6 -27 21 -66 31 -87 28 -54 159 -250 229 -340 49 -64 61 -90 80 -160\n' +
            '55 -215 86 -303 110 -315 12 -6 28 -17 34 -23 16 -16 37 -13 37 6 0 14 2 15\n' +
            '18 1 38 -33 53 11 32 92 -22 85 -22 86 -2 50 11 -19 26 -54 32 -77 9 -31 19\n' +
            '-43 32 -43 15 0 18 8 18 44 0 24 -7 60 -15 79 -19 45 -19 58 -1 51 8 -3 24 0\n' +
            '36 6 l22 12 -29 31 c-17 18 -39 48 -51 67 -32 53 -71 90 -100 96 -61 13 -143\n' +
            '159 -196 349 -28 98 -65 186 -106 250 -21 33 -46 89 -55 125 -9 36 -38 112\n' +
            '-65 170 -40 88 -51 124 -64 219 -25 176 -63 228 -190 261 -90 23 -150 51 -201\n' +
            '92 -47 39 -47 61 -1 52 40 -7 106 12 106 31 0 7 14 18 30 25 35 14 39 35 10\n' +
            '50 -37 20 -47 59 -53 213 -7 160 -18 202 -71 265 -61 71 -179 107 -274 83z\n' +
            'm178 -31 c48 -24 108 -85 126 -126 7 -17 15 -92 19 -170 8 -182 11 -202 43\n' +
            '-231 22 -20 24 -26 12 -33 -29 -18 -47 -10 -63 28 -26 62 -28 76 -12 128 20\n' +
            '66 19 100 -4 116 -13 9 -20 32 -25 80 -15 141 -80 203 -206 196 -126 -7 -175\n' +
            '-55 -193 -188 -7 -54 -15 -80 -24 -80 -22 0 -26 -50 -10 -117 15 -64 13 -88\n' +
            '-13 -145 -14 -29 -34 -35 -60 -18 -12 7 -10 13 12 33 32 29 35 49 43 231 4 77\n' +
            '12 153 19 170 16 37 82 103 128 128 48 25 157 24 208 -2z m-39 -31 c56 -17 97\n' +
            '-65 105 -122 4 -28 3 -47 -3 -47 -5 0 -28 16 -51 35 l-41 35 -112 -31 c-62\n' +
            '-17 -118 -33 -126 -36 -17 -7 -17 37 1 80 32 77 131 114 227 86z m30 -135 c8\n' +
            '-9 31 -27 51 -40 30 -19 38 -31 38 -54 0 -19 7 -33 20 -40 23 -12 25 -41 9\n' +
            '-91 -19 -56 -29 -56 -23 2 7 66 -8 48 -25 -32 -7 -36 -21 -65 -36 -79 -25 -23\n' +
            '-35 -47 -15 -35 15 10 12 -13 -6 -41 -49 -74 -179 -71 -219 5 -11 23 -12 30\n' +
            '-2 34 8 3 3 14 -15 33 -17 18 -32 51 -39 84 -7 30 -16 59 -21 65 -11 13 -10\n' +
            '-38 2 -69 5 -14 6 -26 1 -26 -12 0 -31 48 -38 95 -5 37 -2 45 16 54 14 8 21\n' +
            '21 21 40 0 16 6 33 13 39 11 9 215 69 243 71 6 1 18 -6 25 -15z m-51 -493 c0\n' +
            '-6 -9 -47 -20 -93 -38 -159 -15 -202 42 -78 l32 69 26 -24 c29 -28 70 -45 108\n' +
            '-45 46 0 10 -17 -63 -29 -38 -7 -80 -19 -92 -27 -50 -32 -70 -120 -58 -250 10\n' +
            '-105 25 -76 25 49 0 155 21 184 150 207 38 7 76 21 96 36 l32 25 8 -33 c5 -18\n' +
            '9 -98 9 -178 1 -80 5 -180 10 -222 7 -74 7 -80 -19 -118 -31 -47 -64 -63 -112\n' +
            '-54 -46 8 -115 56 -138 94 -18 32 -18 32 -38 12 -26 -26 -36 -103 -16 -131 15\n' +
            '-21 147 -121 160 -121 5 0 8 27 8 60 0 33 4 60 10 60 6 0 10 -18 10 -39 0 -22\n' +
            '5 -43 11 -46 7 -5 5 -13 -5 -24 -11 -12 -14 -35 -12 -92 2 -42 6 -81 10 -87 3\n' +
            '-6 2 -13 -4 -17 -6 -4 -10 4 -10 19 0 38 -23 52 -93 60 -79 8 -93 3 -101 -36\n' +
            '-17 -85 6 -127 72 -129 l37 -1 -39 -8 c-55 -10 -76 -40 -78 -109 l-1 -56 -6\n' +
            '61 c-8 87 -26 104 -108 104 -36 0 -63 4 -63 10 0 7 23 8 64 4 57 -6 66 -4 85\n' +
            '15 20 20 21 29 15 79 -4 31 -12 61 -18 65 -6 4 -27 5 -46 2 -19 -2 -49 -5 -67\n' +
            '-5 -38 0 -63 -22 -63 -56 0 -15 -4 -23 -10 -19 -6 4 -7 11 -4 17 14 23 13 153\n' +
            '-2 175 -8 14 -10 24 -4 28 6 3 10 24 10 46 0 21 5 39 10 39 6 0 10 -27 10 -60\n' +
            '0 -33 3 -60 8 -60 11 0 143 98 158 118 20 26 17 83 -7 122 -20 32 -22 33 -35\n' +
            '15 -8 -10 -14 -22 -14 -26 0 -3 -24 -23 -52 -42 -90 -61 -148 -57 -196 13 -22\n' +
            '32 -23 41 -17 115 4 44 8 150 9 235 1 85 6 165 10 177 l7 23 32 -24 c20 -16\n' +
            '58 -29 102 -37 123 -21 145 -53 145 -214 0 -119 16 -143 25 -41 12 130 -8 218\n' +
            '-58 250 -12 8 -53 20 -92 27 -87 14 -100 25 -39 32 34 3 54 13 77 35 l31 31\n' +
            '33 -69 c61 -126 82 -75 39 93 l-22 87 48 0 c26 0 48 -4 48 -9z m-400 -199\n' +
            'c-10 -80 -27 -108 -122 -197 -95 -88 -99 -86 -74 35 21 102 61 169 116 198 24\n' +
            '12 54 22 65 22 20 0 21 -4 15 -58z m805 28 c44 -27 90 -121 106 -212 6 -37 9\n' +
            '-72 7 -78 -2 -6 -42 25 -90 69 -90 85 -110 119 -123 210 l-6 44 36 -6 c20 -3\n' +
            '51 -15 70 -27z m-881 -301 c-2 -73 -6 -89 -42 -163 -22 -45 -69 -116 -104\n' +
            '-158 -35 -42 -64 -75 -64 -75 -3 3 65 288 77 325 11 32 112 152 128 152 3 0 5\n' +
            '-36 5 -81z m928 23 c30 -31 60 -74 67 -94 13 -38 80 -322 77 -325 -1 -1 -29\n' +
            '32 -64 74 -34 42 -81 113 -104 159 -36 73 -41 93 -44 164 -2 44 0 80 5 80 4 0\n' +
            '33 -26 63 -58z m-334 -326 c19 -6 22 -15 22 -62 0 -41 -3 -53 -12 -48 -25 14\n' +
            '-103 78 -120 97 -18 19 -25 87 -11 100 3 4 27 -13 53 -37 26 -24 56 -47 68\n' +
            '-50z m-778 -151 c0 -2 -25 -37 -55 -77 -31 -40 -87 -136 -125 -213 -40 -80\n' +
            '-93 -169 -124 -208 l-54 -69 23 -34 c32 -47 39 -88 25 -140 -11 -39 -16 -44\n' +
            '-48 -50 -19 -4 -55 -2 -80 4 -55 12 -60 7 -94 -83 -31 -81 -38 -39 -8 48 25\n' +
            '75 62 120 111 136 36 12 77 46 67 57 -3 3 -23 -6 -43 -21 -21 -14 -44 -25 -52\n' +
            '-25 -7 0 -33 -20 -57 -45 -25 -25 -52 -45 -62 -45 -15 0 -14 4 8 28 14 15 40\n' +
            '50 57 78 30 50 63 74 101 74 22 0 63 47 94 109 13 25 53 133 90 240 36 107 80\n' +
            '216 97 242 l31 48 49 -24 c27 -14 49 -27 49 -30z m1359 6 c17 -27 61 -135 96\n' +
            '-240 36 -105 76 -213 89 -240 33 -64 73 -111 96 -111 38 0 71 -24 101 -74 17\n' +
            '-28 43 -63 57 -78 22 -25 23 -28 7 -28 -10 0 -35 18 -57 41 -21 22 -55 47 -76\n' +
            '56 -20 8 -45 22 -55 31 -9 8 -20 12 -24 9 -11 -12 29 -47 67 -58 20 -6 48 -25\n' +
            '62 -43 30 -37 68 -136 67 -174 0 -26 -1 -26 -16 8 -44 101 -56 121 -72 115\n' +
            '-34 -13 -109 -17 -129 -6 -26 14 -46 73 -38 116 4 18 17 49 30 67 l23 35 -53\n' +
            '69 c-30 38 -85 132 -124 209 -38 77 -94 173 -125 213 -30 40 -55 75 -55 77 0\n' +
            '3 84 51 96 55 1 0 16 -22 33 -49z m-1350 -153 c-35 -69 -137 -228 -188 -292\n' +
            '-89 -113 -86 -110 -99 -94 -9 11 -4 25 25 69 19 30 50 70 68 89 18 19 53 63\n' +
            '77 97 62 89 132 181 136 178 2 -2 -7 -23 -19 -47z m1267 -43 c22 -27 54 -70\n' +
            '69 -95 15 -25 44 -63 65 -85 21 -22 54 -65 74 -95 32 -49 34 -56 20 -70 -14\n' +
            '-13 -16 -13 -25 2 -5 10 -36 50 -67 90 -81 102 -212 316 -212 345 0 4 8 -4 17\n' +
            '-17 9 -14 36 -47 59 -75z m-688 28 c3 -48 1 -54 -21 -64 -16 -7 -42 -8 -78 -2\n' +
            'l-54 8 0 50 c0 44 3 50 25 56 14 4 48 7 75 6 l50 -2 3 -52z m182 48 c22 -6 25\n' +
            '-12 25 -56 l0 -50 -55 -8 c-81 -11 -100 0 -100 61 0 27 3 52 7 55 8 9 90 7\n' +
            '123 -2z m-405 -58 c46 -51 50 -59 50 -107 0 -57 -44 -166 -67 -166 -8 0 -38\n' +
            '22 -67 49 -58 54 -59 55 -31 161 11 45 49 121 59 119 3 -1 29 -26 56 -56z\n' +
            'm583 15 c25 -52 52 -139 52 -169 0 -24 -93 -119 -117 -119 -23 0 -56 82 -61\n' +
            '151 l-4 66 48 56 c27 30 52 56 55 56 3 1 16 -18 27 -41z m-410 -129 c45 -15\n' +
            '52 -52 52 -261 0 -136 -3 -178 -12 -178 -21 0 -34 13 -51 47 -20 37 -77 311\n' +
            '-77 366 0 34 2 37 29 37 15 0 42 -5 59 -11z m242 -27 c0 -37 -51 -306 -66\n' +
            '-347 -10 -28 -45 -65 -61 -65 -10 0 -13 37 -13 178 0 97 5 194 10 214 11 40\n' +
            '39 56 98 57 31 1 32 -1 32 -37z m-326 -167 c22 -139 40 -205 67 -238 18 -24\n' +
            '27 -27 85 -27 36 0 74 5 86 11 31 17 55 83 78 224 29 180 29 179 52 125 11\n' +
            '-25 29 -55 40 -67 19 -20 19 -24 6 -45 -8 -13 -38 -76 -67 -140 -59 -130 -82\n' +
            '-159 -146 -183 -41 -16 -44 -16 -93 5 -55 24 -82 57 -121 150 -13 30 -39 86\n' +
            '-57 123 l-34 69 24 29 c13 15 30 45 36 65 17 49 23 34 44 -101z m-168 53 c28\n' +
            '-30 40 -70 64 -204 10 -60 33 -183 50 -274 22 -118 33 -204 35 -300 4 -139 3\n' +
            '-137 -25 30 -16 97 -85 401 -135 600 -25 97 -45 179 -45 183 0 12 32 -8 56\n' +
            '-35z m714 36 c0 -4 -29 -124 -65 -268 -59 -240 -109 -471 -134 -621 -8 -51 -9\n' +
            '-41 -6 75 2 99 12 179 35 300 17 91 40 214 50 274 11 60 25 125 31 145 15 47\n' +
            '89 126 89 95z m-770 -173 c-5 -30 -27 -93 -49 -140 -21 -47 -44 -99 -50 -116\n' +
            '-9 -25 -10 -16 -7 51 3 51 14 105 29 145 13 35 32 95 43 134 l18 70 13 -45\n' +
            'c10 -33 11 -59 3 -99z m836 -23 c24 -74 36 -132 39 -190 l5 -83 -19 55 c-10\n' +
            '30 -32 84 -50 120 -34 73 -54 158 -45 199 15 65 17 68 26 36 5 -16 25 -78 44\n' +
            '-137z m-655 -70 c33 -80 52 -113 87 -145 l44 -43 -35 -142 c-20 -79 -37 -152\n' +
            '-39 -163 -2 -11 -8 17 -12 63 -4 46 -27 180 -52 299 -58 283 -58 285 7 131z\n' +
            'm419 -110 c-23 -112 -48 -250 -55 -308 -7 -58 -13 -94 -14 -82 -1 13 -17 89\n' +
            '-37 168 l-36 144 44 43 c35 32 54 65 88 145 23 56 45 101 47 98 3 -3 -14 -96\n' +
            '-37 -208z m-469 -294 c11 -56 10 -66 -16 -145 -35 -107 -73 -179 -95 -179 -32\n' +
            '0 -58 71 -86 236 -35 207 -28 272 54 469 12 28 24 59 28 70 6 18 77 -261 115\n' +
            '-451z m629 439 c0 -8 15 -50 34 -92 34 -76 66 -202 66 -262 0 -17 -11 -99 -26\n' +
            '-182 -26 -156 -52 -227 -84 -227 -22 0 -55 61 -91 167 -31 92 -35 123 -20 169\n' +
            '5 16 31 124 57 241 26 116 51 210 56 207 4 -3 8 -12 8 -21z m-825 -644 l37\n' +
            '-166 -27 -62 c-15 -33 -32 -61 -36 -61 -5 0 -9 69 -9 153 0 85 -3 190 -6 233\n' +
            '-4 43 -5 77 -2 74 3 -3 22 -80 43 -171z m937 -61 c-2 -126 -8 -228 -12 -228\n' +
            '-4 0 -20 28 -35 62 l-28 62 39 167 c21 93 39 167 40 166 0 -1 -1 -104 -4 -229z\n' +
            'm-705 -65 c-3 -74 -9 -103 -31 -147 -15 -31 -32 -56 -37 -56 -6 0 -9 50 -6\n' +
            '133 3 117 7 141 33 207 l29 75 8 -60 c4 -33 6 -101 4 -152z m488 106 c22 -58\n' +
            '25 -80 25 -195 -1 -118 -2 -127 -16 -109 -37 48 -55 99 -61 173 -7 95 5 247\n' +
            '18 217 4 -11 20 -50 34 -86z m-593 -214 c-4 -103 -3 -115 13 -121 10 -4 26 -2\n' +
            '36 5 11 6 19 8 19 3 0 -24 -44 -162 -62 -192 -24 -41 -92 -209 -107 -266 -6\n' +
            '-23 -16 -111 -21 -195 -11 -167 -18 -228 -28 -244 -4 -5 -9 -46 -12 -90 -5\n' +
            '-73 -7 -80 -25 -77 -18 3 -17 0 8 -25 32 -35 33 -48 7 -131 -11 -35 -20 -88\n' +
            '-20 -118 0 -42 -4 -55 -19 -64 -25 -13 -51 -13 -51 0 0 6 8 10 18 10 24 0 34\n' +
            '10 23 24 -5 6 -11 20 -13 31 -3 16 -9 11 -32 -27 -18 -31 -35 -48 -47 -48 -25\n' +
            '0 -24 8 3 37 31 33 13 42 -20 10 -33 -31 -66 -39 -39 -9 26 29 20 38 -8 12\n' +
            '-26 -25 -47 -21 -26 4 7 8 10 20 6 27 -4 6 12 31 38 57 49 51 71 88 82 140 6\n' +
            '29 4 34 -14 39 -12 3 -21 13 -21 24 0 22 33 81 77 136 43 54 48 69 75 248 18\n' +
            '126 22 186 20 375 -1 124 -5 249 -8 278 -5 45 -3 57 14 75 32 36 62 99 62 134\n' +
            '0 29 3 33 27 31 14 -2 28 3 31 10 2 6 7 12 12 12 4 0 5 -52 2 -115z m699 92\n' +
            'c16 4 19 0 19 -26 0 -40 20 -88 53 -127 34 -41 36 -100 5 -158 -35 -65 -48\n' +
            '-76 -87 -76 -25 0 -32 -3 -24 -11 6 -6 26 -9 44 -7 29 3 37 10 58 51 13 26 25\n' +
            '47 26 45 1 -2 -1 -34 -6 -73 -17 -152 -7 -348 31 -580 17 -107 19 -113 79\n' +
            '-201 65 -96 74 -128 40 -137 -18 -5 -20 -10 -14 -39 11 -50 40 -98 85 -143 23\n' +
            '-23 38 -46 35 -54 -3 -7 0 -20 6 -28 21 -24 0 -27 -26 -3 -28 26 -34 17 -8\n' +
            '-12 27 -30 -6 -22 -39 9 -33 32 -51 23 -20 -10 25 -27 28 -47 7 -47 -8 0 -29\n' +
            '23 -47 50 -24 37 -34 46 -37 33 -2 -10 -7 -23 -12 -29 -11 -14 -1 -24 23 -24\n' +
            '10 0 18 -4 18 -10 0 -13 -26 -13 -51 0 -15 9 -19 22 -19 64 0 30 -9 83 -20\n' +
            '118 -26 83 -25 96 8 131 26 29 26 30 5 24 -22 -5 -23 -3 -23 63 0 38 -4 80 -9\n' +
            '93 -14 35 -19 81 -31 250 -5 81 -14 167 -20 192 -12 54 -80 227 -108 275 -18\n' +
            '30 -62 168 -62 192 0 5 8 3 19 -3 10 -7 26 -9 36 -5 16 6 17 18 13 121 -5 111\n' +
            '-5 114 14 101 11 -8 28 -12 39 -9z m175 -474 c28 -83 31 -156 10 -258 -8 -38\n' +
            '-17 -112 -21 -162 -4 -51 -10 -93 -14 -93 -7 0 -28 180 -47 384 -3 32 -2 111\n' +
            '2 175 l7 116 19 -45 c11 -25 30 -77 44 -117z m-1032 -113 c-7 -133 -35 -382\n' +
            '-44 -399 -4 -7 -10 31 -14 85 -4 55 -14 131 -22 169 -26 130 -14 222 52 370\n' +
            'l18 40 8 -85 c4 -47 5 -128 2 -180z m153 -27 l-3 -138 -47 -95 -48 -95 5 112\n' +
            'c5 92 12 132 42 225 37 116 42 128 50 128 2 0 3 -62 1 -137z m702 28 c35 -104\n' +
            '54 -218 49 -300 l-3 -53 -47 105 -48 105 0 128 c0 72 4 124 9 119 4 -6 23 -52\n' +
            '40 -104z"/>\n' +
            '<path class="body" id="b1" d="M1453 3138 c-81 -50 -83 -52 -83 -89 l0 -39 78 6 c42 4 86 12 97 19\n' +
            '16 10 24 10 40 0 11 -8 54 -15 95 -17 l75 -3 3 36 c3 35 1 38 -65 78 -37 23\n' +
            '-76 47 -86 54 -15 10 -20 9 -31 -6 -12 -15 -14 -16 -20 -2 -3 8 -9 15 -13 15\n' +
            '-4 -1 -45 -24 -90 -52z"/>\n' +
            '<path class="body" id="c1" d="M4022 4701 c-51 -18 -104 -57 -123 -93 -14 -25 -49 -216 -58 -318 -7\n' +
            '-74 -13 -95 -31 -115 l-23 -24 27 -11 c15 -5 59 -10 97 -10 l70 0 -7 -47 c-17\n' +
            '-121 -60 -160 -221 -204 -122 -33 -175 -69 -226 -150 -26 -43 -57 -145 -57\n' +
            '-189 0 -26 -13 -68 -34 -113 -18 -40 -38 -98 -45 -130 -6 -32 -19 -70 -30 -85\n' +
            '-60 -86 -145 -347 -181 -562 -13 -76 -25 -120 -37 -131 -10 -10 -63 -41 -118\n' +
            '-69 -115 -59 -134 -75 -118 -91 8 -8 25 -8 59 -1 27 6 50 10 51 8 7 -6 -49\n' +
            '-107 -81 -144 -51 -62 -47 -78 14 -47 36 19 37 14 5 -33 -28 -40 -32 -62 -12\n' +
            '-62 14 0 98 84 115 115 21 38 14 -26 -9 -74 -20 -45 -14 -72 13 -55 7 5 21 7\n' +
            '30 6 20 -4 50 40 74 108 9 25 26 70 39 100 14 30 34 91 45 134 19 73 56 150\n' +
            '169 357 50 92 74 160 92 259 8 45 24 93 41 120 15 25 50 101 78 169 63 154 69\n' +
            '166 81 154 11 -11 63 -269 79 -394 11 -85 11 -88 -15 -139 -34 -67 -52 -128\n' +
            '-60 -199 -4 -31 -20 -86 -37 -124 -63 -143 -73 -357 -28 -622 33 -193 62 -440\n' +
            '67 -575 5 -113 3 -136 -20 -222 -33 -124 -57 -259 -57 -325 0 -33 10 -78 26\n' +
            '-120 31 -80 33 -169 9 -301 -21 -110 -30 -132 -55 -132 -26 0 -90 -47 -90 -66\n' +
            '0 -8 16 -37 35 -65 19 -28 39 -68 45 -88 13 -48 43 -75 102 -91 38 -10 51 -10\n' +
            '74 1 36 18 45 54 31 134 -10 59 -9 69 11 110 26 55 27 73 5 120 -25 52 -6 148\n' +
            '57 290 61 137 69 175 74 340 3 81 10 145 19 170 26 70 118 688 143 965 l8 85\n' +
            '8 -90 c11 -124 56 -481 68 -530 5 -22 16 -96 25 -165 18 -137 38 -239 55 -285\n' +
            '6 -16 13 -88 15 -160 5 -161 13 -199 74 -333 28 -62 54 -137 61 -177 12 -66\n' +
            '11 -74 -10 -123 l-22 -51 28 -48 c26 -46 27 -50 16 -113 -13 -80 -7 -116 25\n' +
            '-137 22 -14 31 -15 72 -4 68 18 86 33 111 98 13 32 36 76 52 97 15 22 28 45\n' +
            '28 52 0 17 -62 61 -90 66 -21 2 -27 13 -43 68 -25 92 -39 242 -27 288 5 20 19\n' +
            '66 31 101 21 60 22 70 11 165 -6 56 -26 155 -43 221 -26 97 -32 138 -32 215 1\n' +
            '97 38 420 74 635 43 264 33 467 -31 599 -18 38 -33 91 -40 140 -6 50 -24 111\n' +
            '-46 163 l-36 83 12 88 c16 116 58 336 71 370 l11 27 18 -36 c11 -20 38 -83 61\n' +
            '-140 24 -57 57 -129 74 -159 21 -36 38 -86 49 -144 18 -96 48 -174 97 -257 72\n' +
            '-123 149 -291 169 -370 11 -45 26 -92 34 -103 7 -12 20 -46 29 -77 21 -69 57\n' +
            '-124 82 -124 11 0 26 -4 33 -9 27 -17 30 10 7 64 -13 30 -24 61 -25 68 0 23\n' +
            '15 12 38 -28 25 -45 86 -95 102 -85 7 4 2 21 -15 50 -31 54 -31 62 0 41 27\n' +
            '-18 55 -21 55 -6 0 5 -15 27 -34 47 -31 36 -91 141 -84 148 2 2 25 -1 52 -7\n' +
            '58 -12 78 0 47 29 -12 11 -64 42 -117 69 -53 27 -105 59 -115 72 -10 13 -21\n' +
            '49 -24 80 -17 151 -116 486 -170 573 -23 37 -44 91 -56 141 -11 45 -30 102\n' +
            '-43 127 -14 25 -27 71 -29 101 -6 69 -38 155 -78 209 -42 59 -105 95 -210 121\n' +
            '-143 36 -199 90 -215 206 l-6 51 55 -5 c72 -6 127 4 127 23 0 8 -4 15 -8 15\n' +
            '-15 0 -32 49 -32 93 -1 64 -46 310 -64 344 -49 97 -210 140 -344 94z m232 -21\n' +
            'c49 -22 92 -65 106 -105 15 -48 50 -254 50 -302 0 -24 7 -59 15 -79 18 -44 8\n' +
            '-49 -70 -39 l-55 6 0 42 c0 49 8 63 35 68 38 8 62 152 27 163 -14 5 -18 17\n' +
            '-18 60 -1 64 -24 107 -76 141 -85 56 -200 53 -280 -8 -47 -36 -73 -98 -64\n' +
            '-154 4 -25 1 -33 -14 -38 -29 -9 -32 -36 -12 -101 14 -45 23 -60 39 -62 21 -3\n' +
            '33 -35 33 -88 0 -20 -6 -23 -55 -29 -67 -9 -89 -2 -77 22 5 10 13 50 17 88 13\n' +
            '129 46 297 65 336 48 94 212 132 334 79z m-53 -31 c87 -29 136 -98 125 -175\n' +
            '-4 -36 -2 -44 16 -56 21 -14 21 -17 9 -71 -8 -36 -18 -57 -26 -57 -43 0 -121\n' +
            '-25 -142 -46 -19 -19 -23 -34 -23 -81 0 -92 43 -231 93 -297 12 -16 9 -27 -25\n' +
            '-94 -37 -75 -60 -139 -83 -236 l-11 -49 -22 89 c-12 49 -41 130 -65 179 l-44\n' +
            '90 38 70 c61 112 88 273 54 322 -16 23 -53 37 -122 48 -38 6 -44 10 -53 43\n' +
            '-14 53 -12 80 7 91 13 7 16 20 14 59 -3 55 13 93 51 129 52 49 137 66 209 42z\n' +
            'm-254 -783 c44 -39 102 -141 127 -226 9 -30 26 -115 37 -189 10 -74 21 -136\n' +
            '23 -138 2 -2 9 38 16 89 36 268 97 419 195 484 18 11 31 10 99 -14 65 -22 76\n' +
            '-28 61 -37 -90 -52 -111 -72 -142 -135 -18 -36 -50 -119 -72 -185 -22 -67 -65\n' +
            '-175 -96 -240 l-57 -119 11 -71 c15 -88 53 -172 112 -251 25 -34 49 -66 53\n' +
            '-72 3 -6 -16 -41 -44 -77 -68 -89 -106 -168 -123 -251 l-14 -68 -12 63 c-17\n' +
            '86 -47 151 -115 244 -31 43 -56 81 -56 83 0 3 18 26 39 52 81 97 131 219 131\n' +
            '317 0 42 -10 74 -54 166 -30 63 -65 150 -79 194 -33 108 -85 233 -112 270 -13\n' +
            '17 -49 45 -80 62 l-57 30 48 12 c27 7 60 18 74 26 36 20 42 19 87 -19z m-177\n' +
            '-56 c45 -23 84 -65 109 -115 l19 -40 -21 -23 c-12 -13 -48 -40 -81 -59 -54\n' +
            '-33 -67 -37 -160 -43 -55 -3 -112 -12 -125 -19 l-24 -13 6 53 c12 119 75 224\n' +
            '162 268 42 22 56 21 115 -9z m857 0 c78 -45 136 -143 149 -254 l7 -58 -24 13\n' +
            'c-13 7 -70 16 -126 19 -91 6 -108 11 -155 39 -29 18 -66 44 -82 57 -27 24 -27\n' +
            '27 -15 57 21 50 79 108 134 133 28 13 52 24 55 24 3 0 28 -14 57 -30z m-1059\n' +
            '-307 c-2 -5 -15 -31 -30 -58 -39 -74 -58 -151 -66 -261 -5 -75 -11 -99 -24\n' +
            '-108 -9 -5 -21 -7 -25 -2 -12 12 -7 245 6 292 16 58 51 106 91 126 37 19 54\n' +
            '23 48 11z m117 -15 c-12 -40 -77 -128 -124 -168 -25 -22 -47 -37 -49 -35 -9 8\n' +
            '19 95 49 160 l32 65 49 0 c46 0 49 -1 43 -22z m1023 -45 c35 -79 55 -139 50\n' +
            '-153 -6 -18 -100 73 -140 134 -50 78 -49 86 11 86 l48 0 31 -67z m90 9 c38\n' +
            '-46 52 -114 52 -254 0 -102 -3 -128 -14 -128 -25 0 -33 24 -40 115 -7 109 -24\n' +
            '173 -65 254 -17 34 -31 64 -31 66 0 14 78 -29 98 -53z m-973 -8 c27 -8 73 -14\n' +
            '102 -14 47 0 55 -3 62 -23 5 -13 33 -73 61 -132 60 -123 64 -161 30 -260 -27\n' +
            '-79 -125 -225 -150 -225 -5 0 -31 44 -58 98 -46 91 -50 107 -71 252 -12 85\n' +
            '-31 192 -41 238 -24 101 -24 96 -2 87 9 -4 39 -14 67 -21z m705 20 c0 -3 -7\n' +
            '-29 -15 -57 -8 -29 -28 -137 -44 -242 -29 -181 -32 -194 -77 -280 -26 -49 -49\n' +
            '-92 -51 -95 -3 -3 -25 17 -49 43 -83 92 -147 260 -125 332 5 17 34 82 65 146\n' +
            'l56 116 73 6 c39 3 90 12 112 20 48 17 55 19 55 11z m-1125 -410 c8 -60 -16\n' +
            '-162 -75 -324 -21 -58 -46 -134 -55 -170 -16 -60 -34 -106 -35 -87 0 12 68\n' +
            '361 85 432 8 33 22 94 31 135 9 41 19 79 22 84 8 14 19 -15 27 -70z m1505 7\n' +
            'c0 -8 11 -62 24 -120 35 -150 98 -473 93 -477 -2 -3 -14 31 -26 73 -12 43 -42\n' +
            '132 -65 198 -61 169 -80 254 -72 322 4 31 9 61 13 66 7 12 32 -36 33 -62z m60\n' +
            '-47 c17 -36 39 -97 50 -137 23 -85 61 -269 56 -274 -11 -12 -165 448 -166 496\n' +
            '0 17 35 -33 60 -85z m-1624 39 c-16 -92 -141 -452 -152 -440 -8 8 56 283 81\n' +
            '346 24 62 62 131 72 131 3 0 2 -17 -1 -37z m154 8 c0 -40 -53 -199 -87 -261\n' +
            '-20 -36 -51 -96 -70 -134 -19 -37 -36 -67 -38 -64 -2 2 12 45 31 97 19 51 51\n' +
            '150 69 219 24 88 42 132 56 145 27 22 39 22 39 -2z m1307 1 c15 -12 30 -51 52\n' +
            '-135 18 -65 50 -166 71 -224 44 -118 49 -138 19 -78 -12 22 -45 83 -74 135\n' +
            '-54 97 -74 148 -99 258 -15 67 -9 76 31 44z m-904 -285 c31 -61 33 -67 11 -67\n' +
            '-9 0 -43 -28 -76 -62 -59 -62 -154 -138 -170 -138 -12 0 -2 30 34 108 17 35\n' +
            '32 82 35 105 6 48 25 74 68 93 54 24 68 18 98 -39z m563 37 c43 -20 64 -49 64\n' +
            '-87 0 -16 15 -64 34 -106 45 -100 52 -126 35 -116 -32 19 -138 108 -183 155\n' +
            '-27 27 -55 50 -62 50 -20 0 -17 16 13 71 29 54 44 59 99 33z m-1223 -226 c-18\n' +
            '-90 -33 -180 -33 -202 0 -48 -92 -307 -105 -294 -3 2 4 28 15 56 11 29 20 62\n' +
            '19 75 -1 15 -5 9 -14 -19 -13 -42 -65 -128 -72 -120 -2 2 4 21 15 43 11 21 23\n' +
            '57 27 81 10 61 -15 56 -54 -12 -25 -45 -91 -111 -91 -92 0 3 20 36 45 73 25\n' +
            '36 43 68 41 71 -3 2 -26 -12 -52 -32 -26 -20 -49 -34 -52 -32 -2 3 12 24 31\n' +
            '46 32 38 85 145 76 154 -2 3 -28 0 -58 -6 -29 -5 -55 -7 -58 -5 -6 7 163 97\n' +
            '182 97 32 0 83 67 115 152 38 103 49 128 53 128 2 0 -12 -73 -30 -162z m1792\n' +
            '72 c14 -41 39 -98 55 -126 24 -42 37 -53 71 -63 52 -16 194 -94 180 -99 -6 -2\n' +
            '-34 1 -62 7 -29 6 -53 10 -55 9 -6 -7 59 -134 88 -171 34 -43 30 -42 -36 5\n' +
            '-22 15 -41 26 -44 24 -2 -3 13 -31 35 -63 61 -90 61 -91 33 -72 -14 8 -43 43\n' +
            '-65 77 -50 76 -70 81 -61 16 3 -26 15 -62 27 -81 12 -19 19 -37 16 -40 -9 -8\n' +
            '-65 84 -72 118 -4 16 -11 31 -16 35 -12 7 -3 -32 23 -101 13 -37 14 -45 3 -31\n' +
            '-8 11 -22 40 -31 65 -9 25 -28 73 -41 107 -12 33 -23 79 -23 101 0 35 -49 301\n' +
            '-66 358 -4 13 -3 17 4 10 5 -5 22 -44 37 -85z m-1019 -31 c60 -92 86 -166 91\n' +
            '-259 4 -62 1 -80 -16 -107 -26 -42 -97 -82 -195 -110 -49 -15 -91 -34 -107\n' +
            '-49 -38 -36 -77 -128 -86 -204 l-8 -65 -25 170 c-25 169 -34 390 -18 445 5 17\n' +
            '34 45 82 78 41 28 88 69 105 91 27 33 99 81 124 81 4 0 28 -32 53 -71z m359\n' +
            '40 c17 -10 43 -34 58 -54 15 -19 60 -58 100 -86 40 -27 75 -56 79 -63 17 -31\n' +
            '19 -214 3 -326 -8 -63 -21 -158 -27 -210 l-12 -95 -11 70 c-13 73 -59 177 -92\n' +
            '207 -10 10 -48 25 -83 34 -193 49 -256 126 -226 274 18 86 53 164 102 231 39\n' +
            '54 48 55 109 18z m-269 -521 c-3 -51 -13 -142 -21 -203 -9 -60 -21 -153 -29\n' +
            '-205 l-13 -95 -7 110 c-12 188 -25 339 -32 372 -6 28 -2 33 42 64 27 18 51 36\n' +
            '52 41 11 26 14 -3 8 -84z m159 13 c1 -3 -3 -58 -11 -121 -7 -63 -16 -177 -20\n' +
            '-253 -3 -76 -8 -137 -9 -135 -3 3 -29 192 -55 403 -5 39 -9 93 -10 122 l0 52\n' +
            '51 -31 c27 -18 52 -34 54 -37z m-266 -99 c20 -156 10 -295 -35 -536 l-27 -139\n' +
            '-23 63 c-18 46 -24 82 -24 139 1 111 27 513 35 533 6 15 22 24 51 27 7 1 16\n' +
            '-34 23 -87z m330 69 c24 -24 29 -69 41 -381 9 -227 9 -237 -12 -293 -12 -32\n' +
            '-24 -54 -28 -50 -9 11 -48 231 -60 338 -13 119 -13 237 1 330 12 80 23 91 58\n' +
            '56z m-423 -28 c-12 -66 -17 -121 -26 -342 -10 -210 -14 -243 -37 -315 -27 -81\n' +
            '-58 -141 -85 -163 -13 -11 -14 -5 -10 44 3 32 -5 127 -19 220 -21 151 -22 172\n' +
            '-10 278 20 181 61 269 136 292 56 16 57 16 51 -14z m540 -1 c11 -6 35 -38 53\n' +
            '-71 26 -49 35 -83 48 -184 16 -120 16 -129 -5 -275 -12 -83 -22 -185 -22 -227\n' +
            'l0 -77 -26 31 c-34 41 -82 168 -94 250 -5 36 -10 107 -10 158 0 87 -14 305\n' +
            '-25 384 l-5 37 33 -8 c18 -4 42 -12 53 -18z m-511 -899 c14 -230 -3 -381 -56\n' +
            '-504 -21 -47 -39 -57 -39 -20 0 10 -12 45 -27 77 -23 50 -27 72 -27 149 0 54\n' +
            '7 116 18 155 18 67 106 269 117 270 4 0 10 -57 14 -127z m454 45 c59 -111 93\n' +
            '-234 94 -338 0 -75 -4 -96 -35 -173 l-35 -89 -27 64 c-43 101 -56 186 -56 364\n' +
            '0 141 7 260 16 252 1 -2 21 -38 43 -80z m-595 -162 c-20 -58 -29 -110 -33\n' +
            '-186 -5 -89 -10 -110 -30 -139 l-24 -33 -13 23 c-32 58 -35 120 -15 250 25\n' +
            '156 41 199 91 256 22 25 41 51 42 57 1 6 4 -24 5 -68 3 -65 -1 -92 -23 -160z\n' +
            'm759 80 c25 -71 50 -250 45 -316 -3 -30 -11 -71 -19 -89 l-15 -35 -28 37 c-27\n' +
            '35 -29 45 -31 140 -2 80 -8 118 -29 178 -19 57 -26 95 -26 154 l0 78 43 -48\n' +
            'c23 -27 50 -71 60 -99z m-750 -462 c32 -73 33 -112 7 -221 -27 -113 -35 -250\n' +
            '-20 -347 13 -88 9 -98 -45 -94 l-30 3 5 60 c6 82 6 411 0 515 -5 78 -3 88 20\n' +
            '122 14 20 28 34 31 30 3 -4 18 -35 32 -68z m723 39 c17 -26 19 -54 20 -328 1\n' +
            '-165 3 -316 5 -335 4 -33 2 -35 -26 -38 -54 -4 -58 5 -45 99 14 100 6 226 -21\n' +
            '336 -26 109 -25 163 8 234 15 32 30 59 34 59 4 0 15 -12 25 -27z"/>\n' +
            '</g>\n' +
            '</svg>';
    }

    onAddSvg() {
        this.svgFromStorage = { svg: this.drwSvg };
        this.ref.markForCheck();
    }

    onZoomOut() {
        this.scale -= 0.02;
        this.ref.markForCheck();
    }

    onZoomIn() {
        this.scale += 0.02;
        this.ref.markForCheck();
    }
}
