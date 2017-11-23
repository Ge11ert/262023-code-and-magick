'use strict';

(function () {
  /**
   * @typedef {Object} Wizard
   * @property {string} name
   * @property {string} coatColor
   * @property {string} eyesColor
   */

  /** @const {Array.<string>} */
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  /** @const {Array.<string>} */
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  /** @const {Array.<string>} */
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  /** @const {Array.<string>} */
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  /** @const {number} */
  var WIZARDS_AMOUNT = 4;

  var setupWindow = document.querySelector('.setup');
  var setupSimilar = setupWindow.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;

  var wizards = createWizardsArray();
  var wizardsDOMFragment = fillFragment(wizards);

  /**
   * Creates an array of wizards
   * @return {Array.<Wizard>}
   */
  function createWizardsArray() {
    var wizardsArray = [];
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      wizardsArray.push(generateWizard());
    }
    return wizardsArray;
  }

  /**
   * Creates an object 'wizard' with certain fields
   * @return {Wizard}
   */
  function generateWizard() {
    return {
      name: getName(),
      coatColor: getCoatColor(),
      eyesColor: getEyesColor()
    };
  }

  /**
   * Creates a DOM node based on a 'wizard' object
   * @param {Wizard} wizard
   * @return {Node}
   */
  function renderWizard(wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  /**
   * Creates a fragment filled with wizard DOM element
   * @param {Array.<Wizard>} wizardArray
   * @return {DocumentFragment}
   */
  function fillFragment(wizardArray) {
    var fragment = document.createDocumentFragment();

    wizardArray.forEach(function (wizard) {
      var renderedWizard = renderWizard(wizard);
      fragment.appendChild(renderedWizard);
    });
    return fragment;
  }

  /**
   * Generates a random name from constants NAMES and SURNAMES.
   * @return {string}
   */
  function getName() {
    var nameIndex = getRandomFromRange(0, NAMES.length - 1).toFixed();
    var surnameIndex = getRandomFromRange(0, SURNAMES.length - 1).toFixed();
    return NAMES[nameIndex] + ' ' + SURNAMES[surnameIndex];
  }

  /**
   * Gets a random coat color from constant COAT_COLORS.
   * @return {string}
   */
  function getCoatColor() {
    var coatIndex = getRandomFromRange(0, COAT_COLORS.length - 1).toFixed();
    return COAT_COLORS[coatIndex];
  }

  /**
   * Gets a random eyes color from constant EYES_COLORS.
   * @return {string}
   */
  function getEyesColor() {
    var eyesIndex = getRandomFromRange(0, EYES_COLORS.length - 1).toFixed();
    return EYES_COLORS[eyesIndex];
  }

  /**
   * Returns a random number between min and max
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  function getRandomFromRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  setupSimilarList.appendChild(wizardsDOMFragment);
  setupWindow.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
}());
