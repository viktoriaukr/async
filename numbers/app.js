//  1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API
let num = 45;
async function getFacts() {
  let res = await axios.get(`http://numbersapi.com/${num}?json`);
  console.log(res.data.text);
}
getFacts();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let multipleNumbers = [23, 45, 19];

async function getMultipleFacts() {
  let res = await axios.get(`http://numbersapi.com/${multipleNumbers}?json`);
  console.log(res.data);
}

getMultipleFacts();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

let number = 17;

async function facts() {
  let res = await Promise.all(
    Array.from({ length: 4 }, () =>
      axios.get(`http://numbersapi.com/${number}?json`)
    )
  );
  res.forEach((element) => {
    console.log(element.data.text);
  });
}

facts();
