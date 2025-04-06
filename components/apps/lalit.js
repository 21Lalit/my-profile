import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutLalit extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about lalit" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="lalit' education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="lalit' skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="lalit' projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="lalit's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>

            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutLalit;

export const displayAboutLalit = () => {
    return <AboutLalit />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Lalit Rohilla Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Lalit Rohilla</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Cyber Security Analyst</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">B.tech CSE Graduate</span> currently working as a cyber security trainer. I've completed my 6 month Cyber Security intern at <u className=' cursor-pointer '> <a href="https://www.mcyberacademy.com" target={"_blank"}>M Cyber Academy</a> </u>, and now I'm looking for full-time VAPT engineer roles! ( Hit me up <a className='text-underline' href='mailto:lalitrohilla2005@gmail.com'><u>@lalitrohilla2005@gmail.com</u></a> :) )</li>
                <li className=" mt-3 list-building">  enjoy exploring vulnerabilities in web applications, automating security tasks, and contributing to safer digital systems.</li>
                <li className=" mt-3 list-time">  When I’m not testing or writing reports, I love diving into bug bounty writeups, exploring open-source security tools, or watching 
                <a href="https://www.youtube.com/c/LiveOverflow" target="_blank" rel="noreferrer"> LiveOverflow's videos</a>.</li>
                <li className=" mt-3 list-star">  I'm also curious about <strong>Digital Forensics, Threat Hunting</strong>, and the growing field of <strong>OSINT & Red Teaming</strong>.</li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        IGNOU
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 - 2025</div>
                    <div className=" text-sm md:text-base">Post Graduate Diploma in Information Security - PGDIS</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Expected &nbsp; May 2025</div>
                </li>
                <li className="list-disc">
                    <div className=" text-lg md:text-xl mt-4 text-left font-bold leading-tight">
                        MD University
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2021 - 2024</div>
                    <div className=" text-sm md:text-base">Computer Science Engineering</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">CGPA &nbsp; 7.28</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        CR Polytechnic, Rohtak
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2018 - 2021</div>
                    <div className=" text-sm md:text-base">Computer Engineering</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">CGPA &nbsp; 7.25</div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow mt-4 leading-tight tracking-tight">
                    I've worked with a range of cybersecurity tools, programming languages, and digital forensics frameworks.
                </li>
                <li className="list-arrow mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">cybersecurity, digital forensics, ethical hacking, and Linux!</strong></div>
                </li>
                <li className="list-arrow mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used - </div>
                </li>
            </ul>

            {/* First Row: Languages & Cybersecurity */}
            <div className="w-full md:w-10/12 flex flex-wrap mt-4">
                <div className="w-full md:w-1/2 px-2 text-center font-bold text-sm md:text-base">🛠️ Languages & Scripting</div>
                <div className="w-full md:w-1/2 px-2 text-center font-bold text-sm md:text-base">🧰 Cybersecurity & Forensics Tools</div>
            </div>
            <div className="w-full md:w-10/12 flex flex-wrap justify-center items-start font-bold text-center">
                {/* Languages */}
                <div className="px-2 w-full md:w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="Lalit javascript" />
                        <img className="m-1" src="https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white" alt="Lalit bash" />
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="Lalit python" />
                        <img className="m-1" src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white" alt="Lalit C" />
                        <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer">
                            <img title="yes it's a language!" className="m-1" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="Lalit HTML" />
                        </a>
                    </div>
                </div>

                {/* Cybersecurity */}
                <div className="px-2 w-full md:w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Wireshark-1679A7?style=for-the-badge&logo=wireshark&logoColor=white" alt="Lalit wireshark" />
                        <img className=" m-1" src="https://img.shields.io/badge/Nmap-2A2A2A?style=for-the-badge&logo=nmap&logoColor=white" alt="Lalit nmap" />
                        <img className="m-1" src="https://img.shields.io/badge/Metasploit-000000?style=for-the-badge&logoColor=white" alt="Lalit metasploit" />
                        <img className="m-1" src="https://img.shields.io/badge/Burp_Suite-FF6F00?style=for-the-badge&logo=burpsuite&logoColor=white" alt="Lalit burp suite" />
                        <img className="m-1" src="https://img.shields.io/badge/Autopsy-000000?style=for-the-badge&logoColor=white" alt="Lalit autopsy" />
                        <img className="m-1" src="https://img.shields.io/badge/John_The_Ripper-8A2BE2?style=for-the-badge&logoColor=white" alt="Lalit john the ripper" />
                        <img className="m-1" src="https://img.shields.io/badge/Aircrack--ng-007396?style=for-the-badge&logoColor=white" alt="Lalit aircrack-ng" />
                        <img className="m-1" src="https://img.shields.io/badge/OpenVAS-008000?style=for-the-badge&logoColor=white" alt="Lalit openVAS" />
                        <img className="m-1" src="https://img.shields.io/badge/Splunk-000000?style=for-the-badge&logo=splunk&logoColor=white" alt="Lalit splunk" />
                    </div>
                </div>
            </div>

            {/* Second Row: OS & Version Control */}
            <div className="w-full md:w-10/12 flex flex-wrap mt-6">
                <div className="w-full md:w-1/2 px-2 text-center font-bold text-sm md:text-base">🖥️ Operating Systems & Virtualization</div>
                <div className="w-full md:w-1/2 px-2 text-center font-bold text-sm md:text-base">📁 Version Control & Collaboration</div>
            </div>
            <div className="w-full md:w-10/12 flex flex-wrap justify-center items-start font-bold text-center">
                {/* OS & Virtualization */}
                <div className="px-2 w-full md:w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Kali_Linux-557C94?style=for-the-badge&logo=kalilinux&logoColor=white" alt="Lalit kali linux" />
                        <img className=" m-1" src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" alt="Lalit ubuntu" />
                        <img className="m-1" src="https://img.shields.io/badge/VirtualBox-183A61?style=for-the-badge&logo=virtualbox&logoColor=white" alt="Lalit virtualbox" />
                    </div>
                </div>

                {/* Version Control */}
                <div className="px-2 w-full md:w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Lalit git" />
                        <img className=" m-1" src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Lalit github" />
                    </div>
                </div>
            </div>

            {/* Final Linux badge with emoji */}
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className="list-arrow mt-4 leading-tight tracking-tight">
                    <span> And of course,</span> <img className="inline ml-1" src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="Lalit linux" /> <span>!</span>
                </li>
            </ul>
        </>
    );
}

function Projects() {
    const project_list = [
        {
            name: "UbuntuOS Portfolio",
            date: "Apr 2021",
            link: "https://github.com/Lalit9patel/Lalit9patel.github.io",
            description: [
                "Personal portfolio website of theme Ubuntu 20.04, made using NEXT.js & tailwind CSS",
            ],
            domains: ["javascript", "next.js", "tailwindcss"]
        },
        {
            name: "Chrome Extension React Bolierplate",
            date: "Dec 2021",
            link: "https://github.com/Lalit9patel/chrome-extension-react-boilerplate",
            description: [
                "A boilerplate code to build a chrome extension with react and webpack",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "CodeConnect",
            date: "Nov 2021",
            link: "https://github.com/21Lalit/21Lalit",
            description: [
                "A multi-language pair-programming platform with the features of video meeting and whiteboard. Built with React.js, Tailwind CSS, Chakra UI, Express & Socket.io.",
            ],
            domains: ["javascript", "tailwindcss"]
        },
        {
            name: "Ad Free Spotify",
            date: "Jun 2021",
            link: "https://github.com/Lalit9patel/ad-free-spotify",
            description: [
                "Chrome extension to automatically mute/unmute Spotify tab when Advertisement starts and ends!",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "economist.com Unlocked",
            date: "Mar 2021",
            link: "https://github.com/Lalit9patel/economist.com-unlocked",
            description: [
                "A chrome extension to read Paid Articles for Free & with no Ads, no subscription, no memberships!",
            ],
            domains: ["javascript", "chrome-extension"]
        },
        {
            name: "Flutter banking app",
            date: "Jan 2021",
            link: "https://github.com/Lalit9patel/flutter-banking-app",
            description: [
                "A Flutter & Firebase project for creating transactions between different Users and displaying the history of transactions done by all.",
            ],
            domains: ["flutter", "firestore", "dart", "firebase auth"]
        },
        {
            name: "CPU scheduling application",
            date: "Dec 2020",
            link: "https://github.com/Lalit9patel/CPU-Scheduling-APP-React-Native",
            description: [
                "React Native Application to visualize the CPU Scheduling algorithms with different Processes and Animations with gannt chart.",
            ],
            domains: ["react-native", "javascript"]
        },
        {
            name: "Meditech Healthcare WebApp",
            date: "Nov 2020",
            link: "https://github.com/Lalit9patel/Meditech-Healthcare",
            description: [
                "Developed Web Application to predict and diagnose diseases from x-ray images.",
            ],
            domains: ["javascript", "html5", "sass", "firebase", "tensorflow"]
        },
        {
            name: "Problem Recommendation System",
            date: "Sep 2020",
            link: "https://github.com/Lalit9patel/Improve-Codeforces",
            description: [
                "Django web application to suggest practice problems from the areas in which the user struggles to get pass in code-forces.",
            ],
            domains: ["django", "python", "codeforces-api", "javascript"]
        },
        {
            name: "Cleanliness Automation",
            date: "Dec 2019",
            link: "https://github.com/Lalit9patel/CPU-Scheduling-APP-React-Native",
            description: [
                "Developed Web Applications to automate Garbage collection and extraction systems for SSIP hackathon",
            ],
        }
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "firestore": "red-500",
        "firebase auth": "red-400",
        "chrome-extension": "yellow-400",
        "flutter": "blue-400",
        "dart": "blue-500",
        "react-native": "purple-500",
        "html5": "pink-600",
        "sass": "pink-400",
        "tensorflow": "yellow-600",
        "django": "green-600",
        "python": "green-200",
        "codeforces-api": "gray-300",
        "tailwindcss": "blue-300",
        "next.js": "purple-600"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <iframe src="https://github.com/sponsors/Lalit9patel/card" title="Sponsor Lalit9patel" className='my-4 w-5/6 md:w-3/4' ></iframe>

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=Lalit9patel&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Lalit-RESUME.pdf" title="Lalit Rohilla resume" frameBorder="0"></iframe>
    )
}
