import ICore from 'common/core/ICore';

interface MyGlobal extends NodeJS.Global {
  core:ICore;
}
declare var global : MyGlobal;

export default global;