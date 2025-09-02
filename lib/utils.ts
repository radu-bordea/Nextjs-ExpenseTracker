// Utility function to format numbers with commas
// Example: 1234567 -> "1,234,567"
export function addCommas(x: number): string {
  return x
    .toString() // Convert number to string for regex processing
    .replace(
      /\B(?=(\d{3})+(?!\d))/g, // Regex explanation:
      // \B         → Match a position that is NOT a word boundary
      // (?=...)    → Lookahead to assert what follows
      // \d{3}      → Match exactly 3 digits
      // +          → Apply grouping repeatedly (for thousands, millions, etc.)
      // (?!\d)     → Ensure no extra digit follows (avoids trailing matches)
      ","
    ); // Replace each match with a comma
}
