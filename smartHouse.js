//Класс Smart House

export default class SmartHouse {
    constructor(name) {
        this._name = name;
        this._devices = new Map();
    }
    get name() {
        return this._name;
    }
    get devices() {
        return this._devices;
    }
    getDeviceByName(str) {
        return this._devices.get(str);
    }
    addDevice(obj) {

        if (this._devices.has(obj.name)) {
            throw new Error("Устройство с таким именем уже существует")
        } else {
            this._devices.set(obj.name, obj);
        }

        //this._devices.set(obj.name, obj);
    }
    deleteDeviceByName(str) {
        this._devices.delete(str);
    }
}

/*
let sh = new SmartHouse("sh1");
sh.addDevice(new AlarmSystem("a1"));
sh.addDevice(new AlarmSystem("a2"));
sh.addDevice(new AirConditioner("c1"));
console.log(sh.getDeviceByName("c1").temperature);
sh.getDeviceByName("a1").password = "333kkkR";
console.log(sh.devices);
sh.getDeviceByName("a2").on();
console.log(sh.getDeviceByName("a2").state);
sh.deleteDeviceByName("a1");
console.log(sh.devices);
sh.addDevice(new AlarmSystem("a3"));
console.log(sh.devices);
*/