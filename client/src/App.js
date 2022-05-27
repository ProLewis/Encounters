import './App.css';
import { Routes, Route } from 'react-router-dom'
import ViewAll from './components/ViewAll';
import Builder from './components/Builder';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/my-encounters" element={<ViewAll/>}/>
        <Route path="/encounters/:id/edit" element={<Edit/>}/>
        {/* <Route path="/encounters/:id" element={<ViewOne/>}/> */}
        <Route path="/encounter-builder" element={<Builder/>}/>
        <Route path="*" element={<ViewAll/>}/>
      </Routes>
    </div>
  );
}

export default App;
