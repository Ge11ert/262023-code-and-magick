'use strict';
/**
 * Shows the statistics window when a player wins
 * @param {Object} ctx - Canvas Rendering Context
 * @param {Array} names - Players names
 * @param {Array} times - Times of game passing
 */
window.renderStatistics = function (ctx, names, times) {
  var statsCloudParams = {
    width: 420,
    height: 270,
    initialX: 100,
    initialY: 10
  };

  var histParams = {
    width: 40,
    height: 150,
    indent: 50,
    initialX: 150,
    initialY: 90
  };

  var headerText = 'Ура, вы победили! Список результатов:';
  var headerTextWidth = 200;
  var textLineHeight = 20;
  var nameYPosition = 270;

  var maxTime = getMaxFromArray(times);
  var scale = histParams.height / maxTime;

  var maxColorOpacity = 1;
  var minColorOpacity = 0.2;

  /**
   * Draws a histogram bar with score of a player
   * @param {number} time - Final time of current player
   * @param {string} name - Name of current player
   * @param {number} i - Index of a player
   */
  function drawHistogramBar(time, name, i) {
    var height = time * scale;
    var indentX = (histParams.width + histParams.indent) * i;
    var indentY = histParams.height - height;

    ctx.fillText(time.toFixed(), histParams.initialX + indentX, histParams.initialY + indentY);
    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomBlue();
    ctx.fillRect(histParams.initialX + indentX, histParams.initialY + indentY + 10, histParams.width, height);
    ctx.fillStyle = '#000000';
    ctx.fillText(name, histParams.initialX + indentX, nameYPosition);
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
   * Generates blue color with random opacity
   * @return {string} - Blue color in RGBA format
   */
  function getRandomBlue() {
    var randomOpacity = Math.random() * (maxColorOpacity - minColorOpacity) + minColorOpacity;
    return 'rgba(0, 0, 255, ' + randomOpacity + ')';
  }

  // Drop Shadow for stats rectangle
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  // Draw stats rectangle
  ctx.fillStyle = 'white';
  ctx.strokeRect(statsCloudParams.initialX, statsCloudParams.initialY, statsCloudParams.width, statsCloudParams.height);
  ctx.fillRect(statsCloudParams.initialX, statsCloudParams.initialY, statsCloudParams.width, statsCloudParams.height);

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  drawText(ctx, headerText, headerTextWidth, textLineHeight);

  times.forEach(function (time, tIndex) {
    drawHistogramBar(time, names[tIndex], tIndex);
  });
};
