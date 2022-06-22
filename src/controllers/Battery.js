class Battery {
    voltage; // in V
    startCapacity; // in mAh
    leftCapacity; // in mAh
    
    constructor(startCapacity, voltage) {
        this.voltage = voltage;
        this.startCapacity = startCapacity;
        this.leftCapacity = startCapacity;
    }

    use(current, time) {
        time /= (1000 * 60 * 60); // ms -> hr
        this.leftCapacity -= current * time;
    }

    set(voltage) {
        this.voltage = voltage;
    }

    state() {
        let percentage = (this.leftCapacity/this.startCapacity) * 100;
        return { voltage: this.voltage, percentage };
    }
}

module.exports = { Battery }