import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// Initial default characters loaded if the local characters folder is empty
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

const MAGE_SKILLS = [
  'mage basic career list',
  'mage basic career skill list',
  'power points',
  'quarterstaff',
  'small weapon',
  'read magic',
  'auras rank 1', 'auras rank 2', 'auras rank 3', 'auras rank 4', 'auras rank 5', 'auras rank 6',
  'bonds rank 1', 'bonds rank 2', 'bonds rank 3', 'bonds rank 4', 'bonds rank 5', 'bonds rank 6',
  'charms rank 1', 'charms rank 2', 'charms rank 3', 'charms rank 4', 'charms rank 5', 'charms rank 6',
  'death rank 1', 'death rank 2', 'death rank 3', 'death rank 4', 'death rank 5', 'death rank 6',
  'enchantments rank 1', 'enchantments rank 2', 'enchantments rank 3', 'enchantments rank 4', 'enchantments rank 5', 'enchantments rank 6',
  'healing rank 1', 'healing rank 2', 'healing rank 3', 'healing rank 4', 'healing rank 5', 'healing rank 6',
  'ice rank 1', 'ice rank 2', 'ice rank 3', 'ice rank 4', 'ice rank 5', 'ice rank 6',
  'necromancy rank 1', 'necromancy rank 2', 'necromancy rank 3', 'necromancy rank 4', 'necromancy rank 5', 'necromancy rank 6',
  'pyrotechnics rank 1', 'pyrotechnics rank 2', 'pyrotechnics rank 3', 'pyrotechnics rank 4', 'pyrotechnics rank 5', 'pyrotechnics rank 6',
  'shadow rank 1', 'shadow rank 2', 'shadow rank 3', 'shadow rank 4', 'shadow rank 5', 'shadow rank 6',
  'thaumaturgy rank 1', 'thaumaturgy rank 2', 'thaumaturgy rank 3', 'thaumaturgy rank 4', 'thaumaturgy rank 5', 'thaumaturgy rank 6',
  'demonology rank 1', 'demonology rank 2', 'demonology rank 3', 'demonology rank 4', 'demonology rank 5', 'demonology rank 6'
];

const ROGUE_SKILLS = [
  'armor skill',
  'backstab',
  'blather',
  'cheap trick',
  'disarm',
  'disarm trap',
  'florentine',
  'pick lock',
  'rogue basic career list',
  'rogue basic career skill list',
  'set trap rank 1',
  'set trap rank 2',
  'set trap rank 3',
  'set trap rank 4',
  'side step',
  'throat punch',
  'waylay',
  'bow',
  'crossbow',
  'one-handed edge',
  'small weapon'
];

const WARRIOR_SKILLS = [
  'armor proficiency',
  'armor reset',
  'armor skill',
  'cleave',
  'critical attack',
  'disarm',
  'florentine',
  'morale boost',
  'shield skill',
  'stunning blow',
  'warrior basic career skill list',
  'warrior basic career list',
  'weapon proficiency',
  'bastard blunt',
  'bastard edge',
  'bow',
  'crossbow',
  'one-handed blunt',
  'one-handed edge',
  'polearm',
  'quarterstaff',
  'small weapon',
  'spear',
  'thrown weapon',
  'two-handed blunt',
  'two-handed edge'
];

const DEMON_HUNTER_SKILLS = [
  'bane endowment rank 1',
  'battle strength endowment rank 1',
  'break threshold',
  'clear mind endowment rank 1',
  'crit demon',
  'demon lore',
  'harvest demon flesh',
  'identify demon',
  'preserve demon flesh',
  'protection endowment rank 1',
  'release soul endowment',
  'shadow bane endowment rank 1',
  'slay demon',
  'stun demon',
  'track demon',
  'unnatural health'
];

const ARCANE_GRIFTER_SKILLS = [
  'arcane grifter tools of the trade',
  'arcane proficiency',
  'assassinate',
  'disarm',
  'empower assassinate',
  'escape',
  'glyph',
  'magic blade',
  'magic knife',
  'magic tools',
  'missile deflection',
  'poison immunity',
  'power strike',
  'resist curse',
  'resist truth',
  'sense trap',
  'speed search',
  'spell storing',
  'true aim'
];

const SPELL_SINGER_SKILLS = [
  'echo',
  'extend spell song',
  'spell singer',
  'spell singing points',
  'spell singing rank 1',
  'spell singing rank 2',
  'spell singing rank 3',
  'spell singing rank 4',
  'spell singing rank 5'
];

// SVG Assets dictionary for clean inline rendering
const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Minus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Tree: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="22" x2="12" y2="13"></line><line x1="12" y1="13" x2="12" y2="8"></line><line x1="12" y1="13" x2="17" y2="13"></line><line x1="17" y1="13" x2="17" y2="16"></line><line x1="12" y1="8" x2="7" y2="8"></line><line x1="7" y1="8" x2="7" y2="5"></line><line x1="12" y1="8" x2="17" y2="8"></line><line x1="17" y1="8" x2="17" y2="5"></line><line x1="7" y1="8" x2="7" y2="11"></line><circle cx="12" cy="22" r="1"></circle></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  List: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Grid: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
};

// Reusable alert component for system messages
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgClass = type === 'error' ? 'bg-red-600' : 'bg-emerald-600';
  return (
    <div className={`fixed bottom-4 right-4 ${bgClass} text-white px-6 py-3 rounded shadow-xl flex items-center gap-3 z-50 transition-all transform animate-bounce`}>
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="hover:text-gray-200 ml-4 border-l border-white/20 pl-4">
        <Icons.X />
      </button>
    </div>
  );
};

// Translates imported flat JSON structures into the new nested format expected by the app
const normalizeCharacter = (data) => {
  if (data.basicInfo) {
    return { ...data, id: data.id || `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
  }
  return {
    id: data._id || `char-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    basicInfo: {
      playerName: data['Player Name'] || '',
      characterName: data['Character Name'] || 'Unknown Character',
      race: data['Race'] || '',
      level: data['Level'] || '',
      playerNumber: data['Player Number'] || '',
      rulebookLastUpdated: data['Rulebook Last Updated'] || ''
    },
    experience: data.Experience || {},
    resources: data.Resources || {},
    skills: Array.isArray(data.Skills) ? data.Skills : (data.Skills ? data.Skills.split('\n') : [])
  };
};

const normalizeSkillName = (name) => {
  if (!name) return '';
  let n = name.toLowerCase().trim();
  
  // Strip trailing multipliers like " x 2" or "x 3" so we can cleanly match base names
  n = n.replace(/\s*x\s*\d+$/i, '');
  
  n = n.replace(/weapon skill\s*:\s*/g, ''); 
  n = n.replace(/\s+skill/g, ''); 
  n = n.replace(/1-h/g, 'one-handed');
  n = n.replace(/1 handed/g, 'one-handed');
  n = n.replace(/1-handed/g, 'one-handed');
  n = n.replace(/one handed/g, 'one-handed');
  n = n.replace(/2-h/g, 'two-handed');
  n = n.replace(/2 handed/g, 'two-handed');
  n = n.replace(/2-handed/g, 'two-handed');
  n = n.replace(/two handed/g, 'two-handed');
  n = n.replace(/edged/g, 'edge');
  n = n.replace(/blunted/g, 'blunt');
  return n.trim();
};

// The canvas component now passes its internal scale value down to its children
// This allows nodes to calculate exact drag distance regardless of zoom level
const PanZoomCanvas = ({ children, onBgClick, controls, resetTrigger }) => {
  const containerRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.8);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      setPan({ x: containerRef.current.clientWidth / 2, y: containerRef.current.clientHeight / 2 });
      setScale(0.8);
    }
  }, [resetTrigger]);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return; 
    isDragging.current = true;
    dragDistance.current = 0;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    dragDistance.current += Math.abs(dx) + Math.abs(dy);
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPan(p => ({ x: p.x + dx, y: p.y + dy }));
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    if (dragDistance.current < 5 && onBgClick) {
      onBgClick();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomSensitivity = 0.002;
      const delta = -e.deltaY * zoomSensitivity;
      setScale(currentScale => {
        const scaleAdjust = Math.exp(delta);
        const newScale = Math.min(Math.max(0.1, currentScale * scaleAdjust), 3);
        const actualAdjust = newScale / currentScale;
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        setPan(p => ({
          x: mouseX - (mouseX - p.x) * actualAdjust,
          y: mouseY - (mouseY - p.y) * actualAdjust
        }));
        return newScale;
      });
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-full overflow-hidden bg-slate-900 cursor-grab active:cursor-grabbing rounded-lg border border-slate-700 shadow-inner touch-none"
    >
      <div 
        className="absolute top-0 left-0 w-full h-full origin-top-left will-change-transform pointer-events-none"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
      >
        <div className="relative w-full h-full pointer-events-auto">
          {typeof children === 'function' ? children({ scale }) : children}
        </div>
      </div>
      
      <div 
        className="absolute bottom-6 right-6 flex items-end gap-4 z-50 cursor-default" 
        onPointerDown={e => e.stopPropagation()} 
        onClick={e => e.stopPropagation()}
      >
         {controls}
         <div className="flex flex-col gap-2">
           <button onClick={() => setScale(s => Math.min(s * 1.3, 3))} className="bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full shadow-lg border border-slate-600 transition-colors" title="Zoom In"><Icons.Plus /></button>
           <button onClick={() => setScale(s => Math.max(s / 1.3, 0.1))} className="bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full shadow-lg border border-slate-600 transition-colors" title="Zoom Out"><Icons.Minus /></button>
         </div>
      </div>
    </div>
  );
};

// Viewers and Editors

const DictionaryEditor = ({ title, data, onChange }) => {
  const entries = Object.entries(data);

  const handleKeyChange = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    const newData = {};
    for (const [k, v] of Object.entries(data)) {
      if (k === oldKey) { newData[newKey] = v; } 
      else { newData[k] = v; }
    }
    onChange(newData);
  };

  const handleValueChange = (key, newValue) => { onChange({ ...data, [key]: newValue }); };

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
              type="text" value={key} onChange={(e) => handleKeyChange(key, e.target.value)}
              className="w-1/2 bg-transparent text-sm font-semibold text-slate-600 outline-none px-2 py-1 placeholder-slate-400"
              placeholder="Field Name"
            />
            <span className="text-slate-300 font-bold">:</span>
            <input 
              type="text" value={value} onChange={(e) => handleValueChange(key, e.target.value)}
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
  const handleAdd = () => { onChange([...skills, 'New Skill']); };

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
              type="text" value={skill} onChange={(e) => handleSkillChange(idx, e.target.value)}
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

const SkillCard = ({ skill, skillCount, handleAddSkill, handleRemoveSkill, hasMissingPrereqs }) => {
  const isAcquired = skillCount > 0;
  const isMulti = skill.purchase === "Multi" || skill.purchase === "Multiple";

  return (
    <div className={`w-80 rounded-xl shadow-2xl border-2 p-5 flex flex-col transition-colors cursor-default ${isAcquired ? 'bg-blue-50 border-blue-400' : 'bg-white border-slate-300'}`}>
      <div className="flex justify-between items-start mb-2 gap-3">
        <h3 className={`text-lg font-bold leading-tight ${isAcquired ? 'text-blue-900' : 'text-slate-900'}`}>{skill.name}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`${isAcquired ? 'bg-blue-200 text-blue-900' : 'bg-slate-200 text-slate-800'} text-xs font-black px-2 py-1 rounded-md shrink-0`}>Cost: {skill.buildCost}</span>
          
          {isMulti && isAcquired ? (
            <div className="flex items-center bg-white rounded-md shadow-sm border border-blue-300 overflow-hidden">
              <button onClick={(e) => { e.stopPropagation(); handleRemoveSkill(skill.name); }} className="p-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors" title="Remove 1"><Icons.Minus /></button>
              <span className="px-2 font-black text-blue-900 text-xs">x{skillCount}</span>
              <button onClick={(e) => { e.stopPropagation(); handleAddSkill(skill.name); }} className="p-1.5 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors" title="Add 1"><Icons.Plus /></button>
            </div>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); isAcquired ? handleRemoveSkill(skill.name) : handleAddSkill(skill.name); }}
              className={`p-1.5 rounded-md flex items-center justify-center transition-all shadow-sm ${isAcquired ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
              title={isAcquired ? 'Remove Skill' : 'Add Skill'}
            >
              {isAcquired ? <Icons.Minus /> : <Icons.Plus />}
            </button>
          )}
        </div>
      </div>
      <div className={`text-xs font-semibold uppercase tracking-wider mb-4 flex flex-wrap gap-x-3 gap-y-1 ${isAcquired ? 'text-blue-700' : 'text-slate-500'}`}>
        <span>List: <span className={isAcquired ? 'text-blue-900' : 'text-slate-700'}>{skill.skillList}</span></span>
        <span className="opacity-50">•</span>
        <span>Type: <span className={isAcquired ? 'text-blue-900' : 'text-slate-700'}>{skill.skillType}</span></span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`border text-xs px-2 py-1 rounded font-medium ${isAcquired ? 'bg-blue-100 border-blue-200 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>Purchase: {skill.purchase}</span>
        <span className={`border text-xs px-2 py-1 rounded font-medium ${isAcquired ? 'bg-blue-100 border-blue-200 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>Tagged: {skill.tagged}</span>
        <span className={`border text-xs px-2 py-1 rounded font-medium ${isAcquired ? 'bg-blue-100 border-blue-200 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>Duration: {skill.duration}</span>
      </div>

      {skill.prerequisites && skill.prerequisites !== "None" && (
        <div className={`border text-sm px-3 py-2 rounded-md mb-4 font-medium flex gap-2 items-center ${hasMissingPrereqs ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'}`}>
          {hasMissingPrereqs ? (
             <svg className="w-4 h-4 shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          ) : (
             <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          )}
          <span>Requires: {skill.prerequisites}</span>
        </div>
      )}

      <div className={`text-sm whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto max-h-64 custom-scrollbar ${isAcquired ? 'text-blue-900' : 'text-slate-700'}`}>
        {skill.description}
      </div>
    </div>
  );
};

const DraggableNode = ({ node, isExpanded, skillCount, isSearched, isEditMode, scale, onToggleExpand, handleAddSkill, handleRemoveSkill, checkMissingPrereqs, updateNodePosition }) => {
  const draggingRef = useRef(false);
  const startPos = useRef({ x: 0, y: 0, nodeX: 0, nodeY: 0 });
  const isAcquired = skillCount > 0;
  const isMulti = node.purchase === "Multi" || node.purchase === "Multiple";

  const handlePointerDown = (e) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    startPos.current = { x: e.clientX, y: e.clientY, nodeX: node.x, nodeY: node.y };
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    e.stopPropagation();
    const dx = (e.clientX - startPos.current.x) / scale;
    const dy = (e.clientY - startPos.current.y) / scale;
    updateNodePosition(node.name, startPos.current.nodeX + dx, startPos.current.nodeY + dy);
  };

  const handlePointerUp = (e) => {
    if (!draggingRef.current) return;
    e.stopPropagation();
    e.currentTarget.releasePointerCapture(e.pointerId);
    draggingRef.current = false;
  };

  return (
    <div 
      style={{ transform: `translate(calc(${node.x}px - 50%), calc(${node.y}px - 50%))` }}
      className={`absolute ${isExpanded ? 'z-50' : 'z-10'}`}
    >
      {isExpanded ? (
          <div 
           className="relative"
           onPointerDown={(e) => e.stopPropagation()} 
           onPointerUp={(e) => e.stopPropagation()} 
           onClick={(e) => e.stopPropagation()} 
         >
              <SkillCard 
               skill={node} 
               skillCount={skillCount} 
               handleAddSkill={handleAddSkill} 
               handleRemoveSkill={handleRemoveSkill} 
               hasMissingPrereqs={checkMissingPrereqs(node)}
            />
            <button 
              onClick={onToggleExpand} 
              className="absolute -top-3 -right-3 bg-slate-800 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
              title="Close"
            >
               <Icons.X />
            </button>
         </div>
      ) : (
         <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={(e) => { 
               e.stopPropagation(); 
               if (!isEditMode) onToggleExpand(); 
            }}
            className={`
              px-4 py-2 rounded-full shadow-md font-bold text-sm whitespace-nowrap border-2 transition-transform flex items-center justify-center gap-1.5
              ${isEditMode ? 'cursor-grab active:cursor-grabbing hover:scale-105' : 'cursor-pointer hover:scale-110 pointer-events-auto'}
              ${isAcquired ? 'bg-blue-300 border-blue-500 text-blue-900' : 'bg-slate-800 border-slate-600 text-slate-200'}
              ${isSearched ? 'ring-4 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : ''}
            `}
         >
            <span>{node.name}</span>
            {isMulti && isAcquired && (
               <span className="bg-blue-900 text-blue-100 text-[10px] px-1.5 py-0.5 rounded-md font-black shadow-inner opacity-90 leading-none">
                 x{skillCount}
               </span>
            )}
         </div>
      )}
    </div>
  );
};

const AllSkillsViewer = ({ allSkills, layoutData, selectedChar, onUpdateSkills, showToast }) => {
  const [viewMode, setViewMode] = useState('list'); 
  const [treeCategory, setTreeCategory] = useState('Rogue');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNode, setExpandedNode] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [localLayout, setLocalLayout] = useState({});
  const [showAllSkillsList, setShowAllSkillsList] = useState(false);

  useEffect(() => {
     if (layoutData) {
        setLocalLayout(layoutData);
     }
  }, [layoutData]);

  // Ensure these variables exist BEFORE the handlers that use them
  const charSkills = selectedChar ? (Array.isArray(selectedChar.skills) ? selectedChar.skills : []) : [];
  const charSkillsLower = charSkills.map(s => typeof s === 'string' ? s.toLowerCase().trim() : '');
  
  const charSkillsNormalized = useMemo(() => {
    return charSkills.map(s => normalizeSkillName(typeof s === 'string' ? s : ''));
  }, [charSkills]);

  const allSkillNamesNormalized = useMemo(() => {
     return allSkills.map(s => ({
       original: s.name,
       normalized: normalizeSkillName(s.name)
     })).sort((a,b) => b.normalized.length - a.normalized.length);
  }, [allSkills]);

const checkMissingPrereqs = useCallback((skill) => {
    const checkName = skill.name.toLowerCase().trim();

    // Intercept for Florentine
    if (checkName === 'florentine') {
      const hasOneHandedWeapon = charSkillsLower.some(s => 
        s.includes('1-h') || 
        s.includes('1 handed') || 
        s.includes('1-handed') || 
        s.includes('one handed') || 
        s.includes('one-handed')
      );
      return !hasOneHandedWeapon; 
    }

    // Intercept for Disarm
    if (checkName === 'disarm') {
      const hasWeaponSkill = charSkillsLower.some(s => 
        s.includes('weapon skill') || 
        s.includes('1-h') || 
        s.includes('2-h') || 
        s.includes('one handed') || 
        s.includes('one-handed') ||
        s.includes('two handed') || 
        s.includes('two-handed') || 
        s.includes('bow') || 
        s.includes('quarterstaff') || 
        s.includes('spear') || 
        s.includes('polearm')
      );
      return !hasWeaponSkill; 
    }

      // Intercept for Critical Attack
    if (checkName === 'critical attack') {
      const hasWeaponSkill = charSkillsLower.some(s => 
        s.includes('weapon skill') || 
        s.includes('1-h') || 
        s.includes('2-h') || 
        s.includes('one handed') || 
        s.includes('one-handed') ||
        s.includes('two handed') || 
        s.includes('two-handed') || 
        s.includes('bow') || 
        s.includes('quarterstaff') || 
        s.includes('spear') || 
        s.includes('polearm')
      );
      return !hasWeaponSkill; 
    }

    // Standard prerequisite parsing for everything else
    let prereqStr = normalizeSkillName(skill.prerequisites || "");
    if (!prereqStr || prereqStr === "none") return false;
    
    const requiredSkillNames = [];
    for (const parent of allSkillNamesNormalized) {
      if (parent.normalized && prereqStr.includes(parent.normalized)) {
         requiredSkillNames.push(parent.normalized);
         prereqStr = prereqStr.replace(parent.normalized, ''); 
      }
    }

    if (requiredSkillNames.length > 0) {
      return requiredSkillNames.some(req => !charSkillsNormalized.includes(req));
    }
    return true; 
  }, [allSkillNamesNormalized, charSkillsNormalized, charSkillsLower]);

  const getSkillCount = useCallback((skillName) => {
    const normalizedTarget = normalizeSkillName(skillName);
    let count = 0;
    charSkills.forEach(s => {
       if (typeof s === 'string' && normalizeSkillName(s) === normalizedTarget) {
          const match = s.match(/x\s*(\d+)$/i);
          count += match ? parseInt(match[1], 10) : 1;
       }
    });
    return count;
  }, [charSkills]);

  const handleAddSkill = useCallback((skillName) => {
    if (!selectedChar) {
      showToast('Please select a character from the roster first.', 'error');
      return;
    }
    
    const normalizedTarget = normalizeSkillName(skillName);
    let currentCount = 0;
    
    // Filter out existing matches to consolidate them
    const newSkills = charSkills.filter(s => {
       if (typeof s === 'string' && normalizeSkillName(s) === normalizedTarget) {
           const match = s.match(/x\s*(\d+)$/i);
           currentCount += match ? parseInt(match[1], 10) : 1;
           return false; 
       }
       return true;
    });
    
    const nextCount = currentCount + 1;
    const finalName = nextCount > 1 ? `${skillName} x ${nextCount}` : skillName;
    newSkills.push(finalName);
    
    onUpdateSkills(newSkills);
    showToast(`Added ${skillName}`);
  }, [selectedChar, charSkills, onUpdateSkills, showToast]);

  const handleRemoveSkill = useCallback((skillName) => {
    if (!selectedChar) return;
    const normalizedTarget = normalizeSkillName(skillName);
    let currentCount = 0;
    
    // Filter out existing matches
    const newSkills = charSkills.filter(s => {
       if (typeof s === 'string' && normalizeSkillName(s) === normalizedTarget) {
           const match = s.match(/x\s*(\d+)$/i);
           currentCount += match ? parseInt(match[1], 10) : 1;
           return false; 
       }
       return true;
    });
    
    if (currentCount > 0) {
       const nextCount = currentCount - 1;
       // Only push back if we still have at least 1 left
       if (nextCount > 0) {
          const finalName = nextCount > 1 ? `${skillName} x ${nextCount}` : skillName;
          newSkills.push(finalName);
       }
       onUpdateSkills(newSkills);
       showToast(`Removed ${skillName}`);
    }
  }, [selectedChar, charSkills, onUpdateSkills, showToast]);

  const updateNodePosition = useCallback((nodeName, x, y) => {
      setLocalLayout(prev => ({
        ...prev,
        [`${treeCategory}_${nodeName}`]: { x, y }
      }));
  }, [treeCategory]);

  const exportLayout = () => {
    try {
      const blob = new Blob([JSON.stringify(localLayout, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'skill_layout.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Layout exported successfully.');
    } catch (e) {
      showToast('Error exporting layout.', 'error');
    }
  };

  const treeData = useMemo(() => {
    const categorySkills = allSkills.filter(s => {
       const normalizedName = normalizeSkillName(s.name);
       const isMageSkill = MAGE_SKILLS.includes(normalizedName);
       const isRogueSkill = ROGUE_SKILLS.includes(normalizedName);
       const isWarriorSkill = WARRIOR_SKILLS.includes(normalizedName);
       const isDemonHunterSkill = DEMON_HUNTER_SKILLS.includes(normalizedName);
       const isArcaneGrifterSkill = ARCANE_GRIFTER_SKILLS.includes(normalizedName);
       const isSpellSingerSkill = SPELL_SINGER_SKILLS.includes(normalizedName);

       switch(treeCategory) {
           case 'Demon Hunter':
               return isDemonHunterSkill;
           case 'Arcane Grifter':
               return isArcaneGrifterSkill;
           case 'Spell Singer':
               return isSpellSingerSkill;
           case 'Mage':
               return isMageSkill;
           case 'Rogue':
               return isRogueSkill;
           case 'Warrior':
               return isWarriorSkill;
           default:
               return !isDemonHunterSkill && !isArcaneGrifterSkill && !isSpellSingerSkill && 
                      !isMageSkill && !isRogueSkill && !isWarriorSkill;
       }
       
       return false;
    });

    if (categorySkills.length === 0) return { nodes: [], edges: [] };

    const skillMap = new Map();
    categorySkills.forEach(s => skillMap.set(s.name, { ...s, children: [], parents: [], degree: 0 }));

    const sortedCategoryNames = categorySkills.map(s => ({
        original: s.name,
        normalized: normalizeSkillName(s.name)
    })).sort((a,b) => b.normalized.length - a.normalized.length);
    
    categorySkills.forEach(skill => {
      const node = skillMap.get(skill.name);
      let prereqStr = normalizeSkillName(skill.prerequisites || "");
      if (prereqStr === "none" || !prereqStr) return;

      sortedCategoryNames.forEach(parentObj => {
        if (parentObj.normalized && prereqStr.includes(parentObj.normalized)) {
          const parentNode = skillMap.get(parentObj.original);
          if (parentNode && !parentNode.children.includes(skill.name)) {
            parentNode.children.push(skill.name);
            node.parents.push(parentObj.original);
            prereqStr = prereqStr.replace(parentObj.normalized, '');
          }
        }
      });
    });

    const nodesList = Array.from(skillMap.values());
    nodesList.forEach(node => {
      node.degree = node.parents.length + node.children.length;
    });

    nodesList.sort((a, b) => b.degree - a.degree);

    let ringIndex = 0;
    let nodesInCurrentRing = 1;
    let ringCount = 0;
    const RADIAL_SPACING = 300; 
    const MIN_ARC_LENGTH = 250; 

    const finalNodes = [];
    const finalEdges = [];

    nodesList.forEach((node) => {
      if (ringCount >= nodesInCurrentRing) {
         ringIndex++;
         nodesInCurrentRing = Math.max(1, Math.floor((2 * Math.PI * (ringIndex * RADIAL_SPACING)) / MIN_ARC_LENGTH));
         ringCount = 0;
      }

      const radius = ringIndex === 0 ? 0 : ringIndex * RADIAL_SPACING;
      const angle = ringIndex === 0 ? 0 : (ringCount / nodesInCurrentRing) * 2 * Math.PI;

      node.x = radius * Math.cos(angle);
      node.y = radius * Math.sin(angle);
      
      const layoutKey = `${treeCategory}_${node.name}`;
      const savedPos = localLayout[layoutKey] || localLayout[node.name];
      
      if (savedPos) {
         node.x = savedPos.x;
         node.y = savedPos.y;
      }
      
      finalNodes.push(node);
      
      ringCount++; 
    });

    nodesList.forEach(node => {
       node.children.forEach(childName => {
         const childNode = skillMap.get(childName);
         if (childNode) {
           finalEdges.push({ source: node, target: childNode });
         }
      });
    });

    return { nodes: finalNodes, edges: finalEdges };
  }, [allSkills, treeCategory, localLayout]);

  let listSkills = allSkills;
  if (!showAllSkillsList) {
     listSkills = allSkills.filter(s => charSkillsNormalized.includes(normalizeSkillName(s.name)));
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-slate-200 gap-4 shrink-0 bg-slate-50">
        <div>
          <h2 className="text-2xl font-black text-slate-900">All Skills</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {selectedChar ? `Browsing abilities for ${selectedChar.basicInfo.characterName}` : 'Browse and search available abilities.'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
           {viewMode === 'tree' && (
             <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={() => {
                     setIsEditMode(!isEditMode);
                     setExpandedNode(null);
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-bold transition-colors border shadow-sm ${isEditMode ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icons.Edit /> {isEditMode ? 'Editing Constellation' : 'Edit Layout'}
                </button>
                {isEditMode && (
                   <button 
                     onClick={exportLayout}
                     className="flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-bold transition-colors border border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                   >
                     <Icons.Download /> Export Layout
                   </button>
                )}
             </div>
           )}

           <div className="flex bg-slate-200 p-1 rounded-md border border-slate-300 justify-center">
              <button 
                onClick={() => { setViewMode('list'); setIsEditMode(false); }} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded text-sm font-bold transition-colors ${viewMode === 'list' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Icons.Grid /> List
              </button>
              <button 
                onClick={() => setViewMode('tree')} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded text-sm font-bold transition-colors ${viewMode === 'tree' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Icons.Tree /> Tree
              </button>
           </div>

           <input 
             type="text" 
             placeholder="Search skills..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-48 shadow-sm"
           />
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="mb-6 flex justify-center">
             <button 
               onClick={() => setShowAllSkillsList(!showAllSkillsList)}
               className="px-6 py-2 bg-indigo-100 text-indigo-800 font-bold rounded-full shadow-sm hover:bg-indigo-200 transition-colors border border-indigo-300"
             >
               {showAllSkillsList ? 'Show Acquired Skills Only' : 'Load All Skills'}
             </button>
          </div>

          {listSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center h-full">
              <p className="text-lg font-bold text-slate-500">No Skills Found</p>
              {!showAllSkillsList && <p className="text-sm mt-1">Click Load All Skills above to browse available abilities.</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {listSkills
                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.skillList && s.skillList.toLowerCase().includes(searchTerm.toLowerCase())))
                .sort((a, b) => {
                  const aHas = charSkillsNormalized.includes(normalizeSkillName(a.name));
                  const bHas = charSkillsNormalized.includes(normalizeSkillName(b.name));
                  if (aHas && !bHas) return -1;
                  if (!aHas && bHas) return 1;
                  return a.name.localeCompare(b.name);
                })
                .map((skill, idx) => (
                <div key={idx} className="flex justify-center">
                    <SkillCard 
                     skill={skill} 
                     skillCount={getSkillCount(skill.name)} 
                     handleAddSkill={handleAddSkill} 
                     handleRemoveSkill={handleRemoveSkill} 
                     hasMissingPrereqs={checkMissingPrereqs(skill)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 relative w-full h-full p-2">
          <PanZoomCanvas 
            resetTrigger={treeCategory}
            onBgClick={() => setExpandedNode(null)}
            controls={
              <div className="flex overflow-x-auto custom-scrollbar bg-slate-800 p-1.5 pb-2 rounded-lg border border-slate-600 shadow-lg gap-1 pointer-events-auto max-w-[calc(100vw-3rem)] md:max-w-2xl">
                 {['Warrior', 'Rogue', 'Mage', 'Demon Hunter', 'Arcane Grifter', 'Spell Singer', 'Miscellaneous'].map(cat => (
                     <button 
                         key={cat}
                         onClick={() => { setTreeCategory(cat); setExpandedNode(null); }}
                         className={`shrink-0 whitespace-nowrap px-4 py-2 text-sm font-bold rounded-md transition-colors ${treeCategory === cat ? 'bg-indigo-500 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                     >
                         {cat}
                     </button>
                 ))}
              </div>
            }
          >
            {({ scale }) => (
              <>
                <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0">
                   {treeData.edges.map((edge, idx) => (
                      <line 
                        key={idx} 
                        x1={edge.source.x} y1={edge.source.y} 
                        x2={edge.target.x} y2={edge.target.y} 
                        stroke="rgba(148, 163, 184, 0.4)" 
                        strokeWidth="1.5" 
                      />
                   ))}
                </svg>

                <div className="absolute top-0 left-0 w-full h-full overflow-visible z-10">
                   {treeData.nodes.map(node => (
                      <DraggableNode 
                       key={node.name}
                       node={node}
                       scale={scale}
                       isEditMode={isEditMode}
                       isExpanded={expandedNode === node.name}
                       skillCount={getSkillCount(node.name)}
                       isSearched={searchTerm && node.name.toLowerCase().includes(searchTerm.toLowerCase())}
                       onToggleExpand={() => setExpandedNode(expandedNode === node.name ? null : node.name)}
                       handleAddSkill={handleAddSkill}
                       handleRemoveSkill={handleRemoveSkill}
                       checkMissingPrereqs={checkMissingPrereqs}
                       updateNodePosition={updateNodePosition}
                     />
                   ))}
                </div>
              </>
            )}
          </PanZoomCanvas>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('roster');
  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [skillTreeData, setSkillTreeData] = useState([]);
  const [layoutData, setLayoutData] = useState({});
const [selectedId, setSelectedId] = useState(INITIAL_CHARACTERS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const loaded = [];
        const characterFiles = import.meta.glob('./characters/*.json');
        for (const path in characterFiles) {
          const mod = await characterFiles[path]();
          loaded.push(normalizeCharacter(mod.default));
        }
        if (loaded.length > 0) {
          setCharacters(loaded);
          setSelectedId(loaded[0].id);
        }
      } catch (e) { console.error("Error loading local characters", e); }
    };

    const loadSkills = async () => {
      try {
        const skillFiles = import.meta.glob('./skills.json');
        for (const path in skillFiles) {
          const mod = await skillFiles[path]();
          setSkillTreeData(mod.default);
        }
      } catch (e) { console.error("Error loading skills.json", e); }
    };

    const loadLayout = async () => {
      try {
        const layoutFiles = import.meta.glob('./skill_layout.json');
        for (const path in layoutFiles) {
          const mod = await layoutFiles[path]();
          setLayoutData(mod.default);
        }
      } catch (e) { console.info("No saved layout found. Using default radial physics."); }
    };

    loadCharacters();
    loadSkills();
    loadLayout();
  }, []);

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
    setActiveView('roster');
    if (!isSidebarOpen) setIsSidebarOpen(true);
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
        
        let charsToAdd = [];
        if (Array.isArray(importedData)) {
          charsToAdd = importedData.map(normalizeCharacter);
        } else {
          charsToAdd = [normalizeCharacter(importedData)];
        }

        if(charsToAdd.length > 0) {
          const newChars = charsToAdd.map(c => ({...c, id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}));
          setCharacters(prev => [...prev, ...newChars]);
          setSelectedId(newChars[0].id);
          setActiveView('roster');
          showToast(`Imported ${newChars.length} character(s) successfully.`);
        } else {
          showToast('Invalid JSON structure.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen bg-slate-100 text-slate-800 font-sans flex flex-col overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-slate-900 text-white shadow-md flex-shrink-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-slate-300 hover:text-white" 
              title="Toggle Sidebar"
            >
              <Icons.Menu />
            </button>
            <div className="bg-indigo-600 p-2 rounded-lg shadow-inner">
              <Icons.Save />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wide leading-none cursor-pointer" onClick={() => setActiveView('roster')}>LAIRE</h1>
              <span className="text-xs text-indigo-300 font-medium tracking-widest uppercase">Character Editor</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Icons.Upload /> Import JSON
            </button>
            <button onClick={exportAll} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
              <Icons.Download /> Save Roster (JSON)
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-[1400px] w-full mx-auto p-4">
        
        <div className={`transition-all duration-300 ease-in-out flex-shrink-0 h-full overflow-hidden ${isSidebarOpen ? 'w-full md:w-1/3 lg:w-1/4 max-w-xs mr-6 opacity-100' : 'w-0 opacity-0'}`}>
          <aside className="w-full min-w-[280px] h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            <div className="flex p-2 bg-slate-100 border-b border-slate-200 gap-2 shrink-0">
              <button 
                onClick={() => { setActiveView('roster'); if (window.innerWidth < 768) setIsSidebarOpen(false); }} 
                className={`flex-1 py-2 px-2 text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors ${activeView === 'roster' ? 'bg-white shadow-sm text-indigo-700 border border-slate-200' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
              >
                <Icons.Users /> Editor
              </button>
              <button 
                onClick={() => { setActiveView('allSkills'); if (window.innerWidth < 768) setIsSidebarOpen(false); }} 
                className={`flex-1 py-2 px-2 text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors ${activeView === 'allSkills' ? 'bg-white shadow-sm text-indigo-700 border border-slate-200' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
              >
                <Icons.List /> All Skills
              </button>
            </div>

            <div className="px-4 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center z-10 shrink-0">
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
                    onClick={() => { 
                      setSelectedId(char.id); 
                      setActiveView('roster');
                      if (window.innerWidth < 768) setIsSidebarOpen(false); 
                    }}
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
                        {char.basicInfo.playerName || 'Unknown Player'} <span className="text-slate-300"> </span> Lvl {char.basicInfo.level || '?'}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteCharacter(char.id, char.basicInfo.characterName); }}
                      className={`text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-all ${isSelected && activeView === 'roster' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      title="Delete Character"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                );
              })}
              {characters.length === 0 && (
                <div className="p-8 text-center flex flex-col items-center gap-3 text-slate-400">
                  <p className="text-sm font-medium">Roster is empty.</p>
                </div>
              )}
            </div>
          </aside>
        </div>

        <main className="flex-1 overflow-hidden bg-slate-50 rounded-xl relative border border-slate-200 shadow-sm flex flex-col">
          {activeView === 'allSkills' ? (
             <AllSkillsViewer 
                allSkills={skillTreeData} 
                layoutData={layoutData}
                selectedChar={selectedChar}
                onUpdateSkills={(newSkills) => handleUpdateCharacter({ ...selectedChar, skills: newSkills })}
                showToast={showToast}
             />
          ) : !selectedChar ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <p className="text-lg font-bold text-slate-500">No Character Selected</p>
              <p className="text-sm mt-1 max-w-xs">Select a character from the roster on the left, or add a new one to begin editing.</p>
            </div>
          ) : (
            <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-full w-full overflow-y-auto custom-scrollbar">
              
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}