import { AbstractProfile } from './abstract.profile';

export class PianoProfile extends AbstractProfile {
    public getName(): string {
        return 'piano';
    }

    public attack(sampleRate: number, frequency: number, volume: number): number {
        return 0.002;
    }

    public dampen(sampleRate: number, frequency: number, volume: number): number {
        return Math.pow(0.5 * Math.log((frequency * volume) / sampleRate), 2);
    }

    public wave(i: number, sampleRate: number, frequency: number, volume: number): number {
        var base = this.modulations[0];

        return this.modulations[1](
            i,
            sampleRate,
            frequency,
            Math.pow(base(i, sampleRate, frequency, 0), 2) + (0.75 * base(i, sampleRate, frequency, 0.25)) + (0.1 * base(i, sampleRate, frequency, 0.5))
        );
    }

    public clear(): void {}
}