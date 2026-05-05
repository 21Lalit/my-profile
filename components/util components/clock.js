import { Component } from 'react'

export default class Clock extends Component {
    constructor() {
        super();
        this.month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.day_list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.state = {
            current_time: new Date()
        };
    }

    componentDidMount() {
        this.update_time = setInterval(() => {
            this.setState({ current_time: new Date() });
        }, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update_time);
    }

    render() {
        const { current_time } = this.state;

        let day = this.day_list[current_time.getDay()];
        let hour = current_time.getHours();
        let minute = current_time.getMinutes();
        let month = this.month_list[current_time.getMonth()];
        let date = current_time.getDate().toLocaleString();
        let meridiem = (hour < 12 ? "AM" : "PM");

        if (minute.toLocaleString().length === 1) {
            minute = "0" + minute
        }

        const use12h = this.props.clockFormat !== "24h";
        if (use12h && hour > 12) hour -= 12;
        if (use12h && hour === 0) hour = 12;

        let display_time;
        if (this.props.onlyTime) {
            display_time = use12h
                ? hour + ":" + minute + " " + meridiem
                : hour + ":" + minute;
        }
        else if (this.props.onlyDay) {
            display_time = day + " " + month + " " + date;
        }
        else {
            display_time = use12h
                ? day + " " + month + " " + date + " " + hour + ":" + minute + " " + meridiem
                : day + " " + month + " " + date + " " + hour + ":" + minute;
        }
        return <span>{display_time}</span>;
    }
}
