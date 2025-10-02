// Simple hook to generate serial numbers for localStorage
export function useSerialNumber(table: string) {
  const getNextSerialNumber = async (): Promise<string> => {
    try {
      const existingData = JSON.parse(localStorage.getItem(table) || '[]');
      if (!Array.isArray(existingData)) {
        console.warn(`Data in localStorage for table '${table}' is not an array, initializing as empty array`);
        return '001';
      }
      const nextNumber = existingData.length + 1;
      return nextNumber.toString().padStart(3, '0');
    } catch (error) {
      console.error('Error getting next serial number:', error);
      return '001'; // Fallback to first number
    }
  };

  return { getNextSerialNumber };
}