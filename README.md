# AOP Decorators

The module contain decorators that help us to apply Aspect Oriented Programming (AOP) into NodeJs project. It uses [Winston](https://www.npmjs.com/package/winston) as based logger

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Validator](#validator)
- [Log className and methodName when logging message](#logContext)
- [Log input param value](#logInputParam)
- [Validate required parameters](#validateRequiredParams)
- [CHANGELOG](#changeLog)

<a name="installation"></a>

## Installation

```bash
npm install decorators-utils

or

yarn add decorators-utils
```

<a name="usage"></a>

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

<a name="validator"></a>

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

Possible options for String: `IsValidArray`

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

<a name="logContext"></a>

## Log className and methodName when logging message

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

<a name="logInputParam"></a>

## Log input param value

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

<a name="validateRequiredParams"></a>

## Validate required parameters

```Typescript
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  @validate
  public sampleMethod(@required() _params: any): any {}
}
```

Although `_params` is a required parameters, it still accept `undefined` value.
It will throw `error` when `@required(error)`, or even return `boolean` value (`true/false`) by `@required(false)`

<a name="changeLog"></a>

## CHANGELOG

[CHANGELOG](https://github.com/Maithanhdanh/aop-decorators/blob/master/CHANGELOG.md)
