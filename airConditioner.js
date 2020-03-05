//Кондиционер

import Device from './device.js';

export default class AirConditioner extends Device {
    constructor(name) {
        super(name);
        this._temperature = 20;
        this._mode = ['cool', 'heat', 'dry', 'fan', 'sleep'];
        this._currentMode = 0;
    }

    get temperature() {
        return this._temperature;
    }
    set temperature(num) {
        if (num === undefined || typeof(num) !== "number" ||
            num < 10 || num > 35) {
            throw new Error('Invalid parameters');
        } else
            this._temperature = num;
    }
    increaseTemperature() {
        if (this._temperature < 35) {
            this._temperature++;
        } else {
            throw new Error("It is too hot!Stop!")
        };
    }
    decreaseTemperature() {
        if (this._temperature > 10) {
            this._temperature--;
        } else {
            throw new Error("It is cold enough!!!!");
        }
    }
    nextMode() {

        if (this._currentMode < this._mode.length - 1) {
            this._currentMode++;
        } else {
            this._currentMode = 0;
        }
    }
    get mode() {
        return this._mode[this._currentMode];
    }
}