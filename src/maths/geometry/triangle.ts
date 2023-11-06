import {Point} from "./point";
import {Fraction} from "../coefficients/fraction";
import {Vector} from "./vector";
import {Line} from "./line";
import {Equation} from "../algebra/equation";

export interface remarquableLines {
    'medians': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Point
    },
    'mediators': {
        'AB': Line,
        'AC': Line,
        'BC': Line,
        'intersection': Point
    },
    'heights': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Point
    },
    'bisectors': {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Point
    },
    externalBisectors: {
        'A': Line,
        'B': Line,
        'C': Line,
        'intersection': Point
    }
}

export class Triangle {
    private _A: Point;
    private _B: Point;
    private _C: Point;
    private _lines: {
        'AB': Line,
        'AC': Line,
        'BC': Line
    };
    private _middles: {
        'AB': Point,
        'AC': Point,
        'BC': Point
    };
    private _remarquables: remarquableLines;


    constructor(...values: unknown[]) {

        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }

    // ------------------------------------------
    // Getter and setters
    // ------------------------------------------

    get A(): Point {
        return this._A;
    }

    get B(): Point {
        return this._B;
    }

    get C(): Point {
        return this._C;
    }

    get AB(): Vector {
        return this.getSegment('A', 'B');
    }

    get BA(): Vector {
        return this.getSegment('B', 'A');
    }

    get BC(): Vector {
        return this.getSegment('B', 'C');
    }

    get CB(): Vector {
        return this.getSegment('C', 'B');
    }

    get AC(): Vector {
        return this.getSegment('A', 'C');
    }

    get CA(): Vector {
        return this.getSegment('C', 'A');
    }

    get isRectangle(): boolean {
        if (this.AB.isNormalTo(this.BC)) {
            return true;
        }
        if (this.AB.isNormalTo(this.AC)) {
            return true;
        }
        if (this.BC.isNormalTo(this.AC)) {
            return true;
        }

        return false;
    }

    get isEquilateral(): boolean {
        return this.AB.normSquare.isEqualTo(this.BC.normSquare) &&
            this.AB.normSquare.isEqualTo(this.AC.normSquare);
    }

    get isIsocele(): boolean {
        return this.AB.normSquare.isEqualTo(this.BC.normSquare) ||
            this.AB.normSquare.isEqualTo(this.AC.normSquare) ||
            this.BC.normSquare.isEqualTo(this.AC.normSquare)
    }

    get lines(): { 'AB': Line, 'BC': Line, 'AC': Line } {
        return this._lines;
    }

    get remarquables(): remarquableLines {
        return this._remarquables;
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------

    /**
     * Parse values to a triangle. Supported formats:
     * Point, Point, Point
     * x1, y1, x2, y2, x3, y3
     * TODO: Something else ?
     * @param values
     */
    parse = (...values: any): Triangle => {
        if (values.length === 6) {
            // Check if all values are number or fractions.
            let v = values.map((x: any) => new Fraction(x));
            return this.parse(
                new Point(v[0], v[1]),
                new Point(v[2], v[3]),
                new Point(v[4], v[5]),
            )
        } else if (values.length === 3) {
            // Possibilities:
            // - Three points (or part of points, only dict for example, or array (TODO: Add the array syntax for point)
            // - Three lines
            // - Three lines as text.
            if(values.filter((x:any) => typeof x === 'string').length===3) {
                return this.parse( ...values.map((x:string) => new Line(x)) )
            }else if(values.filter((x:any) => x instanceof Line).length===3) {
                // We have three lines
                this._lines = {
                    'AB': values[0],
                    'BC': values[1],
                    'AC': values[2]
                };

                // Get the intersection points -> build the triangle using these intersection points.
                let intersect = values[0].intersection(values[1]);
                if (intersect.hasIntersection) {
                    this._B = intersect.point.clone();
                } else {
                    return this;
                }
                intersect = values[1].intersection(values[2]);
                if (intersect.hasIntersection) {
                    this._C = intersect.point.clone();
                } else {
                    return this;
                }
                intersect = values[2].intersection(values[0]);
                if (intersect.hasIntersection) {
                    this._A = intersect.point.clone();
                } else {
                    return this;
                }
            }else {
                // At least, one of the value is not a point.
                if (values.filter((x: any) => (x instanceof Point)).length < 3) {
                    return this.parse(
                        new Point(values[0]),
                        new Point(values[1]),
                        new Point(values[2])
                    )
                }

                // We have three points.
                this._A = values[0].clone();
                this._B = values[1].clone();
                this._C = values[2].clone();

                this._lines = {
                    'AB': new Line(this._A, this._B),
                    'BC': new Line(this._B, this._C),
                    'AC': new Line(this._A, this._C)
                };
            }
        } else if (values.length === 1) {
            if (values[0] instanceof Triangle) {
                return values[0].clone();
            }
        }

        this._updateTriangle();
        return this;
    }

    /**
     * Clone the Triangle class
     */
    clone = (): Triangle => {
        this._A = this._A.clone();
        this._B = this._B.clone();
        this._C = this._C.clone();

        this._lines = {
            'AB': this._lines.AB.clone(),
            'BC': this._lines.BC.clone(),
            'AC': this._lines.AC.clone()
        }

        this._updateTriangle();
        return this;
    }


    // ------------------------------------------
    // Triangle operations and properties
    // ------------------------------------------

    /**
     * Generate the Line object for the three segments of the triangle
     */
    private _updateTriangle = () => {
        this._middles = {
            'AB': new Point().middleOf(this._A, this._B),
            'AC': new Point().middleOf(this._A, this._C),
            'BC': new Point().middleOf(this._B, this._C)
        }

        this._remarquables = this._calculateRemarquableLines();
    }


    /**
     * Get the Point class for the given name
     * @param ptName
     */
    private getPointByName = (ptName: string): Point => {
        switch (ptName.toUpperCase()) {
            case 'A':
                return this._A;
            case 'B':
                return this._B;
            case 'C':
                return this._C;
        }

        // Something went wrong ! Return the first point
        return this._A;
    }
    /**
     * Get the vector for the segment given by name.
     * @param ptName1
     * @param ptName2
     */
    private getSegment = (ptName1: string, ptName2: string): Vector => {
        return new Vector(
            this.getPointByName(ptName1),
            this.getPointByName(ptName2)
        );
    }

    private _calculateRemarquableLines = (): remarquableLines => {
        const  bA= this._calculateBisectors('A'),
            bB= this._calculateBisectors('B'),
            bC= this._calculateBisectors('C')

        let remarquables: remarquableLines = {
            'medians': {
                'A': new Line(this._A, this._middles.BC),
                'B': new Line(this._B, this._middles.AC),
                'C': new Line(this._C, this._middles.AB),
                'intersection': null
            },
            'mediators': {
                'AB': new Line(this._middles.AB, new Vector(this._A, this._B).normal()),
                'AC': new Line(this._middles.AC, new Vector(this._A, this._C).normal()),
                'BC': new Line(this._middles.BC, new Vector(this._B, this._C).normal()),
                'intersection': null
            },
            'heights': {
                'A': new Line(this._A, new Vector(this._B, this._C).normal()),
                'B': new Line(this._B, new Vector(this._A, this._C).normal()),
                'C': new Line(this._C, new Vector(this._A, this._B).normal()),
                'intersection': null
            },
            'bisectors': {
                'A': bA.internal,
                'B': bB.internal,
                'C': bB.internal,
                'intersection': null
            },
            externalBisectors: {
                'A': bA.external,
                'B': bB.external,
                'C': bC.external,
                'intersection': null
            }
        }

        // As it's a triangle, we assume the lines are intersecting and aren't parallel or superposed.
        remarquables.medians.intersection = remarquables.medians.A.intersection(remarquables.medians.B).point;
        remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
        remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
        remarquables.bisectors.intersection = remarquables.bisectors.A.intersection(remarquables.bisectors.B).point;

        // Everything was calculated for the remarquable lines.
        return remarquables;
    }

    private _calculateBisectors = (pt: string): { internal: Line, external: Line } => {
        let tlines = this.lines, d1, d2;

        if(pt==='A'){
            d1 = tlines.AB;
            d2 = tlines.AC;
        }else if(pt==='B'){
            d1 = tlines.AB;
            d2 = tlines.BC;
        }else if(pt==='C'){
            d1 = tlines.BC;
            d2 = tlines.AC;
        }

        let b1 = new Line(new Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm)).reorder(true).simplify()),
            b2 = new Line(new Equation(d1.equation.left.clone().multiply(d2.n.simplify().norm), d2.equation.left.clone().multiply(d1.n.simplify().norm).opposed()).reorder(true).simplify());

        // Must determine which bisectors is in the triangle
        if(pt==='A'){
            return b1.hitSegment(this.B, this.C)?{internal:b1, external: b2}:{internal:b2, external: b1};
        }
        if(pt==='B'){
            return b1.hitSegment(this.A, this.C)?{internal:b1, external: b2}:{internal:b2, external: b1};
        }
        if(pt==='C'){
            return b1.hitSegment(this.B, this.A)?{internal:b1, external: b2}:{internal:b2, external: b1};
        }

        // Default returns the first bisector
        return {internal:b1, external: b2}
    }
}