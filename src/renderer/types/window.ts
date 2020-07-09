import ICore from 'common/core/ICore';

interface MyWindow extends Window {
  core:ICore;
}
declare var window : MyWindow;

export default window;