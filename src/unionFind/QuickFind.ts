import BaseUF from './BaseUF';

export class QuickFind extends BaseUF {
    public constructor(n: number) {
        super(n);
    }

    public find(p: number): number {
        return this.id[p];
    }

    public union(p: number, q: number): void {
        const pID: number = this.find(p);
        const qID: number = this.find(q);

        if (pID === qID) return;

        for (let i = 0; i < this.id.length; i++) {
            if (this.id[i] === pID) this.id[i] = qID;
        }
        this.count--;
        console.table(this.id);
    }
}
