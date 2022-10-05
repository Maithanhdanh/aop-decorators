# AOP Decorators

The module contain decorators that help us to apply Aspect Oriented Programming (AOP) into NodeJs project. It uses [Winston](https://www.npmjs.com/package/winston) as based logger

## Notes:

- It will process from top to bottom.

```Typescript
class SampleClass {
    @IsString()
    @Transform((x) => x.concat(' transformed'))
    @Mapping('renamedFieldName')
    @MaxStringSize(5)
    private sampleProperty: boolean;
}

// The flow will be:
//  - Validate isString
//  - Transform data
//  - Mapping field name
//  - Validate String length
```

## Table of Contents

- [AOP Decorators](#aop-decorators)
  - [Notes:](#notes)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Validator](#validator)
    - [String](#string)
    - [Number](#number)
    - [Boolean](#boolean)
    - [Object](#object)
    - [Array](#array)
    - [Custom Test](#custom-test)
  - [Transform](#transform)
  - [Mapping](#mapping)
  - [LogContext](#logcontext)
  - [LogInputParam](#loginputparam)
  - [Parameters](#parameters)
  - [CHANGELOG](#changelog)

## Installation

```bash
npm install decorators-utils

or

yarn add decorators-utils
```

## Usage

```Typescript
@logContext()
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  @validate
  @logInputParams()
  public sampleMethod(@required() _params: any): any {
    this.logger.info('dummy message');
  }
}
```

## Validator

The module supports testing for `string`, `number`, `boolean` ,`object`, `array`, and `Test` to support custom Test

### String

Possible options for String: `IsEmail`, `IsMatched`, `IsString`, `MaxStringSize`, `MinStringSize`

```Typescript
//Define class schema
class SampleClass {
    @IsString()
    @IsMatched(/^dog/)
    @IsEmail()
    @MaxStringSize(5)
    @MinStringSize(1)
    private sampleProperty: string;
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: 'sample' });

//Sample returned error
{
  message: 'sampleProperty must be string',
  name: 'IS_STRING',
  path: 'sampleProperty',
}
```

### Number

Possible options for String: `IsLarger`, `IsLess`, `IsNumber`, `MaxDigits`, `MinDigits`

```Typescript
//Define class schema
class SampleClass {
    @IsLarger(2)
    @IsLess(5)
    @IsNumber()
    @MaxDigits(3)
    @MinDigits(1)
    private sampleProperty: number;
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: 123 });

//Sample returned error
{
  message: 'sampleProperty must be number',
  name: 'IS_NUMBER',
  path: 'sampleProperty',
}
```

### Boolean

Possible options for String: `IsBoolean`

```Typescript
//Define class schema
class SampleClass {
    @IsBoolean()
    private sampleProperty: boolean;
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: true });

//Sample returned error
{
  message: 'sampleProperty must be boolean',
  name: 'IS_BOOLEAN',
  path: 'sampleProperty',
}
```

### Object

Possible options for String: `IsValidObject`

```Typescript
//Define class schema
class ChildClass {
  @IsString()
  private requestId: string
}

class SampleClass {
    @IsValidObject()
    private sampleProperty: ChildClass;
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: { requestId:'string' } });

//Sample returned error
{
  message: 'requestId must be string',
  name: 'IS_VALID_OBJECT',
  path: 'sampleProperty.requestId',
}
```

### Array

Possible options for String: `IsValidArray`, `ArraySize`

```Typescript
//Define class schema
class ChildClass {
  @IsString()
  private requestId: string
}

class SampleClass {
    @IsValidArray(ChildClass)
    private sampleProperty: ChildClass[];
}

class SampleClass {
    @IsValidArray(String)
    private sampleProperty: String[];
}

class SampleClass {
    @IsValidArray(Number)
    private sampleProperty: Number[];
}

class SampleClass {
    @IsValidArray(Boolean)
    private sampleProperty: Boolean[];
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: [{ requestId:'string' }] });

//Sample returned error
{
  message: 'must be a valid array element',
  name: 'IS_VALID_ARRAY',
  path: 'sampleProperty[2]',
};
```

```Typescript
class SampleClass {
    @ArraySize({ max: 2, min: 1 })
    private sampleProperty: Boolean[];
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: [{ requestId:'string' }] });

//Sample returned error
{
  message: 'sampleProperty size must be less than 2, greater than 1',
  name: 'IS_VALID_ARRAY',
  path: 'sampleProperty',
};
```

### Custom Test

```Typescript
//Define class schema
const canConvertStringToNum = (value: string): boolean => {
    return !!parseInt(value);
};

class SampleClass {
  @Test(canConvertStringToNum)
  private sampleProperty: string;

  public getData(): void {
    console.log(this.sampleProperty);
  }
}

//Run function to validate data based on the schema above
validateSchema(SampleClass, { sampleProperty: '123' });

//Sample returned error
{
  message: 'sampleProperty custom test failed',
  name: 'canConvertStringToNum',
  path: 'sampleProperty',
};
```

## Transform

modify the input data

```Typescript
//Define class schema
class SampleClass {
    @Transform((x) => x.concat(' transformed'))
    private sampleProperty: boolean;
}

//Run function to validate data based on the schema above
const data = { sampleProperty: 'sampleData' }
validateSchema(SampleClass, data);

//New data
console.log(data.sampleProperty) // => sampleData transformed
```

## Mapping

Change field name

```Typescript
//Define class schema
class SampleClass {
    @Mapping('renamedFieldName')
    private sampleProperty: boolean;
}

//Run function to validate data based on the schema above
const data = { sampleProperty: 'sampleData' }
validateSchema(SampleClass, data);

//New data
console.log(data.renamedFieldName) // => sampleData transformed
```

## LogContext

```Typescript
@logContext()
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  public sampleMethod(_params: any): any {
    this.logger.info('dummy message');
  }
}
```

The message will be `[SampleClass] [sampleMethod] dummy message`

## LogInputParam

```Typescript
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  @logInputParams()
  public sampleMethod(_params: any): any {
    this.logger.info('dummy message');
  }
}
```

When the method is called, an additional log record will appear `method is called with param` with the input param value

## Parameters

```Typescript
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  @validate
  public sampleMethod(@required() _params: any): any {}
}
```

Although `_params` is a required parameters, it still accept `undefined` value.
It will throw `error` when `@required(error)`, or even return `boolean` value (`true/false`) by `@required(false)`

## CHANGELOG

[CHANGELOG](https://github.com/Maithanhdanh/aop-decorators/blob/master/CHANGELOG.md)
