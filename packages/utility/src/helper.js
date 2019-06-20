export const helper = {
  /**
   * @param {Object} config
   * @param {Number} config.duration
   * @param {function} config.draw
   * @param {function} config.timing
   */
  animate({ duration, draw, timing }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing ? timing(timeFraction) : timeFraction;

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  },
  animateEaseInOut(timing) {
    return function(timeFraction) {
      if (timeFraction < 0.5) return timing(2 * timeFraction) / 2;
      else return (2 - timing(2 * (1 - timeFraction))) / 2;
    };
  },
  animateEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  },
  animateBack(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
  },
  animateQuad(timeFraction) {
    return Math.pow(timeFraction, 2);
  },
  animateCirc(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
  },

  /**
   * @param {String} number
   * @param {"NONE" | "TOMAN" | "RIAL"} convert
   * @returns {String}
   */
  parsePrice(number, convert = "NONE") {
    switch (convert) {
      case "TOMAN":
        number = this.rialToToman(number);
        break;
      case "RIAL":
        number = this.tomanToRial(number);
        break;
      default:
        number = number + "";
        break;
    }
    return number
      .replace(/[^\d\.\-]/g, "")
      .replace(/(\.\d{2})[\W\w]+/g, "$1")
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, "$1,")
      .split("")
      .reverse()
      .join("")
      .replace(/^([\-]{0,1}),/, "$1")
      .replace(/(\.\d)$/, "$1" + "0")
      .replace(/\.$/, ".00");
  },
  rialToToman(price) {
    return parseInt(parseInt(price) / 10).toString();
  },
  tomanToRial(price) {
    return (parseInt(price) * 10).toString();
  },
};
