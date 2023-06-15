import {useState} from 'react'

export default function Layout({ children }) {
  const [containerBackgroundColor, setContainerBackgroundColor] = useState('#0E0E10');
  const [containerTextColor, setContainerTextColor] = useState('#fff');

  return (
    <div className="app-layout" id="app-layout" style={{backgroundColor: containerBackgroundColor, color: containerTextColor }}>
      {children}
    </div>
  );
}