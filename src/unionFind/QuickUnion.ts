import BaseUF from './BaseUF';

export class QuickUnion extends BaseUF {
    public constructor(n: number) {
        super(n);
    }

    public find(p: number): number {
        while (this.id[p] !== p) p = this.id[p];
        return p;
    }

    public union(p: number, q: number): void {
        const pID: number = this.find(p);
        const qID: number = this.find(q);

        if (pID === qID) return;

        this.id[pID] = qID;
        this.count--;
        // console.table(this.id);
    }
}
