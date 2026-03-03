const MAX = 10;
         const MIN = 1;
         const MAX_ATTEMPTS = 3;

         let target, attemptsLeft, finished;

         function init() {
           target = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
           attemptsLeft = MAX_ATTEMPTS;
           finished = false;
           document.getElementById('message').textContent = 'You have ' + attemptsLeft + ' attempts.';
           document.getElementById('attempts').textContent = '';
           document.getElementById('guess').value = '';
           document.getElementById('guess').disabled = false;
           document.getElementById('checkBtn').disabled = false;
         }

         function setMessage(text, color) {
           const el = document.getElementById('message');
           el.textContent = text;
           el.style.color = color || '#000';
         }

         function checkGuess() {
           if (finished) return;
           const input = document.getElementById('guess').value;
           const n = parseInt(input, 10);
           if (isNaN(n)) { setMessage('Enter a number between 1 and 10.', 'crimson'); return; }
           if (n < MIN || n > MAX) { setMessage('Number must be between 1 and 10.', 'crimson'); return; }

           attemptsLeft--;
           if (n === target) {
             setMessage('Correct! The number was ' + target + '.', 'green');
             finished = true;
           } else if (attemptsLeft <= 0) {
             setMessage('Game over. The number was ' + target + '.', 'crimson');
             finished = true;
           } else {
             setMessage(n < target ? 'Too low.' : 'Too high.', 'orange');
             document.getElementById('attempts').textContent = 'Attempts left: ' + attemptsLeft;
           }

           if (finished) {
             document.getElementById('guess').disabled = true;
             document.getElementById('checkBtn').disabled = true;
           }
         }

         document.getElementById('checkBtn').addEventListener('click', checkGuess);
         document.getElementById('resetBtn').addEventListener('click', init);
         document.getElementById('guess').addEventListener('keydown', function(e){
           if(e.key === 'Enter') checkGuess();
         });

         init();