const games = [
    { id: "1", title: "The Legend of Zelda", platform: ["Nintendo Switch"] },
    { id: "2", title: "God of War", platform: ["PlayStation 4", "PlayStation 5"] },
    { id: "3", title: "Cyberpunk 2077", platform: ["PC", "PlayStation 4", "Xbox One"] },
    { id: "4", title: "Minecraft", platform: ["PC", "Xbox One", "PlayStation 4", "Nintendo Switch"] },
    { id: "5", title: "Fortnite", platform: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch"] },
];


const authors = [
    { id: "1", name: "John Doe", email: "john@example.com", password: "johndoe", verified: true },
    { id: "2", name: "Jane Smith", email: "jane@example.com", password: "janesmith", verified: false },
    { id: "3", name: "Alice Johnson", email: "alice@example.com", password: "alicejohnson", verified: true },
    { id: "4", name: "Bob Brown", email: "bob@example.com", password: "bobbrown", verified: false },
    { id: "5", name: "Charlie Williams", email: "charlie@example.com", password: "charlie", verified: true },
];

const reviews = [
    { id: "1", rating: 5, content: "Amazing game! Loved every moment.", author_id: "1", game_id: "1" },
    { id: "2", rating: 4, content: "Great game but some bugs.", author_id: "2", game_id: "2" },
    { id: "3", rating: 3, content: "Good gameplay, but lacks depth.", author_id: "3", game_id: "3" },
    { id: "4", rating: 2, content: "Could have been better. Needs more features.", author_id: "4", game_id: "4" },
    { id: "5", rating: 1, content: "Disappointing. Too many glitches.", author_id: "5", game_id: "5" },
];

export default { games, authors, reviews }