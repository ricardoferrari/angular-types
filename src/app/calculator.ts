type AddMethod = (a: number, b: number) => number;
type SubtractMethod = (a: number, b: number) => number;
type MultiplyMethod = (a: number, b: number) => number;
type DivideMethod = (a: number, b: number) => number;
type SquareMethod = (a: number) => number;
type RootMethod = (a: number) => number;

export enum OperationsEnum {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
  SQUARE = 'square',
  ROOT = 'root',
}

type OperationsParametersInterfaceMap = {
  [OperationsEnum.ADD]: [number, number];
  [OperationsEnum.SUBTRACT]: [number, number];
  [OperationsEnum.MULTIPLY]: [number, number];
  [OperationsEnum.DIVIDE]: [number, number];
  [OperationsEnum.SQUARE]: [number];
  [OperationsEnum.ROOT]: [number];
};

export interface ICalculatorFunctions {
  calc<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]>(operation: T, ...args: K): number;
  // calcFn<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]>(operation: T): (...args: OperationInterface<T, K>) => number;
  calcFn<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]>(operation: T): ICalculator[T];
}
export interface ICalculator extends ICalculatorFunctions {
  [OperationsEnum.ADD]: AddMethod;
  [OperationsEnum.SUBTRACT]: SubtractMethod;
  [OperationsEnum.MULTIPLY]: MultiplyMethod;
  [OperationsEnum.DIVIDE]: DivideMethod;
  [OperationsEnum.SQUARE]: SquareMethod;
  [OperationsEnum.ROOT]: RootMethod;
}

type OperationInterface<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]> = K;

export class Calculator implements ICalculator {

  public calc<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]>(operation: T, ...args: OperationInterface<T, K>): number {
    // NOTE: This is a type-safe way to call the operation method
    return (this[operation] as (...args: OperationInterface<T, K>) => number)(...args);
  }

  public calcFn<T extends OperationsEnum, K extends OperationsParametersInterfaceMap[T]>(operation: T): ICalculator[T] {
    // NOTE: This is a type-safe way to get the operation method but not call it
    return this[operation] as ICalculator[T];
  }

  add(...args: OperationsParametersInterfaceMap[OperationsEnum.ADD]): number {
    return args[0] + args[1];
  }

  subtract(...args: OperationsParametersInterfaceMap[OperationsEnum.SUBTRACT]): number {
    return args[0] - args[1];
  }

  multiply(...args: OperationsParametersInterfaceMap[OperationsEnum.MULTIPLY]): number {
    return args[0] * args[1];
  }

  divide(...args: OperationsParametersInterfaceMap[OperationsEnum.DIVIDE]): number {
    return args[0] / args[1];
  }

  square(...args: OperationsParametersInterfaceMap[OperationsEnum.SQUARE]): number {
    return args[0] * args[0];
  }

  root(...args: OperationsParametersInterfaceMap[OperationsEnum.ROOT]): number {
    return Math.sqrt(args[0]);
  }

}

export class CalculatorFacade {
  private readonly calculator: ICalculator;
  public calc: ICalculator['calc']
  constructor() {
    this.calculator = new Calculator();
    this.calc = this.calculator.calc;
  }
}
export interface CalculatorMethods extends Omit<Calculator, 'add'>{};
