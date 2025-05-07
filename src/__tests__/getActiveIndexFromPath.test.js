// Test for getActiveIndexFromPath function

// Mock implementation of the function for testing
const getActiveIndexFromPath = (path) => {
    if (path === "/") return 0;
    if (path.startsWith("/shop") || path.startsWith("/product-details")) return 1;
    if (path.startsWith("/blog") || path.startsWith("/blog-details")) return 2;
    if (path.startsWith("/tra-gop")) return 3;
    return null;
};

describe('getActiveIndexFromPath', () => {
    test('returns 0 for home path', () => {
        expect(getActiveIndexFromPath('/')).toBe(0);
    });

    test('returns 1 for shop paths', () => {
        expect(getActiveIndexFromPath('/shop')).toBe(1);
        expect(getActiveIndexFromPath('/shop/category')).toBe(1);
        expect(getActiveIndexFromPath('/product-details/123')).toBe(1);
    });

    test('returns 2 for blog paths', () => {
        expect(getActiveIndexFromPath('/blog')).toBe(2);
        expect(getActiveIndexFromPath('/blog/category')).toBe(2);
        expect(getActiveIndexFromPath('/blog-details/123')).toBe(2);
    });

    test('returns 3 for installment path', () => {
        expect(getActiveIndexFromPath('/tra-gop')).toBe(3);
        expect(getActiveIndexFromPath('/tra-gop/details')).toBe(3);
    });

    test('returns null for unknown paths', () => {
        expect(getActiveIndexFromPath('/unknown')).toBe(null);
        expect(getActiveIndexFromPath('/contact')).toBe(null);
    });
});
