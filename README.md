# AOP Decorators

The module contain decorators that help us to apply Aspect Oriented Programming (AOP) into NodeJs project. It uses [Winston](https://www.npmjs.com/package/winston) as based logger

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Log className and methodName when logging message](#logContext)
- [Log input param value](#logInputParam)
- [Validate required parameters](#validateRequiredParams)

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
  public logger: CustomLogger = new Logger();

  @validate
  @logInputParams()
  public sampleMethod(@required() _params: any): any {
    this.logger.info('dummy message');
  }
}
```

<a name="logContext"></a>

## Log className and methodName when logging message

```Typescript
@logContext()
class SampleClass {
  public logger: CustomLogger = new Logger();

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
  public logger: CustomLogger = new Logger();

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
  public logger: CustomLogger = new Logger();

  @validate
  public sampleMethod(@required() _params: any): any {}
}
```

Although `_params` is a required parameters, it still accept `undefined` value.
It will throw `error` when `@required(error)`
