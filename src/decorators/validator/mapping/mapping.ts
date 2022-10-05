import { addNeededValidateParams, addHandlerForParams } from '../../utils/metadata';
import { ParamType } from '../common/type';
import { Mappinger } from '../type';

class MappingData implements Mappinger {
  private type = ParamType.MAPPING;
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  public get getType(): ParamType {
    return this.type;
  }

  public process(data: any, fieldNeedRename: string): any {
    const temp = data[fieldNeedRename];
    delete data[fieldNeedRename];
    data[this.fieldName]= temp
  }
}

function Mapping(fieldName: string) {
  return function (target: any, propertyKey: string): any {
    addNeededValidateParams(target, propertyKey);

    addHandlerForParams(target, propertyKey, new MappingData(fieldName));
  };
}

export { Mapping };
