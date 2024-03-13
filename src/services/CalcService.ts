import { Cargo } from '../models/ObjectItem';
import { BasicDataState } from '../redux/BasicDataSlice';

export class CalcService {
  TEAM_MEMBER_WEIGHT_IN_LB = 170;
  FUEL_LOST_PRE_FLIGHT = 1000;
  SAFETY_EQUIPMENT_WEIGHT = 250;
  SAFETY_EQUIPMENT_INDEX = -1;

  /**
   * TODO: change calculation of crew weight to consider in which cabin the load masters are
   * TODO: add the weight of the configuration to calculation
   */
  basicWeight = (basicData: BasicDataState) => {
    const basicWeight =
      basicData.emptyWeight +
      (basicData.cockpitCrew + basicData.loadmasters) *
        this.TEAM_MEMBER_WEIGHT_IN_LB +
      this.SAFETY_EQUIPMENT_WEIGHT;

    return basicWeight;
  };

  totalCargoWeight = (cargoList: Cargo[]) => {
    return cargoList.reduce(
      (accumulatedWeight: number, currentCargo: Cargo) => {
        return accumulatedWeight + currentCargo.weight;
      },
      0
    );
  };

  zeroFuelWeight = (basicData: BasicDataState, cargoList: Cargo[]) => {
    const zfw = this.basicWeight(basicData) + this.totalCargoWeight(cargoList);

    return zfw;
  };

  //TODO: add external to calculation once added to state
  fuelWeight = (basicData: BasicDataState) => {
    const fuelWeight =
      basicData.outboard + basicData.inboard + basicData.auxiliary;

    return fuelWeight;
  };

  fuelWeightForFlight = (basicData: BasicDataState) => {
    const flightFuelWeight =
      this.fuelWeight(basicData) - this.FUEL_LOST_PRE_FLIGHT;

    return flightFuelWeight;
  };

  totalAircraftWeight = (basicData: BasicDataState, cargoList: Cargo[]) => {
    const totalWeight =
      this.zeroFuelWeight(basicData, cargoList) +
      this.fuelWeightForFlight(basicData);

    return totalWeight;
  };

  cargoIndex = (cargo: Cargo) => {
    return ((cargo.fs - 533.46) * cargo.weight) / 50000;
  };

  totalCargoIndex = (cargoList: Cargo[]) => {
    return cargoList.reduce((accumulatedIndex: number, currentCargo: Cargo) => {
      return accumulatedIndex + this.cargoIndex(currentCargo);
    }, 0);
  };

  aircraftIndex = (basicData: BasicDataState, cargoList: Cargo[]) => {
    const index =
      basicData.index +
      this.totalCargoIndex(cargoList) +
      this.SAFETY_EQUIPMENT_INDEX +
      basicData.cockpitCrew * -1.2 +
      basicData.loadmasters * -0.8;

    return index;
  };

  centerOfGravity = (basicData: BasicDataState, cargoList: Cargo[]) => {
    const cg =
      ((this.aircraftIndex(basicData, cargoList) - 100) * 50000) /
        this.totalAircraftWeight(basicData, cargoList) +
      533.46;

    return cg;
  };

  meanAerodynamicChord = (basicData: BasicDataState, cargoList: Cargo[]) => {
    const macValue =
      ((this.centerOfGravity(basicData, cargoList) - 487.4) * 100) / 164.5;

    return macValue;
  };
}
