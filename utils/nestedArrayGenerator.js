function generateNestedArraySchema(depth) {
    if (depth === 0) {
        return Number;
    } else {
        return [generateNestedArraySchema(depth - 1)];
    }
}

module.exports = { generateNestedArraySchema }