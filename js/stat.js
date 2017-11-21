'use strict';
/**
 * Shows the statistics window when a player wins
 * @param {Object} ctx - Canvas Rendering Context
 * @param {Array} names - Players names
 * @param {Array} times - Times of game passing
 */
window.renderStatistics = function (ctx, names, times) {
  /**
   * Parameters of the statistics window
   * @enum {number} StatsCloudParams
   */
  var StatsCloudParams = {
    WIDTH: 420,
    HEIGHT: 270,
    INITIAL_X: 100,
    INITIAL_Y: 10
  };

  /**
   * Parameters of a single histogram column
   * @enum {number} HistParams
   */
  var HistParams = {
    WIDTH: 40,
    HEIGHT: 150,
    INDENT: 50,
    INITIAL_X: 150,
    INITIAL_Y: 90
  };

  var headerText = 'Ура, вы победили! Список результатов:';
  var headerTextWidth = 200;
  var textLineHeight = 20;
  var nameYPosition = 270;

  var maxTime = getMaxFromArray(times);
  var scale = HistParams.HEIGHT / maxTime;

  /**
   * Draws a histogram bar with score of a player
   * @param {number} time - Final time of current player
   * @param {string} name - Name of current player
   * @param {number} i - Index of a player
   */
  function drawHistogramBar(time, name, i) {
    var height = time * scale;
    var indentX = (HistParams.WIDTH + HistParams.INDENT) * i;
    var indentY = HistParams.HEIGHT - height;
    var randomOpacity = getRandomFromRange(0.2, 1);

    ctx.fillText(time.toFixed(), HistParams.INITIAL_X + indentX, HistParams.INITIAL_Y + indentY);
    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + randomOpacity + ')';
    ctx.fillRect(HistParams.INITIAL_X + indentX, HistParams.INITIAL_Y + indentY + 10, HistParams.WIDTH, height);
    ctx.fillStyle = '#000000';
    ctx.fillText(name, HistParams.INITIAL_X + indentX, nameYPosition);
  }

  /**
   * Draws specified text on canvas
   * @param {Object} context - Canvas Rendering Context
   * @param {string} string - A text to draw
   * @param {number} textWidth - in pixels
   * @param {number} lineHeight - in pixels
   */
  function drawText(context, string, textWidth, lineHeight) {
    var initialX = 150;
    var initialY = 40;
    var indentY = 0;

    context.fillStyle = '#000000';
    context.font = '16px PT Mono';

    if (context.measureText(string).width > textWidth) {
      var words = string.split(' ');
      var text = '';
      words.forEach(function (word) {
        var testLine = text + word + ' ';
        var testLineWidth = context.measureText(testLine).width;
        if (testLineWidth > textWidth) {
          text = word + ' ';
          indentY += lineHeight;
        } else {
          text = testLine;
        }
        context.fillStyle = 'white';
        context.fillRect(initialX, initialY - lineHeight + indentY + 5, testLineWidth, lineHeight);
        context.fillStyle = '#000000';
        context.fillText(text, initialX, initialY + indentY);
      });
    } else {
      context.fillText(string, initialX, initialY + indentY);
    }
  }

  /**
   * Returns max element of a numerical Array
   * @param {Array} numArray - Array of numbers
   * @return {number}
   */
  function getMaxFromArray(numArray) {
    return Math.max.apply(null, numArray);
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

  // Drop Shadow for stats rectangle
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  // Draw stats rectangle
  ctx.fillStyle = 'white';
  ctx.strokeRect(StatsCloudParams.INITIAL_X, StatsCloudParams.INITIAL_Y, StatsCloudParams.WIDTH, StatsCloudParams.HEIGHT);
  ctx.fillRect(StatsCloudParams.INITIAL_X, StatsCloudParams.INITIAL_Y, StatsCloudParams.WIDTH, StatsCloudParams.HEIGHT);

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  drawText(ctx, headerText, headerTextWidth, textLineHeight);

  times.forEach(function (time, tIndex) {
    drawHistogramBar(time, names[tIndex], tIndex);
  });
};
