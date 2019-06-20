class utility {
  object = {
    isEmpty: obj => {
      if (obj === undefined || obj === null) return true;
      return this.object.length(obj) === 0;
    },
    length: obj => {
      return Object.getOwnPropertyNames(obj).length;
    }
  };
  array = {
    remove(array, index, count = 1) {
      if (index !== -1) {
        array.splice(index, count);
      }
      return array;
    }
  };
  convertNumbers2English(string) {
    return string
      .replace(/[\u0660-\u0669]/g, function(c) {
        return c.charCodeAt(0) - 0x0660;
      })
      .replace(/[\u06f0-\u06f9]/g, function(c) {
        return c.charCodeAt(0) - 0x06f0;
      })
      .replace(/[^\d]/g, "");
  }
  
}
export default new utility();
