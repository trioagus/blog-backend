
export function sanitizeInput(input: string): string {
    let sanitizedInput = input.replace(/'/g, "''"); 
  
    // Menghindari serangan XSS dengan menghilangkan tag HTML dan JavaScript
    sanitizedInput = sanitizedInput.replace(/<[^>]*>/g, ''); // Menghapus tag HTML
    sanitizedInput = sanitizedInput.replace(/(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/gi, ''); // Menghapus atribut event dan kode JavaScript
  
    const trimmedInput = sanitizedInput.trim();
  
    return trimmedInput;
  }
  