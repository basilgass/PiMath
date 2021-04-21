import {Point} from "./point";
import {Fraction} from "../coefficients/fraction";
import {Vector} from "./vector";
import {Line} from "./line";

interface remarquableLines {
    'medianes': {
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
    'bissectors': {
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


    constructor(...values: any) {

        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }

    // ------------------------------------------
    // Getter and setters
    // ------------------------------------------
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
        return this.AB.normSquare.isEqual(this.BC.normSquare) &&
            this.AB.normSquare.isEqual(this.AC.normSquare);
    }

    get isIsocele(): boolean {
        return this.AB.normSquare.isEqual(this.BC.normSquare) ||
            this.AB.normSquare.isEqual(this.AC.normSquare) ||
            this.BC.normSquare.isEqual(this.AC.normSquare)
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
            // At least, one of the value is not a point.
            if (values.reduce((x: any) => x.isPoint === true).length < 3) {
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
        } else if (values.length === 1) {
            if (values[0].isTriangle === true) {
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
        this._lines = {
            'AB': new Line(this._A, this._B),
            'BC': new Line(this._B, this._C),
            'AC': new Line(this._A, this._C)
        };

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

        // TODO: How to handle the best the bissectors lines ?

        let barycenter = new Point(
            (this.AB.norm*this._C.x.value + this.AC.norm*this._B.x.value + this.BC.norm*this._A.x.value)/(this.AB.norm+this.AC.norm+this.BC.norm),
            (this.AB.norm*this._C.y.value + this.AC.norm*this._B.y.value + this.BC.norm*this._A.y.value)/(this.AB.norm+this.AC.norm+this.BC.norm)
        )

        let remarquables: remarquableLines = {
            'medianes': {
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
            'bissectors': {
                'A': new Line(this._A, barycenter),
                'B': new Line(this._B, barycenter),
                'C': new Line(this._C, barycenter),
                'intersection': barycenter
            }
        }

        // As it's a triangle, we assume the lines are intersecting and aren't parallel or superposed.
        remarquables.medianes.intersection = remarquables.medianes.A.intersection(remarquables.medianes.B).point;
        remarquables.mediators.intersection = remarquables.mediators.AB.intersection(remarquables.mediators.BC).point;
        remarquables.heights.intersection = remarquables.heights.A.intersection(remarquables.heights.B).point;
        // remarquables.bissectors.intersection = remarquables.bissectors.A.intersection(remarquables.bissectors.B).point;

        // Everything was calculated for the remaruqable lines.
        return remarquables;
    }
}