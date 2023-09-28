// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function card() {
  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw");
  let suit = res.data.cards[0].suit;
  let value = res.data.cards[0].value;
  console.log(`"${value.toLowerCase()} of ${suit.toLowerCase()}"`);
}
card();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

async function getTwoCards() {
  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw");
  let deckId = res.data.deck_id;
  let res2 = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
  );
  [res, res2].forEach((card) => {
    let value = card.data.cards[0].value;
    let suit = card.data.cards[0].suit;
    console.log(`"${value.toLowerCase()} of ${suit.toLowerCase()}"`);
  });
}

getTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function deckOfCards() {
  let newDeck = await axios.get(
    `https://deckofcardsapi.com/api/deck/new/shuffle/`
  );
  let deckId = newDeck.data.deck_id;
  $("#btn").on("click", async function () {
    let draw = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    if (draw.data.remaining === 0) {
      $("#btn").remove();
      alert("There are no cards left in the deck");
    } else {
      $("#img-container").append(
        $("<img>", {
          src: draw.data.cards[0].image,
        })
      );
    }
  });
}
deckOfCards();
