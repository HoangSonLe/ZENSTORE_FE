/**
 * Extracts the percentage from a sale status code or name
 * @param statusCode The product status code (e.g., "SALE10", "SALE20")
 * @param statusName The product status name (e.g., "Sale 10%", "Discount 20%")
 * @returns The percentage with % symbol (e.g., "10%", "20%")
 */
export function extractSalePercentage(statusCode: string, statusName: string): string {
    // Try to extract from status code first (e.g., "SALE10" -> "10%")
    if (statusCode.startsWith("SALE") && statusCode.length > 4) {
        const percentage = statusCode.substring(4);
        if (!isNaN(Number(percentage))) {
            return `${percentage}%`;
        }
    }
    
    // If that fails, try to extract from status name
    // Look for numbers followed by % in the status name
    const percentMatch = statusName.match(/(\d+)%/);
    if (percentMatch && percentMatch[1]) {
        return `${percentMatch[1]}%`;
    }
    
    // If no percentage found, return "-"
    return "-";
}
