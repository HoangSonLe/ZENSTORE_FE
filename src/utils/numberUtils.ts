export function getRandomFloat(min: number, max: number): number {
    const value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(1)); // 1 decimal place
}
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatVND(amount: number | string | null | undefined): string {
    try {
        return Number(amount).toLocaleString("vi-VN") + " VNĐ";
    } catch {
        return "Giá liên hệ";
    }
}

export function formatVNDNonUnitName(amount: number | string): string {
    try {
        return Number(amount).toLocaleString("vi-VN");
    } catch {
        return "0";
    }
}
