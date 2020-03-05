//Класс-родитель Device

function Device(name) {
    this._name = name;
    this._state = false;
};
Device.prototype.getName = function() {
    return this._name;
};
Device.prototype.getState = function() {
    return this._state;
};
Device.prototype.on = function() {
    this._state = true;
};
Device.prototype.off = function() {
    this._state = false;
};


//Кондиционер

function AirConditioner(name) {
    Device.call(this, name);
    this._temperature = 20;
    this._mode = ['cool', 'heat', 'dry', 'fan', 'sleep'];
    this._currentMode = 0;
};
AirConditioner.prototype = Object.create(Device.prototype);
AirConditioner.prototype.constructor = AirConditioner;
AirConditioner.prototype.getTemperature = function() {
    return this._temperature;
};
AirConditioner.prototype.setTemperature = function(num) {
    if (num === undefined || typeof(num) !== "number" ||
        num < 10 || num > 35) {
        throw new Error('Invalid parameters');
    } else
        this._temperature = num;
};
AirConditioner.prototype.increaseTemperature = function() {
    if (this._temperature < 35) {
        this._temperature++;
    } else {
        throw new Error("It is too hot!Stop!")
    };
}
AirConditioner.prototype.decreaseTemperature = function() {
    if (this._temperature > 10) {
        this._temperature--;
    } else {
        throw new Error("It is cold enough!!!!");
    }
};
AirConditioner.prototype.nextMode = function() {
    if (this._currentMode < this._mode.length - 1) {
        this._currentMode++;
    } else {
        this._currentMode = 0;
    }
};
AirConditioner.prototype.getMode = function() {
    return this._mode[this._currentMode];
}


//Сигнализация


function AlarmSystem(name) {
    Device.call(this, name);
    this._alarm = 10;
    this._password = null;
    this._locked = true;
};
AlarmSystem.prototype = Object.create(Device.prototype);
AlarmSystem.prototype.constructor = AlarmSystem;

AlarmSystem.prototype.setAlarmVolume = function(num) {
    if (num === undefined || typeof(num) !== "number" ||
        num < 10 || num > 100) {
        throw new Error('Invalid parameters');
    } else
        this._alarm = num;
};
AlarmSystem.prototype.getAlarmVolume = function() {
    return this._alarm;
};
AlarmSystem.prototype.getLocked = function() {
    return this._locked;
};

AlarmSystem.prototype.unlocked = function(pass) {
    if (pass === this._password) {
        this._locked = false;
    } else {
        this._locked = true;
    }
};
AlarmSystem.prototype.setPassword = function(password) {
    if (password == undefined) {
        throw new Error("Enter the password!");
    } else
    if (password.length < 6) {
        throw new Error("В пароле должно быть не менее 6 символов");
    }
    if (password.match(/[a-z]/) == null ||
        password.match(/[A-Z]/) == null ||
        password.match(/[0-9]/ == null)) {
        throw new Error("Пароль должен содержать по одному символу из каждого набора a - z, A - Z, 0 - 9 ");
    } else {
        this._password = password;
    }
};


var a1 = new AlarmSystem("a1");
console.log(a1.getLocked());
a1.setPassword("123AAAAhhh");
a1.unlocked("123AAAAhhh");
console.log(a1.getLocked());



//Класс Smart House

function SmartHouse(name) {
    this._name = name;
    this._devices = [];
};
SmartHouse.prototype.getName = function() {
    return this._name;
};
SmartHouse.prototype.getDevices = function() {
    return this._devices;
};

SmartHouse.prototype.getDeviceByName = function(str) {
    return this._devices.find(function(dev) { return dev.getName() == str });
};
SmartHouse.prototype._devNames = function() {
    var names = [];
    this._devices.forEach(function(obj) {
        names.push(obj.getName());
    });
    return names;
};

SmartHouse.prototype.addDevice = function(obj) {
    if (this._devNames().indexOf(obj.getName()) == -1) {
        this._devices.push(obj);
    } else {
        throw new Error("Устройство с таким именем уже существует")
    }

};

SmartHouse.prototype.deleteDeviceByName = function(str) {
    // способ 1
    /*
        this._devices = this._devices.filter(function(dev) {
            return dev.getName() !== str;
        });

    */
    //способ 2

    this._devices.splice(this._devNames().indexOf(str), 1);
};




let sh = new SmartHouse("sh1");
sh.addDevice(new AlarmSystem("a1"));
sh.addDevice(new AlarmSystem("a2"));
sh.addDevice(new AirConditioner("c1"));
console.log(sh.getDevices());
console.log(sh.getName());
console.log(sh.getDeviceByName("a1").getState());
sh.getDeviceByName("a2").on();
console.log(sh.getDeviceByName("a2").getState());
sh.deleteDeviceByName("a1");
console.log(sh.getDevices());

//sh.addDevice(new AlarmSystem("a1"));