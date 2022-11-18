class ValidationProvider {
  validateYoutubeId(id) {
    return /([a-zA-Z0-9\-_]+)/.test(id);
  }
  parseYoutubeId(link) {
    if (!link) return false;
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  validateYoutubeUniqueInList(id, list) {
    return list.indexOf(id) === -1;
  }
}
export default new ValidationProvider();
