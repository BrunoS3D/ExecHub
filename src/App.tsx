import React, { useState, useEffect } from "react";

import "./assets/css/photon.css";
import { isNullOrUndefined } from "util";

const remote = window.require("electron").remote;
const fs = remote.require("fs");
const path = remote.require("path");

const App: React.FC = () => {
    const window = remote.getCurrentWindow();

    const [files, setFiles]: any[] = useState([]);

    useEffect(() => {
        let filesTemp = [];

        filesTemp = fs.readdirSync("./").map((file: string) => {
            const stats = fs.statSync(file);
            return { name: file, extension: path.extname(file).replace(".", "").toUpperCase(), sizeInMegabytes: stats["size"] / 1000000.0, stats };
        });

        setFiles(filesTemp);

        alert(JSON.stringify(filesTemp, null, 4));
    }, []);

    // gets current state if maximized in real time
    window.on("maximize", () => {
        alert("Maximizado");
    });

    return (
        <div className="App">
            <div className="window">
                <header className="toolbar toolbar-header">
                    <h1 className="title">ExecHub</h1>
                </header>

                <div className="window-content">
                    <div className="pane-group">
                        <div className="pane pane-sm sidebar">
                            <nav className="nav-group">
                                <h5 className="nav-group-title">Navigation</h5>
                                <span className="nav-group-item active" onClick={() => alert("Store")} style={{ cursor: "pointer" }}>
                                    <span className="icon icon-download"></span>
                                    Store
                                </span>
                                <span className="nav-group-item">
                                    <span className="icon icon-folder"></span>
                                    Downloads
                                </span>
                            </nav>
                        </div>

                        <div className="pane">
                            <table className="table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Kind</th>
                                        <th>Size</th>
                                        <th>Date Modified</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file: any, index: number) => (
                                        <tr key={index}>
                                            <td>{file.name}</td>
                                            <td>{file.stats.isDirectory() ? "Folder" : file.extension}</td>
                                            <td>{file.sizeInMegabytes}</td>
                                            <td>{(file.stats?.mtime || file.stats.birthtime).toISOString().slice(0, 10)}</td>
                                            <td>connors</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
