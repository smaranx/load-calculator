export default class UnitsService {
  ONE_UNIT_IN_INCHES = 20;
  ONE_UNIT_AS_IMAGE_WIDTH_PERCENT = 0.03422;
  Y_START_POSITION_AS_CANVAS_PERCENT = 0.3477;
  X_START_POSITION_AS_CANVAS_PERCENT = 0.011977;
  CARGO_LENGTH_AS_CANVAS_PERCENT = 0.52467;
  CARGO_WIDTH_AS_CANVAS_PERCENT = 0.97247533667854;

  pixelsToInches(dimensionInPixels: number, canvasWidth: number) {
    return +(dimensionInPixels * this.getPixelToInchRatio(canvasWidth)).toFixed(
      3
    );
  }

  inchesToPixels(dimensionInInches: number, canvasWidth: number) {
    return +(dimensionInInches / this.getPixelToInchRatio(canvasWidth)).toFixed(
      3
    );
  }

  getPixelToInchRatio(canvasWidth: number) {
    return this.ONE_UNIT_IN_INCHES / this.oneUnitInPixels(canvasWidth);
  }

  oneUnitInPixels(canvasWidth: number) {
    return canvasWidth * this.ONE_UNIT_AS_IMAGE_WIDTH_PERCENT;
  }

  startingPosition(
    canvasWidth: number,
    canvasHeight: number
  ): { top: number; left: number } {
    return {
      top: canvasHeight * this.Y_START_POSITION_AS_CANVAS_PERCENT,
      left: canvasWidth * this.X_START_POSITION_AS_CANVAS_PERCENT,
    };
  }
}
