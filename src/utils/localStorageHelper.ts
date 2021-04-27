const ls = window.localStorage;
class LocalStorageHelper {
  static key(index: number) {
    return ls.key(index);
  }

  static getLength() {
    return ls.length;
  }

  static getItem(key: string): any {
    return JSON.parse(ls.getItem(key) as string);
  }

  static setItem(key: string, value: any) {
    return ls.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: string) {
    ls.removeItem(key);
  }

  static clear() {
    ls.clear();
  }
}

export default LocalStorageHelper;
