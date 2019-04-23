function doIt(a) {
    if (typeof a !== "string") {
        console.log("Это не строка");
    } else {
        a = a.trim();
        let sliced = a.slice(0, 50);
        if (sliced.length < a.length) {
        return (sliced += "...");
        }
    }
}
    console.log(doIt("Я провела весь день над усложнённым заданием, и мои глаза вытекли"));