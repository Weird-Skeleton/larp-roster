import React, { useState, useRef, useEffect, useCallback } from 'react';

const INITIAL_CHARACTERS = [
  {
    id: 'char-1',
    basicInfo: { playerName: 'Dan', characterName: 'Farely', race: 'Common Man', level: '2', playerNumber: '998.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '11', 'Total Spent': '35', 'Total Character Build': '36', 'Unspent': '1', 'Last Event Build': '0' },
    resources: { 'Body': '14', 'Current Power Points': '0', 'Max Power Points': '0', 'Marbles': '18W 2B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Warrior Basic Career', 'Small Weapon', '1-H Edged', 'Florentine', 'Proficiency x 1', '1-Handed Edge Right', 'Disarm x 1', 'First Aid', 'Stamina x 1']
  },
  {
    id: 'char-2',
    basicInfo: { playerName: 'Bruce', characterName: 'Clurd', race: 'Common Man', level: '3', playerNumber: '999.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '21', 'Total Spent': '46', 'Total Character Build': '46', 'Unspent': '0', 'Last Event Build': '0' },
    resources: { 'Body': '6', 'Current Power Points': '33', 'Max Power Points': '33', 'Marbles': '17W 3B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Small Weapon', 'Mage Basic Career SL', 'Auras Rank 2', 'Healing Rank 2', 'Thaumaturgy Rank 2', 'Read Magic', 'Literacy: Common']
  },
  {
    id: 'char-3',
    basicInfo: { playerName: 'Mark', characterName: 'Kahn', race: 'Common Man', level: '1', playerNumber: '997.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '6', 'Total Spent': '31', 'Total Character Build': '31', 'Unspent': '0', 'Last Event Build': '0' },
    resources: { 'Body': '11', 'Current Power Points': '5', 'Max Power Points': '5', 'Marbles': '19W 1B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Warrior Basic Career', 'Small Weapon', '1-H Edged', 'Disarm x 1', 'Charms Rank 1', 'Evaluate Item', 'Stamina x 1']
  },
  {
    id: 'char-4',
    basicInfo: { playerName: 'Mike', characterName: 'Silvanus', race: 'Common Man', level: '3', playerNumber: '995.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '21', 'Total Spent': '42', 'Total Character Build': '46', 'Unspent': '4', 'Last Event Build': '0' },
    resources: { 'Body': '6', 'Current Power Points': '33', 'Max Power Points': '33', 'Marbles': '17W 3B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Small Weapon', 'Mage Basic Career SL', 'Auras Rank 2', 'Pyrotechnics Rank 2', 'Read Magic', 'Literacy: Common']
  },
  {
    id: 'char-5',
    basicInfo: { playerName: 'Art', characterName: 'Sevin', race: 'Mountain Dwarf', level: '2', playerNumber: '996.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '17', 'Total Spent': '37', 'Total Character Build': '42', 'Unspent': '5', 'Last Event Build': '0' },
    resources: { 'Body': '17', 'Current Power Points': '0', 'Max Power Points': '0', 'Marbles': '18W 2B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Warrior Basic Career', 'Small Weapon', '1-H Blunt', '2-H Blunt', 'Proficiency x 1', '2-Handed Blunt', 'Critical Attack x 1', 'Armor Smith x 2']
  },
  {
    id: 'char-6',
    basicInfo: { playerName: 'Eileen', characterName: 'Sindrale', race: 'Common Man', level: '1', playerNumber: '993.1', rulebookLastUpdated: '' },
    experience: { 'Total Earned': '6', 'Total Spent': '28', 'Total Character Build': '31', 'Unspent': '3', 'Last Event Build': '0' },
    resources: { 'Body': '7', 'Current Power Points': '0', 'Max Power Points': '0', 'Marbles': '19W 1B 0R', 'Deaths': '0', 'Permanent PP Loss': '0', 'Sorcerer Ritual Bonus': '0', 'Sorc. Participant Bon': '-2', 'Spell Singing Points': '0', 'Faith Points': '0', 'Cameos': '0' },
    skills: ['Small Weapon', '1-H Edged', 'Thrown Weapon', 'Rogue Basic Career SL', 'Disarm Trap', 'Pick Lock', 'Waylay', 'Evaluate Item', 'First Aid']
  }
];

const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
};

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgClass = type === 'error' ? 'bg-red-600' : 'bg-emerald-600';
  return (
    <div className={`fixed bottom-4 right-4 ${bgClass} text-white px-6 py-3 rounded shadow-xl flex items-center gap-3 z-50 transition-all transform animate-bounce`}>
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="hover:text-gray-200 ml-4 border-l border-white/20 pl-4">
        <Icons.Plus style={{ transform: 'rotate(45deg)' }} />
      </button>
    </div>
  );
};

const DictionaryEditor = ({ title, data, onChange }) => {
  const entries = Object.entries(data);

  const handleKeyChange = (oldKey, newKey) => {
    // Allows editing the key; if it's the same, skip.
    if (oldKey === newKey) return;
    
    // We recreate the object, maintaining order as best as possible
    const newData = {};
    for (const [k, v] of Object.entries(data)) {
      if (k === oldKey) {
        newData[newKey] = v;
      } else {
        newData[k] = v;
      }
    }
    onChange(newData);
  };

  const handleValueChange = (key, newValue) => {
    onChange({ ...data, [key]: newValue });
  };

  const handleRemove = (key) => {
    const newData = { ...data };
    delete newData[key];
    onChange(newData);
  };

  const handleAdd = () => {
    let newKey = `New Field`;
    let counter = 1;
    while(data[newKey]) {
      newKey = `New Field ${counter}`;
      counter++;
    }
    onChange({ ...data, [newKey]: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 mb-6">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <button onClick={handleAdd} className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors font-semibold">
          <Icons.Plus /> Add Field
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {entries.map(([key, value], idx) => (
          <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-md border border-slate-200 group focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
            <input 
              type="text" 
              value={key} 
              onChange={(e) => handleKeyChange(key, e.target.value)}
              className="w-1/2 bg-transparent text-sm font-semibold text-slate-600 outline-none px-2 py-1 placeholder-slate-400"
              placeholder="Field Name"
            />
            <span className="text-slate-300 font-bold">:</span>
            <input 
              type="text" 
              value={value}
              onChange={(e) => handleValueChange(key, e.target.value)}
              className="w-1/2 bg-white text-sm text-slate-900 outline-none border border-slate-200 focus:border-indigo-500 rounded px-2 py-1 placeholder-slate-400"
              placeholder="Value"
            />
            <button 
              onClick={() => handleRemove(key)}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all"
              title="Remove Field"
            >
              <Icons.Trash />
            </button>
          </div>
        ))}
        {entries.length === 0 && <div className="text-sm text-slate-500 italic py-4 text-center w-full col-span-full">No fields exist. Click "Add Field" to start.</div>}
      </div>
    </div>
  );
};

const SkillsEditor = ({ skills, onChange }) => {
  const handleSkillChange = (idx, newValue) => {
    const newSkills = [...skills];
    newSkills[idx] = newValue;
    onChange(newSkills);
  };

  const handleRemove = (idx) => {
    const newSkills = skills.filter((_, i) => i !== idx);
    onChange(newSkills);
  };

  const handleAdd = () => {
    onChange([...skills, 'New Skill']);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 mb-6">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Skills & Abilities</h3>
        <button onClick={handleAdd} className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors font-semibold">
          <Icons.Plus /> Add Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center bg-indigo-50 border border-indigo-100 rounded-full pl-3 pr-1 py-1 group focus-within:ring-2 focus-within:ring-indigo-300">
            <input 
              type="text" 
              value={skill} 
              onChange={(e) => handleSkillChange(idx, e.target.value)}
              className="bg-transparent text-sm font-medium text-indigo-900 outline-none px-1 min-w-[120px]"
            />
            <button 
              onClick={() => handleRemove(idx)}
              className="text-indigo-400 hover:text-red-500 hover:bg-red-50 ml-1 bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
            >
              <Icons.Trash />
            </button>
          </div>
        ))}
        {skills.length === 0 && <div className="text-sm text-slate-500 italic py-4 text-center w-full">No skills added yet.</div>}
      </div>
    </div>
  );
};

export default function App() {
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [selectedId, setSelectedId] = useState(INITIAL_CHARACTERS[0].id);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const fileInputRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3500);
  }, []);

  const selectedChar = characters.find(c => c.id === selectedId) || null;

  const handleUpdateCharacter = (updatedChar) => {
    setCharacters(chars => chars.map(c => c.id === updatedChar.id ? updatedChar : c));
  };

  const handleUpdateBasicInfo = (field, value) => {
    if (!selectedChar) return;
    handleUpdateCharacter({
      ...selectedChar,
      basicInfo: { ...selectedChar.basicInfo, [field]: value }
    });
  };

  const handleAddCharacter = () => {
    const newChar = {
      id: `char-${Date.now()}`,
      basicInfo: { playerName: 'New Player', characterName: 'New Character', race: 'Common Man', level: '1', playerNumber: '', rulebookLastUpdated: '' },
      experience: { 'Total Earned': '0', 'Total Spent': '0', 'Total Character Build': '0', 'Unspent': '0' },
      resources: { 'Body': '10', 'Current Power Points': '0', 'Max Power Points': '0', 'Marbles': '0W 0B 0R' },
      skills: []
    };
    setCharacters([...characters, newChar]);
    setSelectedId(newChar.id);
    showToast('New character created.');
  };

  const handleDeleteCharacter = (id, name) => {
    const filtered = characters.filter(c => c.id !== id);
    setCharacters(filtered);
    if (selectedId === id) {
      setSelectedId(filtered.length > 0 ? filtered[0].id : null);
    }
    showToast(`${name || 'Character'} deleted.`);
  };

  const downloadJSON = (data, filename) => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      showToast('Error exporting file.', 'error');
    }
  };

  const exportAll = () => {
    downloadJSON(characters, 'laire_roster_full.json');
    showToast('Full roster exported successfully.');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (Array.isArray(importedData)) {
          // Add basic validation
          const validChars = importedData.filter(c => c.id && c.basicInfo);
          if(validChars.length > 0) {
            // Overwrite or Merge strategy. For simplicity, we append imported files and reset IDs to avoid collision
            const newChars = validChars.map((c, i) => ({ ...c, id: `imported-${Date.now()}-${i}` }));
            setCharacters(prev => [...prev, ...newChars]);
            showToast(`Imported ${newChars.length} characters successfully.`);
          } else {
             showToast('Invalid array format.', 'error');
          }
        } else if (importedData.id && importedData.basicInfo) {
          // Single character
          importedData.id = `imported-${Date.now()}`;
          setCharacters(prev => [...prev, importedData]);
          setSelectedId(importedData.id);
          showToast(`Imported ${importedData.basicInfo.characterName}.`);
        } else {
          showToast('Invalid JSON structure. Ensure it is a valid Laire character.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
      if (fileInputRef.current) fileInputRef.current.value = ''; // reset input
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen bg-slate-100 text-slate-800 font-sans flex flex-col overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* App Header */}
      <header className="bg-slate-900 text-white shadow-md flex-shrink-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-inner">
              <Icons.Save />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wide leading-none">LAIRE</h1>
              <span className="text-xs text-indigo-300 font-medium tracking-widest uppercase">Character Editor</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Icons.Upload /> Import Roster
            </button>
            <button onClick={exportAll} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Icons.Download /> Save Roster (JSON)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden max-w-7xl w-full mx-auto p-4 gap-6">
        
        {/* Sidebar Roster */}
        <aside className="w-full md:w-1/3 lg:w-1/4 max-w-xs flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-shrink-0">
          <div className="px-4 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center z-10">
            <h2 className="font-bold text-slate-700 text-lg flex items-center gap-2">
              Roster <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{characters.length}</span>
            </h2>
            <button onClick={handleAddCharacter} className="text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 p-1.5 rounded-md transition-colors shadow-sm" title="Create New Character">
              <Icons.Plus />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {characters.map(char => {
              const isSelected = selectedId === char.id;
              return (
                <div 
                  key={char.id} 
                  onClick={() => setSelectedId(char.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center group
                    ${isSelected 
                      ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className="overflow-hidden pr-2">
                    <div className={`font-bold truncate text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {char.basicInfo.characterName || 'Unnamed Character'}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {char.basicInfo.playerName || 'Unknown Player'} <span className="text-slate-300">•</span> Lvl {char.basicInfo.level || '?'}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteCharacter(char.id, char.basicInfo.characterName); }}
                    className={`text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-all ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    title="Delete Character"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              );
            })}
            {characters.length === 0 && (
              <div className="p-8 text-center flex flex-col items-center gap-3 text-slate-400">
                <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p className="text-sm font-medium">Roster is empty.</p>
              </div>
            )}
          </div>
        </aside>

        {/* Editing Pane */}
        <main className="flex-1 overflow-y-auto bg-slate-50 rounded-xl relative custom-scrollbar border border-slate-200 shadow-sm">
          {!selectedChar ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <div className="bg-slate-200/50 p-4 rounded-full mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </div>
              <p className="text-lg font-bold text-slate-500">No Character Selected</p>
              <p className="text-sm mt-1 max-w-xs">Select a character from the roster on the left, or add a new one to begin editing.</p>
            </div>
          ) : (
            <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-full">
              
              <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-slate-200">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedChar.basicInfo.characterName || 'Unnamed Character'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">Player: {selectedChar.basicInfo.playerName || 'Unknown'}</p>
                 </div>
                 <button onClick={() => downloadJSON(selectedChar, `laire_${selectedChar.basicInfo.characterName.replace(/\s+/g, '_').toLowerCase()}.json`)} 
                         className="flex items-center gap-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded text-sm font-bold transition-colors">
                    <Icons.Download /> Export Character
                 </button>
              </div>

              {/* Basic Info Section */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Character Name', field: 'characterName', type: 'text' },
                    { label: 'Player Name', field: 'playerName', type: 'text' },
                    { label: 'Race', field: 'race', type: 'text' },
                    { label: 'Level', field: 'level', type: 'number' },
                    { label: 'Player Number', field: 'playerNumber', type: 'text' },
                    { label: 'Rulebook Updated', field: 'rulebookLastUpdated', type: 'text' }
                  ].map((input) => (
                    <div key={input.field} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{input.label}</label>
                      <input 
                        type={input.type} 
                        value={selectedChar.basicInfo[input.field]} 
                        onChange={e => handleUpdateBasicInfo(input.field, e.target.value)} 
                        className="bg-slate-50 border border-slate-200 rounded-md p-2 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors text-slate-800" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Sections */}
              <DictionaryEditor 
                title="Experience & Build" 
                data={selectedChar.experience} 
                onChange={(newExp) => handleUpdateCharacter({ ...selectedChar, experience: newExp })} 
              />

              <DictionaryEditor 
                title="Resources & Status" 
                data={selectedChar.resources} 
                onChange={(newRes) => handleUpdateCharacter({ ...selectedChar, resources: newRes })} 
              />

              <SkillsEditor 
                skills={selectedChar.skills} 
                onChange={(newSkills) => handleUpdateCharacter({ ...selectedChar, skills: newSkills })} 
              />
            </div>
          )}
        </main>
      </div>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}} />
    </div>
  );
}