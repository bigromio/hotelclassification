import React, { useState, useEffect } from 'react';
import { useStandards } from '../context/StandardsContext';

interface EditableTextProps {
  value: string;
  category: string;
  id: string;
  field: string;
  multiline?: boolean;
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  category, 
  id, 
  field, 
  multiline = false,
  className = ''
}) => {
  const { isAdmin, updateDataItem } = useStandards();
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (localValue !== value) {
      updateDataItem(category as any, id, field, localValue);
    }
  };

  if (!isAdmin) {
    return <span className={className}>{value}</span>;
  }

  if (multiline) {
    return (
      <textarea
        className={`bg-yellow-50 border border-yellow-200 p-1 rounded w-full ${className}`}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <input
      type="text"
      className={`bg-yellow-50 border border-yellow-200 px-1 rounded ${className}`}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};
