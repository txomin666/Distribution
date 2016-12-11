import { AbstractProfile } from './profile/abstract.profile';

export class Synthesizer {
    private _bitsPerSample: number = 16;

    private _channels: number = 1;

    private _sampleRate: number = 44100;

    private _volume: number = 32768;

    private profile: AbstractProfile;

    constructor(profile: AbstractProfile) {
        this.profile = profile;
    }

    public setSampleRate(v: number): number {
        this._sampleRate = Math.max(Math.min(v|0, 44100), 4000);

        return this._sampleRate;
    }

    public getSampleRate(): number {
        return this._sampleRate;
    }

    public setVolume(v: number): number {
        v = Math.round(v * 32768);

        this._volume = Math.max(Math.min(v|0, 32768), 0);

        return this._volume;
    }

    public getVolume(): number {
        return Math.round(this._volume / 32768 * 10000) / 10000;
    }

    public play(frequency: number = 440, duration: number = 1): HTMLAudioElement {
        const src = this.generate(frequency, duration);
        const audio = new Audio(src);

        audio.play();

        return audio;
    }

    public generate(frequency: number = 440, duration: number = 1) {
        const attack = this.profile.attack(this._sampleRate, frequency, this._volume);
        const dampen = this.profile.dampen(this._sampleRate, frequency, this._volume);

        var val = 0;

        var data = new Uint8Array(new ArrayBuffer(Math.ceil(this._sampleRate * duration * 2)));
        var attackLen = (this._sampleRate * attack) | 0;
        var decayLen = (this._sampleRate * duration) | 0;

        for (var i = 0 | 0; i !== attackLen; i++) {
            val = this._volume * (i/(this._sampleRate*attack)) * this.profile.wave(i, this._sampleRate, frequency, this._volume);

            data[i << 1] = val;
            data[(i << 1) + 1] = val >> 8;
        }

        for (; i !== decayLen; i++) {
            val = this._volume * Math.pow((1-((i-(this._sampleRate*attack))/(this._sampleRate*(duration-attack)))),dampen) * this.profile.wave(i, this._sampleRate, frequency, this._volume);

            data[i << 1] = val;
            data[(i << 1) + 1] = val >> 8;
        }

        var out = [
            'RIFF',
            this.pack(1, 4 + (8 + 24/* chunk 1 length */) + (8 + 8/* chunk 2 length */)), // Length
            'WAVE',
            // chunk 1
            'fmt ', // Sub-chunk identifier
            this.pack(1, 16), // Chunk length
            this.pack(0, 1), // Audio format (1 is linear quantization)
            this.pack(0, this._channels),
            this.pack(1, this._sampleRate),
            this.pack(1, this._sampleRate * this._channels * this._bitsPerSample / 8), // Byte rate
            this.pack(0, this._channels * this._bitsPerSample / 8),
            this.pack(0, this._bitsPerSample),
            // chunk 2
            'data', // Sub-chunk identifier
            this.pack(1, data.length * this._channels * this._bitsPerSample / 8), // Chunk length
            data
        ];

        var blob = new Blob(out, {type: 'audio/wav'});
        var dataURI = URL.createObjectURL(blob);

        this.profile.clear();

        return dataURI;
    }

    private pack(c: number, arg: number) {
        return [
            new Uint8Array([arg, arg >> 8]),
            new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])
        ][c];
    }
}
