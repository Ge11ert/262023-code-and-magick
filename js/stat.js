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
   * @param {Object} hist - Hist column parameters
   */
  function drawHistogram(hist) {
    var maxTime = getMaxFromArray(times);
    var scale = hist.height / maxTime;
    var initialX = 150;

    for (var i = 0; i < times.length; i++) {
      var time = times[i].toFixed().toString();
      var name = names[i];
      var height = time * scale;
      var indentX = (hist.width + hist.indent) * i;
      var indentY = hist.height - height;

      ctx.fillText(time, initialX + indentX, 90 + indentY);
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
      ctx.fillRect(initialX + indentX, 100 + indentY, hist.width, height);
      ctx.fillStyle = '#000000';
      ctx.fillText(name, initialX + indentX, 270);
    }
  }

  /**
   * Returns max element from an array
   * @param {Array} array
   * @return {number}
   */
  function getMaxFromArray(array) {
    return array.slice().sort(function (a, b) {
      return b - a;
    })[0];
  }

  var statsCloud = {
    width: 420,
    height: 270
  };

  var hist = {
    width: 40,
    height: 150,
    indent: 50
  };

  // Drop Shadow for stats rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, statsCloud.width, statsCloud.height);

  // Draw stats rectangle
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, statsCloud.width, statsCloud.height);
  ctx.fillRect(100, 10, statsCloud.width, statsCloud.height);

  // Draw heading text
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 150, 40);
  ctx.fillText('Список результатов:', 150, 60);

  drawHistogram(hist);
};
