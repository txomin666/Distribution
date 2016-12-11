import { AbstractProfile } from './abstract.profile';

export class GuitarProfile extends AbstractProfile {
    private temp: {
        values: Array<number>,
        period: number,
        current: number
    } = {
        values: [],
        period: 0,
        current: 0
    };
    public getName(): string {
        return 'guitar';
    }

    public attack(): number {
        return 0.002;
    };

    public dampen(): number {
        return 1;
    }

    public wave(i: number, sampleRate: number, frequency: number): number {
        let period = sampleRate / frequency;
        let p_hundredth = Math.floor((period - Math.floor(period)) * 100);

        let resetPlay = false;

        if (this.temp.values.length <= Math.ceil(period)) {
            this.temp.values.push(Math.round(Math.random()) * 2 - 1);

            return this.temp.values[this.temp.values.length-1];
        } else {
            this.temp.values[this.temp.current] = (this.temp.values[this.temp.current >= (this.temp.values.length - 1) ? 0 : this.temp.current + 1] + this.temp.values[this.temp.current]) * 0.5;

            if (this.temp.current >= Math.floor(period)) {
                if (this.temp.current < Math.ceil(period)) {
                    if ((this.temp.period % 100) >= p_hundredth) {
                        // Reset
                        resetPlay = true;
                        this.temp.values[this.temp.current+1] = (this.temp.values[0] + this.temp.values[this.temp.current+1]) * 0.5;
                        this.temp.period++;
                    }
                } else {
                    resetPlay = true;
                }
            }

            var _return = this.temp.values[this.temp.current];

            if (resetPlay) {
                this.temp.current = 0;
            } else {
                this.temp.current++;
            }

            return _return;
        }
    }

    public clear(): void {
        this.temp = {
            values: [],
            period: 0,
            current: 0
        };
    }
}