import ICore from 'common/core/ICore';

class Core implements ICore {
  public test() {
    return "This method is a core object set by the preload."
  }
}

export default new Core();