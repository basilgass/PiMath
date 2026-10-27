//#region src/completions/data.ts
var e = {
	version: "0.3.1",
	globals: [
		{
			label: "PiMath",
			type: "namespace",
			info: "The global object: every class and tool of the library."
		},
		{
			label: "Numeric",
			type: "namespace",
			info: "Functions on numbers: gcd, lcm, rounding, primes..."
		},
		{
			label: "Fraction",
			type: "class",
			detail: "() (+2)",
			info: "An exact rational number such as `a/b`. A `Fraction` is exact: it stores an integer numerator and an integer denominator, and\nflags a value that had to be approximated (`exact` is then `false`). It is permissive like a JavaScript\nnumber: an impossible value is `NaN` or infinite (`isNaN()`, `isFinite()`) and does not throw.\nOperations modify the fraction and return it; `clone()` keeps the original."
		},
		{
			label: "Root",
			type: "class",
			detail: "(value?: InputValue<Root | Fraction>)",
			info: "A real root `factor · ⁿ√radical`, where the factor and the radical are {@link Fraction}s and the index `n`\nis a strictly positive integer (2 by default). Built from a string (`\"3sqrt(5)\"`, `\"root(3)(10)\"`), a number\nor a fraction. `Root` is strict: a malformed input throws a `ParseError`."
		},
		{
			label: "Monom",
			type: "class",
			detail: "(value?: InputValue<Fraction>) (+1)",
			info: "A term `k · x^a · y^b`: a {@link Fraction} coefficient and a literal part, a dictionary from each variable to its\nexponent (a `Fraction` too, so `x^(1/2)` is allowed). Built from a string (`\"3x^2y\"`), a number or a fraction.\nA string must be a single term: spaces are ignored, but a sum or a difference (`\"3x+2\"`), a missing operand\n(`\"3x*\"`) or a negative exponent without parentheses (`\"x^-1\"`, write `\"x^(-1)\"`) throws a `ParseError`."
		},
		{
			label: "Polynom",
			type: "class",
			detail: "(value: InputValue<Fraction>) (+5)",
			info: "A polynomial in one or several variables: a list of {@link Monom}s kept reduced and sorted by decreasing\ndegree. Built from a string (`\"x^2-5x+6\"`, `\"(x+1)^2\"`), a number, a monom, or from coefficients\n(`new Polynom(\"x\", 1, -5, 6)`). A malformed string throws a `ParseError`.\nOperations modify the polynom and return it; `clone()` keeps the original. A failing operation leaves it unchanged."
		},
		{
			label: "Equation",
			type: "class",
			detail: "() (+2)",
			info: "An equation or an inequality `left <sign> right`, where both members are {@link Polynom}s and the sign is\n`=`, `<`, `>`, `<=` or `>=`. Built from a string with a sign (`\"2x+3=7\"`), from two members, or from a `Polynom`\nread as `polynom = 0`.\nOperations modify the equation and return it; `clone()` keeps the original. A failing operation leaves it unchanged."
		},
		{
			label: "Matrix",
			type: "class",
			detail: "() (+3)",
			info: "A matrix of {@link Fraction}s. Built from a string (`\"((1,2),(3,4))\"`), an array of rows, or a number of rows\nand columns (a zero matrix). The operations are those of {@link AbstractMatrix}."
		},
		{
			label: "PolyMatrix",
			type: "class",
			detail: "() (+3)",
			info: "A matrix of {@link Polynom}s: the same operations as {@link Matrix}, with polynomial entries. It is the\ntool for the characteristic polynomial of a matrix. Built like a `Matrix`: from an array of rows, a display\nstring, or a number of rows and columns."
		},
		{
			label: "LinearSystem",
			type: "class",
			detail: "(...values: (string | Equation)[])",
			info: "A system of linear equations. Built from equations or strings (`new LinearSystem(\"x+y=3\", \"x-y=1\")`).\nThe variables are found in the equations; {@link solve} uses Gauss-Jordan elimination.\nOperations modify the system and return it; `clone()` keeps the original."
		},
		{
			label: "Factor",
			type: "class",
			detail: "(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>)",
			info: "Represents a single factor `P(x)^n` in a factored polynomial expression.\n\n`Factor` is designed to be used as a building block inside {@link PolyFactor },\nnot as a standalone expression type. Several `IExpression` operations\n(`add`, `subtract`, `opposite`, `reduce`, `primitive`, `derivative`) are\nstructurally unsupported at this level and will throw\n{@link UnsupportedOperationError}."
		},
		{
			label: "PolyFactor",
			type: "class",
			detail: "(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[])",
			info: "A polynomial expression in factored form: a list of {@link Factor}s whose product is the value. A factor with\na negative power belongs to the denominator. Built from a string (`\"(x-1)(x+2)^2\"`, `\"(x+1)/(x-2)\"`),\na polynom or factors.\nOperations modify the object and return it; `clone()` keeps the original."
		},
		{
			label: "LogicalSet",
			type: "class",
			detail: "(value?: string)",
			info: "Represents a logical set expression (e.g. `A & B | !C`), stored internally\nas a Reverse Polish Notation sequence. Supports LaTeX and AsciiMath rendering,\nboolean evaluation, and Venn diagram zone computation.\n\nOperator precedence (set by the `piexpression` parser, not by this class): `!` binds\nfirst, then `&` and `|` at the same level, applied from left to right, then `-`\n(set difference, also left to right). So `A|B&C` is `(A|B)&C`, not `A|(B&C)`, and\n`A-B&C` is `A-(B&C)`. Use parentheses to write any other grouping."
		},
		{
			label: "Solution",
			type: "class",
			detail: "(value?: string | Fraction | Root | PolynomRoot | Solution)",
			info: "An equation / polynomial root as an exact decomposed value: a rational part\n(`#fraction`) plus a radical part (`#root`).\n\nInvariant (maintained by the producers, not enforced by the type): `#fraction`\ncarries every rational part, and `#root` is either zero or a *genuinely\nirrational* radical — never a perfect-power radical that would reduce to a\nrational. `EquationSolver` / `fromQuadratic` only build a radical on the\nnon-square-discriminant branch, so a non-zero `#root` always accompanies a\ntruly irrational value.\n\nThe `tex` / `display` composition relies on this: it runs the two-part\n`(numerator ± radical)/denominator` layout only when both parts are non-zero,\ni.e. on a real irrational. It does not re-simplify a manually built\nperfect-power radical (e.g. `#fraction = 1`, `#root = √4`), which would render\nas the unsimplified `1 +2` — an incoherent state the producers never create."
		},
		{
			label: "TableOfSigns",
			type: "class",
			detail: "(value?: InputAlgebra<PolyFactor | Factor | Polynom>)",
			info: "The table of signs of a polynom, a factor or a factored expression: its roots, the sign of the value between\nthem, and the `tkz-tab` LaTeX code to draw it. It also gives the intervals where the expression is positive or\nnegative, its zeros and its poles.\nThe signs are `+`, `-`, `z` (zero), `d` (pole), `h` (hatched interval, where the expression is not defined), and `t` (no root of the factor at that place)."
		},
		{
			label: "Interval",
			type: "class",
			detail: "(value?: string | Interval)",
			info: "An immutable interval over ℝ with exact (Solution-based) bounds.\n\n`null` encodes ±∞ (always open by convention).\nPrefer the static factories — `fromBounds`, `empty`, `real`, `point`, `fromString` —\nor `new Interval(stringOrInterval)` via the public constructor."
		},
		{
			label: "Domain",
			type: "class",
			detail: "(value?: string | Domain | Interval)",
			info: "A (possibly empty) subset of ℝ represented as a finite union of intervals.\nThe internal interval list is always sorted and non-overlapping (normalized).\n\nConstruct via `new Domain()`, `new Domain(string)`, `new Domain(interval)`,\n`new Domain(domain)`, or the static factories `fromIntervals`, `fromInterval`,\n`empty`, `real`, `fromString`."
		},
		{
			label: "Random",
			type: "namespace",
			info: "Random generators of exercises: numbers, polynomials, equations, geometry..."
		},
		{
			label: "Vector",
			type: "class",
			detail: "(...values: (Vector | Point)[] | InputValue<Fraction>[])",
			info: "A vector of the plane or of space, with exact coordinates. Built from numbers (`new Vector(3, 4)`), from a\nstring (`\"(3;4)\"`), from another vector or point, or from two points: `new Vector(A, B)` is the vector `AB`."
		},
		{
			label: "Point",
			type: "class",
			detail: "(...values: (Point | Vector)[] | InputValue<Fraction>[])",
			info: "A point of the plane or of space, with exact coordinates. Built from numbers (`new Point(1, 2)`), from a\nstring (`\"(1;2)\"`) or from another point or vector. The `x`, `y` and `z` coordinates are fractions."
		},
		{
			label: "Line",
			type: "class",
			detail: "(...values: unknown[])",
			info: "A line of the plane, stored by the coefficients of `ax + by + c = 0` and a point of the line.\nBuilt from an equation (`\"2x+3y-6=0\"`), two points, a point and a direction vector, or three coefficients.\nThe output defaults to the canonical form; {@link asCartesian}, {@link asMxh}, {@link asParametric} and\n{@link asSystem} choose another one for the next `tex` or `display` only."
		},
		{
			label: "Triangle",
			type: "class",
			detail: "(...values: unknown[])",
			info: "A triangle `ABC` of the plane. Built from three points, three lines, or six coordinates. It gives the sides,\nthe angles and the remarkable lines (medians, heights, mediators, bisectors) with exact coordinates.\n`tex` and `display` are not available: describe a triangle through its vertices or its {@link lines}."
		},
		{
			label: "Circle",
			type: "class",
			detail: "() (+5)",
			info: "A circle of the plane, stored by its center and the square of its radius, so that everything stays exact.\nBuilt from an equation (`\"(x-1)^2+(y+2)^2=9\"`), from a center and a radius, from a center and a point of\nthe circle, or from three points."
		},
		{
			label: "Line3",
			type: "class",
			detail: "() (+2)",
			info: "A line of space, stored by a point `OA` and a direction vector `d`. Built from two points or from a point and\na direction vector. The output defaults to the parametric form; {@link asSystem} and {@link asCartesian} choose\nanother one for the next `tex` or `display` only."
		},
		{
			label: "Plane3",
			type: "class",
			detail: "(config?: Plane3Config)",
			info: "A plane of space, stored by a point and a normal vector. Built from a configuration object with one of:\n`point` and `normal`, `point` and two `directions`, an `equation`, three `points`, or four `coefficients`\n`[a, b, c, d]` of `ax + by + cz + d = 0`."
		},
		{
			label: "Sphere3",
			type: "class",
			detail: "() (+3)",
			info: "A sphere of space, stored by its center and the square of its radius, so that everything stays exact.\nBuilt from an equation (`\"(x-1)^2+y^2+z^2=9\"`) or from a center and a radius.\nA sphere that has not been defined throws a `StateError` when it is read."
		},
		{
			label: "PiMathError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "Typed error hierarchy for PiMath.\n\nAll PiMath errors extend {@link PiMathError}, so a consumer can catch every\nlibrary error at once with `catch (e) { if (e instanceof PiMathError) ... }`,\nor discriminate a specific kind with `instanceof ParseError`, etc.\n\nThe original error (e.g. piexpression's ParseError) is chained through the\nstandard ES2022 `cause` option."
		},
		{
			label: "ParseError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "The input string cannot be parsed into the target object."
		},
		{
			label: "DimensionError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "Incompatible dimensions (matrix, vector, point, ...)."
		},
		{
			label: "MathError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "Mathematically invalid operation on otherwise valid inputs."
		},
		{
			label: "InvalidArgumentError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "An argument is invalid (outside of string parsing)."
		},
		{
			label: "NotImplementedError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "The called method is not implemented yet."
		},
		{
			label: "UnsupportedOperationError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "The operation is not supported by this type — by design, not pending implementation."
		},
		{
			label: "IndexError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "An index is out of range."
		},
		{
			label: "StateError",
			type: "class",
			detail: "(message: string, options?: ErrorOptions)",
			info: "An operation was attempted on an object in an invalid/uninitialized state."
		},
		{
			label: "NumExp",
			type: "class",
			detail: "(value: string, uniformize?: boolean)"
		}
	],
	members: {
		PiMath: [
			{
				label: "Numeric",
				type: "namespace",
				info: "Functions on numbers: gcd, lcm, rounding, primes..."
			},
			{
				label: "Fraction",
				type: "class",
				detail: "() (+2)",
				info: "An exact rational number such as `a/b`. A `Fraction` is exact: it stores an integer numerator and an integer denominator, and\nflags a value that had to be approximated (`exact` is then `false`). It is permissive like a JavaScript\nnumber: an impossible value is `NaN` or infinite (`isNaN()`, `isFinite()`) and does not throw.\nOperations modify the fraction and return it; `clone()` keeps the original."
			},
			{
				label: "Root",
				type: "class",
				detail: "(value?: InputValue<Root | Fraction>)",
				info: "A real root `factor · ⁿ√radical`, where the factor and the radical are {@link Fraction}s and the index `n`\nis a strictly positive integer (2 by default). Built from a string (`\"3sqrt(5)\"`, `\"root(3)(10)\"`), a number\nor a fraction. `Root` is strict: a malformed input throws a `ParseError`."
			},
			{
				label: "Monom",
				type: "class",
				detail: "(value?: InputValue<Fraction>) (+1)",
				info: "A term `k · x^a · y^b`: a {@link Fraction} coefficient and a literal part, a dictionary from each variable to its\nexponent (a `Fraction` too, so `x^(1/2)` is allowed). Built from a string (`\"3x^2y\"`), a number or a fraction.\nA string must be a single term: spaces are ignored, but a sum or a difference (`\"3x+2\"`), a missing operand\n(`\"3x*\"`) or a negative exponent without parentheses (`\"x^-1\"`, write `\"x^(-1)\"`) throws a `ParseError`."
			},
			{
				label: "Polynom",
				type: "class",
				detail: "(value: InputValue<Fraction>) (+5)",
				info: "A polynomial in one or several variables: a list of {@link Monom}s kept reduced and sorted by decreasing\ndegree. Built from a string (`\"x^2-5x+6\"`, `\"(x+1)^2\"`), a number, a monom, or from coefficients\n(`new Polynom(\"x\", 1, -5, 6)`). A malformed string throws a `ParseError`.\nOperations modify the polynom and return it; `clone()` keeps the original. A failing operation leaves it unchanged."
			},
			{
				label: "Equation",
				type: "class",
				detail: "() (+2)",
				info: "An equation or an inequality `left <sign> right`, where both members are {@link Polynom}s and the sign is\n`=`, `<`, `>`, `<=` or `>=`. Built from a string with a sign (`\"2x+3=7\"`), from two members, or from a `Polynom`\nread as `polynom = 0`.\nOperations modify the equation and return it; `clone()` keeps the original. A failing operation leaves it unchanged."
			},
			{
				label: "Matrix",
				type: "class",
				detail: "() (+3)",
				info: "A matrix of {@link Fraction}s. Built from a string (`\"((1,2),(3,4))\"`), an array of rows, or a number of rows\nand columns (a zero matrix). The operations are those of {@link AbstractMatrix}."
			},
			{
				label: "PolyMatrix",
				type: "class",
				detail: "() (+3)",
				info: "A matrix of {@link Polynom}s: the same operations as {@link Matrix}, with polynomial entries. It is the\ntool for the characteristic polynomial of a matrix. Built like a `Matrix`: from an array of rows, a display\nstring, or a number of rows and columns."
			},
			{
				label: "LinearSystem",
				type: "class",
				detail: "(...values: (string | Equation)[])",
				info: "A system of linear equations. Built from equations or strings (`new LinearSystem(\"x+y=3\", \"x-y=1\")`).\nThe variables are found in the equations; {@link solve} uses Gauss-Jordan elimination.\nOperations modify the system and return it; `clone()` keeps the original."
			},
			{
				label: "Factor",
				type: "class",
				detail: "(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>)",
				info: "Represents a single factor `P(x)^n` in a factored polynomial expression.\n\n`Factor` is designed to be used as a building block inside {@link PolyFactor },\nnot as a standalone expression type. Several `IExpression` operations\n(`add`, `subtract`, `opposite`, `reduce`, `primitive`, `derivative`) are\nstructurally unsupported at this level and will throw\n{@link UnsupportedOperationError}."
			},
			{
				label: "PolyFactor",
				type: "class",
				detail: "(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[])",
				info: "A polynomial expression in factored form: a list of {@link Factor}s whose product is the value. A factor with\na negative power belongs to the denominator. Built from a string (`\"(x-1)(x+2)^2\"`, `\"(x+1)/(x-2)\"`),\na polynom or factors.\nOperations modify the object and return it; `clone()` keeps the original."
			},
			{
				label: "LogicalSet",
				type: "class",
				detail: "(value?: string)",
				info: "Represents a logical set expression (e.g. `A & B | !C`), stored internally\nas a Reverse Polish Notation sequence. Supports LaTeX and AsciiMath rendering,\nboolean evaluation, and Venn diagram zone computation.\n\nOperator precedence (set by the `piexpression` parser, not by this class): `!` binds\nfirst, then `&` and `|` at the same level, applied from left to right, then `-`\n(set difference, also left to right). So `A|B&C` is `(A|B)&C`, not `A|(B&C)`, and\n`A-B&C` is `A-(B&C)`. Use parentheses to write any other grouping."
			},
			{
				label: "Solution",
				type: "class",
				detail: "(value?: string | Fraction | Root | PolynomRoot | Solution)",
				info: "An equation / polynomial root as an exact decomposed value: a rational part\n(`#fraction`) plus a radical part (`#root`).\n\nInvariant (maintained by the producers, not enforced by the type): `#fraction`\ncarries every rational part, and `#root` is either zero or a *genuinely\nirrational* radical — never a perfect-power radical that would reduce to a\nrational. `EquationSolver` / `fromQuadratic` only build a radical on the\nnon-square-discriminant branch, so a non-zero `#root` always accompanies a\ntruly irrational value.\n\nThe `tex` / `display` composition relies on this: it runs the two-part\n`(numerator ± radical)/denominator` layout only when both parts are non-zero,\ni.e. on a real irrational. It does not re-simplify a manually built\nperfect-power radical (e.g. `#fraction = 1`, `#root = √4`), which would render\nas the unsimplified `1 +2` — an incoherent state the producers never create."
			},
			{
				label: "TableOfSigns",
				type: "class",
				detail: "(value?: InputAlgebra<PolyFactor | Factor | Polynom>)",
				info: "The table of signs of a polynom, a factor or a factored expression: its roots, the sign of the value between\nthem, and the `tkz-tab` LaTeX code to draw it. It also gives the intervals where the expression is positive or\nnegative, its zeros and its poles.\nThe signs are `+`, `-`, `z` (zero), `d` (pole), `h` (hatched interval, where the expression is not defined), and `t` (no root of the factor at that place)."
			},
			{
				label: "Interval",
				type: "class",
				detail: "(value?: string | Interval)",
				info: "An immutable interval over ℝ with exact (Solution-based) bounds.\n\n`null` encodes ±∞ (always open by convention).\nPrefer the static factories — `fromBounds`, `empty`, `real`, `point`, `fromString` —\nor `new Interval(stringOrInterval)` via the public constructor."
			},
			{
				label: "Domain",
				type: "class",
				detail: "(value?: string | Domain | Interval)",
				info: "A (possibly empty) subset of ℝ represented as a finite union of intervals.\nThe internal interval list is always sorted and non-overlapping (normalized).\n\nConstruct via `new Domain()`, `new Domain(string)`, `new Domain(interval)`,\n`new Domain(domain)`, or the static factories `fromIntervals`, `fromInterval`,\n`empty`, `real`, `fromString`."
			},
			{
				label: "Random",
				type: "namespace",
				info: "Random generators of exercises: numbers, polynomials, equations, geometry..."
			},
			{
				label: "NumExp",
				type: "class",
				detail: "(value: string, uniformize?: boolean)"
			},
			{
				label: "Geometry",
				type: "namespace",
				info: "Points, vectors, lines, circles, triangles, and their 3D counterparts."
			},
			{
				label: "Errors",
				type: "namespace",
				info: "The classes of the errors thrown by the library."
			}
		],
		Geometry: [
			{
				label: "Vector",
				type: "class",
				detail: "(...values: (Vector | Point)[] | InputValue<Fraction>[])",
				info: "A vector of the plane or of space, with exact coordinates. Built from numbers (`new Vector(3, 4)`), from a\nstring (`\"(3;4)\"`), from another vector or point, or from two points: `new Vector(A, B)` is the vector `AB`."
			},
			{
				label: "Point",
				type: "class",
				detail: "(...values: (Point | Vector)[] | InputValue<Fraction>[])",
				info: "A point of the plane or of space, with exact coordinates. Built from numbers (`new Point(1, 2)`), from a\nstring (`\"(1;2)\"`) or from another point or vector. The `x`, `y` and `z` coordinates are fractions."
			},
			{
				label: "Line",
				type: "class",
				detail: "(...values: unknown[])",
				info: "A line of the plane, stored by the coefficients of `ax + by + c = 0` and a point of the line.\nBuilt from an equation (`\"2x+3y-6=0\"`), two points, a point and a direction vector, or three coefficients.\nThe output defaults to the canonical form; {@link asCartesian}, {@link asMxh}, {@link asParametric} and\n{@link asSystem} choose another one for the next `tex` or `display` only."
			},
			{
				label: "Triangle",
				type: "class",
				detail: "(...values: unknown[])",
				info: "A triangle `ABC` of the plane. Built from three points, three lines, or six coordinates. It gives the sides,\nthe angles and the remarkable lines (medians, heights, mediators, bisectors) with exact coordinates.\n`tex` and `display` are not available: describe a triangle through its vertices or its {@link lines}."
			},
			{
				label: "Circle",
				type: "class",
				detail: "() (+5)",
				info: "A circle of the plane, stored by its center and the square of its radius, so that everything stays exact.\nBuilt from an equation (`\"(x-1)^2+(y+2)^2=9\"`), from a center and a radius, from a center and a point of\nthe circle, or from three points."
			},
			{
				label: "Line3",
				type: "class",
				detail: "() (+2)",
				info: "A line of space, stored by a point `OA` and a direction vector `d`. Built from two points or from a point and\na direction vector. The output defaults to the parametric form; {@link asSystem} and {@link asCartesian} choose\nanother one for the next `tex` or `display` only."
			},
			{
				label: "Plane3",
				type: "class",
				detail: "(config?: Plane3Config)",
				info: "A plane of space, stored by a point and a normal vector. Built from a configuration object with one of:\n`point` and `normal`, `point` and two `directions`, an `equation`, three `points`, or four `coefficients`\n`[a, b, c, d]` of `ax + by + cz + d = 0`."
			},
			{
				label: "Sphere3",
				type: "class",
				detail: "() (+3)",
				info: "A sphere of space, stored by its center and the square of its radius, so that everything stays exact.\nBuilt from an equation (`\"(x-1)^2+y^2+z^2=9\"`) or from a center and a radius.\nA sphere that has not been defined throws a `StateError` when it is read."
			}
		],
		Errors: [
			{
				label: "PiMathError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "Typed error hierarchy for PiMath.\n\nAll PiMath errors extend {@link PiMathError}, so a consumer can catch every\nlibrary error at once with `catch (e) { if (e instanceof PiMathError) ... }`,\nor discriminate a specific kind with `instanceof ParseError`, etc.\n\nThe original error (e.g. piexpression's ParseError) is chained through the\nstandard ES2022 `cause` option."
			},
			{
				label: "ParseError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "The input string cannot be parsed into the target object."
			},
			{
				label: "DimensionError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "Incompatible dimensions (matrix, vector, point, ...)."
			},
			{
				label: "MathError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "Mathematically invalid operation on otherwise valid inputs."
			},
			{
				label: "InvalidArgumentError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "An argument is invalid (outside of string parsing)."
			},
			{
				label: "NotImplementedError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "The called method is not implemented yet."
			},
			{
				label: "UnsupportedOperationError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "The operation is not supported by this type — by design, not pending implementation."
			},
			{
				label: "IndexError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "An index is out of range."
			},
			{
				label: "StateError",
				type: "class",
				detail: "(message: string, options?: ErrorOptions)",
				info: "An operation was attempted on an object in an invalid/uninitialized state."
			}
		],
		Fraction: [
			{
				label: "areEquals",
				type: "method",
				detail: "(...F: Fraction[]): boolean",
				info: "True when every given fraction has the same value as the first one (`2/4` equals `1/2`)."
			},
			{
				label: "average",
				type: "method",
				detail: "(...fractions: (InputValue<Fraction>)[]): Fraction",
				info: "Arithmetic mean of the values, as a new fraction. Without any value the result is `+∞`."
			},
			{
				label: "isFraction",
				type: "method",
				detail: "(value: InputValue<Fraction>): boolean",
				info: "True when `new Fraction(value)` understands the value: a `Fraction`, a number, `\"a/b\"`, a decimal string,\na periodic notation such as `\"2.31(25)\"`, or an empty string (zero)."
			},
			{
				label: "max",
				type: "method",
				detail: "(...fractions: InputValue<Fraction>[]): Fraction",
				info: "Largest of the values, as a new fraction."
			},
			{
				label: "min",
				type: "method",
				detail: "(...fractions: (InputValue<Fraction>)[]): Fraction",
				info: "Smallest of the values, as a new fraction."
			},
			{
				label: "sort",
				type: "method",
				detail: "(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[]",
				info: "Sort by value, ascending (descending when `reverse` is true). Returns a new array; the `Fraction`\ninstances of the input are reused, not cloned."
			},
			{
				label: "toSameDenominateur",
				type: "method",
				detail: "(...fractions: InputValue<Fraction>[]): Fraction[]",
				info: "New fractions sharing the least common denominator, without reducing them."
			},
			{
				label: "unique",
				type: "method",
				detail: "(fractions: (InputValue<Fraction>)[]): Fraction[]",
				info: "Remove the duplicates by value (`2/4` and `1/2` are the same). Keeps the first occurrence, as a clone."
			},
			{
				label: "xMultiply",
				type: "method",
				detail: "(...values: (InputValue<Fraction>)[]): Fraction",
				info: "Product of the values, as a new fraction that is not reduced (call {@link reduce} to simplify it)."
			},
			{
				label: "fromNumber",
				type: "method",
				detail: "(value: number): Fraction",
				info: "Build a new fraction from a single number (integer or decimal).\n\nThrows: {InvalidArgumentError} for exponential notation (e.g. 1e-7), which\nwould break the integer numerator/denominator invariant."
			},
			{
				label: "fromNumbers",
				type: "method",
				detail: "(numerator: number, denominator: number): Fraction",
				info: "Build a new fraction from a numerator and a denominator, without reducing it.\nA zero denominator gives a signed infinity (`3/0`), or an invalid fraction for `0/0`.\nValues that are not safe integers are converted through {@link fromNumber} and become approximate."
			},
			{
				label: "fromPeriodic",
				type: "method",
				detail: "(value: string | number, length: number): Fraction",
				info: "Build a new fraction from a decimal whose last `length` digits repeat\n(e.g. fromPeriodic(2.3125, 2) → 11447/4950).\n\nThrows: {InvalidArgumentError} if length is not a positive integer, or\nexceeds the number of decimal digits."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Fraction",
				info: "Build a new fraction from a string: an integer, a decimal, `\"a/b\"` or a periodic decimal `\"2.31(25)\"`.\nA malformed string does not throw: the result is an invalid fraction (see {@link isNaN})."
			}
		],
		Root: [{
			label: "fromFraction",
			type: "method",
			detail: "(value: Fraction): Root",
			info: "Build a new root of index 2 equal to the fraction (`factor = value`, `radical = 1`)."
		}, {
			label: "fromString",
			type: "method",
			detail: "(value: string): Root",
			info: "Build a new Root by delegating a string to the sqrt / root parser, or to\nthe scalar builder for a plain fraction string.\n\nThrows: {ParseError} if the string is a malformed radical or fraction."
		}],
		Monom: [
			{
				label: "fromNumber",
				type: "method",
				detail: "(value: number): Monom",
				info: "Build a constant monom (empty literal part) from a number."
			},
			{
				label: "fromFraction",
				type: "method",
				detail: "(value: InputValue<Fraction>): Monom",
				info: "Build a constant monom (empty literal part)."
			},
			{
				label: "fromLiteral",
				type: "method",
				detail: "(coefficient: InputValue<Fraction>, literal: LiteralType<Fraction>): Monom",
				info: "Build a monom from an explicit coefficient and literal part. The literal\nFractions are cloned to avoid aliasing the caller's dictionary."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Monom",
				info: "Build a monom from a string. A purely numeric string is a constant monom;\nany other string is parsed as an algebraic expression.\n\nThrows: {ParseError} If the string cannot be parsed as a monom."
			},
			{
				label: "gcd",
				type: "method",
				detail: "(...monoms: Monom[]): Monom",
				info: "Greatest common divisor of monoms: the gcd of the numerators over the lcm of the denominators, times each\nvariable shared by all the monoms at its lowest exponent.\n\nThrows: {MathError} if a monom has a non-integer exponent."
			},
			{
				label: "xMultiply",
				type: "method",
				detail: "(...monoms: Monom[]): Monom",
				info: "Multiply two monoms and return a NEW monom."
			}
		],
		Polynom: [
			{
				label: "xMultiply",
				type: "method",
				detail: "(...polynoms: InputValue<Polynom>[]): Polynom",
				info: "Product of the given values, as a new polynom."
			},
			{
				label: "fromCoefficients",
				type: "method",
				detail: "(variable: string, ...values: InputValue<Fraction>[]): Polynom",
				info: "Build a polynom from coefficients ordered highest→lowest degree.\nThe first argument is the variable (e.g. `'x'`, `'t'`).\n\nThrows: {InvalidArgumentError} when `variable` is not a single lowercase letter."
			},
			{
				label: "fromConstant",
				type: "method",
				detail: "(value: InputValue<Fraction>): Polynom",
				info: "Build a constant polynom."
			},
			{
				label: "fromLinear",
				type: "method",
				detail: "(variables: string, ...coefficients: InputValue<Fraction>[]): Polynom",
				info: "Build a multivariate linear polynom: `'xyz', a, b, c, d` → `ax + by + cz + d`.\n\nThrows: {ParseError} when `variables` is not two or more lowercase letters.\n\nThrows: {InvalidArgumentError} when more coefficients than variables+1 are given."
			},
			{
				label: "fromMonoms",
				type: "method",
				detail: "(...monoms: InputAlgebra<Fraction>[]): Polynom",
				info: "Build a polynom from monoms, or from anything a monom accepts (numbers, strings, fractions).\nThe result is neither reduced nor sorted: call {@link reduce}."
			},
			{
				label: "fromThreePoints",
				type: "method",
				detail: "(point1: XY<InputValue<Fraction>>, point2: XY<InputValue<Fraction>>, point3: XY<InputValue<Fraction>>, variable?: string): Polynom",
				info: "Build the polynom of degree at most 2 passing through three points, using Newton divided differences.\nThe result is exact (fractions). When the three points are aligned, the result is a line\n(degree 1), or a constant when the three `y` are equal.\n\nThrows: {InvalidArgumentError} when a coordinate is not finite, or `variable` is not a single lowercase letter.\n\nThrows: {MathError} when two points share the same `x` (no polynom is a function of that shape)."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Polynom",
				info: "Build a polynom from an expression: sums, products, integer powers, and division by a constant.\n\nThrows: {ParseError} if the string is malformed.\n\nThrows: {MathError} for a division by a polynom of degree 1 or more, or a fractional power of a sum."
			}
		],
		Equation: [
			{
				label: "fromString",
				type: "method",
				detail: "(equationString: string): Equation",
				info: "Build the equation from a complete equation string (containing a sign).\n\nThrows: {ParseError} when the string carries no equation sign."
			},
			{
				label: "fromPolynoms",
				type: "method",
				detail: "(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EquationSign): Equation",
				info: "Build the equation from its two members and an optional sign\n(defaults to `=`)."
			},
			{
				label: "isEquationString",
				type: "method",
				detail: "(equationString: string): boolean",
				info: "True when the string contains an equation sign (`=`, `<` or `>`)."
			},
			{
				label: "makeSolutionsUnique",
				type: "method",
				detail: "(solutions: Solution[], sorted?: boolean): Solution[]",
				info: "Remove the duplicated solutions (same `tex`), keeping the first one. With `sorted`, sort them by value."
			}
		],
		Matrix: [
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Matrix",
				info: "Build a matrix from its display string, such as `\"((1,2),(3,4))\"`."
			},
			{
				label: "fromValues",
				type: "method",
				detail: "(values: InputAlgebra<Fraction>[][]): Matrix",
				info: "Build a matrix from an array of rows.\n\nThrows: {DimensionError} if the rows do not all have the same length."
			},
			{
				label: "fromDimensions",
				type: "method",
				detail: "(rows: number, cols?: number): Matrix",
				info: "Build a zero matrix. Without `cols`, the matrix is square."
			},
			{
				label: "fromVectors",
				type: "method",
				detail: "(...vectors: Vector[]): Matrix",
				info: "Build a matrix whose columns are the given vectors.\n\nThrows: {DimensionError} if the vectors do not all have the same dimension."
			}
		],
		PolyMatrix: [
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): PolyMatrix",
				info: "Build a matrix from its display string, such as `\"((x,1),(2,x+1))\"`."
			},
			{
				label: "fromValues",
				type: "method",
				detail: "(values: InputAlgebra<Polynom>[][]): PolyMatrix",
				info: "Build a matrix from an array of rows.\n\nThrows: {DimensionError} if the rows do not all have the same length."
			},
			{
				label: "fromDimensions",
				type: "method",
				detail: "(rows: number, cols?: number): PolyMatrix",
				info: "Build a zero matrix. Without `cols`, the matrix is square."
			},
			{
				label: "fromVectors",
				type: "method",
				detail: "(...vectors: Vector[]): PolyMatrix",
				info: "Build a matrix whose columns are the given vectors.\n\nThrows: {DimensionError} if the vectors do not all have the same dimension."
			},
			{
				label: "fromMatrix",
				type: "method",
				detail: "(m: Matrix): PolyMatrix",
				info: "Creates a `PolyMatrix` from a `Matrix` by converting each `Fraction` entry\nto a constant `Polynom`."
			}
		],
		LinearSystem: [{
			label: "solutionAsDisplay",
			type: "method",
			detail: "(value: Solution[]): string",
			info: "Text form of a solution of a system: `(2;1)`."
		}, {
			label: "solutionAsTex",
			type: "method",
			detail: "(value: Solution[]): string",
			info: "LaTeX form of a solution of a system: `\\left( 2 ; 1 \\right)`."
		}],
		Factor: [
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Factor",
				info: "Build a factor from a string such as `\"(x+1)^2\"`. Only the first factor of a product is kept: use\n{@link factorsFromString} to get all of them."
			},
			{
				label: "fromPolynom",
				type: "method",
				detail: "(polynom: InputAlgebra<Polynom>): Factor",
				info: "Build a factor of power 1 from a polynom, or from anything a polynom accepts."
			},
			{
				label: "checkParseAsFactors",
				type: "method",
				detail: "(str: string): boolean",
				info: "True when the string has no `+` or `-` outside the parentheses, so it reads as a product of factors."
			},
			{
				label: "factorsFromString",
				type: "method",
				detail: "(value: string, isNumerator?: boolean): Factor[]",
				info: "Parse a product string into an array of Factor instances.\n\nSupported format: parenthesised terms with optional powers and implicit\nmultiplication, e.g. `\"(3x+2)^2*(x-1)\"` or `\"(x+1)(x-1)^(1/2)\"`.\nNon-parenthesised tokens (e.g. `\"3x\"`) are treated as a single factor\nwith implicit power ±1."
			}
		],
		PolyFactor: [
			{
				label: "gcd",
				type: "method",
				detail: "(...values: PolyFactor[]): PolyFactor",
				info: "Greatest common divisor: every base shared by all the polyfactors, at its lowest power."
			},
			{
				label: "lcm",
				type: "method",
				detail: "(...values: PolyFactor[]): PolyFactor",
				info: "Least common multiple: every base found in one of the polyfactors, at its highest power."
			},
			{
				label: "fromPolynom",
				type: "method",
				detail: "(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>): PolyFactor",
				info: "Build a polyfactor with one factor for the numerator and, when given, one for the denominator.\n\nThrows: {MathError} if the denominator is zero."
			},
			{
				label: "fromFactors",
				type: "method",
				detail: "(...values: (Factor | InputAlgebra<Polynom>)[]): PolyFactor",
				info: "Build a polyfactor from factors, or from anything a factor accepts."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): PolyFactor",
				info: "Build a polyfactor from a product of parenthesised terms, with at most one `/` for the denominator.\n\nThrows: {ParseError} if the numerator is empty or the string has more than one `/`."
			}
		],
		LogicalSet: [{
			label: "fromString",
			type: "method",
			detail: "(value: string): LogicalSet",
			info: "Build a set expression from a string such as `\"A&B|!C\"` (`&` intersection, `|` union, `!` complement,\n`-` difference).\n\nThrows: {ParseError} if the expression is malformed."
		}],
		Solution: [
			{
				label: "fromFraction",
				type: "method",
				detail: "(value: InputValue<Fraction>): Solution",
				info: "Build an exact solution from a rational value."
			},
			{
				label: "fromRoot",
				type: "method",
				detail: "(value: InputValue<Root>): Solution",
				info: "Build an exact solution from a radical value."
			},
			{
				label: "fromPolynomRoot",
				type: "method",
				detail: "(root: PolynomRoot): Solution",
				info: "Wrap a raw `PolynomRoot` (fraction + radical parts) into a Solution, mapping its multiplicity to `count`."
			},
			{
				label: "fromQuadratic",
				type: "method",
				detail: "(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[]",
				info: "Solve A·x² + B·x + C = 0. Returns `[]` when the discriminant is negative,\na single solution (with `count === 2`) for a double root, otherwise the two\nsolutions. Irrational roots are kept exact (index-2 `Root`)."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Solution",
				info: "Parse a string representation of a solution. Three strict forms:\n\n- Pure rational : `2/5`, `-3`, `1.23`\n- Pure radical  : `sqrt(5)`, `-2sqrt(3)`, `sqrt(5)/3`, `2sqrt(3)/5`\n- Combined      : `(-1+sqrt(5))/2`, `(3-2sqrt(7))/4`\n\nThrows: {ParseError} if the string matches none of the supported forms."
			}
		],
		TableOfSigns: [
			{
				label: "fromPolynom",
				type: "method",
				detail: "(p: Polynom): TableOfSigns",
				info: "Build the table of a polynom."
			},
			{
				label: "fromFactor",
				type: "method",
				detail: "(f: Factor): TableOfSigns",
				info: "Build the table of a factor. A negative power makes its roots poles, and an even power removes the negative signs."
			},
			{
				label: "fromPolyFactor",
				type: "method",
				detail: "(pf: PolyFactor): TableOfSigns",
				info: "Build the table of a product of factors. The table keeps one row per factor, shown with {@link withFactors}."
			}
		],
		Interval: [
			{
				label: "fromBounds",
				type: "method",
				detail: "(left: Solution | null, right: Solution | null, leftOpen: boolean, rightOpen: boolean): Interval",
				info: "Construct an interval from explicit bounds and open/closed flags.\nA `null` bound encodes ±∞ and is always forced open, regardless of the flag passed."
			},
			{
				label: "empty",
				type: "method",
				detail: "(): Interval",
				info: "The empty set ∅."
			},
			{
				label: "real",
				type: "method",
				detail: "(): Interval",
				info: "The whole real line ]-∞; +∞[."
			},
			{
				label: "point",
				type: "method",
				detail: "(x: Solution): Interval",
				info: "A closed singleton {x}."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Interval",
				info: "Parse a French-notation interval string.\n\nSupported forms:\n- `O/`                         → empty set\n- `RR`                         → ]-∞; +∞[\n- `RR_+`, `RR_-`               → [0; +∞[ or ]-∞; 0]\n- `RR_+**`, `RR_-**`           → ]0; +∞[ or ]-∞; 0[\n- `{a}`                        → singleton {a}\n- `]a;b[`, `[a;b]`, `[a;b[`, `]a;b]`  → general (a, b parsed via Solution.fromString or ±oo)\n\n`RR^**` (= ℝ*) is NOT a single interval — use `Domain.fromString` instead.\n\nThrows: {ParseError} on unrecognised format."
			}
		],
		Domain: [
			{
				label: "fromIntervals",
				type: "method",
				detail: "(intervals: Interval[]): Domain",
				info: "Build a domain from intervals. They are sorted, and the overlapping or touching ones are merged."
			},
			{
				label: "fromInterval",
				type: "method",
				detail: "(interval: Interval): Domain",
				info: "Build a domain from a single interval."
			},
			{
				label: "empty",
				type: "method",
				detail: "(): Domain",
				info: "The empty domain ∅."
			},
			{
				label: "real",
				type: "method",
				detail: "(): Domain",
				info: "The whole real line ℝ."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Domain",
				info: "Parse a French-notation domain string.\n\nSupported forms:\n- `O/`                          → ∅\n- `RR`                          → ℝ\n- `RR^**`                       → ℝ* = ]-∞;0[ ∪ ]0;+∞[\n- `RR\\{a;b;…}`                  → ℝ minus a finite set of points\n- `{a}`                          → closed singleton (delegated to Interval.fromString)\n- `{a;b;…}`                     → union of closed singletons\n- `I1uuI2uu…`                   → union of intervals (each parsed via Interval.fromString)\n- Any single-interval string    → delegated to Interval.fromString\n\nThrows: {ParseError} on unrecognised format."
			}
		],
		Vector: [
			{
				label: "asDisplay",
				type: "method",
				detail: "(...values: string[]): string",
				info: "Text form of a vector from already written coordinates: `asDisplay(\"x\", \"y\")` is `((x,y))`."
			},
			{
				label: "asTex",
				type: "method",
				detail: "(...values: string[]): string",
				info: "LaTeX form of a vector from already written coordinates."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(value: string): Vector",
				info: "Accepts `((x,y,...))`, `(x;y;...)`, or `x,y,...` format.\n\nThrows: {ParseError} if fewer than 2 components are found"
			},
			{
				label: "fromPolynom",
				type: "method",
				detail: "(expr: InputAlgebra<Polynom>, vectors: Record<string, Vector | string>): Vector",
				info: "Build the linear combination written by a polynom: `fromPolynom(\"2a-b\", {a: \"(1;0)\", b: \"(0;1)\"})` is `(2;-1)`.\n\nThrows: {InvalidArgumentError} if the polynom has a constant term, a term that is not linear, or a variable without vector.\n\nThrows: {DimensionError} if the vectors have different dimensions."
			}
		],
		Point: [{
			label: "fromString",
			type: "method",
			detail: "(value: string): Point",
			info: "Build a point from a string such as `\"(1;2)\"`, `\"1,2\"` or `\"1 2 3\"`: at least two coordinates, separated\nby `,`, `;` or a space.\n\nThrows: {ParseError} if fewer than 2 coordinates are found."
		}, {
			label: "middleOf",
			type: "method",
			detail: "(V1: Point, V2: Point): Point",
			info: "The midpoint of two points, as a new point.\n\nThrows: {DimensionError} if the points have different dimensions."
		}],
		Line: [
			{
				label: "PARALLEL",
				type: "property",
				info: "Constant to give to {@link fromPointAndLine}: build the parallel line."
			},
			{
				label: "PERPENDICULAR",
				type: "property",
				info: "Constant to give to {@link fromPointAndLine}: build the perpendicular line."
			},
			{
				label: "fromCoefficient",
				type: "method",
				detail: "(a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>): Line",
				info: "Build the line `ax + by + c = 0`. Fractional coefficients are multiplied to become integers."
			},
			{
				label: "fromEquation",
				type: "method",
				detail: "(value: InputAlgebra<Equation>): Line",
				info: "Build a line from an equation in `x` and `y` of the first degree.\n\nThrows: {ParseError} if the equation has no `x` or `y`, has another variable, or is not linear."
			},
			{
				label: "fromParallel",
				type: "method",
				detail: "(parallel: Line, point: Point): Line",
				info: "The line through `point` parallel to `parallel`."
			},
			{
				label: "fromPerpendicular",
				type: "method",
				detail: "(perpendicular: Line, point: Point): Line",
				info: "The line through `point` perpendicular to `perpendicular`."
			},
			{
				label: "fromPointAndDirection",
				type: "method",
				detail: "(P: Point | Vector, d: Vector): Line",
				info: "The line through a point with a direction vector.\n\nThrows: {ParseError} if the vector is zero."
			},
			{
				label: "fromPointAndLine",
				type: "method",
				detail: "(P: Point | Vector, L: Line, orientation?: LineProperty): Line",
				info: "The line through a point, parallel (default) or perpendicular to a line."
			},
			{
				label: "fromPointAndNormal",
				type: "method",
				detail: "(P: Point | Vector, n: Vector): Line",
				info: "The line through a point with a normal vector.\n\nThrows: {ParseError} if the normal vector is zero."
			},
			{
				label: "fromPoints",
				type: "method",
				detail: "(A: Point, B: Point): Line",
				info: "The line through two points.\n\nThrows: {ParseError} if the points are the same."
			}
		],
		Triangle: [
			{
				label: "fromCoordinates",
				type: "method",
				detail: "(x1: InputValue<Fraction>, y1: InputValue<Fraction>, x2: InputValue<Fraction>, y2: InputValue<Fraction>, x3: InputValue<Fraction>, y3: InputValue<Fraction>): Triangle",
				info: "Build a triangle from the coordinates of its three vertices.\n\nThrows: {MathError} if the points are collinear or two of them are the same."
			},
			{
				label: "fromLines",
				type: "method",
				detail: "(line1: Line | string, line2: Line | string, line3: Line | string): Triangle",
				info: "Build a triangle from the lines of its sides `AB`, `BC` and `AC`, given as lines or equation strings.\n\nThrows: {MathError} if two lines are parallel or the lines do not form a triangle."
			},
			{
				label: "fromPoints",
				type: "method",
				detail: "(A: Point, B: Point, C: Point): Triangle",
				info: "Build a triangle from its three vertices.\n\nThrows: {MathError} if the points are collinear or two of them are the same."
			}
		],
		Circle: [
			{
				label: "fromCenterPoint",
				type: "method",
				detail: "(center: Point, pointThrough: Point): Circle",
				info: "The circle with the given center, through a point."
			},
			{
				label: "fromCenterRadius",
				type: "method",
				detail: "(center: Point, radius: Fraction | number, square?: boolean): Circle",
				info: "The circle with the given center and radius."
			},
			{
				label: "fromEquation",
				type: "method",
				detail: "(value: InputAlgebra<Equation>): Circle",
				info: "Does not mutate the input.\n\nThrows: {MathError} if the input is not a valid circle equation"
			},
			{
				label: "fromPoints",
				type: "method",
				detail: "(A: Point, B: Point, C: Point): Circle",
				info: "The circle through three points.\n\nThrows: {MathError} if the points are collinear or two of them are the same."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(str: string): Circle",
				info: "The circle of an equation written in a string.\n\nThrows: {MathError} if the equation is not the one of a circle."
			},
			{
				label: "RELATIVE_POSITION",
				type: "property",
				info: "The values returned by {@link relativePosition} for two circles."
			}
		],
		Line3: [{
			label: "fromPoints",
			type: "method",
			detail: "(A: Point, B: Point): Line3",
			info: "The line through two points."
		}, {
			label: "fromPointAndDirection",
			type: "method",
			detail: "(A: Point, d: Vector): Line3",
			info: "The line through a point with a direction vector."
		}],
		Plane3: [
			{
				label: "fromPointAndNormal",
				type: "method",
				detail: "(point: Point, normal: Vector): Plane3",
				info: "The plane through a point with a normal vector."
			},
			{
				label: "fromPointAndDirections",
				type: "method",
				detail: "(point: Point, v1: Vector, v2: Vector): Plane3",
				info: "The plane through a point, spanned by two direction vectors (the normal is their cross product)."
			},
			{
				label: "fromEquation",
				type: "method",
				detail: "(value: InputAlgebra<Equation>): Plane3",
				info: "Builds a plane from a cartesian equation (string or Equation)."
			},
			{
				label: "fromString",
				type: "method",
				detail: "(str: string): Plane3",
				info: "The plane of a cartesian equation written in a string, such as `\"x+2y+3z-6=0\"`."
			},
			{
				label: "fromPoints",
				type: "method",
				detail: "(A: Point, B: Point, C: Point): Plane3",
				info: "The plane through three points."
			},
			{
				label: "fromCoefficients",
				type: "method",
				detail: "(a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>, d: InputValue<Fraction>): Plane3",
				info: "Builds a plane from four cartesian coefficients `[a, b, c, d]` where the\nequation is `ax + by + cz + d = 0`."
			}
		],
		Sphere3: [
			{
				label: "fromCenterRadius",
				type: "method",
				detail: "(center: Point, radius: InputValue<Fraction>, square?: boolean): Sphere3",
				info: "The sphere with the given center and radius."
			},
			{
				label: "fromEquation",
				type: "method",
				detail: "(value: InputAlgebra<Equation>): Sphere3",
				info: "Does not mutate the input.\n\nThrows: {MathError} if the input is not a valid sphere equation (degree ≠ 2 in x/y/z, or unequal leading coefficients)"
			},
			{
				label: "fromString",
				type: "method",
				detail: "(str: string): Sphere3",
				info: "The sphere of an equation written in a string.\n\nThrows: {MathError} if the equation is not the one of a sphere."
			},
			{
				label: "RELATIVE_POSITION",
				type: "property",
				info: "The values returned by {@link relativePosition}."
			}
		],
		Random: [
			{
				label: "equation",
				type: "function",
				detail: "(config?: RandomEquationConfig): Equation",
				info: "Generates a random polynomial equation.\n\n**Modes (evaluated in order):**\n- `solution.everything: true` — degenerate P = P (infinite solutions, 0 = 0).\n- `solution.nothing: true` — degenerate P+k = P, k ≠ 0 (no solution, ∅).\n- `factorable: true` or `solution.count` set — P built as a product of controlled factors.\n- Default — random P(x) = 0.\n\n**`solution.count`** — exact number of distinct real solutions (0..degree).\nWhen (degree−count) is odd, one root is doubled (still one distinct solution).\ncount=0 with odd degree is impossible by IVT and throws.\n\n**Irreducible quadratic factors** — when needed to fill remaining degree after\nlinear factors, uses ax²+c (a,c > 0), which always has negative discriminant.\n\n**`solution.relative: true`** — forces integer roots of either sign (unit leading coefficient per factor).\n\n**`solution.range`** — the interval of the solutions (default `[-5, 5]`), also used for the constant that `nothing`\nadds; fractional solutions follow `fraction` within it.\n\n**`solution.allowZero`** — allows 0 as a root (default `true`). It is in `solution`, not in `allow`, because it\nconstrains the solutions of the equation rather than its coefficients.\n\n**`shuffle: true`** — adds a random polynomial Q (same degree/variables/fraction)\nto both sides: P = 0 becomes P+Q = Q.\n\nThrows: {InvalidArgumentError} if degree is not a non-negative integer.\n\nThrows: {InvalidArgumentError} if variables is not a non-empty string of lowercase letters, or holds several\nvariables while `factorable` or `solution.count` is set (the solutions are those of a single variable).\n\nThrows: {InvalidArgumentError} if `solution.nothing` or `solution.everything` is neither a boolean nor a\nprobability between 0 and 1.\n\nThrows: {InvalidArgumentError} if `solution.range` is invalid, or holds only 0 while `solution.nothing` can be drawn.\n\nThrows: {InvalidArgumentError} if solution.count is out of range or impossible for the given degree.\n\nThrows: {InvalidArgumentError} if the configuration contains the former `solution.integer` option\n(renamed `solution.relative`)."
			},
			{
				label: "polynom",
				type: "function",
				detail: "(config?: RandomPolynomConfig): Polynom",
				info: "Generates a random polynomial of the given degree.\n\n**`allow.nullMonom`** — when `true` (default), non-leading monomials may have a zero\ncoefficient (removed by `reduce()`); when `false`, every term from degree 0 to `degree`\nis guaranteed non-zero.\n\n**`allow.negativeLeading`** — when `false` (default), the leading coefficient is always\npositive; the whole polynomial is negated if necessary.\n\n**`allow.commonFactor`** — when `false`, the polynomial is retried until the GCD of all\ninteger coefficients equals 1 (primitive polynomial). Ignored when `fraction` is not\n`false` (fractional coefficients).\n\n**`numberOfMonoms`** — limits the number of terms by randomly removing non-leading\nmonomials after generation. Silently ignored when the generated polynomial already\nhas fewer terms than requested.\n\n**`factorable: true`** — delegates to the internal `rndFactorablePolynom`: produces a\nproduct of `degree` linear factors with an optional common integer constant\n(see `commonConstant`).\n\n**`commonConstant`** — controls the common constant factor for factorable polynomials:\n- `undefined` (default): a random non-unit integer constant is sometimes added.\n- `false`: no constant factor is ever added.\n- `true`: a constant factor with `|k| ≥ 2` is always added.\n\n**`allow.commonFactor: false`** also applies to `factorable`: no constant factor is added, and the integer\ncoefficients of the product have no common divisor (the content is divided out). It contradicts\n`commonConstant: true`, which throws.\n\nThrows: {InvalidArgumentError} if `degree` is not a non-negative integer.\n\nThrows: {InvalidArgumentError} if `variables` is not a non-empty string of lowercase letters.\n\nThrows: {InvalidArgumentError} if `commonConstant` is `true` while `allow.commonFactor` is `false` (with `factorable`)."
			},
			{
				label: "monom",
				type: "function",
				detail: "(config?: RandomMonomConfig): Monom",
				info: "Generates a random `Monom` (a single term such as `3x²` or `-½xy`).\n\n**`fraction`** controls the coefficient generation strategy:\n- `false` (default) — integer coefficient (`relative: true` passed to `rndFraction`).\n- `true` — fractional coefficient allowed.\n- `RandomCoefficientConfig` object — full control over the coefficient (max, reduced,\n  allow.negative, allow.zero…). Values are deep-merged over the internal defaults.\n\n**Multi-variable degree distribution**: when `variables` contains more than one variable,\nthe `degree` units are distributed by drawing a random variable at each step and\nincrementing its exponent. This produces a multinomial distribution — for `degree: 2`\nand `variables: 'xy'`, `xy` is twice as probable as `x²` or `y²`. Duplicate variables\nin `variables` are silently deduplicated before distribution.\n\nThrows: {InvalidArgumentError} if `variables` is not a non-empty string of lowercase letters.\n\nThrows: {InvalidArgumentError} if `degree` is negative or not an integer."
			},
			{
				label: "fraction",
				type: "function",
				detail: "(config?: RandomCoefficientConfig): Fraction",
				info: "Generates a random fraction whose numerator and denominator are in `[-max, max]`.\n\n**`allow`** selects the signs the value may take: `negative` and `positive` (`true` by default) and `zero`\n(`false` by default, so 0 is never drawn unless `allow: { zero: true }`). The numerator is drawn uniformly\namong the allowed integers of `[-max, max]`, so `allow: { negative: false }` gives a strictly positive value and\n`allow: { positive: false }` a strictly negative one.\n\n**`relative: true`** forces an integer of either sign (denominator 1). The name follows\n`Fraction.isRelative()`; the former `natural` option, which was misleading (it allowed negatives), is rejected.\n\n**`range`** keeps the value in an interval (a number `d` for `[-|d|, |d|]`, or `{min, max}`). The signs of `allow` then\nonly apply where the interval holds values of that sign, `max` defaults to the largest bound of the interval (at\nleast 2; doubled when the interval stays at least 1 away from 0, which a smaller `max` could not reach with a\nnon-integer fraction), and the value is drawn by rejection until it falls in the interval.\n\nWhen `relative: false` (default), the denominator is chosen uniformly among values in\n`[2, max]` that do not divide the numerator (ensuring a non-integer result). If no\nsuch value exists within `[2, max]`, the denominator falls back to 1.\n\nThrows: {InvalidArgumentError} if `allow` excludes every value (e.g. `negative` and `positive` set to `false`\nwhile `zero` is left to `false`).\n\nThrows: {InvalidArgumentError} if the configuration contains the former `natural` option (renamed `relative`).\n\nThrows: {InvalidArgumentError} if `range` is invalid, leaves no value allowed by `allow` (or no integer with\n`relative`), or if no value falls in it within {@link MAX_ATTEMPTS} draws (widen `range` or raise `max`)."
			},
			{
				label: "point",
				type: "function",
				detail: "(config?: RandomGeometryPointConfig): Point",
				info: "Generates a random 2D `Point`.\n\nEach coordinate is drawn in the interval `range ∩ quadrant`, subject to a zero rule given by `axis`.\nThe two constraints are independent: `axis` acts on *zero*, `quadrant` acts on *sign*.\n\n**`axis`** (default `null`):\n- `'x'` / `'y'` — the point is on that axis (`y = 0` / `x = 0`); the other coordinate is free,\n  so the origin is possible unless `allow.origin` is `false`.\n- `true` — on one of the two axes, chosen at random.\n- `false` — on no axis: no coordinate is zero.\n- `null` — unconstrained: a coordinate may be zero.\n\n**`quadrant`** — a quadrant `1..4`, or an array of quadrants (union). **Axes are included**:\nquadrant 1 means `x >= 0` and `y >= 0`. With an array, one quadrant is chosen uniformly, then the\npoint is drawn in it (uniform over the quadrants, not over the surface when `range` is asymmetric).\nCombine with `axis: false` for points strictly inside the quadrant.\n\n**`range`** — a number `d` means `[-|d|, |d|]` (so `10` and `-10` are equivalent); `{min, max}` gives\nexplicit bounds.\n\n**`fraction`** — `false` (default) draws integers; `true` draws fractions; a\n`RandomCoefficientConfig` gives full control. Its `allow` (zero, negative, positive) is\nignored (it is driven by `axis`, `quadrant` and `range`); its `max`, when given, bounds the\nnumerator and denominator instead of the range. Fractions are drawn by rejection until they fall\nin the interval.\n\nThrows: {InvalidArgumentError} if `axis`, `quadrant` or `range` is invalid.\n\nThrows: {InvalidArgumentError} if the constraints are incompatible (e.g. `axis: 'x'` with a range that\nexcludes 0, or a quadrant disjoint from the range) — checked for every alternative (each quadrant, each axis\nof `axis: true`) before drawing, so the error does not depend on the random choice — or if they cannot be\nsatisfied in {@link MAX_ATTEMPTS} draws."
			},
			{
				label: "point3",
				type: "function",
				detail: "(config?: RandomGeometryPoint3Config): Point",
				info: "Generates a random 3D `Point`.\n\nEach coordinate is drawn in the interval `range ∩ octant`, subject to a zero rule given by `axis` or `plane`.\nThe constraints are independent: `axis` and `plane` act on *zero*, `octant` acts on *sign*.\n\n**`axis`** (default `null`):\n- `'x'` / `'y'` / `'z'` — the point is on that axis (the two other coordinates are zero);\n- `true` — on one of the three axes, chosen at random;\n- `false` — no coordinate is zero;\n- `null` — unconstrained: a coordinate may be zero.\n\n**`plane`** (default `null`) — `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`), or `true` for one of\nthem chosen at random. The two other coordinates are free, so they may be zero. Exclusive with `axis`.\n\n**`octant`** — an octant `1..8`, or an array of octants (union). **Axes and planes are included**: octant 1\nmeans `x >= 0`, `y >= 0` and `z >= 0`. Octants 1 to 4 are the quadrants 1 to 4 with `z >= 0`; octants 5 to 8 are\nthe same quadrants with `z <= 0`. With an array, one octant is chosen uniformly, then the point is drawn in it.\nCombine with `axis: false` for points strictly inside the octant.\n\n**`range`** — a number `d` means `[-|d|, |d|]` (so `10` and `-10` are equivalent); `{min, max}` gives\nexplicit bounds.\n\n**`fraction`** — `false` (default) draws integers; `true` draws fractions; a `RandomCoefficientConfig` gives\nfull control (its `allow` is ignored, as for `rndPoint`; its `max`, when given, bounds the numerator and the\ndenominator instead of the range).\n\n**`allow.origin`** (default `true`) — `false` excludes the point `(0, 0, 0)`.\n\nThrows: {InvalidArgumentError} if `axis`, `plane`, `octant` or `range` is invalid, or if `axis` and `plane` are combined.\n\nThrows: {InvalidArgumentError} if the constraints are incompatible (e.g. `axis: 'x'` with a range that\nexcludes 0, or an octant disjoint from the range) — checked for every alternative before drawing, so the\nerror does not depend on the random choice of an axis, a plane or an octant.\n\nThrows: {InvalidArgumentError} if the constraints cannot be satisfied in {@link MAX_ATTEMPTS} draws."
			},
			{
				label: "vector",
				type: "function",
				detail: "(config?: RandomGeometryVectorConfig): Vector",
				info: "Generates a random 2D `Vector`.\n\nThe components are drawn like the coordinates of `rndPoint`, with the same options: `axis`, `quadrant`,\n`range` and `fraction` (see `rndPoint`). Two options are specific to vectors (see `RandomVectorOptions` in\n`rndTypes.ts`): `allow.zero` (the null vector is excluded by default; it replaces the `allow.origin` of\npoints) and `primitive` (integer components with no common divisor).\n\nThrows: {InvalidArgumentError} if `allow.origin` is given (use `allow.zero`), if `allow.zero` or `primitive`\nis not a boolean, or if `primitive` is combined with fractions.\n\nThrows: {InvalidArgumentError} for any invalid or incompatible point option (see `rndPoint`), or if no\nprimitive vector within `range` is found."
			},
			{
				label: "vector3",
				type: "function",
				detail: "(config?: RandomGeometryVector3Config): Vector",
				info: "Generates a random 3D `Vector`.\n\nThe components are drawn like the coordinates of `rndPoint3`, with the same options: `axis`, `plane`,\n`octant`, `range` and `fraction` (see `rndPoint3`). Two options are specific to vectors (see\n`RandomVectorOptions` in `rndTypes.ts`): `allow.zero` (the null vector is excluded by default; it replaces the\n`allow.origin` of points) and `primitive` (integer components with no common divisor).\n\nThrows: {InvalidArgumentError} if `allow.origin` is given (use `allow.zero`), if `allow.zero` or `primitive`\nis not a boolean, or if `primitive` is combined with fractions.\n\nThrows: {InvalidArgumentError} for any invalid or incompatible point option (see `rndPoint3`), or if no\nprimitive vector within `range` is found."
			},
			{
				label: "line",
				type: "function",
				detail: "(config?: RandomGeometryLineConfig): Line",
				info: "Generates a random `Line`, built from a point `A` and a slope.\n\n**`A`** — a `Point` fixes the point exactly; an object is the configuration of `rndPoint`\n(default: its own defaults). The legacy `{x, y}` form is rejected: use `new Point(x, y)`.\n\n**`slope`**:\n- an exact value (`2`, `'-3/2'`, `Fraction`) gives a line with exactly that slope (`0` is horizontal);\n- `{ fraction }` draws a random slope: `false` for an integer, `true` for a fraction (default), or a\n  `RandomCoefficientConfig` such as `{ max: 5 }`. The sign of the coefficient configuration is\n  overridden by the kind of line drawn (see `allow`).\n\n**`allow`** — the kind of line to draw, for a random slope. Each of `vertical`, `horizontal`\n(zero slope), `positive` and `negative` (sign of the slope) is `false` (never), a number in `[0, 1]`\n(probability of that kind) or `true` (default). `true` means 5 % for `vertical` and `horizontal`,\nand an equal share of what remains for `positive` and `negative`. An explicit number takes\nprecedence over `true`, and probabilities that do not add up are normalized.\n`{ vertical: 1 }` always gives a vertical line; `{ vertical: false, horizontal: false, negative: false }`\nalways gives a positive slope.\n\nThrows: {InvalidArgumentError} if `A`, `slope` or an `allow` entry is invalid.\n\nThrows: {InvalidArgumentError} if `allow` excludes every kind of line.\n\nThrows: {InvalidArgumentError} if an exact `slope` is combined with an explicit `allow`."
			},
			{
				label: "line3",
				type: "function",
				detail: "(config?: RandomGeometryLine3Config): Line3",
				info: "Generates a random 3D `Line3`, built from a point `A` and a direction vector.\n\n**`A`** — a 3D `Point` fixes the point exactly; an object is the configuration of `rndPoint3` (default: its\nown defaults). The legacy `{x, y, z}` form is rejected: use `new Point(x, y, z)`.\n\n**`direction`** — a non-null 3D `Vector` fixes the direction exactly; an object is the configuration of\n`rndVector3` (`range`, `octant`, `fraction`, `primitive`…; default: its own defaults). The legacy `{x, y, z}`\nform is rejected: use `new Vector(x, y, z)`. The direction is never null.\n\n**`allow`** — the kind of line to draw, for a random direction `(a, b, c)`. The kinds are exclusive:\n- `general`: no zero component;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component, i.e. parallel\n  to that coordinate plane but to no axis;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n\nEach is `false` (never), a number in `[0, 1]` (probability of that kind) or `true` (default). `true` means 5 % for\neach `parallelXY` / `parallelXZ` / `parallelYZ`, 2 % for each `parallelX` / `parallelY` / `parallelZ`, and for\n`general` what the others leave. An explicit number takes precedence over `true`, and probabilities that do not\nadd up are normalized. `{ parallelXY: 1 }` always gives a line parallel to the xy plane.\n\nThe kind of line imposes the zeros of the direction, so the `axis` and `plane` of a direction configuration are\noverridden (its `octant`, `range` and `fraction` still apply). A kind allowed by `true` that the direction\nconfiguration makes impossible (e.g. a `range` that excludes 0, for a kind that needs a zero) is skipped.\n\nThrows: {InvalidArgumentError} if `A`, `direction` or an `allow` entry is invalid, or if `direction.allow.zero`\nis `true`.\n\nThrows: {InvalidArgumentError} if `allow` excludes every kind of line, or if a kind asked by an explicit number\nis impossible with the direction configuration.\n\nThrows: {InvalidArgumentError} if an exact `direction` is null, or combined with an explicit `allow`."
			},
			{
				label: "circle",
				type: "function",
				detail: "(config?: RandomGeometryCircleConfig): Circle",
				info: "Generates a random `Circle`, from a center and a squared radius.\n\n**`center`** — configuration of `rndPoint` (default: its own defaults).\n\n**`radius`** / **`squaredRadius`** (exclusive; default: a random `squaredRadius`) — an exact value\n(`5`, `'5/2'`) or `{ fraction }` to draw it at random. `squaredRadius` allows irrational radii\n(`5` gives x² + y² = 5, radius √5). A random integer goes from 1 to 5 (`radius`) or 1 to 25\n(`squaredRadius`), unless `fraction` is an object giving `max` and `relative: true`. An object `fraction`\nwithout `relative: true` gives fractions.\n\n**`pointsOnCircle`** — the circle has **at least** `min` points whose offsets from the center are integers,\nso their coordinates are exact (`Circle.getPointsOnCircle` returns them). A number `n` means `{ min: n }`.\nThe default is `{ min: 8 }`, applied only when neither radius is given; otherwise it applies only if set\nexplicitly. The candidates are enumerated and one is picked uniformly: the default gives the squared\nradii 5, 10, 13, 17, 20 and 25. `fraction: true` (fractional offsets) is not implemented yet.\n\nThrows: {InvalidArgumentError} if `radius` and `squaredRadius` are both given, or if a radius, `max` or\n`pointsOnCircle` is invalid.\n\nThrows: {InvalidArgumentError} if no candidate has `min` points, if an exact radius that was requested with\n`pointsOnCircle` has fewer, or if a random fractional radius is requested with `min > 0` (it has no\ninteger points).\n\nThrows: {NotImplementedError} if `pointsOnCircle.fraction` is `true`."
			},
			{
				label: "number",
				type: "function",
				detail: "(from: number, to: number, exclude?: number[]): number",
				info: "Random integer in [a, b]. If b is omitted, the range is [0, a] or [a, 0] when a < 0.\nBounds are swapped automatically when a > b.\n\nThrows: {InvalidArgumentError} if `exclude` removes every value of the interval."
			},
			{
				label: "numberSym",
				type: "function",
				detail: "(max: number, allowZero?: boolean): number",
				info: "Random integer in [-max, max]."
			},
			{
				label: "prime",
				type: "function",
				detail: "(max?: number): number",
				info: "Random prime **strictly lower** than `max` (any prime of the list when `max` is omitted)."
			},
			{
				label: "triplet",
				type: "function",
				detail: "(target: number, allowZero?: boolean): [number, number, number] | null",
				info: "Random Pythagorean triplet whose hypotenuse is `target`, or `null` when there is none.\nTriplets that contain 0 are left out unless `allowZero` is `true`."
			},
			{
				label: "bool",
				type: "function",
				detail: "(percent?: number): boolean",
				info: "Random boolean with a percent ratio."
			},
			{
				label: "array",
				type: "function",
				detail: "<T>(arr: T[], number?: number): T[]",
				info: "Up to `number` distinct elements of `arr` (default 1), in random order; `arr` is not modified."
			},
			{
				label: "item",
				type: "function",
				detail: "<T>(arr: T[]): T",
				info: "Returns a random element from arr.\n\nThrows: {InvalidArgumentError} if `arr` is empty.\n\nThrows: {InvalidArgumentError} if arr is empty."
			},
			{
				label: "shuffle",
				type: "function",
				detail: "<T>(arr: T[]): T[]",
				info: "Shuffled copy of `arr`; `arr` is not modified."
			}
		],
		Numeric: [
			{
				label: "decompose",
				type: "function",
				detail: "(value: number): number[][]",
				info: "Split a value into all its factor pairs [u, v] such that u * v = value.\nPairs the smallest remaining divider with the largest; a perfect-square\nmiddle divider is paired with itself (e.g. 25 -> [[1, 25], [5, 5]]).\n\nThrows: {InvalidArgumentError} if value is not a finite integer (propagated from dividers)."
			},
			{
				label: "dividers",
				type: "function",
				detail: "(value: number): number[]",
				info: "Get the sorted list of all (unique) dividers of an integer. Returns [] for 0\n(every integer divides 0; there is no finite list to return).\n\nThrows: {InvalidArgumentError} if value is not a finite integer."
			},
			{
				label: "divideNumbersByGCD",
				type: "function",
				detail: "(...values: number[]): number[]",
				info: "Divide every value by their greatest common divisor (simplify a ratio)."
			},
			{
				label: "gcd",
				type: "function",
				detail: "(...values: number[]): number",
				info: "Greatest common divisor of the given integers. Always positive; the gcd of an\nempty list, or of a single 0, is 1."
			},
			{
				label: "lcm",
				type: "function",
				detail: "(...values: number[]): number",
				info: "Least common multiple of the given integers. Computed as a / gcd * b to avoid\noverflowing MAX_SAFE_INTEGER; returns 0 when any value is 0."
			},
			{
				label: "numberCorrection",
				type: "function",
				detail: "(value: number, number_of_digits?: number): number",
				info: "Round away floating point representation noise (e.g. 0.1 + 0.2 -> 0.3).\nContrast with {@link round}, which rescales via `1e{n}` string exponents to\nsupport arbitrary (including negative) decimals; this one trims noise through\ntoFixed on a fixed [0, 100] digit range."
			},
			{
				label: "primes",
				type: "function",
				detail: "(nb?: number): number[]",
				info: "Get the list of the nth first prime numbers.\n\nThrows: {InvalidArgumentError} if nb is negative or not an integer."
			},
			{
				label: "pythagoreanTripletsWithTarget",
				type: "function",
				detail: "(target: number, targetIsSquare?: boolean): [number, number, number][]",
				info: "Find every pythagorean triplet [u, v, hypotenuse] with u^2 + v^2 = hypotenuse^2.\nBoth (u, v) and (v, u) orderings and zero legs are returned; callers filter them.\ntarget 0 yields the single triplet [0, 0, 0].\n\nThrows: {InvalidArgumentError} if target is negative or not a finite integer."
			},
			{
				label: "round",
				type: "function",
				detail: "(value: number, decimals?: number): number",
				info: "Round a value to a given number of decimals. Negative decimals round to\ntens, hundreds, etc. Contrast with {@link numberCorrection}, which trims\nfloating point noise through toFixed rather than rescaling."
			},
			{
				label: "greatestPower",
				type: "function",
				detail: "(value: number, index: number): number",
				info: "Get the greatest perfect power of the given index that divides value\n(e.g. greatestPower(50, 2) = 25). Returns 1 when none exists, when\nindex <= 0, or for value 0 (nothing to extract).\n\nA negative value with an odd index propagates the sign so callers can pull\nit out of a radical (e.g. greatestPower(-8, 3) = -8, greatestPower(-40, 3)\n= -8). A negative value with an even index returns 1 (an even root of a\nnegative is not real, nothing to extract)."
			},
			{
				label: "nthRoot",
				type: "function",
				detail: "(value: number, index: number): number",
				info: "Exact integer nth root of a perfect index-th power (e.g. nthRoot(8, 3) = 2),\navoiding Math.pow floating-point noise. Falls back to the real root when\n`value` is not a perfect power. Handles negative values for odd indices;\nnthRoot(0, index) is 0. Returns NaN when index <= 0 or for an even root of a\nnegative value."
			}
		]
	},
	signatures: {
		"new Fraction": [
			"new Fraction()",
			"new Fraction(value: InputValue<Fraction>)",
			"new Fraction(numerator: number, denominator: number)"
		],
		"Fraction.areEquals": ["areEquals(...F: Fraction[]): boolean"],
		"Fraction.average": ["average(...fractions: (InputValue<Fraction>)[]): Fraction"],
		"Fraction.isFraction": ["isFraction(value: InputValue<Fraction>): boolean"],
		"Fraction.max": ["max(...fractions: InputValue<Fraction>[]): Fraction"],
		"Fraction.min": ["min(...fractions: (InputValue<Fraction>)[]): Fraction"],
		"Fraction.sort": ["sort(fractions: (InputValue<Fraction>)[], reverse?: boolean): Fraction[]"],
		"Fraction.toSameDenominateur": ["toSameDenominateur(...fractions: InputValue<Fraction>[]): Fraction[]"],
		"Fraction.unique": ["unique(fractions: (InputValue<Fraction>)[]): Fraction[]"],
		"Fraction.xMultiply": ["xMultiply(...values: (InputValue<Fraction>)[]): Fraction"],
		"Fraction.fromNumber": ["fromNumber(value: number): Fraction"],
		"Fraction.fromNumbers": ["fromNumbers(numerator: number, denominator: number): Fraction"],
		"Fraction.fromPeriodic": ["fromPeriodic(value: string | number, length: number): Fraction"],
		"Fraction.fromString": ["fromString(value: string): Fraction"],
		"new Root": ["new Root(value?: InputValue<Root | Fraction>)"],
		"Root.fromFraction": ["fromFraction(value: Fraction): Root"],
		"Root.fromString": ["fromString(value: string): Root"],
		"new Monom": ["new Monom(value?: InputValue<Fraction>)", "new Monom(value?: Monom)"],
		"Monom.fromNumber": ["fromNumber(value: number): Monom"],
		"Monom.fromFraction": ["fromFraction(value: InputValue<Fraction>): Monom"],
		"Monom.fromLiteral": ["fromLiteral(coefficient: InputValue<Fraction>, literal: LiteralType<Fraction>): Monom"],
		"Monom.fromString": ["fromString(value: string): Monom"],
		"Monom.gcd": ["gcd(...monoms: Monom[]): Monom"],
		"Monom.xMultiply": ["xMultiply(...monoms: Monom[]): Monom"],
		"new Polynom": [
			"new Polynom(value: InputValue<Fraction>)",
			"new Polynom(value: string)",
			"new Polynom(value: Monom)",
			"new Polynom(value: Polynom)",
			"new Polynom(...values: InputValue<Fraction>[])",
			"new Polynom(...values: InputAlgebra<Polynom>[])"
		],
		"Polynom.xMultiply": ["xMultiply(...polynoms: InputValue<Polynom>[]): Polynom"],
		"Polynom.fromCoefficients": ["fromCoefficients(variable: string, ...values: InputValue<Fraction>[]): Polynom"],
		"Polynom.fromConstant": ["fromConstant(value: InputValue<Fraction>): Polynom"],
		"Polynom.fromLinear": ["fromLinear(variables: string, ...coefficients: InputValue<Fraction>[]): Polynom"],
		"Polynom.fromMonoms": ["fromMonoms(...monoms: InputAlgebra<Fraction>[]): Polynom"],
		"Polynom.fromThreePoints": ["fromThreePoints(point1: XY<InputValue<Fraction>>, point2: XY<InputValue<Fraction>>, point3: XY<InputValue<Fraction>>, variable?: string): Polynom"],
		"Polynom.fromString": ["fromString(value: string): Polynom"],
		"new Equation": [
			"new Equation()",
			"new Equation(equation: InputAlgebra<Polynom> | Equation)",
			"new Equation(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EquationSign)"
		],
		"Equation.fromString": ["fromString(equationString: string): Equation"],
		"Equation.fromPolynoms": ["fromPolynoms(left: InputAlgebra<Polynom>, right: InputAlgebra<Polynom>, sign?: EquationSign): Equation"],
		"Equation.isEquationString": ["isEquationString(equationString: string): boolean"],
		"Equation.makeSolutionsUnique": ["makeSolutionsUnique(solutions: Solution[], sorted?: boolean): Solution[]"],
		"new Matrix": [
			"new Matrix()",
			"new Matrix(rows: number, cols?: number)",
			"new Matrix(value: string)",
			"new Matrix(values: InputAlgebra<Fraction>[][])"
		],
		"Matrix.fromString": ["fromString(value: string): Matrix"],
		"Matrix.fromValues": ["fromValues(values: InputAlgebra<Fraction>[][]): Matrix"],
		"Matrix.fromDimensions": ["fromDimensions(rows: number, cols?: number): Matrix"],
		"Matrix.fromVectors": ["fromVectors(...vectors: Vector[]): Matrix"],
		"new PolyMatrix": [
			"new PolyMatrix()",
			"new PolyMatrix(rows: number, cols?: number)",
			"new PolyMatrix(value: string)",
			"new PolyMatrix(values: InputAlgebra<Polynom>[][])"
		],
		"PolyMatrix.fromString": ["fromString(value: string): PolyMatrix"],
		"PolyMatrix.fromValues": ["fromValues(values: InputAlgebra<Polynom>[][]): PolyMatrix"],
		"PolyMatrix.fromDimensions": ["fromDimensions(rows: number, cols?: number): PolyMatrix"],
		"PolyMatrix.fromVectors": ["fromVectors(...vectors: Vector[]): PolyMatrix"],
		"PolyMatrix.fromMatrix": ["fromMatrix(m: Matrix): PolyMatrix"],
		"new LinearSystem": ["new LinearSystem(...values: (string | Equation)[])"],
		"LinearSystem.solutionAsDisplay": ["solutionAsDisplay(value: Solution[]): string"],
		"LinearSystem.solutionAsTex": ["solutionAsTex(value: Solution[]): string"],
		"new Factor": ["new Factor(value?: InputAlgebra<Polynom> | Factor, power?: InputValue<Fraction>)"],
		"Factor.fromString": ["fromString(value: string): Factor"],
		"Factor.fromPolynom": ["fromPolynom(polynom: InputAlgebra<Polynom>): Factor"],
		"Factor.checkParseAsFactors": ["checkParseAsFactors(str: string): boolean"],
		"Factor.factorsFromString": ["factorsFromString(value: string, isNumerator?: boolean): Factor[]"],
		"new PolyFactor": ["new PolyFactor(...values: (InputAlgebra<Polynom> | Factor | PolyFactor)[])"],
		"PolyFactor.gcd": ["gcd(...values: PolyFactor[]): PolyFactor"],
		"PolyFactor.lcm": ["lcm(...values: PolyFactor[]): PolyFactor"],
		"PolyFactor.fromPolynom": ["fromPolynom(numerator: InputAlgebra<Polynom>, denominator?: InputAlgebra<Polynom>): PolyFactor"],
		"PolyFactor.fromFactors": ["fromFactors(...values: (Factor | InputAlgebra<Polynom>)[]): PolyFactor"],
		"PolyFactor.fromString": ["fromString(value: string): PolyFactor"],
		"new LogicalSet": ["new LogicalSet(value?: string)"],
		"LogicalSet.fromString": ["fromString(value: string): LogicalSet"],
		"new Solution": ["new Solution(value?: string | Fraction | Root | PolynomRoot | Solution)"],
		"Solution.fromFraction": ["fromFraction(value: InputValue<Fraction>): Solution"],
		"Solution.fromRoot": ["fromRoot(value: InputValue<Root>): Solution"],
		"Solution.fromPolynomRoot": ["fromPolynomRoot(root: PolynomRoot): Solution"],
		"Solution.fromQuadratic": ["fromQuadratic(A: InputValue<Fraction>, B: InputValue<Fraction>, C: InputValue<Fraction>): Solution[]"],
		"Solution.fromString": ["fromString(value: string): Solution"],
		"new TableOfSigns": ["new TableOfSigns(value?: InputAlgebra<PolyFactor | Factor | Polynom>)"],
		"TableOfSigns.fromPolynom": ["fromPolynom(p: Polynom): TableOfSigns"],
		"TableOfSigns.fromFactor": ["fromFactor(f: Factor): TableOfSigns"],
		"TableOfSigns.fromPolyFactor": ["fromPolyFactor(pf: PolyFactor): TableOfSigns"],
		"new Interval": ["new Interval(value?: string | Interval)"],
		"Interval.fromBounds": ["fromBounds(left: Solution | null, right: Solution | null, leftOpen: boolean, rightOpen: boolean): Interval"],
		"Interval.empty": ["empty(): Interval"],
		"Interval.real": ["real(): Interval"],
		"Interval.point": ["point(x: Solution): Interval"],
		"Interval.fromString": ["fromString(value: string): Interval"],
		"new Domain": ["new Domain(value?: string | Domain | Interval)"],
		"Domain.fromIntervals": ["fromIntervals(intervals: Interval[]): Domain"],
		"Domain.fromInterval": ["fromInterval(interval: Interval): Domain"],
		"Domain.empty": ["empty(): Domain"],
		"Domain.real": ["real(): Domain"],
		"Domain.fromString": ["fromString(value: string): Domain"],
		"new Vector": ["new Vector(...values: (Vector | Point)[] | InputValue<Fraction>[])"],
		"Vector.asDisplay": ["asDisplay(...values: string[]): string"],
		"Vector.asTex": ["asTex(...values: string[]): string"],
		"Vector.fromString": ["fromString(value: string): Vector"],
		"Vector.fromPolynom": ["fromPolynom(expr: InputAlgebra<Polynom>, vectors: Record<string, Vector | string>): Vector"],
		"new Point": ["new Point(...values: (Point | Vector)[] | InputValue<Fraction>[])"],
		"Point.fromString": ["fromString(value: string): Point"],
		"Point.middleOf": ["middleOf(V1: Point, V2: Point): Point"],
		"new Line": ["new Line(...values: unknown[])"],
		"Line.fromCoefficient": ["fromCoefficient(a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>): Line"],
		"Line.fromEquation": ["fromEquation(value: InputAlgebra<Equation>): Line"],
		"Line.fromParallel": ["fromParallel(parallel: Line, point: Point): Line"],
		"Line.fromPerpendicular": ["fromPerpendicular(perpendicular: Line, point: Point): Line"],
		"Line.fromPointAndDirection": ["fromPointAndDirection(P: Point | Vector, d: Vector): Line"],
		"Line.fromPointAndLine": ["fromPointAndLine(P: Point | Vector, L: Line, orientation?: LineProperty): Line"],
		"Line.fromPointAndNormal": ["fromPointAndNormal(P: Point | Vector, n: Vector): Line"],
		"Line.fromPoints": ["fromPoints(A: Point, B: Point): Line"],
		"new Triangle": ["new Triangle(...values: unknown[])"],
		"Triangle.fromCoordinates": ["fromCoordinates(x1: InputValue<Fraction>, y1: InputValue<Fraction>, x2: InputValue<Fraction>, y2: InputValue<Fraction>, x3: InputValue<Fraction>, y3: InputValue<Fraction>): Triangle"],
		"Triangle.fromLines": ["fromLines(line1: Line | string, line2: Line | string, line3: Line | string): Triangle"],
		"Triangle.fromPoints": ["fromPoints(A: Point, B: Point, C: Point): Triangle"],
		"new Circle": [
			"new Circle()",
			"new Circle(equation: string | Equation)",
			"new Circle(circle: Circle)",
			"new Circle(center: Point, radius: Fraction | number, square?: boolean)",
			"new Circle(center: Point, pointThrough: Point)",
			"new Circle(A: Point, B: Point, C: Point)"
		],
		"Circle.fromCenterPoint": ["fromCenterPoint(center: Point, pointThrough: Point): Circle"],
		"Circle.fromCenterRadius": ["fromCenterRadius(center: Point, radius: Fraction | number, square?: boolean): Circle"],
		"Circle.fromEquation": ["fromEquation(value: InputAlgebra<Equation>): Circle"],
		"Circle.fromPoints": ["fromPoints(A: Point, B: Point, C: Point): Circle"],
		"Circle.fromString": ["fromString(str: string): Circle"],
		"new Line3": [
			"new Line3()",
			"new Line3(A: Point, B: Point)",
			"new Line3(A: Point, d: Vector)"
		],
		"Line3.fromPoints": ["fromPoints(A: Point, B: Point): Line3"],
		"Line3.fromPointAndDirection": ["fromPointAndDirection(A: Point, d: Vector): Line3"],
		"new Plane3": ["new Plane3(config?: Plane3Config)"],
		"Plane3.fromPointAndNormal": ["fromPointAndNormal(point: Point, normal: Vector): Plane3"],
		"Plane3.fromPointAndDirections": ["fromPointAndDirections(point: Point, v1: Vector, v2: Vector): Plane3"],
		"Plane3.fromEquation": ["fromEquation(value: InputAlgebra<Equation>): Plane3"],
		"Plane3.fromString": ["fromString(str: string): Plane3"],
		"Plane3.fromPoints": ["fromPoints(A: Point, B: Point, C: Point): Plane3"],
		"Plane3.fromCoefficients": ["fromCoefficients(a: InputValue<Fraction>, b: InputValue<Fraction>, c: InputValue<Fraction>, d: InputValue<Fraction>): Plane3"],
		"new Sphere3": [
			"new Sphere3()",
			"new Sphere3(equation: string | Equation)",
			"new Sphere3(sphere: Sphere3)",
			"new Sphere3(center: Point, radius: InputValue<Fraction>, square?: boolean)"
		],
		"Sphere3.fromCenterRadius": ["fromCenterRadius(center: Point, radius: InputValue<Fraction>, square?: boolean): Sphere3"],
		"Sphere3.fromEquation": ["fromEquation(value: InputAlgebra<Equation>): Sphere3"],
		"Sphere3.fromString": ["fromString(str: string): Sphere3"],
		"new PiMathError": ["new PiMathError(message: string, options?: ErrorOptions)"],
		"new ParseError": ["new ParseError(message: string, options?: ErrorOptions)"],
		"new DimensionError": ["new DimensionError(message: string, options?: ErrorOptions)"],
		"new MathError": ["new MathError(message: string, options?: ErrorOptions)"],
		"new InvalidArgumentError": ["new InvalidArgumentError(message: string, options?: ErrorOptions)"],
		"new NotImplementedError": ["new NotImplementedError(message: string, options?: ErrorOptions)"],
		"new UnsupportedOperationError": ["new UnsupportedOperationError(message: string, options?: ErrorOptions)"],
		"new IndexError": ["new IndexError(message: string, options?: ErrorOptions)"],
		"new StateError": ["new StateError(message: string, options?: ErrorOptions)"],
		"new NumExp": ["new NumExp(value: string, uniformize?: boolean)"],
		"Random.equation": ["equation(config?: RandomEquationConfig): Equation"],
		"Random.polynom": ["polynom(config?: RandomPolynomConfig): Polynom"],
		"Random.monom": ["monom(config?: RandomMonomConfig): Monom"],
		"Random.fraction": ["fraction(config?: RandomCoefficientConfig): Fraction"],
		"Random.point": ["point(config?: RandomGeometryPointConfig): Point"],
		"Random.point3": ["point3(config?: RandomGeometryPoint3Config): Point"],
		"Random.vector": ["vector(config?: RandomGeometryVectorConfig): Vector"],
		"Random.vector3": ["vector3(config?: RandomGeometryVector3Config): Vector"],
		"Random.line": ["line(config?: RandomGeometryLineConfig): Line"],
		"Random.line3": ["line3(config?: RandomGeometryLine3Config): Line3"],
		"Random.circle": ["circle(config?: RandomGeometryCircleConfig): Circle"],
		"Random.number": ["number(from: number, to: number, exclude?: number[]): number"],
		"Random.numberSym": ["numberSym(max: number, allowZero?: boolean): number"],
		"Random.prime": ["prime(max?: number): number"],
		"Random.triplet": ["triplet(target: number, allowZero?: boolean): [number, number, number] | null"],
		"Random.bool": ["bool(percent?: number): boolean"],
		"Random.array": ["array<T>(arr: T[], number?: number): T[]"],
		"Random.item": ["item<T>(arr: T[]): T"],
		"Random.shuffle": ["shuffle<T>(arr: T[]): T[]"],
		"Numeric.decompose": ["decompose(value: number): number[][]"],
		"Numeric.dividers": ["dividers(value: number): number[]"],
		"Numeric.divideNumbersByGCD": ["divideNumbersByGCD(...values: number[]): number[]"],
		"Numeric.gcd": ["gcd(...values: number[]): number"],
		"Numeric.lcm": ["lcm(...values: number[]): number"],
		"Numeric.numberCorrection": ["numberCorrection(value: number, number_of_digits?: number): number"],
		"Numeric.primes": ["primes(nb?: number): number[]"],
		"Numeric.pythagoreanTripletsWithTarget": ["pythagoreanTripletsWithTarget(target: number, targetIsSquare?: boolean): [number, number, number][]"],
		"Numeric.round": ["round(value: number, decimals?: number): number"],
		"Numeric.greatestPower": ["greatestPower(value: number, index: number): number"],
		"Numeric.nthRoot": ["nthRoot(value: number, index: number): number"]
	},
	options: {
		"Random.equation": [
			{
				path: "degree",
				type: "number",
				default: "1",
				description: "Degree, a non-negative integer (default `1`)."
			},
			{
				path: "variables",
				type: "string",
				default: "'x'",
				description: "Variables of the equation, one lowercase letter each (default `'x'`)."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "Coefficients: `false` (default) gives integers, `true` fractions, an object gives full control."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "unit",
				type: "boolean",
				default: "false",
				description: "Force a leading coefficient equal to 1 (default `false`)."
			},
			{
				path: "factorable",
				type: "boolean",
				default: "false",
				description: "Build the equation from a product of factors, so that its solutions are controlled (default `false`)."
			},
			{
				path: "shuffle",
				type: "boolean",
				default: "false",
				description: "Add a random polynom to both sides: `P = 0` becomes `P + Q = Q` (default `false`)."
			},
			{
				path: "solution.count",
				type: "number",
				default: "unset",
				description: "Exact number of distinct real solutions, from 0 to `degree`. Implies a factored construction (default: unset, the number is free)."
			},
			{
				path: "solution.allowZero",
				type: "boolean",
				default: "true",
				description: "Allow 0 as a solution (default `true`). It lives in `solution` rather than in `allow`: it constrains the\nsolutions of the equation, not its coefficients."
			},
			{
				path: "solution.relative",
				type: "boolean",
				default: "false",
				description: "Force integer solutions of either sign, like `relative` for a fraction (default `false`)."
			},
			{
				path: "solution.range",
				type: "RandomRange",
				default: "5",
				description: "Interval of the solutions, and of the constant added by `nothing` (default `5`, i.e. `[-5, 5]`): a number\n`d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds. Fractional solutions follow the `fraction`\nconfiguration, within this interval."
			},
			{
				path: "solution.nothing",
				type: "number | boolean",
				default: "false",
				description: "Equation without solution: `true`, `false` (default), or a probability between 0 and 1."
			},
			{
				path: "solution.everything",
				type: "number | boolean",
				default: "false",
				description: "Equation true for every value: `true`, `false` (default), or a probability between 0 and 1."
			},
			{
				path: "allow.negativeLeading",
				type: "boolean",
				default: "false",
				description: "Allow a negative leading coefficient (default `false`)."
			},
			{
				path: "allow.commonFactor",
				type: "boolean",
				default: "true",
				description: "Allow a common factor between the integer coefficients (default `true`)."
			}
		],
		"Random.polynom": [
			{
				path: "commonConstant",
				type: "boolean",
				default: "undefined",
				description: "Only for `factorable: true`. `undefined` (default): a non-unit integer constant factor is sometimes added;\n`false`: never; `true`: always, with an absolute value of at least 2. Contradicts `allow.commonFactor: false`\n(which asks for no common factor at all) and throws with it."
			},
			{
				path: "degree",
				type: "number",
				default: "2",
				description: "Degree, a non-negative integer (default `2`)."
			},
			{
				path: "factorable",
				type: "boolean",
				default: "false",
				description: "Build the polynom as a product of `degree` linear factors (default `false`)."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "Coefficients: `false` (default) gives integers, `true` fractions, an object gives full control."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "variables",
				type: "string",
				default: "'x'",
				description: "Variables of the polynom, one lowercase letter each (default `'x'`)."
			},
			{
				path: "numberOfMonoms",
				type: "number",
				default: "0`: no limit",
				description: "Maximum number of terms (default `0`: no limit). Ignored when the polynom already has fewer terms."
			},
			{
				path: "unit",
				type: "boolean",
				default: "false",
				description: "Force a leading coefficient equal to 1 (default `false`)."
			},
			{
				path: "allow.nullMonom",
				type: "boolean",
				default: "true",
				description: "Non-leading terms may have a zero coefficient, i.e. be absent (default `true`)."
			},
			{
				path: "allow.negativeLeading",
				type: "boolean",
				default: "false`: the polynom is negated if needed",
				description: "Allow a negative leading coefficient (default `false`: the polynom is negated if needed)."
			},
			{
				path: "allow.commonFactor",
				type: "boolean",
				default: "true",
				description: "Allow a common factor between the integer coefficients (default `true`); `false` divides it out, and with\n`factorable` also adds no constant factor. The division is skipped with fractions."
			}
		],
		"Random.monom": [
			{
				path: "degree",
				type: "number",
				default: "2",
				description: "Total degree, a non-negative integer (default `2`)."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "Coefficient: `false` (default) gives an integer, `true` allows fractions,\nan object gives full control over the coefficient."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "variables",
				type: "string",
				default: "'x'",
				description: "Variables of the monom, one lowercase letter each, duplicates ignored (default `'x'`). With several variables, the degree is spread randomly."
			},
			{
				path: "allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow a zero coefficient (default `false`)."
			}
		],
		"Random.fraction": [
			{
				path: "max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			}
		],
		"Random.point": [
			{
				path: "axis",
				type: "boolean | \"x\" | \"y\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`: on the x-axis (`y = 0`); `'y'`: on the y-axis (`x = 0`).\n- `true`: on one of the two axes, chosen at random.\n- `false`: on no axis (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero)."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "quadrant",
				type: "Quadrant | Quadrant[] | null",
				default: "null",
				description: "Restricts the point to one quadrant, or to a union of quadrants (default `null`).\nAxes belong to the quadrants: quadrant 1 means `x >= 0` and `y >= 0`.\nWith several quadrants, one of them is chosen uniformly, then the point is drawn in it."
			},
			{
				path: "allow.origin",
				type: "boolean",
				default: "true",
				description: "`false` excludes the point `(0, 0)` (default `true`)."
			}
		],
		"Random.point3": [
			{
				path: "axis",
				type: "boolean | \"x\" | \"y\" | \"z\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`, `'y'`, `'z'`: on that axis (the two other coordinates are zero).\n- `true`: on one of the three axes, chosen at random.\n- `false`: on no axis and in no coordinate plane (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero).\n\nExclusive with `plane`."
			},
			{
				path: "plane",
				type: "boolean | \"xy\" | \"xz\" | \"yz\" | null",
				default: "null",
				description: "Coordinate plane containing the point (default `null`).\n- `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`): the other two coordinates are free.\n- `true`: in one of the three planes, chosen at random.\n- `false` / `null`: no constraint.\n\nExclusive with `axis`."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "octant",
				type: "Octant | Octant[] | null",
				default: "null",
				description: "Restricts the point to one octant, or to a union of octants (default `null`).\nAxes and planes belong to the octants. With several octants, one of them is chosen uniformly,\nthen the point is drawn in it."
			},
			{
				path: "allow.origin",
				type: "boolean",
				default: "true",
				description: "`false` excludes the point `(0, 0, 0)` (default `true`)."
			}
		],
		"Random.vector": [
			{
				path: "axis",
				type: "boolean | \"x\" | \"y\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`: on the x-axis (`y = 0`); `'y'`: on the y-axis (`x = 0`).\n- `true`: on one of the two axes, chosen at random.\n- `false`: on no axis (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero)."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "quadrant",
				type: "Quadrant | Quadrant[] | null",
				default: "null",
				description: "Restricts the point to one quadrant, or to a union of quadrants (default `null`).\nAxes belong to the quadrants: quadrant 1 means `x >= 0` and `y >= 0`.\nWith several quadrants, one of them is chosen uniformly, then the point is drawn in it."
			},
			{
				path: "primitive",
				type: "boolean",
				default: "false",
				description: "Integer components with no common divisor, e.g. `(1, 2)` and never `(2, 4)` (default `false`). Requires integers."
			},
			{
				path: "allow.zero",
				type: "boolean",
				default: "false",
				description: "`true` allows the null vector (default `false`)."
			}
		],
		"Random.vector3": [
			{
				path: "axis",
				type: "boolean | \"x\" | \"y\" | \"z\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`, `'y'`, `'z'`: on that axis (the two other coordinates are zero).\n- `true`: on one of the three axes, chosen at random.\n- `false`: on no axis and in no coordinate plane (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero).\n\nExclusive with `plane`."
			},
			{
				path: "fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "plane",
				type: "boolean | \"xy\" | \"xz\" | \"yz\" | null",
				default: "null",
				description: "Coordinate plane containing the point (default `null`).\n- `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`): the other two coordinates are free.\n- `true`: in one of the three planes, chosen at random.\n- `false` / `null`: no constraint.\n\nExclusive with `axis`."
			},
			{
				path: "octant",
				type: "Octant | Octant[] | null",
				default: "null",
				description: "Restricts the point to one octant, or to a union of octants (default `null`).\nAxes and planes belong to the octants. With several octants, one of them is chosen uniformly,\nthen the point is drawn in it."
			},
			{
				path: "primitive",
				type: "boolean",
				default: "false",
				description: "Integer components with no common divisor, e.g. `(1, 2)` and never `(2, 4)` (default `false`). Requires integers."
			},
			{
				path: "allow.zero",
				type: "boolean",
				default: "false",
				description: "`true` allows the null vector (default `false`)."
			}
		],
		"Random.line": [
			{
				path: "A",
				type: "RandomGeometryPointConfig | Point",
				default: "its own defaults",
				description: "Point on the line: a `Point` fixes it exactly (`new Point(1, 2)`); an object is the configuration\nof the random point drawn by `rndPoint` (default: its own defaults)."
			},
			{
				path: "A.axis",
				type: "boolean | \"x\" | \"y\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`: on the x-axis (`y = 0`); `'y'`: on the y-axis (`x = 0`).\n- `true`: on one of the two axes, chosen at random.\n- `false`: on no axis (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero)."
			},
			{
				path: "A.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "A.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "A.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "A.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "A.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "A.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "A.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "A.range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.quadrant",
				type: "Quadrant | Quadrant[] | null",
				default: "null",
				description: "Restricts the point to one quadrant, or to a union of quadrants (default `null`).\nAxes belong to the quadrants: quadrant 1 means `x >= 0` and `y >= 0`.\nWith several quadrants, one of them is chosen uniformly, then the point is drawn in it."
			},
			{
				path: "A.allow.origin",
				type: "boolean",
				default: "true",
				description: "`false` excludes the point `(0, 0)` (default `true`)."
			},
			{
				path: "slope",
				type: "FractionOrRandom",
				default: "a random slope",
				description: "Slope of the line (default: a random slope, as with `{ fraction: true }`).\n- an exact value (`2`, `'-3/2'`, `new Fraction(1, 2)`): the line has exactly that slope. Prefer a string\n  for a non-terminating fraction (`'1/3'`, not `0.333`). Incompatible with an explicit `allow`.\n- `{ fraction }`: a random slope, `false` for an integer, `true` for a fraction, or a\n  `RandomCoefficientConfig` (e.g. `max`). The sign comes from `allow.positive` / `allow.negative`."
			},
			{
				path: "slope.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: null,
				description: "Slope of the line (default: a random slope, as with `{ fraction: true }`).\n- an exact value (`2`, `'-3/2'`, `new Fraction(1, 2)`): the line has exactly that slope. Prefer a string\n  for a non-terminating fraction (`'1/3'`, not `0.333`). Incompatible with an explicit `allow`.\n- `{ fraction }`: a random slope, `false` for an integer, `true` for a fraction, or a\n  `RandomCoefficientConfig` (e.g. `max`). The sign comes from `allow.positive` / `allow.negative`."
			},
			{
				path: "slope.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "slope.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "slope.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "slope.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "slope.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "slope.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "slope.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "slope.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "slope.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "allow",
				type: "{ vertical?: boolean | number; horizontal?: boolean | number; positive?: boolean | number; negative?: boolean | number; }",
				default: "true",
				description: "Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between\n0 and 1 (probability of that kind), or `true` (default):\n- `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;\n- `positive` / `negative` (slope sign): `true` shares equally what the others leave.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nExamples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;\n`{ vertical: 1 }` always gives a vertical line."
			},
			{
				path: "allow.vertical",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between\n0 and 1 (probability of that kind), or `true` (default):\n- `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;\n- `positive` / `negative` (slope sign): `true` shares equally what the others leave.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nExamples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;\n`{ vertical: 1 }` always gives a vertical line."
			},
			{
				path: "allow.horizontal",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between\n0 and 1 (probability of that kind), or `true` (default):\n- `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;\n- `positive` / `negative` (slope sign): `true` shares equally what the others leave.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nExamples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;\n`{ vertical: 1 }` always gives a vertical line."
			},
			{
				path: "allow.positive",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between\n0 and 1 (probability of that kind), or `true` (default):\n- `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;\n- `positive` / `negative` (slope sign): `true` shares equally what the others leave.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nExamples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;\n`{ vertical: 1 }` always gives a vertical line."
			},
			{
				path: "allow.negative",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between\n0 and 1 (probability of that kind), or `true` (default):\n- `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;\n- `positive` / `negative` (slope sign): `true` shares equally what the others leave.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nExamples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;\n`{ vertical: 1 }` always gives a vertical line."
			}
		],
		"Random.line3": [
			{
				path: "A",
				type: "RandomGeometryPoint3Config | Point",
				default: "its own defaults",
				description: "Point on the line: a 3D `Point` fixes it exactly (`new Point(1, 2, 3)`); an object is the configuration\nof the random point drawn by `rndPoint3` (default: its own defaults)."
			},
			{
				path: "A.axis",
				type: "boolean | \"x\" | \"y\" | \"z\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`, `'y'`, `'z'`: on that axis (the two other coordinates are zero).\n- `true`: on one of the three axes, chosen at random.\n- `false`: on no axis and in no coordinate plane (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero).\n\nExclusive with `plane`."
			},
			{
				path: "A.plane",
				type: "boolean | \"xy\" | \"xz\" | \"yz\" | null",
				default: "null",
				description: "Coordinate plane containing the point (default `null`).\n- `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`): the other two coordinates are free.\n- `true`: in one of the three planes, chosen at random.\n- `false` / `null`: no constraint.\n\nExclusive with `axis`."
			},
			{
				path: "A.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "A.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "A.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "A.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "A.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "A.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "A.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "A.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "A.range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "A.octant",
				type: "Octant | Octant[] | null",
				default: "null",
				description: "Restricts the point to one octant, or to a union of octants (default `null`).\nAxes and planes belong to the octants. With several octants, one of them is chosen uniformly,\nthen the point is drawn in it."
			},
			{
				path: "A.allow.origin",
				type: "boolean",
				default: "true",
				description: "`false` excludes the point `(0, 0, 0)` (default `true`)."
			},
			{
				path: "direction",
				type: "RandomGeometryVector3Config | Vector",
				default: "its own defaults",
				description: "Direction of the line: a non-null 3D `Vector` fixes it exactly (`new Vector(1, 0, 2)`; incompatible with an\nexplicit `allow`); an object is the configuration of the random vector drawn by `rndVector3` (default: its own defaults). The\ndirection is never null. Its `axis` and `plane` are overridden by the kind of line drawn (see `allow`),\nand its `allow.zero` must not be `true`."
			},
			{
				path: "direction.axis",
				type: "boolean | \"x\" | \"y\" | \"z\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`, `'y'`, `'z'`: on that axis (the two other coordinates are zero).\n- `true`: on one of the three axes, chosen at random.\n- `false`: on no axis and in no coordinate plane (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero).\n\nExclusive with `plane`."
			},
			{
				path: "direction.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "direction.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "direction.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "direction.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "direction.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "direction.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "direction.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "direction.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "direction.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "direction.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "direction.range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "direction.range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "direction.range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "direction.plane",
				type: "boolean | \"xy\" | \"xz\" | \"yz\" | null",
				default: "null",
				description: "Coordinate plane containing the point (default `null`).\n- `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`): the other two coordinates are free.\n- `true`: in one of the three planes, chosen at random.\n- `false` / `null`: no constraint.\n\nExclusive with `axis`."
			},
			{
				path: "direction.octant",
				type: "Octant | Octant[] | null",
				default: "null",
				description: "Restricts the point to one octant, or to a union of octants (default `null`).\nAxes and planes belong to the octants. With several octants, one of them is chosen uniformly,\nthen the point is drawn in it."
			},
			{
				path: "direction.primitive",
				type: "boolean",
				default: "false",
				description: "Integer components with no common divisor, e.g. `(1, 2)` and never `(2, 4)` (default `false`). Requires integers."
			},
			{
				path: "direction.allow.zero",
				type: "boolean",
				default: "false",
				description: "`true` allows the null vector (default `false`)."
			},
			{
				path: "allow",
				type: "{ general?: boolean | number; parallelXY?: boolean | number; parallelXZ?: boolean | number; parallelYZ?: boolean | number; parallelX?: boolean | number; parallelY?: boolean | number; parallelZ?: boolean | number; }",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.general",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelXY",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelXZ",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelYZ",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelX",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelY",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			},
			{
				path: "allow.parallelZ",
				type: "number | boolean",
				default: "true",
				description: "Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is\n`false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):\n- `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the\n  other kinds leave;\n- `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,\n  i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;\n- `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.\n  `true` means 2 %.\n\nProbabilities that do not add up are normalized, and an explicit number takes precedence over `true`.\nA kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0\nfor a kind that needs a zero) is skipped; the same kind asked by an explicit number throws."
			}
		],
		"Random.circle": [
			{
				path: "center",
				type: "RandomGeometryPointConfig",
				default: "its own defaults",
				description: "Options of the center, drawn by `rndPoint` (default: its own defaults)."
			},
			{
				path: "center.axis",
				type: "boolean | \"x\" | \"y\" | null",
				default: "null",
				description: "Where the point lies relative to the axes (default `null`).\n- `'x'`: on the x-axis (`y = 0`); `'y'`: on the y-axis (`x = 0`).\n- `true`: on one of the two axes, chosen at random.\n- `false`: on no axis (no coordinate is zero).\n- `null`: unconstrained (a coordinate may be zero)."
			},
			{
				path: "center.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: "false",
				description: "`false` (default): integer coordinates; `true`: fractions; object: full control over the fractions."
			},
			{
				path: "center.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "center.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "center.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "center.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "center.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "center.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "center.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "center.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "center.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "center.range",
				type: "RandomRange",
				default: "10",
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "center.range.min",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "center.range.max",
				type: "number",
				default: null,
				description: "Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`\n(so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds."
			},
			{
				path: "center.quadrant",
				type: "Quadrant | Quadrant[] | null",
				default: "null",
				description: "Restricts the point to one quadrant, or to a union of quadrants (default `null`).\nAxes belong to the quadrants: quadrant 1 means `x >= 0` and `y >= 0`.\nWith several quadrants, one of them is chosen uniformly, then the point is drawn in it."
			},
			{
				path: "center.allow.origin",
				type: "boolean",
				default: "true",
				description: "`false` excludes the point `(0, 0)` (default `true`)."
			},
			{
				path: "radius",
				type: "FractionOrRandom",
				default: "is a random `squaredRadius",
				description: "Radius of the circle: an exact value (`5`, `'5/2'`), or `{ fraction }` for a random one\n(`fraction: false` gives an integer from 1 to 5 unless `max` is given, `true` a fraction). Exclusive with\n`squaredRadius`. The default is a random `squaredRadius`."
			},
			{
				path: "radius.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: null,
				description: "Radius of the circle: an exact value (`5`, `'5/2'`), or `{ fraction }` for a random one\n(`fraction: false` gives an integer from 1 to 5 unless `max` is given, `true` a fraction). Exclusive with\n`squaredRadius`. The default is a random `squaredRadius`."
			},
			{
				path: "radius.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "radius.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "radius.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "radius.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "radius.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "radius.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "radius.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "radius.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "radius.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "squaredRadius",
				type: "FractionOrRandom",
				default: "a random integer",
				description: "Squared radius of the circle (default: a random integer, see `pointsOnCircle`; the radius is then its square root, possibly irrational: `5` gives\nx² + y² = 5). Same forms as `radius`; the random integer ranges from 1 to 25 unless `max` is given.\nAn object `fraction` gives fractions unless it sets `relative: true`."
			},
			{
				path: "squaredRadius.fraction",
				type: "boolean | RandomCoefficientConfig",
				default: null,
				description: "Squared radius of the circle (default: a random integer, see `pointsOnCircle`; the radius is then its square root, possibly irrational: `5` gives\nx² + y² = 5). Same forms as `radius`; the random integer ranges from 1 to 25 unless `max` is given.\nAn object `fraction` gives fractions unless it sets `relative: true`."
			},
			{
				path: "squaredRadius.fraction.max",
				type: "number",
				default: "10",
				description: "Bound (absolute value) of the numerator and of the denominator (default `10`)."
			},
			{
				path: "squaredRadius.fraction.relative",
				type: "boolean",
				default: "false",
				description: "`true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`\n(a \"natural\" number would be non-negative). Default `false`."
			},
			{
				path: "squaredRadius.fraction.reduced",
				type: "boolean",
				default: "true",
				description: "Reduce the fraction (default `true`)."
			},
			{
				path: "squaredRadius.fraction.range",
				type: "RandomRange",
				default: "none",
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "squaredRadius.fraction.range.min",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "squaredRadius.fraction.range.max",
				type: "number",
				default: null,
				description: "Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the\nvalue is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values\nof that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval\nstays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the\nradius…), its own interval replaces this one."
			},
			{
				path: "squaredRadius.fraction.allow.zero",
				type: "boolean",
				default: "false",
				description: "Allow the value 0 (default `false`)."
			},
			{
				path: "squaredRadius.fraction.allow.negative",
				type: "boolean",
				default: "true",
				description: "Allow negative values (default `true`)."
			},
			{
				path: "squaredRadius.fraction.allow.positive",
				type: "boolean",
				default: "true",
				description: "Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws."
			},
			{
				path: "pointsOnCircle",
				type: "number | { min?: number; fraction?: boolean; }",
				default: "{ min: 8, fraction: false }",
				description: "Wanted number of points of the circle with exact coordinates: `n` is shorthand for `{ min: n }`.\n- `min`: the circle has **at least** that many points whose offsets from the center are integers (the\n  coordinates stay exact fractions when the center is fractional). A count is always a multiple of 4.\n- `fraction`: reserved for points with fractional offsets; `true` is not implemented yet.\n\nDefault `{ min: 8, fraction: false }`, applied only when neither `radius` nor `squaredRadius` is given;\nonce one of them is given, `pointsOnCircle` applies only if set explicitly (an exact radius that does not\nreach `min` then throws, and so does a fractional random radius, which has no integer points)."
			},
			{
				path: "pointsOnCircle.min",
				type: "number",
				default: null,
				description: "Wanted number of points of the circle with exact coordinates: `n` is shorthand for `{ min: n }`.\n- `min`: the circle has **at least** that many points whose offsets from the center are integers (the\n  coordinates stay exact fractions when the center is fractional). A count is always a multiple of 4.\n- `fraction`: reserved for points with fractional offsets; `true` is not implemented yet.\n\nDefault `{ min: 8, fraction: false }`, applied only when neither `radius` nor `squaredRadius` is given;\nonce one of them is given, `pointsOnCircle` applies only if set explicitly (an exact radius that does not\nreach `min` then throws, and so does a fractional random radius, which has no integer points)."
			},
			{
				path: "pointsOnCircle.fraction",
				type: "boolean",
				default: null,
				description: "Wanted number of points of the circle with exact coordinates: `n` is shorthand for `{ min: n }`.\n- `min`: the circle has **at least** that many points whose offsets from the center are integers (the\n  coordinates stay exact fractions when the center is fractional). A count is always a multiple of 4.\n- `fraction`: reserved for points with fractional offsets; `true` is not implemented yet.\n\nDefault `{ min: 8, fraction: false }`, applied only when neither `radius` nor `squaredRadius` is given;\nonce one of them is given, `pointsOnCircle` applies only if set explicitly (an exact radius that does not\nreach `min` then throws, and so does a fractional random radius, which has no integer points)."
			}
		]
	}
};
//#endregion
//#region src/completions/merge.ts
function t(e, t) {
	let n = { ...e.members };
	for (let [e, r] of Object.entries(t.members ?? {})) n[e] = [...n[e] ?? [], ...r];
	return {
		version: e.version,
		globals: [...e.globals, ...t.globals ?? []],
		members: n,
		signatures: {
			...e.signatures,
			...t.signatures
		},
		options: {
			...e.options,
			...t.options
		}
	};
}
//#endregion
export { e as n, t };

//# sourceMappingURL=shared.js.map