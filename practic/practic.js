function DateColor(date) {
    if (!date) return "default";
    let today = new Date();
    const date1 = new Date(`${today.toLocaleDateString()}`);
    const date2 = new Date(`${date.toLocaleDateString()}`);
    const diffTime = Math.floor(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays < 0) ? "red" : (diffDays == 0) ? "yellow" : "default";
}

console.log(DateColor(new Date("2021-01-01T00:00:00.000Z")));