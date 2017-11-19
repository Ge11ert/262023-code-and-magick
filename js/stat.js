'use strict';
/**
 * Shows the statistics window when a player wins
 * @param {Object} ctx - Canvas Rendering Context
 * @param {Array} names - Players names
 * @param {Array} times - Times of game passing
 */
window.renderStatistics = function (ctx, names, times) {
  /**
   * Draws a histogram with players score
   * @param {number} time - Final time of current player
   * @param {string} name - Name of current player
   * @param {number} i    - Index of a player
   */
  function drawHistogram(time, name, i) {
    var height = time * scale;
    var indentX = (histParams.width + histParams.indent) * i;
    var indentY = histParams.height - height;
    var maxOpacity = 1;
    var minOpacity = 0.2;
    var nameYPosition = 270;

    ctx.fillText(time.toFixed().toString(), histParams.initialX + indentX, histParams.initialY + indentY);
    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() * (maxOpacity - minOpacity) + minOpacity) + ')';
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
    var lines = string.split('\n');
    var initialX = 150;
    var initialY = 40;
    var indentY = 0;

    context.fillStyle = '#000000';
    context.font = '16px PT Mono';

    lines.forEach(function (line, i) {
      if (i > 0) {
        indentY += lineHeight;
      }
      if (context.measureText(line).width > textWidth) {
        var words = line.split(' ');
        var text = '';
        words.forEach(function (word) {
          var testLine = text + word + ' ';
          var testLineWidth = context.measureText(testLine).width;
          if (testLineWidth > textWidth) {
            context.fillText(text, initialX, initialY + indentY);
            text = word + ' ';
            indentY += lineHeight;
          } else {
            text = testLine;
          }
          context.fillText(text, initialX, initialY + indentY);
        });
      } else {
        context.fillText(line, initialX, initialY + indentY);
      }
    });
  }

  /**
   * Returns max element of a numerical Array
   * @param {Array} numArray - Array of numbers
   * @return {number}
   */
  function getMaxFromArray(numArray) {
    return Math.max.apply(null, numArray);
  }

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


  var headerText = 'Ура, вы победили!\nСписок результатов:';
  var textWidth = 300;
  var lineHeight = 20;
  var maxTime = getMaxFromArray(times);
  var scale = histParams.height / maxTime;

  // Drop Shadow for stats rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(statsCloudParams.initialX + 10, statsCloudParams.initialY + 10, statsCloudParams.width, statsCloudParams.height);

  // Draw stats rectangle
  ctx.fillStyle = 'white';
  ctx.strokeRect(statsCloudParams.initialX, statsCloudParams.initialY, statsCloudParams.width, statsCloudParams.height);
  ctx.fillRect(statsCloudParams.initialX, statsCloudParams.initialY, statsCloudParams.width, statsCloudParams.height);

  drawText(ctx, headerText, textWidth, lineHeight);

  times.forEach(function (time, tIndex) {
    drawHistogram(time, names[tIndex], tIndex);
  });
};
