const mainKana = {
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

const dakutenKana = {
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
};

const allKana = {...mainKana, ...dakutenKana};

let score = 0;

function setupQuiz() {
    const inputs = document.querySelectorAll('.hiragana input');

    inputs.forEach(input =>{
        input.removeEventListener('change', answersLogic);
        input.addEventListener('change', answersLogic);
    });
};

function answersLogic(event) {
    const input = event.target;
    const userGuess = input.value.trim().toLowerCase();
     
    // kana class is input's sibling.
    const kanaDiv = input.previousElementSibling; 
    const kanaChar = kanaDiv.innerText;
    const hiraganaBlock = input.parentElement;
    const correctAnswer = allKana[kanaChar];

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
        input.value = '';
        input.placeholder = userGuess;

        input.classList.add('incorrect');
        input.classList.remove('correct');

        hiraganaBlock.classList.add('incorrect');
        hiraganaBlock.classList.remove('correct');
    }
    document.getElementById('score').innerText = score;
};

function shuffleKana(containerId) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.getElementsByClassName('hiragana'));
    
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(items[j]);
    }
}

document.getElementById('next').addEventListener('click', () => {
    const mainSection = document.getElementById('main-kana');
    const dakutenSection = document.getElementById('dakuten-kana');

    // change sections!
    if(mainSection.style.display === 'none') {
        mainSection.style.display = 'flex';
        dakutenSection.style.display = 'none';
        document.getElementById('next').innerText = 'dakuten'; 
        shuffleKana('dakuten-kana');  
    }
    else {
        mainSection.style.display = 'none';
        dakutenSection.style.display = 'flex';
        document.getElementById('next').innerText = 'main kana';
        shuffleKana('main-kana');
    }
    setupQuiz(); //restart the setup
});

document.getElementById('reset').addEventListener('click', () => {
    score = 0;
    document.getElementById('score').innerText = score;
    
    const inputs = document.querySelectorAll('.hiragana input');
    inputs.forEach(input => {
        input.value = '';
        input.placeholder = '';
        input.disabled = false;
        input.classList.remove('correct', 'incorrect');
        input.parentElement.classList.remove('correct', 'incorrect');
    });
});

setupQuiz();
shuffleKana('main-kana');