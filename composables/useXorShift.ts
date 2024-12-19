import "crypto";
import cryptoJs from "crypto-js";

export class XorShift {
  _x: number;
  _y: number;
  _z: number;
  _current: number;
  constructor(seed = 1) {
    // 任意のxyz
    this._x = 827416273;
    this._y = 826162312;
    this._z = 172331274;
    this._current = seed;
  }
  rand() {
    let t = this._x ^ (this._x << 11);
    this._x = this._y;
    this._y = this._z;
    this._z = this._current;
    this._current = this._current ^ (this._current >>> 19) ^ (t ^ (t >>> 8));
    return this._current;
  }
  randType(): PokeType {
    const min = 0;
    const max = 17;
    const r = Math.abs(this.rand());
    return pokeTypes[min + (r % (max + 1 - min))];
  }
}

function hashToInt(input: string) {
  return parseInt(input, 16);
}
function hashFrom(input: string) {
  return cryptoJs.SHA256(input).toString(cryptoJs.enc.Hex).slice(0, 4);
}

export const useXorShift = () => {
  const newInstance = (seed: number, name?: string) => {
    if (name !== undefined) {
      return newInstance(seed * hashToInt(hashFrom(name)));
    }
    return new XorShift(seed);
  };
  const newResult = (seed: number, name?: string) => {
    const _instance = newInstance(seed, name);
    return [
      _instance.randType(),
      _instance.randType(),
      _instance.randType(),
      _instance.randType(),
      _instance.randType(),
    ];
  };
  return {
    newInstance,
    newResult,
  };
};
