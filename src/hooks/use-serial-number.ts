import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define which tables we support and their serial number column names
type TableColumns = {
  incident_report: 'srno';
  induction_records: 'sno';
  cnr_tracker: 'srno';
  training_competency_register: 'srno';
  events: 'srno';
};

type TableName = keyof TableColumns;

// Get the correct column name for each table
const getSerialNumberColumn = (tableName: TableName): TableColumns[TableName] => {
  switch (tableName) {
    case 'incident_report':
    case 'cnr_tracker':
    case 'training_competency_register':
    case 'events':
      return 'srno';
    case 'induction_records':
      return 'sno';
  }
};

export const useSerialNumber = (tableName: TableName) => {
  const getNextSerialNumber = useCallback(async () => {
    try {
      const column = getSerialNumberColumn(tableName);
      
      // Get the latest record with a serial number
      const { data: latestRecord, error } = await supabase
        .from(tableName)
        .select(`${column}, id`)
        .order('id', { ascending: false })
        .limit(1);

      if (error) throw error;

      // Get the current serial number
      const currentSN = latestRecord?.[0]?.[column];
      
      if (!currentSN) return "01"; // Start with 01 if no records exist

      // If it's a number, increment it and pad with zeros
      if (typeof currentSN === 'number') {
        return String(currentSN + 1).padStart(2, '0');
      }

      // If it's a string, parse it and increment
      let numericPart: number;
      if (typeof currentSN === 'string') {
        // Remove any non-numeric characters
        const matches = currentSN.match(/\d+/g);
        numericPart = matches ? parseInt(matches[matches.length - 1], 10) : 0;
      } else {
        numericPart = 0;
      }

      if (isNaN(numericPart)) return "01";

      return String(numericPart + 1).padStart(2, '0');
    } catch (error) {
      console.error('Error getting next serial number:', error);
      return null;
    }
  }, [tableName]);

  return { getNextSerialNumber };
};