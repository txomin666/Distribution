export abstract class AbstractProfile {
    protected modulations: Array<Function> = [
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin((2 * Math.PI) * (i / sampleRate) * frequency + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
        }
    ];

    public abstract getName(): string;

    public abstract attack(sampleRate: number, frequency: number, volume: number): number;

    public abstract dampen(sampleRate: number, frequency: number, volume: number): number;

    public abstract wave(i: number, sampleRate: number, frequency: number, volume: number): number;

    public abstract clear(): void;
}
