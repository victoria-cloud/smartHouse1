//Сигнализация
import Device from './device.js';

export default class AlarmSystem extends Device {
    constructor(name) {
        super(name);
        this._alarm = 10;
        this._password = null;
        this._locked = true;
    }
    set alarmVolume(num) {
        if (num === undefined || typeof(num) !== "number" ||
            num < 10 || num > 100) {
            throw new Error('Invalid parameters');
        } else
            this._alarm = num;
    }
    get alarmVolume() {
        return this._alarm;
    }
    get locked() {
        return this._locked;
    }
    unlocked(pass) {
        if (pass === this._password) {
            this._locked = false;
        } else {
            this._locked = true;
        }
    }
    set password(password) {
        if (password.match(/[a-z]/) == null ||
            password.match(/[A-Z]/) == null ||
            password.match(/[0-9]/ == null)) {
            throw new Error("Пароль должен содержать по одному символу из каждого набора a - z, A - Z, 0 - 9 ");
        } else {
            this._password = password;
        }
    }
}