'use strict';

(function () {
  /** @constant {Array.<string>} */
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  /** @constant {Array.<string>} */
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  /** @constant {Array.<string>} */
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  /** @constant {Array.<string>} */
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupWindow = document.querySelector('.setup');
  var setupSimilar = setupWindow.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var fragment = document.createDocumentFragment();

  var wizards = [];
  var wizardsAmount = 4;

  /**
   * Creates an object 'wizard' with certain fields
   * @return {Object}
   */
  function generateWizard() {
    var wizard = {};
    wizard.name = getName();
    wizard.coatColor = getCoatColor();
    wizard.eyesColor = getEyesColor();
    return wizard;
  }

  /**
   * Creates a DOM node based on a 'wizard' object
   * @param {Object} wizard
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

  for (var i = 0; i < wizardsAmount; i++) {
    wizards.push(generateWizard());
    fragment.appendChild(renderWizard(wizards[i]));
  }

  setupSimilarList.appendChild(fragment);
  setupWindow.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
}());
