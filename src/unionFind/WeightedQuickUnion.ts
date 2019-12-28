import BaseUF from './BaseUF';

export class WeightedQuickUnion extends BaseUF {
    private sz: number[];
    public constructor(n: number) {
        super(n);
        this.sz = [];
        for (let i = 0; i < n; i++) this.sz.push(1);
    }

    get connections(): number[] {
        return this.id;
    }

    public find(p: number): number {
        // Path halving
        // while (p !== this.id[p]) {
        //     this.id[p] = this.id[this.id[p]];
        //     p = this.id[p];
        // }
        // return p;

        // Or can do path compression by
        // let v = p; while(v !== this.id[v]) v = this.id[v];
        // while (this.id[p] !== v) t = this.id[p]; this.id[p] = v; p = t; return v;

        if (p !== this.id[p]) {
            // or use recursion
            this.id[p] = this.find(this.id[p]);
        }
        return this.id[p];
    }

    public union(p: number, q: number): void {
        const i: number = this.find(p);
        const j: number = this.find(q);

        if (i === j) return;

        if (this.sz[i] < this.sz[j]) {
            this.id[i] = j;
            this.sz[j] += this.sz[i];
        } else {
            this.id[j] = i;
            this.sz[i] += this.sz[j];
        }
        this.count--;
    }
}
