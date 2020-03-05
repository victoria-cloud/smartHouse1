"use strict"


import Device from './device.js';
import AirConditioner from "./airConditioner.js";
import AlarmSystem from "./alarmSystem.js";
import SmartHouse from "./smartHouse.js";


class View {
    constructor(smartHouse, rootElement) {
        if (smartHouse instanceof SmartHouse) {
            this._smartHouse = smartHouse;
        } else {
            throw new Error("First parameter incorrect");
        }
        if (rootElement instanceof HTMLElement) {
            this._rootElement = rootElement;
        } else {
            throw new Error("Second parameter incorrect");
        }
        this._airCondInput = null;
        this._airCondList = null;
        this._airCondLi = null;
        this._alarmInput = null;
        this._alarmList = null;
        this._alarmLi = null;
        this._temp = null;
        this._locked = null;
    }
    render() {
        //кондиционеры
        const Section1 = document.createElement("section");


        const instruction1 = document.createElement("h3");
        instruction1.innerText = "Новенькие кондиционеры:";

        this._airCondInput = document.createElement("input");
        this._airCondInput.type = "text";
        this._airCondInput.placeholder = "Device name:";

        const addAirCondButton = document.createElement("button");
        addAirCondButton.type = "button";
        addAirCondButton.innerText = "+";
        addAirCondButton.addEventListener(
            "click",
            this._addAirCondButtonHandler()
        );

        this._airCondList = document.createElement("ol");

        this._rootElement.appendChild(Section1);
        Section1.appendChild(instruction1);
        Section1.appendChild(this._airCondInput);
        Section1.appendChild(addAirCondButton);
        Section1.appendChild(this._airCondList);

        //сигнализация
        const Section2 = document.createElement("section")

        const instruction2 = document.createElement("h3");
        instruction2.innerText = "Новенькие сигнашки:";

        this._alarmInput = document.createElement("input");
        this._alarmInput.type = "text";
        this._alarmInput.placeholder = "Device name:";

        const addAlarmButton = document.createElement("button");
        addAlarmButton.type = "button";
        addAlarmButton.innerText = "+";
        addAlarmButton.addEventListener("click", this._addAlarmHandler());

        this._alarmList = document.createElement("ol");

        this._rootElement.appendChild(Section2);
        Section2.appendChild(instruction2);
        Section2.appendChild(this._alarmInput);
        Section2.appendChild(addAlarmButton);
        Section2.appendChild(this._alarmList);


    }
    _addAirCondButtonHandler() {
        return () => {
            let data = this._airCondInput.value;
            //model
            this._smartHouse.addDevice(new AirConditioner(data));
            console.dir(this._smartHouse);
            //view
            this._airCondLi = document.createElement("li");
            this._airCondLi.innerText = data;
            this._airCondList.appendChild(this._airCondLi);

            const onInput = document.createElement("input");
            onInput.type = "radio";
            onInput.name = data;
            onInput.value = "on";

            const offInput = document.createElement("input");
            offInput.type = "radio";
            offInput.name = data;
            offInput.value = "off";
            offInput.checked = true;

            const on = document.createElement("label");
            on.innerText = " on";
            this._airCondLi.appendChild(on);
            on.appendChild(onInput);

            const off = document.createElement("label");
            off.innerText = " off";
            this._airCondLi.appendChild(off);
            off.appendChild(offInput);

            const deleter = document.createElement("button");
            deleter.type = "button";
            deleter.innerText = "DELETE";
            deleter.className = "deleter";
            this._airCondLi.appendChild(deleter);

            var linebreak = document.createElement("br");
            this._airCondLi.appendChild(linebreak);

            const Temp = document.createTextNode("Темперутура: ");
            this._airCondLi.appendChild(Temp);

            this._temp = document.createElement("span");
            this._temp.innerText = this._smartHouse.getDeviceByName(data).temperature;
            this._temp.id = `${data}`;
            this._airCondLi.appendChild(this._temp);

            const increaseTemp = document.createElement("button");
            increaseTemp.type = "button";
            increaseTemp.innerText = "+";
            this._airCondLi.appendChild(increaseTemp);

            const decreaseTemp = document.createElement("button");
            decreaseTemp.type = "button";
            decreaseTemp.innerText = "-";
            this._airCondLi.appendChild(decreaseTemp);

            let linebreak1 = document.createElement("br");
            this._airCondLi.appendChild(linebreak1);

            const coolM = document.createElement("input");
            coolM.className = data;
            coolM.name = `${data}mode`;
            console.log(coolM.name);
            coolM.type = "radio";
            coolM.value = "cool";

            const heatM = document.createElement("input");
            heatM.className = data;
            heatM.type = "radio";
            heatM.name = `${data}mode`;
            heatM.value = "heat";

            const dryM = document.createElement("input");
            dryM.className = data;
            dryM.type = "radio";
            dryM.name = `${data}mode`;
            dryM.value = "dry";

            const fanM = document.createElement("input");
            fanM.className = data;
            fanM.type = "radio";
            fanM.name = `${data}mode`;
            fanM.value = "fan";

            const sleepM = document.createElement("input");
            sleepM.className = data;
            sleepM.type = "radio";
            sleepM.name = `${data}mode`;
            sleepM.value = "sleep";

            const cool = document.createElement("label");
            cool.innerText = "cool";
            this._airCondLi.appendChild(cool);
            cool.appendChild(coolM);

            const heat = document.createElement("label");
            heat.innerText = "heat";
            this._airCondLi.appendChild(heat);
            heat.appendChild(heatM);

            const dry = document.createElement("label");
            dry.innerText = "dry";
            this._airCondLi.appendChild(dry);
            dry.appendChild(dryM);

            const fan = document.createElement("label");
            fan.innerText = "fan";
            this._airCondLi.appendChild(fan);
            fan.appendChild(fanM);

            const sleep = document.createElement("label");
            sleep.innerText = "sleep";
            this._airCondLi.appendChild(sleep);
            sleep.appendChild(sleepM);

            coolM.addEventListener("click", this._modeChoose(data));
            heatM.addEventListener("click", this._modeChoose(data));
            dryM.addEventListener("click", this._modeChoose(data));
            fanM.addEventListener("click", this._modeChoose(data));
            sleepM.addEventListener("click", this._modeChoose(data));






            onInput.addEventListener("click", this._onInputHandler(data));
            offInput.addEventListener("click", this._offInputHandler(data));
            this._airCondInput.value = "";
            deleter.addEventListener("click", this._deleterHandler(data));
            increaseTemp.addEventListener("click", this._increaseTempHandler(data));
            decreaseTemp.addEventListener("click", this._decreaseTempHandler(data));

        }
    }


    _addAlarmHandler() {
        return () => {
            let data = this._alarmInput.value;
            //model
            this._smartHouse.addDevice(new AlarmSystem(data));
            console.dir(this._smartHouse);
            //view
            this._alarmLi = document.createElement("li");
            this._alarmLi.innerText = data;
            this._alarmList.appendChild(this._alarmLi);

            const onInput = document.createElement("input");
            onInput.type = "radio";
            onInput.name = data;
            onInput.value = "on";

            const offInput = document.createElement("input");
            offInput.type = "radio";
            offInput.name = data;
            offInput.value = "off";
            //offInput.checked = true;

            const on = document.createElement("label");
            on.innerText = " on";
            this._alarmLi.appendChild(on);
            on.appendChild(onInput);

            const off = document.createElement("label");
            off.innerText = " off";
            this._alarmLi.appendChild(off);
            off.appendChild(offInput);

            const deleter = document.createElement("button");
            deleter.type = "button";
            deleter.innerText = "DELETE";
            deleter.className = "deleter";
            this._alarmLi.appendChild(deleter);

            var linebreak = document.createElement("br");
            this._alarmLi.appendChild(linebreak);

            const Password = document.createElement("input");
            Password.type = "password";
            Password.id = "myPass";
            Password.placeholder = "password";
            this._alarmLi.appendChild(Password);

            const passHelper = document.createElement("div");
            passHelper.innerText = "Не меньше 6 символов,цифры и буквы в обоих регистрах"
            this._alarmLi.appendChild(passHelper);

            const Locked = document.createTextNode("Locked:  ");
            this._alarmLi.appendChild(Locked);

            this._locked = document.createElement("span");
            this._locked.innerText = this._smartHouse.getDeviceByName(data)._locked;
            this._alarmLi.appendChild(this._locked);

            let instruction3 = document.createElement("div");
            instruction3.innerText = "To unlock enter the password:";
            this._alarmLi.appendChild(instruction3);

            const Password2 = document.createElement("input");
            Password2.type = "password";
            Password2.id = "myPass2";
            Password2.placeholder = "password";
            this._alarmLi.appendChild(Password2);



            onInput.addEventListener("click", this._onInputHandler(data));
            offInput.addEventListener("click", this._offInputHandler(data));
            this._alarmInput.value = "";
            deleter.addEventListener("click", this._deleterHandler(data));
            Password.addEventListener("change", this._passwordHandler(data));
            Password2.addEventListener("change", this._passCheckHandler(data));

        }

    }


    _onInputHandler(data) {
        return (e) => {
            //model
            console.log(e);
            console.dir(this._smartHouse);
            this._smartHouse.getDeviceByName(data).on();

        }
    }
    _offInputHandler(data) {
        return (e) => {
            //model
            console.log(e);
            console.dir(this._smartHouse);
            this._smartHouse.getDeviceByName(data).off();
        }
    }
    _deleterHandler(data) {
        return (e) => {
            //model
            this._smartHouse.deleteDeviceByName(data);
            //view
            console.log(e);
            if (e.target.tagName == "BUTTON") {
                if (e.target.classList.contains("deleter")) {
                    e.target.parentNode.remove();
                }
            }
        }
    }

    _increaseTempHandler(data) {
        return (e) => {
            console.dir(e);
            //model
            this._smartHouse.getDeviceByName(data).increaseTemperature();

            //view
            document.getElementById(`${data}`).innerText = this._smartHouse.getDeviceByName(data)._temperature;
        }

    }

    _decreaseTempHandler(data) {
        return (e) => {
            //model
            console.log(e);
            this._smartHouse.getDeviceByName(data).decreaseTemperature();
            //view
            document.getElementById(`${data}`).innerText = this._smartHouse.getDeviceByName(data).temperature;

        }
    }

    _modeChoose(data) {
        return (e) => {
            console.log(e);
            //model
            this._smartHouse.getDeviceByName(data)._currentMode = this._smartHouse.getDeviceByName(data)._mode.indexOf(e.target.value);

        }

    }
    _passwordHandler(data) {
        return (e) => {
            //model
            console.dir(e);
            this._smartHouse.getDeviceByName(data).password = e.target.value;
        }
    }
    _passCheckHandler(data) {
        return (e) => {
            console.dir(e);
            //model
            this._smartHouse.getDeviceByName(data).unlocked(e.target.value);
            //view
            this._locked.innerText = this._smartHouse.getDeviceByName(data)._locked;
        }
    }

}
const root = document.getElementById("root");
const sh8 = new SmartHouse("sh8");
const v = new View(sh8, root);
v.render();