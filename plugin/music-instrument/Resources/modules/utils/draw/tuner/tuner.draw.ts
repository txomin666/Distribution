import {CanvasDraw} from "../canvas.draw";
import {Instrument} from "../../../components/instrument/shared/instrument";

class TuningPegPosition {
    public x: number;

    public y: number;

    public clockwise: boolean;
}

export class TunerDraw extends CanvasDraw {
    private config: {
        headstock: string,
        strings: number,
        leftHanded: boolean
    } = {
        headstock: 'in-line',
        strings: 6,
        leftHanded: false
    };

    private tuningPegSize: number = 36;

    /**
     * Position of the Tuning pegs regarding to the Headstock format
     * Array are ordered from the lowest string to the higher one
     * @type {Object}
     */
    private tuningPegs: {
        'in-line': Array<TuningPegPosition>,
        'top-bottom': Array<TuningPegPosition>
    } = {
        'in-line': [
            { x: 100, y: 690, clockwise: true },
            { x: 145, y: 580, clockwise: true },
            { x: 170, y: 470, clockwise: true },

            { x: 195, y: 360, clockwise: true },
            { x: 225, y: 250, clockwise: true },
            { x: 250, y: 140, clockwise: true }
        ],

        'top-bottom': [
            // Left
            { x: 85,  y: 580, clockwise: true },
            { x: 105, y: 400, clockwise: true },
            { x: 100, y: 220, clockwise: true },

            // Right
            { x: 295, y: 175, clockwise: false },
            { x: 290, y: 355, clockwise: false },
            { x: 315, y: 535, clockwise: false }
        ]
    };
    
    /**
     * Redraw tuner.
     */
    public draw(instrument: Instrument): void {
        // Calculate Height of the Canvas from it's width (ratio=2.15)
        this.canvas.height = this.canvas.width * 2.15;

        // Reset translation
        this.context.translate(0,0);

        // Set scale (original drawing scale : w=400 / h=860)
        this.context.scale(this.canvas.width / 400, this.canvas.height / 860);

        this.drawHeadstock();
        this.drawNut();
        this.drawStrings();
    }

    /**
     * Draw : Headstock
     */
    private drawHeadstock(): void {
        // w=400 / h=860
        // ratio = 2.15
        // Start headstock
        this.context.beginPath();

        // Bottom line
        this.context.moveTo(100, 850);
        this.context.lineTo(300, 850);

        switch (this.config.headstock) {
            case 'top-bottom':
                this.context.bezierCurveTo(300, 850, 275, 745, 395, 590);
                this.context.bezierCurveTo(415, 500, 310, 440, 380, 5);
                this.context.bezierCurveTo(195, -30, 5,   125, 10,  150);
                this.context.bezierCurveTo(75,  270, 5,   625, 5,   625);
                this.context.bezierCurveTo(100, 730, 100, 850, 100, 850);

                break;

            case 'in-line':
                this.context.bezierCurveTo(300, 775, 385, 700, 385, 700);
                this.context.bezierCurveTo(315, 435, 355, 265, 365, 20);
                this.context.bezierCurveTo(365, 20,  355, -5,  340, 10);
                this.context.bezierCurveTo(275, 65,  275, 75,  205, 65);
                this.context.lineTo(15, 755);
                this.context.bezierCurveTo(100, 795, 100, 850, 100, 850);

                break;
        }

        // Finish headstock
        this.context.closePath();
        
        this.fillContext('rgba(0, 0, 0, 0.25)');
    }

    /**
     * Draw : Nut
     */
    private drawNut(): void {
        // Set shadow
        this.setContextShadow(0, 0, 10, 'black');

        this.context.beginPath();

        // Draw Nut
        this.context.rect(98, 836, 200, 18);

        this.context.closePath();

        this.fillContext('#555');
        this.strokeContext('#666', 2);
    }

    /**
     *
     * @param {number} string - current string
     * @returns {{x: number, y: number}}
     */
    private getTuningPegPosition(string: number): TuningPegPosition {
        let x = 0;
        let y = 0;
        let clockwise = true;

        switch (this.config.headstock) {
            case 'top-bottom':
                break;

            // TOP    : x=205 y=65
            // BOTTOM : x=15  y=755
            // HEIGHT : h=690
            // Tuning caps must be on A(260, 65) B(70, 755)
            case 'in-line':
                let h = 690;
                let start = 65;
                let b = { x: 260, y: start };
                let a = { x: 70,  y: start + h };

                // TODO : check if the size of the tuning peg is not bigger than interval
                let interval = h / this.config.strings;
                let currentInterval = (interval  * string) + ( interval / 2);

                let delta = Math.round(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));

                x = a.x + (( currentInterval * (b.x - a.x) ) / delta);
                y = a.y + (( currentInterval * (b.y - a.y) ) / delta);

                break;
        }

        x = this.fixPosition(x);
        y = this.fixPosition(y);

        return { x: x, y: y, clockwise: clockwise };
    }

    /**
     * Draw : Strings + Tuning pegs
     */
    private drawStrings(): void {
        // Tuning peg base circle = 38
        // Tuning peg hexagon     = 30
        // Tuning peg cap         = 16

        // Draw each string (from the lowest to the highest)
        // 1. Draw base of the tuning pegs
        for (let s = 0; s < this.config.strings; s++) {
            let position = this.getTuningPegPosition(s);
            this.drawTuningPeg(position);
        }

        // 2. Draw strings
        let intervalWidth = Math.round(200 / this.config.strings);
        let startX = 100 + (intervalWidth / 2);
        for (let s = 0; s < this.config.strings; s++) {
            let stringWidth = (this.config.strings + 1) - s;
            let position = this.getTuningPegPosition(s);
            this.drawString(startX, s, stringWidth, position);
            startX += intervalWidth;
        }

        // 3. Draw cap of the tuning pegs
        for (let s = 0; s < this.config.strings; s++) {
            let position = this.getTuningPegPosition(s);
            this.drawTuningPegCap(position);
        }
    }

    private drawTuningPeg(tuningPegPosition: TuningPegPosition): void {
        // Set shadow
        this.setContextShadow(0, 0, 10, 'black');

        // Draw first circle
        this.context.beginPath();
        this.context.arc(tuningPegPosition.x, tuningPegPosition.y, 38, 0, 2 * Math.PI, false);
        this.context.closePath();

        this.context.fillStyle = '#777';
        this.context.fill();

        // Draw hexagon
        this.context.beginPath();
        let radius = 30;
        let a = (Math.PI * 2) / 6;
        this.context.moveTo(radius + tuningPegPosition.x, tuningPegPosition.y);
        for (let i = 1; i < 6; i++) {
            this.context.lineTo((radius * Math.cos(a*i)) + tuningPegPosition.x, (radius * Math.sin(a*i)) + tuningPegPosition.y);
        }
        this.context.closePath();

        this.fillContext('#777');
        this.strokeContext('rgba(0, 0, 0, 0.5)', 1);
    }

    private drawString(startX: number, stringNum: number, stringWidth: number, tuningPegPosition: TuningPegPosition): void {
        // Set shadow
        this.setContextShadow(0, 0, 5, 'black');

        this.context.beginPath();

        // Start from nut
        this.context.moveTo(startX, 860);

        // Go vertically to the top of the nut
        this.context.lineTo(startX, 860 - 24);

        // Draw a line from the top of the nut to the tuning peg
        var tuningPegX = tuningPegPosition.clockwise ? (tuningPegPosition.x + 16 - stringWidth) : (tuningPegPosition.x - 16 + stringWidth);

        this.context.lineTo(tuningPegX, tuningPegPosition.y);

        this.strokeContext('#BBBBBB', stringWidth);
    }

    private drawTuningPegCap(tuningPegPosition: TuningPegPosition): void {
        // Set shadow
        this.setContextShadow(0, 0, 10, 'black');

        // Draw second circle
        this.context.beginPath();
        this.context.arc(tuningPegPosition.x, tuningPegPosition.y, 16, 0, 2 * Math.PI, false);
        this.context.closePath();

        var gradient = this.context.createRadialGradient(tuningPegPosition.x, tuningPegPosition.y, 3, tuningPegPosition.x, tuningPegPosition.y, 17);
        gradient.addColorStop(0, '#AAAAAA');
        gradient.addColorStop(1, '#666666');

        this.fillContext(gradient);
        this.strokeContext('#333333', 1);
    }
}
