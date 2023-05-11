import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:4000", { cors: { origin: '*' } });


function App() {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to socket server.');
    });

    // Listen for the `newBuild` event and update the state with the relevant data
    socket.on('newBuild', data => {
      setBuilds(prevBuilds => [...prevBuilds, data]);
    });
  }, []);

  return (
    <div>
      <h1>Socket.io Example</h1>
      {builds.map((build, index) => (
        <div key={index}>
          <p>Namespace: {build.namespace}</p>
          <p>Name: {build.name}</p>
          <p>Repository URL: {build.repo_url}</p>
          <p>Build Time: {build.pushed_build_time}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
