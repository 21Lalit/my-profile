import React, { Component } from 'react';
import $ from 'jquery';

const SECTIONS = ["Background", "Date & Time", "About"];

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: "Background",
        };
        this.wallpapers = {
            "wall-1": "./images/wallpapers/wall-1.webp",
            "wall-2": "./images/wallpapers/wall-2.webp",
            "wall-3": "./images/wallpapers/wall-3.webp",
            "wall-4": "./images/wallpapers/wall-4.webp",
            "wall-5": "./images/wallpapers/wall-5.webp",
            "wall-6": "./images/wallpapers/wall-6.webp",
            "wall-7": "./images/wallpapers/wall-7.webp",
            "wall-8": "./images/wallpapers/wall-8.webp",
        };
    }

    changeBackgroundImage = (e) => {
        this.props.changeBackgroundImage($(e.target).data("path"));
    }

    renderBackground() {
        const { wallpapers } = this;
        const { currBgImgName } = this.props;
        return (
            <div className="flex flex-col w-full">
                <div
                    className="md:w-2/5 w-2/3 h-32 m-auto my-4 rounded"
                    style={{
                        backgroundImage: "url(" + wallpapers[currBgImgName] + ")",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"
                    }}
                />
                <div className="flex flex-wrap justify-center items-center border-t border-gray-900">
                    {Object.keys(wallpapers).map((name, index) => (
                        <div
                            key={index}
                            tabIndex="1"
                            onFocus={this.changeBackgroundImage}
                            data-path={name}
                            className={
                                (name === currBgImgName ? " border-yellow-700 " : " border-transparent ") +
                                "md:px-28 md:py-20 md:m-4 m-2 px-14 py-10 outline-none border-4 border-opacity-80"
                            }
                            style={{
                                backgroundImage: "url(" + wallpapers[name] + ")",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center"
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    renderDateTime() {
        const { clockFormat, changeClockFormat } = this.props;
        const is12h = clockFormat === "12h";
        return (
            <div className="flex flex-col w-full px-6 py-4 text-white">
                <h2 className="text-lg font-semibold mb-4">Date &amp; Time</h2>

                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                        <p className="font-medium">Time Format</p>
                        <p className="text-sm text-gray-400">Choose between 12-hour and 24-hour clock</p>
                    </div>
                    <div className="flex rounded overflow-hidden border border-gray-600">
                        <button
                            onClick={() => changeClockFormat("12h")}
                            className={
                                "px-4 py-1.5 text-sm focus:outline-none transition-colors duration-150 " +
                                (is12h ? "bg-ub-orange text-white" : "bg-ub-cool-grey text-gray-300 hover:bg-gray-600")
                            }
                        >
                            12-hour
                        </button>
                        <button
                            onClick={() => changeClockFormat("24h")}
                            className={
                                "px-4 py-1.5 text-sm focus:outline-none transition-colors duration-150 " +
                                (!is12h ? "bg-ub-orange text-white" : "bg-ub-cool-grey text-gray-300 hover:bg-gray-600")
                            }
                        >
                            24-hour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    renderAbout() {
        const info = [
            { label: "OS Name", value: "Ubuntu 20.04.3 LTS" },
            { label: "OS Type", value: "64-bit" },
            { label: "GNOME Version", value: "3.36.9" },
            { label: "Windowing System", value: "X11" },
            { label: "Kernel", value: "Linux 5.11.0-44-generic" },
            { label: "Processor", value: "Intel Core i5, 4 × 2.40 GHz" },
            { label: "Memory", value: "8.0 GiB" },
            { label: "Graphics", value: "Mesa Intel HD Graphics" },
            { label: "Disk Capacity", value: "256.1 GB" },
        ];
        return (
            <div className="flex flex-col w-full px-6 py-4 text-white">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="./themes/Yaru/status/ubuntu_white_hex.svg"
                        alt="Ubuntu Logo"
                        className="w-16 h-16 mb-2"
                    />
                    <h2 className="text-xl font-bold">Ubuntu 20.04.3 LTS</h2>
                    <p className="text-sm text-gray-400">GNOME Desktop Environment</p>
                </div>

                <div className="rounded-md overflow-hidden border border-gray-700">
                    {info.map((item, index) => (
                        <div
                            key={index}
                            className={
                                "flex justify-between px-4 py-2.5 text-sm " +
                                (index % 2 === 0 ? "bg-gray-800 bg-opacity-50" : "bg-gray-900 bg-opacity-30")
                            }
                        >
                            <span className="text-gray-400">{item.label}</span>
                            <span className="text-gray-100 font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderContent() {
        switch (this.state.activeSection) {
            case "Background": return this.renderBackground();
            case "Date & Time": return this.renderDateTime();
            case "About": return this.renderAbout();
            default: return null;
        }
    }

    render() {
        const { activeSection } = this.state;
        return (
            <div className="w-full flex flex-grow z-20 max-h-full overflow-hidden select-none bg-ub-cool-grey">
                {/* Sidebar */}
                <div className="w-40 flex-shrink-0 bg-gray-900 bg-opacity-50 border-r border-gray-700 flex flex-col py-2">
                    {SECTIONS.map((section) => (
                        <button
                            key={section}
                            onClick={() => this.setState({ activeSection: section })}
                            className={
                                "text-left px-4 py-2.5 text-sm focus:outline-none transition-colors duration-150 " +
                                (activeSection === section
                                    ? "bg-ub-orange bg-opacity-80 text-white"
                                    : "text-gray-300 hover:bg-white hover:bg-opacity-10")
                            }
                        >
                            {section}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

export default Settings;

export const displaySettings = () => {
    return <Settings />;
};
