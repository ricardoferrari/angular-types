import { UserWithRole } from './user';
import { Component } from '@angular/core';
import { PersonAddressOmmited, PersonOptional } from './person';
import { CommonModule } from '@angular/common';
import { RolesEnum } from './roles';
import { Calculator, ICalculator, OperationsEnum, ICalculatorFunctions, CalculatorMethods } from './calculator';
import { HttpCalls, HttpMethods } from './http-calls';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // PersonOptional is a type that is a partial of Person
  // This means that all properties of Person are optional
  // This is useful when you want to create an object that has some properties of Person
  // but not all of them
  personOptional: PersonOptional = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St'
  };

  // PersonAddressOmmited is a type that is an omit of Person
  // This means that the address property is omitted from the type
  // This is useful when you want to create an object that has all properties of Person
  // except for the address property
  personWithoutAddress: PersonAddressOmmited = {
    name: 'John Doe',
    age: 30,
  };

  personWithOnlyAddressAndName: Pick<PersonOptional, 'name' | 'address'> = {
    name: 'John Doe',
    address: '123 Main St',
  };

  adminUser: UserWithRole<RolesEnum.admin> = {
    name: 'John Doe',
    age: 30,
    permissions: ['read', 'write'],
  };

  readerUser: UserWithRole<RolesEnum.user> = {
    name: 'Jane Doe',
    age: 25,
  };

  calculator: ICalculator = new Calculator();
  calculatorFacade: ICalculatorFunctions = new Calculator();
  calculatorFacadeOmited: CalculatorMethods = new Calculator();




  resultadoSoma: number = this.calculator.calc(OperationsEnum.ADD, 1, 2);
  resultadoExponenciacao: number = this.calculator.calc(OperationsEnum.SQUARE, 9);

  funcaoSoma = this.calculator.calcFn(OperationsEnum.ADD);
  funcaoExponenciacao = this.calculator.calcFn(OperationsEnum.SQUARE);

  httpCalls = new HttpCalls();

  constructor(private readonly http: HttpClient) {
    this.httpCalls.call<HttpMethods.GET, any>(
      (...args) => {
        console.log('GET:', args.length);
        return args;
      },
      {
        url: 'https://www.example.com',
        // body: { name: 'John Doe' },
        options: { headers: { 'Content-Type': 'application/json' }}
      }
    );
    this.httpCalls.call<HttpMethods.GET, any>(
      this.http.get.bind(this.http)<any>,
      {
        url: 'https://www.example.com',
        // body: { name: 'John Doe' },
        options: { headers: { 'Content-Type': 'application/json' }}
      }
    ).subscribe((response: any) => {
      console.log('Response:', response);
    });
    console.log(this.calculatorFacade.calc(OperationsEnum.ADD, 1, 2));
    console.log(this.calculatorFacadeOmited.multiply(2, 3)); // Add is not available
  }
}
