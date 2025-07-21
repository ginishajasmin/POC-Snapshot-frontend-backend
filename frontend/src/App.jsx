import { useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const snapshotRef = useRef();

  const handleSendSnapshot = async () => {
    const canvas = await html2canvas(snapshotRef.current);
    const image = canvas.toDataURL('image/png');

    const response = await fetch('http://localhost:3001/send-snapshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image }),
    });

    const result = await response.text();
    alert(result);
  };

  return (
    <div className="container">
      <div className="snapshot-area" ref={snapshotRef}>
        <h2>Engagement Snapshot</h2>
        <p><strong>Title:</strong> test eng testing eng</p>
        <p><strong>Manager:</strong> Aishu Aishu Rajesh</p>
        <p><strong>Client:</strong> IHS Kwanza Development Limited</p>
        <p><strong>Start Date:</strong> 13-07-2025</p>
        <p><strong>End Date:</strong> 31-07-2025</p>
        <p><strong>Billing:</strong> $100</p>
      </div>

      <button className="btn" onClick={handleSendSnapshot}>
        Send Snapshot to Email
      </button>
    </div>
  );
}

export default App;
