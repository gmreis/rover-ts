import { assert } from "chai";
import { Coordinate } from "../../src/types/coordinate";
import { Plateau } from "../../src/entities/plateau";


describe('Plateau', function() {
    it('Should returns the same size used when it was created.', function() {
        const sizeOne = { X: 5, Y: 4 };
        const sizeTwo = { X: 3, Y: 3 };

        const plateuOne = new Plateau(sizeOne);
        const plateuTwo = new Plateau(sizeTwo);

        assert.deepStrictEqual(plateuOne.size, sizeOne);
        assert.deepStrictEqual(plateuTwo.size, sizeTwo);
    });

    describe('Validate position', function() {
        let size: Coordinate;
        let plateau: Plateau;

        beforeEach(function () {
            size = { X: 5, Y: 5 };
            plateau = new Plateau(size);
        });

        it('Should return false when a position the coordinate is not within the plateau.', function() {
            assert.strictEqual(plateau.validPosition({ X: 10, Y: 10 }), false);
        });

        it('Should return false when the X coordinate is more than the X size of plateau.', function() {
            assert.strictEqual(plateau.validPosition({ X: 10, Y: 3 }), false);
        });

        it('Should return false when the Y coordinate is more than the Y size of plateau.', function() {
            assert.strictEqual(plateau.validPosition({ X: 4, Y: 10 }), false);
        });

        it('Should return false when the X coordinate is negative number.', function() {
            assert.strictEqual(plateau.validPosition({ X: -4, Y: 2 }), false);
        });

        it('Should return false when the Y coordinate is negative number.', function() {
            assert.strictEqual(plateau.validPosition({ X: 4, Y: -1 }), false);
        });

        it('Should return true when a position the coordinate is within the plateau.', function() {
            assert.strictEqual(plateau.validPosition({ X: 3, Y: 0 }), true);
        });
    });
});