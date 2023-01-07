export default function separateLetters(nodeListOfWords) {
  nodeListOfWords.forEach(word => {
    const letters = word.textContent.split("");
    let html = word;
    word.textContent = "";
    letters.forEach(letter => {
      html.innerHTML += '<span class="letter">' + letter + '</span>';
    });
    word.innerHTML = html.innerHTML;  
  })
}