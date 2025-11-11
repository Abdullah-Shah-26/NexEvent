"use client";

import { X } from "lucide-react";

interface AgendaInputProps {
  agenda: string[];
  agendaInput: string;
  onAgendaInputChange: (value: string) => void;
  onAddAgenda: () => void;
  onRemoveAgenda: (index: number) => void;
}

export default function AgendaInput({
  agenda,
  agendaInput,
  onAgendaInputChange,
  onAddAgenda,
  onRemoveAgenda,
}: AgendaInputProps) {
  return (
    <div className="form-group">
      <label htmlFor="agenda">Agenda *</label>
      <div className="tag-input-wrapper">
        <input
          type="text"
          value={agendaInput}
          onChange={(e) => onAgendaInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddAgenda();
            }
          }}
          placeholder="Ex: 10:00 - 10:30 | Introduction"
        />
        <button type="button" onClick={onAddAgenda} className="add-btn">
          Add
        </button>
      </div>
      <ul className="agenda-list">
        {agenda.map((item, index) => (
          <li key={index}>
            {item}
            <X size={14} onClick={() => onRemoveAgenda(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
