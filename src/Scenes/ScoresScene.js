import 'phaser';

class ScoresScene extends Phaser.Scene{
    constructor(){
        super({key: 'ScoresScene'});
    }

    create(){
        this.getScores();
    }

    getScores(){
        const makeRequest = (city) => new Promise((resolve, reject) => {
            fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/`, {
              method: 'get',
            }).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                resolve(response.json());
              } else {
                reject(new Error(response.statusText));
              }
            }).catch((err) => {
              Element.requestStatus.classList.remove('hidden');
              Element.requestStatus.innerHTML = `<p>Request failed, ${err}</p>`;
            });
          });
    }

    async function submitCity(city) {
        try {
          const cityResponse = await makeRequest(city);
          Element.requestStatus.classList.add('hidden');
          Element.weatherCurrent.classList.remove('hidden');
          tempMeasure();
          populateView(cityResponse);
        } catch (error) {
          Element.requestStatus.classList.remove('hidden');
          Element.weatherCurrent.classList.add('hidden');
          Element.requestStatus.innerHTML = `<p>${error}</p>`;
        }
      }
}

export default ScoresScene;

