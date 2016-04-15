var books = [
  {
    id: 1,
    title: "Harry Potter and the Deathly Hallows",
    author: "J. K. Rowling"
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling"
  },
  {
    id: 3,
    title: "Percy Jackson and the Sea Monsters",
    author: "Rick Riordan"
  },
  {
    id: 4,
    title: "Outliers",
    author: "Malcolm Gladwell"
  },
  {
    id: 5,
    title: "David and Goliath",
    author: "Malcolm Gladwell"
  }
];

module.exports = {
  loadData: function() {
    return books;
  },
  constraints: {
    id: {
      presence: true,
      numericality: true,
      exclusion: {
        within: ["nicklas"],
        message: "'%{value}' is not allowed"
      }
    },
    title: {
      presence: true
    },
    author: {
      presence: true
    }
  }
}
