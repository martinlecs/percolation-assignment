export default abstract class BaseUF {
    protected count: number;
    protected id: number[];
    public constructor(n: number) {
        this.count = n;
        this.id = [];
        for (let i = 0; i < n; i++) this.id.push(i);
    }

    getCount(): number {
        return this.count;
    }

    printArray(): void {
        console.table(this.id);
    }

    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    abstract find(p: number): number;

    abstract union(p: number, q: number): void;
}
