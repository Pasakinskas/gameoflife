class Utilities {
    static randinteger(size) {
        var root = size * Math.random();
        return Math.floor(root);
    }
    static repeat(times, callback) {
        for (var i = 0; i < times; i++)
            callback(i);
    }
}