const answers = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n'
};

let score = 0;
const inputs = document.querySelectorAll('.hiragana input');
const displayScore = document.getElementById('score');

inputs.forEach(input => {
    input.addEventListener('change', (event) => {
        const userGuess = event.target.value.trim().toLowerCase();
        
        // kana class is input's sibling.
        const kanaDiv = input.previousElementSibling; 
        const kanaChar = kanaDiv.innerText;
        const hiraganaBlock = input.parentElement;
        const correctAnswer = answers[kanaChar];

        if (userGuess === '') {
            input.classList.remove('correct', 'incorrect');
            hiraganaBlock.classList.remove('correct', 'incorrect');
        }
        else if (userGuess === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');

            hiraganaBlock.classList.add('correct');
            hiraganaBlock.classList.remove('incorrect');

            score++;
            input.disabled = true;
        } 
        else {
            input.classList.add('incorrect');
            input.classList.remove('correct');

            hiraganaBlock.classList.add('incorrect');
            hiraganaBlock.classList.remove('correct');
        }
        
        displayScore.innerText = score;
    });
});
